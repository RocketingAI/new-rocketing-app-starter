"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, Loader2 } from "lucide-react";
import { useChatKitConfig } from "@/lib/config/config-context";
import { cn } from "@/lib/utils/cn";

// ─── ChatKit UI ────────────────────────────────────────────────
// Functional chat component that calls /api/chat (GPT-5 Responses API).
// All copy and behavior driven by chatkit config from MongoDB.
// ────────────────────────────────────────────────────────────────

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function ChatPanel() {
  const chatkitConfig = useChatKitConfig();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [lastResponseId, setLastResponseId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          previousResponseId: lastResponseId,
        }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.data.message },
        ]);
        setLastResponseId(data.data.responseId);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: chatkitConfig.errorText },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: chatkitConfig.errorText },
      ]);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex h-full flex-col rounded-lg border border-border/40 bg-card">
      <div className="flex items-center gap-2 border-b border-border/40 px-4 py-3">
        <MessageSquare className="h-4 w-4 text-primary" />
        <span className="text-sm font-medium">{chatkitConfig.agentName}</span>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
            <div className="rounded-full bg-primary/10 p-4">
              <MessageSquare className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">{chatkitConfig.agentName}</h3>
            <p className="max-w-sm text-sm text-muted-foreground">
              {chatkitConfig.emptyStateText}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={cn(
                  "flex",
                  msg.role === "user" ? "justify-end" : "justify-start",
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg px-4 py-2 text-sm",
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground",
                  )}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="rounded-lg bg-muted px-4 py-2">
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      <div className="border-t border-border/40 p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={chatkitConfig.placeholder}
            className="flex-1 rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
