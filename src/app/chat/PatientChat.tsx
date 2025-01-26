import React, { useEffect, useState } from "react";
import io from "socket.io-client";

interface User {
  id: string;
  name: string;
}

interface Message {
  userId: string;
  username: string;
  text: string;
  timestamp: string;
}

const SOCKET_URL = "http://localhost:3000";

const ChatComponent: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [socket, setSocket] = useState<any>(null);
  const [connectionStatus, setConnectionStatus] = useState<
    "connecting" | "connected" | "disconnected"
  >("connecting");
  const [room, setRoom] = useState<string>("default-room");

  const currentUser: User = {
    id: `user_${Math.random().toString(36).substr(2, 9)}`,
    name: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") as string).name
      : "Patient",
  };

  useEffect(() => {
    const newSocket = io(SOCKET_URL);

    newSocket.on("connect", () => {
      setConnectionStatus("connected");
      newSocket.emit("joinRoom", room);
    });

    newSocket.on("disconnect", () => {
      setConnectionStatus("disconnected");
    });

    newSocket.on("message", (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    newSocket.on(
      "userJoined",
      (data: { userId: string; userCount: number }) => {
        console.log(
          `User ${data.userId} joined. Users in room: ${data.userCount}`
        );
      }
    );

    newSocket.on("userLeft", (data: { userId: string; userCount: number }) => {
      console.log(`User ${data.userId} left. Users in room: ${data.userCount}`);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [room]);

  const sendMessage = () => {
    if (!inputValue.trim() || !socket) return;

    const username = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") as string).name
      : "Patient";

    socket.emit("chatMessage", { text: inputValue, username });
    setInputValue("");
  };

  return (
    <div className="flex flex-col h-full mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
      <div
        className={`p-2 text-center text-sm ${
          connectionStatus === "connected"
            ? "bg-green-100 text-green-800"
            : connectionStatus === "connecting"
            ? "bg-yellow-100 text-yellow-800"
            : "bg-red-100 text-red-800"
        }`}
      >
        {connectionStatus === "connected"
          ? `Connected to ${room}`
          : connectionStatus === "connecting"
          ? "Connecting..."
          : "Disconnected"}
      </div>

      <div className="flex-grow overflow-y-auto p-4 space-y-3">
        {messages.map((message) => (
          <div
            key={message.timestamp}
            className={`flex ${
              message.username === currentUser.name
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] px-3 py-2 rounded-lg ${
                message.userId === currentUser.id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <small
                className={`block text-xs mt-1 ${
                  message.userId === currentUser.id
                    ? "text-blue-100"
                    : "text-gray-500"
                }`}
              >
                {message.username} •{" "}
                {new Date(message.timestamp).toLocaleTimeString()}
              </small>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t flex items-center">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
          disabled={connectionStatus !== "connected"}
          className="flex-grow mr-2 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={sendMessage}
          disabled={!inputValue.trim() || connectionStatus !== "connected"}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
