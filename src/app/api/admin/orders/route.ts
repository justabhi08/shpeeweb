import { getUser } from "@netlify/identity";
import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { orderStatuses, paymentStatuses } from "@/lib/order-status";
export const dynamic = "force-dynamic";
async function isAdmin() {
  const user = await getUser();
  return !!user?.confirmedAt && !!user.roles?.includes("admin");
}
export async function GET() {
  if (!await isAdmin()) return Response.json({ message: "Admin access required. Sign in with an account assigned the admin role." }, { status: 403 });
  try {
    return Response.json({ orders: await db.select().from(orders).orderBy(desc(orders.createdAt)).limit(100) }, { headers: { "Cache-Control": "private, no-store" } });
  } catch { return Response.json({ message: "Unable to load orders." }, { status: 500 }); }
}
export async function PATCH(request: Request) {
  if (!await isAdmin()) return Response.json({ message: "Admin access required." }, { status: 403 });
  if (request.headers.get("origin") !== new URL(request.url).origin) return Response.json({ message: "Invalid origin." }, { status: 403 });
  try {
    const body = await request.json();
    if (!orderStatuses.includes(body.status) || !paymentStatuses.includes(body.paymentStatus) || typeof body.orderNumber !== "string") return Response.json({ message: "Invalid status." }, { status: 400 });
    const courier = String(body.courier ?? "").trim();
    const trackingNumber = String(body.trackingNumber ?? "").trim();
    const note = String(body.note ?? "").trim();
    const estimatedDelivery = String(body.estimatedDelivery ?? "");
    if (courier.length > 120 || trackingNumber.length > 120 || note.length > 500 || (estimatedDelivery && !/^\d{4}-\d{2}-\d{2}$/.test(estimatedDelivery))) return Response.json({ message: "Check tracking details and date." }, { status: 400 });
    const result = await db.transaction(async tx => {
      const [existing] = await tx.select().from(orders).where(eq(orders.orderNumber, body.orderNumber)).for("update");
      if (!existing) return null;
      const [updated] = await tx.update(orders).set({ status: body.status, paymentStatus: body.paymentStatus, courier, trackingNumber, estimatedDelivery: estimatedDelivery || null, history: [...existing.history, { status: body.status, note: note || "Order details updated", at: new Date().toISOString() }] }).where(eq(orders.id, existing.id)).returning();
      return updated;
    });
    return result ? Response.json({ order: result }) : Response.json({ message: "Order not found." }, { status: 404 });
  } catch { return Response.json({ message: "Unable to update order." }, { status: 500 }); }
}
