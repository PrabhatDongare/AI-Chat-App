import MessageList from './MessageList';
import ChatInput from './ChatInput';
import { CiExport } from 'react-icons/ci';
import { useChat } from "../hooks/useChat";
import { LuBotMessageSquare } from 'react-icons/lu';

const ChatWindow = () => {
  const { state } = useChat();

  // Find active session
  const activeSession = state.sessions.find(
    (s) => s.id === state.activeSessionId
  );

  // If no active session → show placeholder
  if (!activeSession) {
    return (
      <div className="flex flex-col h-full items-center justify-center text-gray-400">
        <LuBotMessageSquare className='text-7xl' />
        <p>Select or create a chat from the sidebar.</p>
      </div>
    );
  }

  // Export chat in json format
  const handleExport = () => {
    const json = JSON.stringify(activeSession, null, 2);

    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${activeSession.title || "session chat"}.json`;
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex h-full flex-col">
      {/* Chatroom header */}
      <header className="flex items-center justify-between border-b-2 border-[#2c2c2c] lg:px-6 pl-12 pr-6 pb-4 ">
        <h1 className="text-xl font-semibold ">
          {activeSession.title}
        </h1>

        {activeSession.messages.length > 0 && (
          <button
            type="button"
            onClick={handleExport}
            className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1 transition-colors hover:bg-white hover:text-black"
            aria-label="Export chat"
          >
            <CiExport aria-hidden="true" />
            <span>Export</span>
          </button>
        )}

      </header>

      {/* MESSAGE LIST + INPUT */}
      <div className="flex flex-1 flex-col overflow-hidden pt-2">

        <div className="w-full flex-1 overflow-y-auto">
          <MessageList messages={activeSession.messages} />
        </div>

        <div className="flex w-full justify-center">
          <ChatInput
            sessionId={activeSession.id}
            messages={activeSession.messages}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
