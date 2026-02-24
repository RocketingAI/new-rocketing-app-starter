// Chat history model — stores conversation turns for ChatKit.
// Used for persistence and multi-turn context via previous_response_id.

import mongoose, { Schema, type Document } from "mongoose";

export interface IChatHistory extends Document {
  userId: string;
  userMessage: string;
  assistantMessage: string;
  responseId: string;
  previousResponseId: string | null;
  createdAt: Date;
}

const ChatHistorySchema = new Schema<IChatHistory>(
  {
    userId: { type: String, required: true, index: true },
    userMessage: { type: String, required: true },
    assistantMessage: { type: String, required: true },
    responseId: { type: String, required: true },
    previousResponseId: { type: String, default: null },
  },
  { timestamps: true },
);

ChatHistorySchema.index({ userId: 1, createdAt: -1 });

export const ChatHistory =
  mongoose.models.ChatHistory ||
  mongoose.model<IChatHistory>("ChatHistory", ChatHistorySchema);
