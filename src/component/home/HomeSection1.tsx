"use client";

import UserProfile from "./UserProfile";
import LoginActions from "./LoginActions";
import { getUser } from "@/utils/localStorage";
import { useState, useEffect } from "react";

export default function HomeSection1() {
  interface UserInfo {
    id: number;
    nickname: string;
    email: string;
  }

  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    const userInfo = getUser();
    setUser(userInfo);
  }, []);

  return (
    <>
      <section className="w-[1216px] h-[240px] flex justify-between items-center">
        <div>
          {/* 공지사항 */}
          <div className="w-[280px] h-[30px] flex justify-between">
            <span className="h-[30px] text-[20px] font-bold">공지사항</span>
            <img width={14} height={14} src="/home/ico-add-14.svg" alt="+" />
          </div>
          {/* 안내메시지 */}
          <div className="flex flex-col pt-4 pb-[22px] gap-y-2 w-[280px] h-[158px]">
            <div className="flex items-center gap-x-1">
              <span className="flex-center w-[38px] h-[22px] text-[12px] font-bold text-[#0C6812] text-center bg-[#ECFDF3] border border-[rgb(171,239,198)] rounded-[999px]">
                안내
              </span>
              <p className="w-[211px] h-[24px] text-[16px] truncate hover:underline leading-6 text-base cursor-pointer">
                [안내] 개인정보처리방침 변경...
              </p>
              <img
                width={18}
                height={18}
                src="/home/ico-new-18.svg"
                alt="new"
              />
            </div>
            <div className="flex items-center gap-x-1">
              <span className="flex-center w-[38px] h-[22px] text-[12px] font-bold text-[#0C6812] text-center bg-[#ECFDF3] border border-[rgb(171,239,198)] rounded-[999px]">
                안내
              </span>
              <p className="w-[211px] h-[24px] text-[16px] truncate hover:underline leading-6 text-base cursor-pointer">
                11월 20일 (수) 정기 점검 완료...
              </p>
              <img
                width={18}
                height={18}
                src="/home/ico-new-18.svg"
                alt="new"
              />
            </div>
            <div className="flex items-center gap-x-1">
              <span className="flex-center w-[38px] h-[22px] text-[12px] font-bold text-[#0C6812] text-center bg-[#ECFDF3] border border-[rgb(171,239,198)] rounded-[999px]">
                안내
              </span>
              <p className="w-[211px] h-[24px] text-[16px] truncate hover:underline leading-6 text-base cursor-pointer">
                계정 이관 보상 5,000 보너스 캐시
              </p>
            </div>
            <div className="flex items-center gap-x-1">
              <span className="flex-center w-[38px] h-[22px] text-[12px] font-bold text-[#0C6812] text-center bg-[#ECFDF3] border border-[rgb(171,239,198)] rounded-[999px]">
                안내
              </span>
              <p className="w-[211px] h-[24px] text-[16px] truncate hover:underline leading-6 text-base cursor-pointer">
                11월 11일 (월) 임심 점검 진행 완료...
              </p>
            </div>
          </div>

          {/* 이벤트소식/업데이트소식 버튼 */}
          <div className="flex justify-between">
            <img
              width={138}
              height={52}
              src="/home/guide.png"
              alt="이벤트소식"
            />
            <img
              width={138}
              height={52}
              src="/home/update.png"
              alt="업데이트소식"
            />
          </div>
        </div>
        {/* section1 이미지 부분 */}
        <img width={592} height={240} src="/home/section1.png" alt="section1" />
        {/* 게임시작/로그인 */}
        <div className="w-[280px]">
          {/* 게임시작버튼 */}
          <div className="relative group w-[280px] h-[108px] text-white flex items-center justify-center gap-y-1">
            <img
              className="w-full h-full object-cover"
              src="/home/file.svg"
              alt="게임시작버튼"
            />
            <button className="absolute top-[15px] group-hover:animate-game leading-[54px] text-4xl -tracking-[.02em] font-[600] z-10  hover:scale-110 ">
              게임시작
            </button>
            <ul className="absolute top-[70px] flex gap-6 items-center text-xs font-[500] z-10">
              <li className="hover:underline">다운로드</li>
              <li>|</li>
              <li className="hover:underline">문제해결</li>
            </ul>
            <img
              className="absolute mix-blend-screen group-hover:mix-blend-plus-lighter"
              src="/home/circle01.svg"
              alt="circle01"
            />
            <img
              className="absolute mix-blend-screen group-hover:mix-blend-plus-lighter"
              src="/home/circle02.svg"
              alt="circle02"
            />
            <img
              className="absolute start animate-start w-[280px] h-[108px] group-hover:hidden mix-blend-overlay"
              src="/home/light.svg"
              alt="light"
            />
            <img
              className="absolute start animate-start w-[280px] h-[108px] group-hover:hidden mix-blend-soft-light opacity-50"
              src="/home/big-light.svg"
              alt="big-light"
            />
          </div>
          {user ? (
            <UserProfile user={user} setUser={setUser} />
          ) : (
            <LoginActions />
          )}
        </div>
      </section>
    </>
  );
}
