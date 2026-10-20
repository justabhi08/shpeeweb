import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { orders } from "@/db/schema";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderNumber = searchParams.get("order")?.trim().toUpperCase() ?? "";
    const email = searchParams.get("email")?.trim().toLowerCase() ?? "";
    if (!orderNumber || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ message: "Enter a valid order number and email." }, { status: 400 });
    }
    const [order] = await db.select({
      orderNumber: orders.orderNumber,
      customerName: orders.customerName,
      total: orders.total,
      status: orders.status,
      items: orders.items,
      paymentMethod: orders.paymentMethod,
      paymentReference: orders.paymentReference,
      createdAt: orders.createdAt,
      paymentStatus: orders.paymentStatus,
      courier: orders.courier,
      trackingNumber: orders.trackingNumber,
      estimatedDelivery: orders.estimatedDelivery,
      history: orders.history,
    }).from(orders).where(and(eq(orders.orderNumber, orderNumber), eq(orders.email, email))).limit(1);

    if (!order) return NextResponse.json({ message: "No matching order was found." }, { status: 404 });
    return NextResponse.json({ order }, { headers: { "Cache-Control": "private, no-store" } });
  } catch (error) {
    console.error("Order tracking error", error);
    return NextResponse.json({ message: "Unable to track the order right now." }, { status: 500 });
  }
}
