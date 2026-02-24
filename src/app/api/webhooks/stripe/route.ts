import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe/client";
import { connectDB } from "@/lib/db/client";
import { User } from "@/lib/db/models/user.model";

// Stripe webhook handler — syncs subscription status to DB
// Requires STRIPE_WEBHOOK_SECRET env var

export async function POST(request: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 });
  }
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }
  let event;
  try {
    event = getStripe().webhooks.constructEvent(body, signature, webhookSecret);
  } catch {
    return NextResponse.json({ error: "Invalid webhook" }, { status: 400 });
  }
  await connectDB();
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const userId = session.metadata?.userId;
      if (userId && session.customer) {
        await User.findOneAndUpdate(
          { clerkId: userId },
          {
            stripeCustomerId: session.customer as string,
            subscriptionStatus: "active",
            subscriptionPlan: "pro",
          },
        );
      }
      break;
    }
    case "customer.subscription.updated": {
      const sub = event.data.object;
      const status = sub.status === "active" ? "active" : sub.status === "trialing" ? "trialing" : "past_due";
      await User.findOneAndUpdate(
        { stripeCustomerId: sub.customer as string },
        { subscriptionStatus: status },
      );
      break;
    }
    case "customer.subscription.deleted": {
      const sub = event.data.object;
      await User.findOneAndUpdate(
        { stripeCustomerId: sub.customer as string },
        { subscriptionStatus: "canceled", subscriptionPlan: null },
      );
      break;
    }
  }
  return NextResponse.json({ received: true });
}
