import { NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";
import OpenAI from "openai";
import { connectDB } from "@/lib/db/client";
import { ChatHistory } from "@/lib/db/models/chat-history.model";
import { apiSuccess, apiError } from "@/lib/utils/api";
import { getChatKitConfig } from "@/lib/config/loader";

// ─── ChatKit API Route ─────────────────────────────────────────
// Uses GPT-5 Responses API (NOT Chat Completions).
// Agent persona, model, and guardrails loaded from MongoDB config.
// ────────────────────────────────────────────────────────────────

function getOpenAI() {
  return new OpenAI();
}

export async function POST(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) return apiError("Unauthorized", 401);
  await connectDB();
  const chatkitConfig = await getChatKitConfig();
  const body = await request.json();
  const { message, previousResponseId } = body;
  if (!message || typeof message !== "string") {
    return apiError("Message is required", 400);
  }
  try {
    const response = await getOpenAI().responses.create({
      model: chatkitConfig.agent.model,
      input: message,
      instructions: chatkitConfig.agent.systemPrompt,
      ...(previousResponseId ? { previous_response_id: previousResponseId } : {}),
      reasoning: chatkitConfig.agent.reasoning,
    });
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
