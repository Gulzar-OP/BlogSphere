import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
  if (io) return io; // prevent double init

  io = new Server(server, {
    cors: {
      origin: [
        "https://blog-app-giqg.vercel.app",
        "http://localhost:5173",
        "http://localhost:5174",
      ],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    // console.log("New client connected:", socket.id);
    socket.on("disconnect", () => {
      // console.log("Client disconnected:", socket.id);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};
