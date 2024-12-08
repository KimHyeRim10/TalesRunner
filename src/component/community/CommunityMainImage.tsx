import React from "react";
import GameStartButton from "./GameStartButton";
import { getUser } from "@/utils/localStorage";
import { UserInfo } from "@/types/userInfo";

export default function CommunityMainImage() {
  const userInfo: UserInfo | null = getUser();

  return (
    <div className="relative flex flex-col items-center w-full max-w-[1981px] h-[240px] mx-auto">
      {/* 배경 이미지 */}
      <img
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/community/69oHwVqIQARmF6tOPF7TSZ.png"
        alt="community-image"
      />

      {/* 커뮤니티 박스 */}
      <div className="absolute bottom-[-40px] left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-10 w-full max-w-[1280px] h-[80px] px-8 flex justify-between items-center">
        <div className="text-4xl text-white font-bold leading-[54px] tracking-[-0.02em]">
          커뮤니티
        </div>
        <div className="flex items-center gap-5">
          {/* 로그인 시 바뀌는 로그인 버튼 ui */}
          {userInfo ? (
            <button
              className="flex items-center justify-between gap-2 px-[12px] py-[9px] w-auto h-[37px]  text-white bg-white text-[14px] rounded-[8px]"
              type="submit"
            >
              <img src="/community/lv_67.png" alt="레벨" />
              <span className="text-[12px] text-[#FFA500]">
                {userInfo.nickname}
              </span>
              <div className="flex-center rounded-full w-[49px] text-[#98A2B3] h-[22px] border border-[var(--border-color)]">
                <img
                  className="w-[12px] h-[12px]"
                  src="/community/ico-home-12.svg"
                  alt="광장"
                />
                <span className="text-[12px]">광장</span>
              </div>
            </button>
          ) : (
            <button
              className="w-[150px] h-[37px] px-[13px] text-white bg-[#8544E2] text-[14px] rounded-[8px]"
              type="submit"
            >
              로그인
            </button>
          )}
          <GameStartButton />
        </div>
      </div>
    </div>
  );
}
