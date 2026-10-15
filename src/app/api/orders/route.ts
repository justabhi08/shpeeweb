import { NextResponse } from "next/server";
import { db } from "@/db";
import { orders, type OrderLine } from "@/db/schema";
import { getProduct } from "@/data/catalog";

export async function POST(request: Request) {
  try {
    const body = await request.json() as Record<string, unknown>;
    const customerName = String(body.customerName ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const phone = String(body.phone ?? "").trim();
    const address = String(body.address ?? "").trim();
    const city = String(body.city ?? "").trim();
    const state = String(body.state ?? "").trim();
    const pincode = String(body.pincode ?? "").trim();
    const paymentMethod = body.paymentMethod === "PhonePe UPI" ? "PhonePe UPI" : "Cash on Delivery";
    const paymentReference = String(body.paymentReference ?? "").trim().slice(0, 80) || null;
    const rawItems = Array.isArray(body.items) ? body.items : [];

    if (customerName.length < 2 || !/^\S+@\S+\.\S+$/.test(email) || phone.length < 7 || address.length < 8 || !city || !state || pincode.length < 5) {
      return NextResponse.json({ message: "Please complete your delivery details correctly." }, { status: 400 });
    }

    const items: OrderLine[] = rawItems.flatMap((raw) => {
      const item = raw as { productId?: unknown; quantity?: unknown };
      const product = getProduct(Number(item.productId));
      const quantity = Math.min(20, Math.max(1, Number(item.quantity) || 1));
      return product ? [{ productId: product.Id, name: product.PName, image: product.ProductImage, quantity, price: product.DP }] : [];
    });
    if (!items.length) return NextResponse.json({ message: "Your cart is empty." }, { status: 400 });

    if (paymentMethod === "PhonePe UPI" && !paymentReference) {
      return NextResponse.json({ message: "Please enter the UPI transaction / reference number after completing the payment." }, { status: 400 });
    }

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const orderNumber = `SKY${Date.now().toString().slice(-9)}${Math.floor(Math.random() * 90 + 10)}`;
    const [order] = await db.insert(orders).values({
      orderNumber,
      customerName,
      email,
      phone,
      address,
      city,
      state,
      pincode,
      items,
      total: total.toFixed(2),
      paymentMethod,
      paymentReference,
    }).returning({ orderNumber: orders.orderNumber, status: orders.status });

    return NextResponse.json({ message: "Order placed successfully.", order });
  } catch (error) {
    console.error("Order placement error", error);
    return NextResponse.json({ message: "Unable to place your order right now." }, { status: 500 });
  }
}
