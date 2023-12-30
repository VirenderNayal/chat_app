import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import "./App.css"
import Room from "./pages/Room";
import { SocketProvider } from "./providers/Socket";
import Chat from "./pages/Chat";
import { PeerProvider } from "./providers/Peer";

function App() {
  return (
    <BrowserRouter>
      <SocketProvider>
        <PeerProvider>
          <Routes>
            <Route path="/" element={<Room />} />
            {/* <Route path="/chat" element={<Room />} /> */}
            <Route path="/chat/:roomId" element={<Chat />} />
          </Routes>
        </PeerProvider>
      </SocketProvider>
    </BrowserRouter>
  );
}

export default App;
