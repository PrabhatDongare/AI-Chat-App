import { useEffect, useRef } from "react";
import UserMessageItem from "./UserMessageItem";
import AgentMessageItem from "./AgentMessageItem";
import { type Message } from "../types/chat";
import { LuBadgeHelp } from "react-icons/lu";
import { retryAssistantMessage } from "../context/chatActions";
import { useChat } from "../hooks/useChat";

interface MessageListProps {
  messages: Message[];
}

const MessageList = ({ messages }: MessageListProps) => {
  const { state, dispatch } = useChat();
  const sessionId = state.activeSessionId;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  // Scroll to the *start* of the user's newest message
  useEffect(() => {
    if (lastMessageRef.current && containerRef.current) {
      lastMessageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [messages]);

  // If empty → show centered placeholder
  if (messages.length === 0) {
    return (
      <div className="flex h-full gap-3 items-center justify-center">
        <LuBadgeHelp className="text-4xl" />
        <p className="text-4xl">
          What can I help with?
        </p>
      </div>
    );
  }
  if (!sessionId) return null;

  return (
    <div
      ref={containerRef}
      className="flex flex-col gap-7 items-center overflow-y-auto h-full px-2"
    >
      {messages.map((msg, index) => {
        const isLast = index === messages.length - 2;

        return (
          <div
            key={msg.id}
            ref={isLast ? lastMessageRef : null}
            className="w-full flex justify-center"
          >
            {msg.role === "user" ? (
              <UserMessageItem message={msg} />
            ) : (
              <AgentMessageItem message={msg} onRetry={(msgId) => retryAssistantMessage(dispatch, sessionId, msgId, messages)}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
