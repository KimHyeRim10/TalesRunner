"use client";

import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { getUser } from "@/utils/localStorage";
import ImageUploadIcon from "@/icons/community/ImageUploadIcon";
import { useComment } from "@/context/CommentContext";

type Props = {
  boardId: string; // id 값을 props로 받을 것임
  commentId: string;
};

export default function ReplyInput({ boardId, commentId }: Props) {
  const router = useRouter();
  const { profileURL, levelURL, nicknameColor } = useUser();
  const { fetchReplyList } = useComment();
  const [content, setContent] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setContent(e.target.value);
  };

  /* 대댓글 저장 핸들러 */
  const handleSubmitReply = async () => {
    const userInfo = getUser();
    if (!userInfo) {
      alert("로그인이 필요합니다.");
      router.push("/login");
      return;
    }

    const { nickname } = userInfo;

    try {
      const response = await axios.post("/api/board/comments/reply", {
        boardId: boardId,
        commentId: commentId,
        nickname: nickname,
        content: content,
        profileURL: profileURL || "/home/no-character.png",
        levelURL: levelURL || "/uploads/v1/level/lv_03.png",
        nicknameColor: nicknameColor || "#FFA500",
      });

      if (response.data.success) {
        alert("댓글이 등록되었습니다");
        fetchReplyList(boardId, commentId); // 새로고침 없이 대댓글리스트  가져오기
        setContent("");
      }
    } catch (error) {
      console.log("데이터 베이스 저장 실패!", error);
    }
  };

  return (
    <div className="flex justify-end gap-3 w-[1216px] min-h-[180px] pr-[32px] pl-[96px]">
      <div>
        <Image
          width={52}
          height={52}
          className="rounded-full border-[#F2F4F7] object-cover border-2"
          src={profileURL || "/home/no-character.png"}
          alt="profile"
        />
      </div>
      <div className="border border-[var(--border-color)] rounded-[8px] w-[1024px] h-auto px-[14px] py-3">
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
            contentEditable="true"
            data-placeholder="댓글을 입력해 주세요."
          ></textarea>
        </div>
        <div className="flex justify-between gap-1 items-center p-[8px] w-[994px] h-[58px]">
          <ImageUploadIcon />
          <div className="flex items-center gap-3">
            <span className="text-[14px] text-[#98A2B3]">
              {content.length} / 1000
            </span>
            <button className="w-[80px] h-[41px] rounded-lg text-[#344054] text-[14px] bg-white border">
              취소
            </button>
            <button
              onClick={handleSubmitReply}
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
