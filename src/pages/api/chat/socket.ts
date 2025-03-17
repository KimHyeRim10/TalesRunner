import { Server as IOServer } from "socket.io";
import { NextApiRequest, NextApiResponse } from "next";
import { Server as HTTPServer } from "http";

type ExtendedResponse = NextApiResponse & {
  socket: {
    server: HTTPServer & {
      io?: IOServer;
    };
  };
};

let io: IOServer;

export default function handler(req: NextApiRequest, res: ExtendedResponse) {
  if (!res.socket.server.io) {
    console.log("Socket.IO server initializing...");
    io = new IOServer(res.socket.server, {
      path: "/api/chat/socket",
      cors: {
        origin: [
          "http://localhost:3000",
          "https://talesrunner-1220.vercel.app",
        ],
        methods: ["GET", "POST"],
      },
    });
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("A user connected:", socket.id);

      const nickname = socket.handshake.query.nickname || "익명";
      console.log(`${nickname} connected`);

      io.emit("login", `${nickname} 님이 입장하셨습니다.`);

      socket.on("chat message", (chatmessage) => {
        io.emit("chat message", chatmessage);
      });

      socket.on("disconnect", () => {
        console.log("A user disconnected:", socket.id);
      });
    });
  }

  res.end();
}
