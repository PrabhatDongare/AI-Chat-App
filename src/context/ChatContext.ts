import { createContext } from "react";
import { type ChatState } from "../types/chat";
import type { ChatAction } from "./chatReducer";

export const ChatContext = createContext<{
    state: ChatState;
    dispatch: React.Dispatch<ChatAction>;
} | null>(null);
