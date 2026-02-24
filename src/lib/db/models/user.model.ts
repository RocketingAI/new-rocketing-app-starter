// User model — synced from Clerk webhooks.
// Stores Clerk user data locally for DB relationships.

import mongoose, { Schema, type Document } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  imageUrl: string | null;
  subscriptionStatus: "free" | "trialing" | "active" | "past_due" | "canceled";
  subscriptionPlan: string | null;
  stripeCustomerId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    clerkId: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true },
    firstName: { type: String, default: null },
    lastName: { type: String, default: null },
    imageUrl: { type: String, default: null },
    subscriptionStatus: {
      type: String,
      enum: ["free", "trialing", "active", "past_due", "canceled"],
      default: "free",
    },
    subscriptionPlan: { type: String, default: null },
    stripeCustomerId: { type: String, default: null },
  },
  { timestamps: true },
);

export const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
