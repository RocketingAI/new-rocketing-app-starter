import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db/client";
import { User } from "@/lib/db/models/user.model";
import { apiSuccess, apiError } from "@/lib/utils/api";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return apiError("Unauthorized", 401);
  await connectDB();
  const user = await User.findOne({ clerkId: userId })
    .select("subscriptionStatus subscriptionPlan stripeCustomerId")
    .lean();
  if (!user) {
    return apiSuccess({
      status: "free",
      plan: null,
      hasStripeCustomer: false,
    });
  }
  return apiSuccess({
    status: user.subscriptionStatus,
    plan: user.subscriptionPlan,
    hasStripeCustomer: !!user.stripeCustomerId,
  });
}
