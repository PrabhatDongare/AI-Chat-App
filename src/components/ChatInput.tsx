import { useRef, useState } from "react";
import { FiSend } from "react-icons/fi";
import { useChat } from "../hooks/useChat";
import { sendUserMessage } from "../context/chatActions";
import type { Message } from "../types/chat";

interface ChatInputProps {
  sessionId: string;
  messages: Message[];
}

const ChatInput = ({ sessionId, messages }: ChatInputProps) => {
  const { dispatch } = useChat();

  const [text, setText] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    if (!text.trim()) return;
    if (isSending) return;

    setIsSending(true);

    await sendUserMessage(dispatch, sessionId, text, messages);

    setText("");
    setIsSending(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Shift + Enter = new line
    if (e.key === "Enter" && e.shiftKey) {
      return;
    }

    // Enter = send
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  // adjust text size
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const adjustHeight = () => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = "auto"; // Reset
    el.style.height = Math.min(el.scrollHeight, 80) + "px";
  };

  return (
    <section className="w-[90%] md:w-[70%] lg:w-[50%] max-w-3xl">
      <div className="flex items-center justify-between rounded-xl border border-[#424242] bg-[#303030] px-5 py-2">
        <textarea
          ref={textareaRef}
          className="w-full resize-none bg-transparent py-1 text-sm outline-none overflow-hidden transition-all duration-150 ease-in-out"
          rows={1}
          placeholder="Ask Gemini..."
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            adjustHeight();
          }}
          onKeyDown={handleKeyDown}
          disabled={isSending}
        />


        <button
          type="button"
          onClick={handleSend}
          disabled={isSending || !text.trim()}
          className={`rounded-full p-1.5 transition-colors ${isSending || !text.trim()
            ? "bg-[#555] cursor-not-allowed"
            : "bg-[#424242] hover:bg-[#555]"
            }`}
        >
          <FiSend />
        </button>
      </div>

      <p className="pt-1 text-center text-xs text-gray-400">
        Gemini can make mistakes. Check important info. <u>See Cookie Preferences</u>.
      </p>
    </section>
  );
};

export default ChatInput;
