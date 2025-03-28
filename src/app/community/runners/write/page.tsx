"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import DOMPurify from "dompurify";
import { useRouter } from "next/navigation";
import { getUser } from "@/utils/localStorage";
import { useUser } from "@/context/UserContext";
import ToolbarButton from "@/component/community/ToolbarButton";

interface EditBoardData {
  id?: string;
  title?: string;
  content?: string;
  nickname_color?: string;
  user_level?: string;
}

export default function WritePage() {
  const router = useRouter();
  const [isDropdown, setIsDropdown] = useState(false);
  const [editBoardData, setEditBoardData] = useState<EditBoardData>({});
  const [btitle, setTitle] = useState("");
  const [bcontent, setContent] = useState("");
  const [bid, setId] = useState("");
  const { levelURL, nicknameColor } = useUser();

  const sanitizedTitle =
    typeof window !== "undefined" ? DOMPurify.sanitize(btitle) : btitle;
  const sanitizedContent =
    typeof window !== "undefined" ? DOMPurify.sanitize(bcontent) : bcontent;
  const userInfo = getUser();

  const isEdit = Boolean(editBoardData.id);

  useEffect(() => {
    if (!userInfo) {
      alert(
        "로그인 후 글쓰기를 이용하실 수 있습니다. 로그인 페이지로 이동합니다."
      );
      router.push("/login");
    }
  }, [userInfo]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("editBoardData") || "{}");
    setEditBoardData(data);

    if (data.title) setTitle(data.title);
    if (data.content) setContent(data.content);
    if (data.id) setId(data.id);
  }, []);

  const toggleDropdown = () => {
    setIsDropdown((prev) => !prev);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "btitle") setTitle(value);
    if (name === "bcontent") setContent(value);
  };

  const handleWriteSubmit = async () => {
    const userInfo = getUser();
    const nickname = userInfo?.nickname;

    if (!btitle.trim() || !bcontent.trim()) {
      alert("제목과 내용을 모두 입력해 주세요.");
      return;
    }

    if (sanitizedTitle !== btitle || sanitizedContent !== bcontent) {
      alert("허용되지 않은 태그가 포함되어 있습니다.");
      return;
    }

    try {
      let response;

      if (isEdit) {
        // 수정 요청
        response = await axios.put("/api/board/editBoard", {
          id: bid,
          title: btitle,
          content: bcontent,
          levelURL: levelURL,
          nicknameColor: nicknameColor,
        });
      } else {
        // 등록 요청
        response = await axios.post("/api/board/newBoard", {
          nickname,
          title: btitle,
          content: bcontent,
          levelURL,
          nicknameColor,
        });
      }

      if (response.data.success) {
        alert(
          isEdit
            ? "게시글이 성공적으로 수정되었습니다."
            : "게시글 등록에 성공했습니다."
        );
        router.push("/community/runners/all");
      }
    } catch (error) {
      console.log("API 호출 실패:", error);
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="w-[1280px] min-h-[600px] px-8 mb-[200px]">
      {/* 페이지 제목 */}
      <div className="text-2xl font-[600] leading-9 text-gray-900 mb-4">
        런너게시판
      </div>

      <div className="flex items-center justify-between mt-[40px] mb-[20px]">
        <div className="relative flex items-center justify-between w-[105px]  h-[40px] border border-[var(--border-color)] rounded-[8px] px-[14px]">
          <span className=" text-[14px] text-[#344054]">자유</span>
          <Image
            width={12}
            height={12}
            onClick={toggleDropdown}
            src="/community/arrow-bottom.jpg"
            alt="arrow-bottom"
          />
          {isDropdown && (
            <div className="absolute z-10 top-[48px] right-0 py-[5px] rounded-[8px] w-[105px] h-[176px] bg-white border border-[var(--border-color)]">
              <div className="h-[41px] leading-[41px] px-4 hover:bg-gray-50 cursor-pointer text-[14px] font-bold">
                카테고리
              </div>
              <div className="h-[41px] leading-[41px] px-4 hover:bg-gray-50 cursor-pointer text-[14px] font-bold">
                자유
              </div>
              <div className="h-[41px] leading-[41px] px-4 hover:bg-gray-50 cursor-pointer text-[14px] font-bold">
                추첨
              </div>
              <div className="h-[41px] leading-[41px] px-4 hover:bg-gray-50 cursor-pointer text-[14px] font-bold">
                설문
              </div>
            </div>
          )}
        </div>

        <input
          name="btitle"
          value={btitle}
          onChange={handleChange}
          className="w-[1103px]  h-[40px] border border-[var(--border-color)] rounded-[8px] px-[14px] outline-none"
          placeholder="제목"
        ></input>
      </div>

      <div className="w-[1216px] min-h-[400px] border border-[var(--border-color)] rounded-[8px] px-[14px]">
        <ToolbarButton />
        {/* 게시판 내용 작성 */}
        <textarea
          style={{
            resize: "none",
            overflow: "hidden",
          }}
          name="bcontent"
          value={bcontent}
          onChange={handleChange}
          placeholder="내용을 입력해 주세요."
          className="outline-none w-[1190px] min-h-[400px] mt-[10px]"
        ></textarea>
      </div>

      <div className="flex-center gap-[15px] mt-[20px]">
        <button
          type="button"
          className="w-[80px] h-[40px] border borer-[var(--border-color)] rounded-[8px] px-[14px] text-[14px] text-[#344054] font-bold"
        >
          취소
        </button>
        <button
          type="button"
          onClick={handleWriteSubmit}
          className="w-[80px] h-[40px] border borer-[var(--border-color)] rounded-[8px] px-[14px] text-[14px] text-white bg-[#344054] font-bold"
        >
          등록
        </button>
      </div>
    </div>
  );
}
