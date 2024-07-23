import { useState } from "react";
import { auth } from "../firebase";
import Edit from "../components/Edit";

const Messages = ({ msg }) => {
  const [hover, setHover] = useState(false);
  const isCurrentUser = auth.currentUser?.uid === msg.author.id;
  return isCurrentUser ? (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="msg-user"
    >
      <p>{msg.text}</p>
      {hover && (
        <div className="dropdown">
          <Edit msg={msg} />
        </div>
      )}
    </div>
  ) : (
    <div
      className="msg-other"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="user-info">
        <img
          src={msg.author.photo !== null && msg.author?.photo}
          alt="profile photo"
        />
        <span>{msg.author?.name || "Unknown"}</span>
      </div>
      <p className="msg-text">{msg.text}</p>
    </div>
  );
};

export default Messages;
