import { NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";
import OpenAI from "openai";
import { connectDB } from "@/lib/db/client";
import { ChatHistory } from "@/lib/db/models/chat-history.model";
import { apiSuccess, apiError } from "@/lib/utils/api";

// ─── ChatKit API Route ─────────────────────────────────────────
// Uses GPT-5 Responses API (NOT Chat Completions).
// System prompt is loaded from config — Phase 8 customizes it.
// ────────────────────────────────────────────────────────────────

// CUSTOMIZE: Replace with app-specific system prompt
const SYSTEM_PROMPT = `You are a helpful AI assistant. You help users with their questions and tasks. Be concise, friendly, and professional.`;

function getOpenAI() {
  return new OpenAI();
}

export async function POST(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) return apiError("Unauthorized", 401);
  await connectDB();
  const body = await request.json();
  const { message, previousResponseId } = body;
  if (!message || typeof message !== "string") {
    return apiError("Message is required", 400);
  }
  try {
    const response = await getOpenAI().responses.create({
      model: "gpt-5-mini",
      input: message,
      instructions: SYSTEM_PROMPT,
      ...(previousResponseId ? { previous_response_id: previousResponseId } : {}),
      reasoning: { effort: "low" },
    });
    // Save to chat history
    await ChatHistory.create({
      userId,
      userMessage: message,
      assistantMessage: response.output_text,
      responseId: response.id,
      previousResponseId: previousResponseId || null,
    });
    return apiSuccess({
      message: response.output_text,
      responseId: response.id,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return apiError("Failed to generate response", 500);
  }
}
