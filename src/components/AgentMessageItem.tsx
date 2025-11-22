import { IoReloadOutline } from "react-icons/io5";
import { type Message } from "../types/chat";
import MarkdownRenderer from "./MarkdownRenderer";

interface Props {
  message: Message;
  onRetry: (id: string) => void;
}


const AgentMessageItem = ({ message, onRetry }: Props) => {

  // Different UI based on status
  const isPending = message.status === "pending";
  const isFailed = message.status === "failed";

  return (
    <div className="flex w-full lg:w-[70%] ">
      <div className="rounded-2xl px-4 py-2">

        {/* pending typing indicator */}
        {isPending && (
          <p className="text-gray-200 text-base animate-pulse px-2 py-1.5 rounded-xl ">typing .....</p>
        )}

        {/* failed
        {isFailed && (
          <span className="text-red-400 italic">Failed to respond</span>
        )} */}

        {/* normal text */}
        {!isPending && !isFailed && (
          <MarkdownRenderer text={message.text} />
        )}
        {isFailed && (
          <div className="flex gap-5 items-center">
            <span className="text-red-400 italic">Failed to respond</span>
            <button
              onClick={() => onRetry(message.id)}
              className="text-md px-1.5 py-1.5 rounded-full hover:bg-[#505050] transition"
            >
              <IoReloadOutline />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default AgentMessageItem;
