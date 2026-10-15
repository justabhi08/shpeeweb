import { NextResponse } from "next/server";
import { db } from "@/db";
import { contactInquiries } from "@/db/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json() as Record<string, unknown>;
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const phone = String(body.phone ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (name.length < 2 || !/^\S+@\S+\.\S+$/.test(email) || phone.length < 7 || message.length < 5) {
      return NextResponse.json({ message: "Please complete all required fields correctly." }, { status: 400 });
    }

    await db.insert(contactInquiries).values({ name, email, phone, message });
    return NextResponse.json({ message: "Thank you. Your message has been sent successfully." });
  } catch (error) {
    console.error("Contact form error", error);
    return NextResponse.json({ message: "Unable to send your message right now." }, { status: 500 });
  }
}
