"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CommunityNavBar() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <div className="sticky top-0 mb-12 max-w-[1981px] w-full min-w-min flex justify-center z-20 border-b border-[var(--border-color)] mx-auto ">
      <div className="w-[1280px] h-[64px] flex gap-x-11 px-8 bg-white">
        <ul className="flex items-center text-base leading-[64px] font-[600] gap-8 ">
          <Link href={"/community/runners/all"}>
            <li
              className={`w-[90px] h-[64px] text-[16px] cursor-pointer ${
                isActive("/community/runners/all")
                  ? "text-[#439F46]"
                  : "text-[#667085]"
              }`}
            >
              런너게시판
            </li>
          </Link>
          <Link href={"/community/chat"}>
            <li
              className={`w-[90px] h-[64px] text-[16px] cursor-pointer ${
                isActive("/community/chat")
                  ? "text-[#439F46]"
                  : "text-[#667085]"
              }`}
            >
              런너채팅방
            </li>
          </Link>
          <li className="text-[#667085] w-[90px] h-[64px] text-[16px] cursor-pointer">
            공략게시판
          </li>
          <li className="text-[#667085] w-[90px] h-[64px] text-[16px] cursor-pointer">
            길드게시판
          </li>
          <li className="text-[#667085] w-[90px] h-[64px] text-[16px] cursor-pointer">
            토론게시판
          </li>
          <li className="text-[#667085] w-[110px] h-[64px] text-[16px] cursor-pointer">
            TR크리에이터
          </li>
        </ul>
      </div>
    </div>
  );
}
