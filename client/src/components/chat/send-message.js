import React, { useState } from "react";

import styles from "./styles.module.css";

import { IoMdSend } from "react-icons/io";
import RoomAndUsers from "./room-and-user";

const SendMessage = ({ socket, username, room }) => {
  const [message, setMessage] = useState("");
  const sendMessage = () => {
    if (message !== "") {
      const createdAt = Date.now();
      // Send message to server. We can't specify who we send the message to from the frontend. We can only send to server. Server can then send message to rest of users in room
      socket.emit("send_message", { username, room, message, createdAt });
      setMessage("");
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };
  return (
    <div className={styles.sendMessageContainer}>
      <input
        className={styles.messageInput}
        placeholder="Message..."
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        onKeyPress={(e) => handleKeyPress(e)}
      />
      <button className={styles.btn} onClick={sendMessage} title="Send Message">
        <span className={styles.sendbutton}>
          <IoMdSend />
        </span>
      </button>
      <RoomAndUsers socket={socket} username={username} room={room} />
    </div>
  );
};

export default SendMessage;
