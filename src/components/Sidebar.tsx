import { FaEdit, FaPlus } from 'react-icons/fa';
import { useChat } from "../hooks/useChat";
import { createSession, setActiveSession, editSessionTitle, deleteSession } from "../context/chatActions";
import type { ChatSession } from '../types/chat';
import { useState } from "react";
import { MdDelete } from 'react-icons/md';
import { RxHamburgerMenu } from 'react-icons/rx';

const Sidebar = () => {
  const { state, dispatch } = useChat();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>("");
  const [inputError, setInputError] = useState(false);
  const [showOptions, setShowOptions] = useState<string | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleNewChat = () => {
    createSession(dispatch);
  };

  const handleSelectChat = (id: string) => {
    setActiveSession(dispatch, id);
  };

  const handleEditClick = (session: ChatSession) => {
    setEditingId(session.id);
    setEditValue(session.title);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value);
  };

  const handleEditSave = (id: string) => {
    const trimmed = editValue.trim();
    if (trimmed.length < 1 || trimmed.length > 24) {
      setInputError(true);
      setTimeout(() => setInputError(false), 500); // Remove shake after 0.5s
      return;
    }
    editSessionTitle(dispatch, id, trimmed);
    setEditingId(null);
    setInputError(false);
  };

  const handleDelete = (id: string) => {
    deleteSession(dispatch, id);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed mt-4.5 mx-3 z-30 text-2xl"
      >
        <RxHamburgerMenu />
      </button>

      {/* BACKDROP OVERLAY (Mobile Only) */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-black/10 bg-opacity-30 backdrop-blur-xs lg:hidden z-30"
        />
      )}


      <nav
        className={`h-full bg-[#181818] w-64 flex flex-col items-center transition-transform duration-300
    fixed lg:static top-0 left-0 z-40 py-4 ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} `}
        aria-label="Chat rooms navigation"
      >
        {/* NEW CHAT BUTTON */}
        <button
          type="button"
          onClick={handleNewChat}
          className="mb-6 flex w-[90%] cursor-pointer items-center justify-center gap-3 rounded-lg bg-white py-1 text-black transition-colors hover:bg-[#f6f6f6]"
          aria-label="Create new chat"
        >
          <FaPlus aria-hidden="true" />
          <span>New Chat</span>
        </button>

        {/* CHAT LIST */}
        <section className=" w-full" aria-label="Chat rooms list">
          <div className="flex max-h-[87vh] flex-col gap-1 overflow-y-auto px-3">
            {state.sessions.map((session: ChatSession) => (
              <div
                key={session.id}
                className={`flex rounded-lg ${state.activeSessionId === session.id ? "bg-[#242424]" : ""
                  } text-sm hover:bg-[#2a2a2a]`}
                onMouseEnter={() => setShowOptions(session.id)}
                onMouseLeave={() => setShowOptions(null)}
              >
                {/* CHAT TITLE OR EDIT INPUT */}
                {editingId === session.id ? (
                  <input
                    className={`w-full rounded-l-lg py-2 pl-3 text transition-all duration-150 ${inputError ? "animate-shake border-red-500" : ""} focus:border-none outline-none`}
                    value={editValue}
                    onChange={handleEditChange}
                    onBlur={() => handleEditSave(session.id)}
                    onKeyDown={e => {
                      if (e.key === "Enter") handleEditSave(session.id);
                    }}
                    maxLength={24}
                    minLength={1}
                    autoFocus
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => handleSelectChat(session.id)}
                    className="flex-1 overflow-x-hidden rounded-l-lg py-2 pl-3 text-start"
                  >
                    {session.title}
                  </button>
                )}

                {/* OPTIONS BUTTONS - SHOW ON HOVER */}
                {showOptions === session.id && (
                  <div className="flex w-[30%] text-lg">
                    <button
                      type="button"
                      className="w-1/2 rounded-none hover:cursor-pointer hover:bg-[#3a3a3a]"
                      aria-label={`Edit ${session.title}`}
                      onClick={() => handleEditClick(session)}
                    >
                      <FaEdit className='mx-auto' />
                    </button>
                    <button
                      type="button"
                      className="w-1/2 rounded-r-lg hover:cursor-pointer hover:bg-[#3a3a3a]"
                      aria-label={`Delete ${session.title}`}
                      onClick={() => handleDelete(session.id)}
                    >
                      <MdDelete className='mx-auto' />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </nav>
    </>
  );
};

export default Sidebar;
