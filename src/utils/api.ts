import type { RawMessage } from "../types/chat";
import { GoogleGenAI } from "@google/genai";

const SYSTEM_PROMPT = `
You are a helpful assistant. 
Your job is to answer users questions and most responses should be 5–10 lines. 
Only if the user explicitly asks for a long answer, respond in 20–30 lines.
`;

export function buildLLMRequest(historyMessages: RawMessage[], newUserMessage: string) {
  const MAX_PAIRS = 5;

  // Convert messages to a clean role/text format if needed
  const formattedMessages = historyMessages.map(m => ({
    role: m.role,
    text: m.text.trim(),
  }));

  // Last 5 user-assistant pairs (max 10 messages)
  const trimmed = formattedMessages.slice(-(MAX_PAIRS * 2));

  // Add the latest user input
  trimmed.push({ role: "user", text: newUserMessage.trim() });

  // Return final payload
  return {
    system: SYSTEM_PROMPT,
    messages: trimmed,
  };
}

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function askGemini(messages: object) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: JSON.stringify(messages),
    });
    return { "ok": true, "text": response.text, "error": undefined }

  } catch (error) {
    return {
      "ok": false, "text": "", "error": error.message
    }
  }

}

