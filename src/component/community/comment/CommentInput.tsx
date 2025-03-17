"use client";

import React from "react";
import axios from "axios";
import Image from "next/image";
import DOMPurify from "dompurify";
import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { getUser } from "@/utils/localStorage";
import ImageUploadIcon from "@/icons/community/ImageUploadIcon";
import { useComment } from "@/context/CommentContext";

type Props = {
  id: string;
};

export default function CommentInput({ id }: Props) {
  const router = useRouter();
  const { profileURL, levelURL, nicknameColor } = useUser();
  const { fetchCommentList } = useComment();
  const [content, setContent] = useState<string>("");
  const sanitizedContent = DOMPurify.sanitize(content);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setContent(e.target.value);
  };

  const handleSubmitComment = async () => {
    const userInfo = getUser();
    if (!userInfo) {
      alert("로그인이 필요합니다.");
      router.push("/login");
      return;
    }

    const { nickname } = userInfo;

    if (sanitizedContent !== content) {
      alert("허용되지 않은 태그가 포함되어 있습니다.");
      return;
    }

    try {
      const response = await axios.post("/api/board/comments/comment", {
        boardId: id,
        nickname: nickname,
        profileURL: profileURL || "/home/no-character.png",
        content,
        levelURL: levelURL || "/uploads/v1/level/lv_03.png",
        nicknameColor: nicknameColor || "#FFA500",
      });

      if (response.data.success) {
        alert("댓글이 등록되었습니다.");
        fetchCommentList(id);
        setContent("");
      }
    } catch (error) {
      console.error("댓글 등록 실패:", error);
      alert("댓글 등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="flex justify-center gap-3 w-[1216px] min-h-[180px]">
      <div>
        <Image
          width={52}
          height={52}
          style={{ width: "52px", height: "52px" }}
          className="rounded-full border-[#F2F4F7] object-cover border-2"
          src={profileURL || "/home/no-character.png"}
          alt="no-character"
        />
      </div>
      <div className="border border-[var(--border-color)] rounded-[8px] w-[1088px] h-auto px-[14px] py-3">
        <div className="min-h-[96px] border-b border-[var(--border-color)]">
          <textarea
            style={{
              resize: "none",
              overflow: "hidden",
            }}
            name="content"
            value={content}
            onChange={handleChange}
            className="placeholder-comment w-[1000px] min-h-[90px] outline-none"
            placeholder="댓글을 입력해 주세요"
          ></textarea>
        </div>
        <div className="flex justify-between gap-1 items-center p-[8px] w-[1058px] h-[58px]">
          <ImageUploadIcon />
          <div className="flex items-center gap-3">
            <span className="text-[14px] text-[#98A2B3]">
              {content.length} / 1000
            </span>
            <button
              onClick={handleSubmitComment}
              className="w-[80px] h-[41px] rounded-lg text-white text-[14px] bg-[#475467]"
            >
              등록
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
