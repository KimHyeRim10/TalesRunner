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
        origin: "http://localhost:3000", // 클라이언트 URL
        methods: ["GET", "POST"],
      },
    });
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("A user connected:", socket.id);

      // 전송된 객체 채팅메시지 처리
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
