import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import "./App.css"
import Room from "./pages/Room";
import { SocketProvider } from "./providers/Socket";
import ChatPage from "./pages/ChatPage";
import { PeerProvider } from "./providers/Peer";
import ChatProvider from "./providers/Chat";

function App() {
  return (
    <BrowserRouter>
      <SocketProvider>
        <PeerProvider>
          <ChatProvider>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/chat" element={<Room />} />
              <Route path="/chat/:roomId" element={<ChatPage />} />
            </Routes>
          </ChatProvider>
        </PeerProvider>
      </SocketProvider>
    </BrowserRouter>
  );
}

export default App;
