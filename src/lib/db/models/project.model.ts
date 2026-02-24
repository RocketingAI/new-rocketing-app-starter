// Example entity model — "Project"
// Agents should study this pattern, then create models for the target app's entities.

import mongoose, { Schema, type Document } from "mongoose";

export interface IProject extends Document {
  title: string;
  description: string | null;
  status: "draft" | "active" | "completed" | "archived";
  priority: "low" | "medium" | "high" | "urgent";
  dueDate: Date | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true, maxlength: 200 },
    description: { type: String, default: null },
    status: {
      type: String,
      enum: ["draft", "active", "completed", "archived"],
      default: "draft",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
    },
    dueDate: { type: Date, default: null },
    userId: { type: String, required: true, index: true },
  },
  { timestamps: true },
);

ProjectSchema.index({ userId: 1, status: 1 });
ProjectSchema.index({ userId: 1, createdAt: -1 });

export const Project =
  mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);
