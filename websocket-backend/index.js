const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const rooms = new Map();

io.on("connection", (socket) => {
  let currentRoom = null;

  socket.on("joinRoom", (roomName) => {
    if (currentRoom) {
      socket.leave(currentRoom);
      rooms.get(currentRoom)?.delete(socket.id);
    }

    socket.join(roomName);
    currentRoom = roomName;

    if (!rooms.has(roomName)) {
      rooms.set(roomName, new Set());
    }
    rooms.get(roomName).add(socket.id);

    io.to(roomName).emit("userJoined", {
      userId: socket.id,
      userCount: rooms.get(roomName).size,
    });
  });

  socket.on("chatMessage", (message) => {
    if (currentRoom) {
      io.to(currentRoom).emit("message", {
        userId: socket.id,
        username: message.username,
        text: message.text,
        timestamp: new Date().toISOString(),
      });
    }
  });

  socket.on("typing", (isTyping) => {
    if (currentRoom) {
      socket.to(currentRoom).emit("userTyping", {
        userId: socket.id,
        isTyping,
      });
    }
  });

  socket.on("disconnect", () => {
    if (currentRoom) {
      rooms.get(currentRoom)?.delete(socket.id);
      io.to(currentRoom).emit("userLeft", {
        userId: socket.id,
        userCount: rooms.get(currentRoom)?.size || 0,
      });
    }
  });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`WebSocket server running on port ${PORT}`);
});
