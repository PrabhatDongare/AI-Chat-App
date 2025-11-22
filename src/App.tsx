import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import { ChatProvider } from "./context/ChatProvider";

function App() {
  return (
    <ChatProvider>
      <main className="flex h-screen bg-[#212121] text-white">
        <aside aria-label="Sidebar" className="lg:w-1/6 bg-[#181818]">
          <Sidebar />
        </aside>

        <section aria-label="Chat window" className="flex-1 pt-4 pb-2">
          <ChatWindow />
        </section>
      </main>
    </ChatProvider>
  );
}

export default App;
