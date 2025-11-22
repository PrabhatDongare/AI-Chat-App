export type Role = "user" | "assistant";

export type RawMessage = { role: "user" | "assistant"; text: string };

export interface Message {
    id: string;
    role: Role;
    text: string;
    createdAt: string;
    status?: "sent" | "pending" | "failed" | "received";
}

export interface ChatSession {
    id: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    messages: Message[];
}

export interface ChatState {
    sessions: ChatSession[];
    activeSessionId: string | null;
}

export const DEFAULT_CHAT_STATE: ChatState = {
    sessions: [],
    activeSessionId: null,
};
