"use client";

import { useState } from "react";
import ToolbarButton from "@/component/community/ToolbarButton";

export default function WritePage() {
  const [isDropdown, setIsDropdown] = useState(false);

  const toggleDropdown = () => {
    setIsDropdown((prev) => !prev);
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
          <img
            onClick={toggleDropdown}
            className="w-[12px] h-[12px]"
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
          className="w-[1103px]  h-[40px] border border-[var(--border-color)] rounded-[8px] px-[14px] outline-none"
          placeholder="제목"
        ></input>
      </div>

      <div className="w-[1216px] min-h-[400px] border border-[var(--border-color)] rounded-[8px] px-[14px]">
        {/* 텍스트 에디터 툴바 */}
        <ToolbarButton />
        {/* 게시판 내용 작성 */}
        <div
          className="placeholder py-[12px]"
          contentEditable="true"
          data-placeholder="내용을 입력하세요."
        >
          게시판 작성중...
        </div>
      </div>

      <div className="flex-center gap-[15px] mt-[20px]">
        <button className="w-[80px] h-[40px] border borer-[var(--border-color)] rounded-[8px] px-[14px] text-[14px] text-[#344054] font-bold">
          취소
        </button>
        <button className="w-[80px] h-[40px] border borer-[var(--border-color)] rounded-[8px] px-[14px] text-[14px] text-white bg-[#344054] font-bold">
          등록
        </button>
      </div>
    </div>
  );
}
