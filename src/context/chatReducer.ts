import type { ChatState, ChatSession, Message } from "../types/chat";
import { v4 as uuid } from "uuid";

export type ChatAction =
    | { type: "CREATE_SESSION" }
    | { type: "SET_ACTIVE_SESSION"; sessionId: string }
    | { type: "ADD_USER_MESSAGE"; sessionId: string; text: string }
    | { type: "ADD_ASSISTANT_MESSAGE"; sessionId: string; text: string }
    | { type: "ADD_PENDING_ASSISTANT_MESSAGE"; sessionId: string; messageId: string }
    | { type: "MARK_ASSISTANT_FAILED"; sessionId: string; messageId: string }
    | { type: "REPLACE_PENDING_MESSAGE"; sessionId: string; messageId: string; text: string }
    | { type: "EDIT_SESSION_TITLE"; sessionId: string; title: string }
    | { type: "DELETE_SESSION"; sessionId: string }
    | { type: "RETRY_ASSISTANT_MESSAGE"; sessionId: string; messageId: string };

export function chatReducer(state: ChatState, action: ChatAction): ChatState {
    switch (action.type) {

        // --------------------------------------------------
        // CREATE A NEW CHAT SESSION
        // --------------------------------------------------
        case "CREATE_SESSION": {
            const id = uuid();
            const now = new Date().toISOString();

            const newSession: ChatSession = {
                id,
                title: "New Chat",
                createdAt: now,
                updatedAt: now,
                messages: [],
            };

            return {
                ...state,
                sessions: [...state.sessions, newSession],
                activeSessionId: id,
            };
        }

        // --------------------------------------------------
        // SET ACTIVE SESSION
        // --------------------------------------------------
        case "SET_ACTIVE_SESSION": {
            return {
                ...state,
                activeSessionId: action.sessionId,
            };
        }

        // --------------------------------------------------
        // ADD USER MESSAGE
        // --------------------------------------------------
        case "ADD_USER_MESSAGE": {
            const now = new Date().toISOString();

            const newMessage: Message = {
                id: uuid(),
                role: "user",
                text: action.text,
                createdAt: now,
                status: "sent",
            };

            return {
                ...state,
                sessions: state.sessions.map((s) =>
                    s.id === action.sessionId
                        ? {
                            ...s,
                            updatedAt: now,
                            messages: [...s.messages, newMessage],
                        }
                        : s
                ),
            };
        }

        // --------------------------------------------------
        // CREATE PENDING ASSISTANT MESSAGE
        // (for the typing indicator)
        // --------------------------------------------------
        case "ADD_PENDING_ASSISTANT_MESSAGE": {
            const now = new Date().toISOString();

            const pendingMessage: Message = {
                id: action.messageId,
                role: "assistant",
                text: "",
                createdAt: now,
                status: "pending",
            };

            return {
                ...state,
                sessions: state.sessions.map((s) =>
                    s.id === action.sessionId
                        ? {
                            ...s,
                            updatedAt: now,
                            messages: [...s.messages, pendingMessage],
                        }
                        : s
                ),
            };
        }

        // --------------------------------------------------
        // REPLACE PENDING ASSISTANT MESSAGE WITH FINAL TEXT
        // --------------------------------------------------
        case "REPLACE_PENDING_MESSAGE": {
            return {
                ...state,
                sessions: state.sessions.map((s) =>
                    s.id === action.sessionId
                        ? {
                            ...s,
                            messages: s.messages.map((m) =>
                                m.id === action.messageId
                                    ? { ...m, text: action.text, status: "received" }
                                    : m
                            ),
                        }
                        : s
                ),
            };
        }

        // --------------------------------------------------
        // MARK ASSISTANT MESSAGE AS FAILED
        // --------------------------------------------------
        case "MARK_ASSISTANT_FAILED": {
            return {
                ...state,
                sessions: state.sessions.map((s) =>
                    s.id === action.sessionId
                        ? {
                            ...s,
                            messages: s.messages.map((m) =>
                                m.id === action.messageId
                                    ? { ...m, text: "Failed to respond", status: "failed" }
                                    : m
                            ),
                        }
                        : s
                ),
            };
        }

        // --------------------------------------------------
        // EDIT SESSION TITLE
        // --------------------------------------------------
        case "EDIT_SESSION_TITLE": {
            return {
                ...state,
                sessions: state.sessions.map((s) =>
                    s.id === action.sessionId
                        ? { ...s, title: action.title, updatedAt: new Date().toISOString() }
                        : s
                ),
            };
        }

        // --------------------------------------------------
        // DELETE SESSION
        // --------------------------------------------------
        case "DELETE_SESSION": {
            const filtered = state.sessions.filter((s) => s.id !== action.sessionId);
            const newActiveId = filtered.length
            ? filtered[filtered.length - 1].id
                : null;
            return {
                ...state,
                sessions: filtered,
                activeSessionId: newActiveId,
            };
        }
        
        // --------------------------------------------------
        // RETRY ON FAILURE
        // --------------------------------------------------
        case "RETRY_ASSISTANT_MESSAGE": {
            return {
                ...state,
                sessions: state.sessions.map((s) =>
                    s.id === action.sessionId
                        ? {
                            ...s,
                            messages: s.messages.map((m) =>
                                m.id === action.messageId
                                    ? { ...m, status: "pending" }
                                    : m
                            ),
                        }
                        : s
                ),
            };
        }


        default:
            return state;
    }
}
