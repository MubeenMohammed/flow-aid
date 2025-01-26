import React, { useEffect, useState, useRef, useCallback } from "react";

// Define message and user interfaces for type safety
interface User {
  id: string;
  name: string;
}

interface Message {
  id: string;
  text: string;
  user: User;
  timestamp: number;
}

const PatientChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [connectionStatus, setConnectionStatus] = useState<
    "connecting" | "connected" | "disconnected"
  >("connecting");
  const ws = useRef<WebSocket | null>(null);

  // Current user - in a real app, this would come from authentication
  const currentUser: User = {
    id: "user_" + Math.random().toString(36).substr(2, 9),
    name: "Patient",
  };

  const connectWebSocket = useCallback(() => {
    // Replace with your actual WebSocket server URL
    const wsUrl =
      "ws://1457-142-157-232-12.ngrok-free.app/messages/Test%20Room";

    ws.current = new WebSocket(wsUrl);
    setConnectionStatus("connecting");

    ws.current.onopen = () => {
      setConnectionStatus("connected");
      console.log("WebSocket connection established");
    };

    ws.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        const incomingMessage: Message = {
          id: data.id || Date.now().toString(),
          text: data.text,
          user: data.user || {
            id: "unknown",
            name: "Unknown User",
          },
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, incomingMessage]);
      } catch (error) {
        console.error("Error parsing message:", error);
      }
    };

    ws.current.onclose = () => {
      setConnectionStatus("disconnected");
      console.log("WebSocket connection closed");
      // Attempt reconnection after a delay
      setTimeout(connectWebSocket, 3000);
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
      setConnectionStatus("disconnected");
    };
  }, []);

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (ws.current?.readyState === WebSocket.OPEN) {
        ws.current.close();
      }
    };
  }, [connectWebSocket]);

  const sendMessage = () => {
    if (!inputValue.trim()) return;

    if (ws.current?.readyState === WebSocket.OPEN) {
      const message: Message = {
        id: Date.now().toString(),
        text: inputValue,
        user: currentUser,
        timestamp: Date.now(),
      };

      ws.current.send(JSON.stringify(message));
      setMessages((prev) => [...prev, message]);
      setInputValue("");
    }
  };

  return (
    <div className="flex flex-col h-full max-w-md mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
      {/* Connection Status */}
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
          ? "Connected"
          : connectionStatus === "connecting"
          ? "Connecting..."
          : "Disconnected - Reconnecting"}
      </div>

      {/* Message List */}
      <div className="flex-grow overflow-y-auto p-4 space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.user?.id === currentUser.id
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] px-3 py-2 rounded-lg ${
                message.user?.id === currentUser.id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <small
                className={`block text-xs mt-1 ${
                  message.user?.id === currentUser.id
                    ? "text-blue-100"
                    : "text-gray-500"
                }`}
              >
                {message.user?.name || "Unknown User"}
              </small>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
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

export default PatientChat;
