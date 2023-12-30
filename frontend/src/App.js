import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import "./App.css"
import Room from "./pages/Room";
import { SocketProvider } from "./providers/Socket";

function App() {
  return (
    <BrowserRouter>
      <SocketProvider>
        <Routes>
          <Route path="/" element={<Room />} />
        </Routes>
      </SocketProvider>
    </BrowserRouter>
  );
}

export default App;
