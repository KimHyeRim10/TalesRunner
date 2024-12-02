import Link from "next/link";

export default function Header() {
  return (
    <div className="px-12 h-[48px] border-b border-gray-200 flex justify-between items-center">
      <div className="flex-center gap-2">
        <img
          className="w-[20px] h-[20px]"
          src="/header/ico-menu-14.svg"
          alt="Menu icon"
        />
        <button className="flex items-center text-[14px] font-semibold">
          메뉴
        </button>
      </div>

      <div className="flex-center">
        <Link href={"/"}>
          <img
            className="w-[130px] h-[20px] ml-[140px]"
            src="/header/rhaon-ci.png"
            alt="logo"
          />
        </Link>
      </div>

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
    </div>
  );
}
