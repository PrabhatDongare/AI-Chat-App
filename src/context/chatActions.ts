import { v4 as uuid } from "uuid";
import { type ChatAction } from "./chatReducer";
import { type Message } from "../types/chat";
import { askGemini, buildLLMRequest } from "../utils/api";
import { isStorageAvailable } from "../utils/storage";

export function createSession(dispatch: React.Dispatch<ChatAction>) {
    dispatch({ type: "CREATE_SESSION" });
}

export function setActiveSession(dispatch: React.Dispatch<ChatAction>, sessionId: string) {
    dispatch({ type: "SET_ACTIVE_SESSION", sessionId });
}

export async function sendUserMessage(
    dispatch: React.Dispatch<ChatAction>,
    sessionId: string,
    text: string,
    historyMessages: Message[]
) {
    // Check localStorage quota BEFORE doing anything
    if (!isStorageAvailable()) {
        console.error("LocalStorage is full — clear space to continue.");
        return;
    }

    // Add user's message to UI immediately
    dispatch({
        type: "ADD_USER_MESSAGE",
        sessionId,
        text,
    });

    //  Create a pending assistant message (typing indicator)
    const pendingId = uuid();

    dispatch({
        type: "ADD_PENDING_ASSISTANT_MESSAGE",
        sessionId,
        messageId: pendingId,
    });

    // Call Gemini API via backend
    const formattedInput = buildLLMRequest(historyMessages, text);
    console.log("reached here")
    const result = await askGemini(formattedInput);

    // const result = await askGemini(messagesForGemini);

    if (!result.ok) {
        // Failure → update pending message to failed
        dispatch({
            type: "MARK_ASSISTANT_FAILED",
            sessionId,
            messageId: pendingId,
        });
        return;
    }

    // Success → replace pending with actual assistant reply test
    dispatch({
        type: "REPLACE_PENDING_MESSAGE",
        sessionId,
        messageId: pendingId,
        text: result.text ?? "",
    });
}

export function editSessionTitle(dispatch: React.Dispatch<ChatAction>, sessionId: string, title: string) {
    dispatch({ type: "EDIT_SESSION_TITLE", sessionId, title });
}

export function deleteSession(dispatch: React.Dispatch<ChatAction>, sessionId: string) {
    dispatch({ type: "DELETE_SESSION", sessionId });
}


export async function retryAssistantMessage(
    dispatch: React.Dispatch<ChatAction>,
    sessionId: string,
    messageId: string,
    messages: Message[]
) {
    // Mark message as pending
    dispatch({
        type: "RETRY_ASSISTANT_MESSAGE",
        sessionId,
        messageId,
    });

    // Build LLM request using history
    const formatted = buildLLMRequest(messages, messages[messages.length - 2].text);

    // Call model again
    const result = await askGemini(formatted);

    if (!result.ok || result === null) {
        dispatch({
            type: "MARK_ASSISTANT_FAILED",
            sessionId,
            messageId,
        });
        return;
    }

    // Replace with updated assistant text
    dispatch({
        type: "REPLACE_PENDING_MESSAGE",
        sessionId,
        messageId,
        text: result.text ?? "",
    });
}
