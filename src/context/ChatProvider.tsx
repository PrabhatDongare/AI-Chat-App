import { useReducer, useEffect } from "react";
import { ChatContext } from "./ChatContext";
import { chatReducer } from "./chatReducer";
import { loadChatState, saveChatState } from "../utils/storage";

export function ChatProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(chatReducer, {}, () => loadChatState());

    useEffect(() => {
        saveChatState(state);
    }, [state]);

    return (
        <ChatContext.Provider value={{ state, dispatch }}>
            {children}
        </ChatContext.Provider>
    );
}
