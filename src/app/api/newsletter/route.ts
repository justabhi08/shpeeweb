import { NextResponse } from "next/server";
import { db } from "@/db";
import { newsletterSubscribers } from "@/db/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json() as { email?: unknown };
    const email = String(body.email ?? "").trim().toLowerCase();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ message: "Please enter a valid email address." }, { status: 400 });
    }
    await db.insert(newsletterSubscribers).values({ email }).onConflictDoNothing();
    return NextResponse.json({ message: "Your subscription has been successful." });
  } catch (error) {
    console.error("Newsletter error", error);
    return NextResponse.json({ message: "Your subscription could not be saved. Please try again." }, { status: 500 });
  }
}
