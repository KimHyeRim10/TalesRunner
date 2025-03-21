"use client";

import UserProfile from "./UserProfile";
import LoginActions from "./LoginActions";
import { getUser } from "@/utils/localStorage";
import { useState, useEffect } from "react";
import { UserInfo } from "@/types/userInfo";

import Image from "next/image";

export default function HomeSection1() {
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
            <Image width={14} height={14} src="/home/ico-add-14.svg" alt="+" />
          </div>
          {/* 안내메시지 */}
          <div className="flex flex-col pt-4 pb-[22px] gap-y-2 w-[280px] h-[158px]">
            <div className="flex items-center gap-x-1">
              <span className="flex-center w-[38px] h-[22px] text-[12px] font-bold text-[#0C6812] text-center bg-[#ECFDF3] border border-[rgb(171,239,198)] rounded-[999px]">
                안내
              </span>
              <p className="w-[211px] h-[24px] text-[16px] truncate hover:underline leading-6 text-base cursor-pointer">
                점령전 로딩 문제 수정을 위한 서버 재부팅 안내
              </p>
              <Image
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
                [안내] 한게임 영구 이용 제한 이용자 환불 처리 관련 안내
              </p>
              <Image
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
                알려진 문제점 안내 (24. 12. 20. 12:32 수정)
              </p>
            </div>
            <div className="flex items-center gap-x-1">
              <span className="flex-center w-[38px] h-[22px] text-[12px] font-bold text-[#0C6812] text-center bg-[#ECFDF3] border border-[rgb(171,239,198)] rounded-[999px]">
                안내
              </span>
              <p className="w-[211px] h-[24px] text-[16px] truncate hover:underline leading-6 text-base cursor-pointer">
                12월 18일 (수) 정기 점검 완료 안내
              </p>
            </div>
          </div>

          {/* 이벤트소식/업데이트소식 버튼 */}
          <div className="flex justify-between w-[280px] h-[52px]">
            <Image
              width={138}
              height={52}
              src="/home/guide.png"
              alt="이벤트소식"
            />
            <Image
              width={138}
              height={52}
              src="/home/update.png"
              alt="업데이트소식"
            />
          </div>
        </div>

        {/* section1 이미지 부분 */}

        <Image
          width={592}
          height={240}
          style={{ width: "592px", height: "240px" }}
          src="/home/section1.png"
          alt="section1"
        />

        {/* 게임시작/로그인 */}
        <div className="w-[280px]">
          {/* 게임시작버튼 */}
          <div className="relative group w-[280px] h-[108px] text-white flex items-center justify-center gap-y-1">
            <Image
              width={280}
              height={108}
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
            <Image
              width={280}
              height={108}
              className="absolute mix-blend-screen group-hover:mix-blend-plus-lighter"
              src="/home/circle01.svg"
              alt="circle01"
            />
            <Image
              width={280}
              height={108}
              className="absolute mix-blend-screen group-hover:mix-blend-plus-lighter"
              src="/home/circle02.svg"
              alt="circle02"
            />
            <Image
              width={280}
              height={108}
              className="absolute start animate-start w-[280px] h-[108px] group-hover:hidden mix-blend-overlay"
              src="/home/light.svg"
              alt="light"
            />
            <Image
              width={130}
              height={108}
              style={{ width: "130px", height: "108px" }}
              className="absolute start animate-start  group-hover:hidden mix-blend-soft-light opacity-50"
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
