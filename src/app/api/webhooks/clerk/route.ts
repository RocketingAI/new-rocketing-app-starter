import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "svix";
import { connectDB } from "@/lib/db/client";
import { User } from "@/lib/db/models/user.model";

// Clerk webhook handler — syncs user data to MongoDB
// Requires CLERK_WEBHOOK_SECRET env var

export async function POST(request: NextRequest) {
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 });
  }
  const headerPayload = {
    "svix-id": request.headers.get("svix-id") || "",
    "svix-timestamp": request.headers.get("svix-timestamp") || "",
    "svix-signature": request.headers.get("svix-signature") || "",
  };
  const body = await request.text();
  let event;
  try {
    const wh = new Webhook(webhookSecret);
    event = wh.verify(body, headerPayload) as {
      type: string;
      data: Record<string, unknown>;
    };
  } catch {
    return NextResponse.json({ error: "Invalid webhook" }, { status: 400 });
  }
  await connectDB();
  const { type, data } = event;
  if (type === "user.created" || type === "user.updated") {
    const emailObj = (data.email_addresses as Array<{ email_address: string }>)?.[0];
    await User.findOneAndUpdate(
      { clerkId: data.id as string },
      {
        clerkId: data.id as string,
        email: emailObj?.email_address || "",
        firstName: (data.first_name as string) || null,
        lastName: (data.last_name as string) || null,
        imageUrl: (data.image_url as string) || null,
      },
      { upsert: true, new: true },
    );
  }
  if (type === "user.deleted") {
    await User.findOneAndDelete({ clerkId: data.id as string });
  }
  return NextResponse.json({ received: true });
}
