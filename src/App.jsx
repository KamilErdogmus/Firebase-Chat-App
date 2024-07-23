import "./styles/style.scss";
import LoginPage from "./pages/LoginPage";
import { useState } from "react";
import RoomPage from "./pages/RoomPage";
import ChatPage from "./pages/ChatPage";

function App() {
  const [isAuth, setisAuth] = useState(localStorage.getItem("token"));
  const [room, setRoom] = useState(null);

  if (!isAuth) {
    return <LoginPage setisAuth={setisAuth} />;
  }

  return (
    <div className="container">
      {room ? (
        //* Oda seçildiyse
        <ChatPage room={room} setRoom={setRoom} />
      ) : (
        //? Oda seçilmediyse
        <RoomPage setisAuth={setisAuth} setRoom={setRoom} />
      )}
    </div>
  );
}

export default App;
