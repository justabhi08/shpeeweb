import { getUser } from "@netlify/identity";
import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { orders } from "@/db/schema";
export const dynamic = "force-dynamic";
export async function GET() {
  const user = await getUser();
  if (!user?.email || !user.confirmedAt) return Response.json({ message: "Please sign in with your verified checkout email." }, { status: 401 });
  try {
    const results = await db.select().from(orders).where(eq(orders.email, user.email.toLowerCase())).orderBy(desc(orders.createdAt)).limit(100);
    return Response.json({ orders: results }, { headers: { "Cache-Control": "private, no-store" } });
  } catch { return Response.json({ message: "Unable to load orders. Please retry." }, { status: 500 }); }
}
