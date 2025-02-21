"use client";

import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import Image from "next/image";

type ChatMessage = {
  id: string;
  nickname: string;
  profileURL: string;
  message: string;
  timestamp: string;
};

export default function Chat() {
  const { user, profileURL } = useUser();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // 소켓 설정
  /*   const socket: Socket = io("http://localhost:3000", {
    path: "/api/chat/socket",
    query: { nickname: user?.nickname || "익명" },
  }); */

  /* 
   const SOCKET_URL =
    typeof window !== "undefined" &&
    window.location.origin.includes("talesrunner-1220.vercel.app")
      ? "wss://talesrunner-1220.vercel.app"
      : "ws://localhost:3000";

  const socket: Socket = io(SOCKET_URL, {
    path: "/api/chat/socket",
    query: { nickname: user?.nickname || "익명" },
  });
   */

  const SOCKET_URL =
    typeof window !== "undefined" &&
    window.location.origin.includes("talesrunner-1220.vercel.app")
      ? "wss://talesrunner-be.up.railway.app"
      : "ws://localhost:3000";

  const socket: Socket = io(SOCKET_URL, {
    withCredentials: true,
    transports: ["websocket"], // 웹소켓만 사용 (polling 방지)
    query: { nickname: user?.nickname || "익명" },
  });

  useEffect(() => {
    // 소켓 연결 확인
    socket.on("connect", () => {
      console.log("Socket connected to server");
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected from server");
    });

    // 서버로부터 메시지 수신
    socket.on("chat message", (msg: ChatMessage) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("chat message"); // 이벤트 해제
    };
  }, []);

  const sendMessage = () => {
    if (!user) {
      alert("로그인 후 이용해 주세요");
      setMessage("");
      return;
    }

    if (message.trim()) {
      const chatMessage: ChatMessage = {
        id: new Date().getTime().toString(),
        nickname: user.nickname || "익명",
        profileURL: profileURL || "/home/no-character.png",
        message: message,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }), //(오전 시:분)
      };

      socket.emit("chat message", chatMessage); // 서버로 객체형태 메시지 전송
      setMessage("");
    }
  };

  return (
    <>
      <div className="w-[1280px] h-[1100px] px-8 mb-[200px]">
        <div className="flex items-center justify-between mb-[32px]">
          <div className="text-2xl font-[600] leading-9 text-gray-900">
            런너 채팅방
          </div>
        </div>

        <div className="flex-center mt-[70px]">
          <h1 className="text-[50px] font-[700] mr-[10px]">런너 Talk</h1>
          <Image
            width={50}
            height={50}
            style={{ width: "50px", height: "50px" }}
            src="/uploads/v1/level/lv_51.png"
            alt="level"
          />
        </div>

        <div
          style={{
            clipPath: "inset(0px 0px 0px 0px round 12px 12px 0px 0px)",
            overflowY: "scroll",
            border: "1px solid #ddd",
            color: "black",
          }}
          className="m-auto blue w-[550px] h-[800px] rounded-t-[12px] p-[10px] bg-blue-100"
        >
          <div className="text-center py-2">
            {/* 날짜 표시 */}
            <div className="text-gray-500 text-sm font-medium">
              {new Date().toLocaleString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
                weekday: "long",
              })}
            </div>
          </div>

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-center gap-2 ${
                msg.nickname === user?.nickname
                  ? "justify-end"
                  : "justify-start"
              }`}
              style={{ margin: "10px 0" }}
            >
              {msg.nickname !== user?.nickname && (
                <Image
                  width={50}
                  height={50}
                  style={{ width: "50px", height: "50px" }}
                  className="rounded-full border border-[var(--border-color)]"
                  src={msg.profileURL || "/home/no-character.png"}
                  alt="profile"
                />
              )}
              <div
                className={`p-2 rounded-lg ${
                  msg.nickname === user?.nickname ? "bg-yellow-100" : "bg-white"
                }`}
                style={{ maxWidth: "70%", wordBreak: "break-word" }}
              >
                <span className="block font-bold">{msg.nickname}</span>
                <span>{msg.message}</span>
                <span
                  className="block text-xs text-gray-500"
                  style={{ marginTop: "5px" }}
                >
                  {msg.timestamp} {/* 날짜 표시 */}
                </span>
              </div>
              {msg.nickname === user?.nickname && (
                <Image
                  width={50}
                  height={50}
                  style={{ width: "50px", height: "50px" }}
                  className="rounded-full border border-[var(--border-color)]"
                  src={msg.profileURL || "/home/no-character.png"}
                  alt="profile"
                />
              )}
            </div>
          ))}
        </div>

        {/* 메시지 입력 인풋 */}
        <div className="flex items-center justify-center">
          <input
            className="w-[450px] h-[50px] px-4 text-lg border rounded-bl-[12px] border-gray-300  outline-none"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage(); // 엔터 키를 누르면 메시지 전송
              }
            }}
            placeholder="내용을 입력하세요"
          />
          <button
            onClick={sendMessage}
            className="h-[50px] w-[100px] px-6 text-[16px] text-white rounded-br-[12px] bg-blue-500"
          >
            보내기
          </button>
        </div>
      </div>
    </>
  );
}
