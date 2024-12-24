"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { removeUser } from "@/utils/localStorage";

export default function Header() {
  const router = useRouter();
  const { profileURL, user, setUser } = useUser();
  const [toggleDropDown, setToggleDropDown] = useState(false);

  const handleToggleDropdown = () => {
    setToggleDropDown(!toggleDropDown);
  };

  const handleLogout = () => {
    alert("로그아웃 되었습니다");
    removeUser();
    setUser(null); // 로그아웃 후 상태 업데이트
    router.push("/");
  };

  return (
    <div className="px-12 h-[48px] border-b border-gray-200 flex justify-between items-center">
      <div className="flex-center gap-2">
        <Image
          width={20}
          height={20}
          src="/header/ico-menu-14.svg"
          alt="Menu icon"
        />
        <button className="flex items-center text-[14px] font-semibold">
          메뉴
        </button>
      </div>

      <div className="flex-center">
        <Link href={"/"}>
          <Image
            width={130}
            height={20}
            className="ml-[140px]"
            src="/header/rhaon-ci.png"
            alt="logo"
          />
        </Link>
      </div>

      {user ? (
        <div>
          <div className="relative flex items-center justify-end min-w-[160px] h-[36px]">
            <Image
              width={33}
              height={33}
              className="rounded-full border border-[var(--border-color)] mr-[10px]"
              src={profileURL || "/home/no-character.png"}
              alt="profile"
            />
            <div className="flex-center">
              <p className="text-[15px] text-[#475467] font-[600]">
                {user?.nickname}
              </p>
              <Image
                width={14}
                height={15}
                className="m-[8px]"
                src="/header/ico-chevron-down-14.svg"
                alt="chevron-down"
                onClick={handleToggleDropdown}
              />
            </div>
          </div>
          {toggleDropDown && (
            <div className="absolute z-50 right-[45px] top-[50px] p-[12px] bg-white rounded-[8px] w-[200px] h-[229px]">
              <div className="flex flex-col w-[176px] h-[80px] mb-[16px] bg-[#FAF6FF] rounded-[8px] p-[12px]">
                <div>
                  <p className="flex justify-between items-center mb-[10px]">
                    <span className="text-[12px] text-[#344054] font-bold">
                      보유캐시
                    </span>
                    <span className="flex-center  text-[#344054] font-bold w-[33px] h-[22px] rounded-md text-[12px] bg-white border border-[var(--boarder-color)]">
                      충전
                    </span>
                  </p>
                  <p className="text-right text-[#8544E2] text-[12px] font-bold">
                    0
                  </p>
                </div>
              </div>
              <div className="pl-[12px] text-[12px] text-[#344054] font-bold">
                <ul className="flex flex-col">
                  <li className="pb-[12px]">회원정보</li>
                  <li className="pb-[12px]">보안설정</li>
                  <li className="flex items-center gap-1">
                    <p>고객센터</p>
                    <Image
                      width={14}
                      height={14}
                      src="/header/ico-link-new-14.svg"
                      alt="link-new-"
                    />
                  </li>
                </ul>
              </div>

              <div className="w-[176px] h-[1px] bg-[#EAECF0] mt-[12px]"></div>

              <button
                onClick={handleLogout}
                className="text-[#344054] pl-[12px] text-[12px] font-bold"
              >
                로그아웃
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex-center gap-4">
          <Link href={"/signup"}>
            <button className=" text-[15px] font-[600] text-gray-600">
              회원가입
            </button>
          </Link>
          <Link href={"/login"}>
            <button className="w-[84px] py-[6px] border border-[#D6BBFB] text-[15px] font-[600] text-[var(--primary-color)] rounded-full">
              로그인
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
