import Link from "next/link";

export default function LoginActions() {
  return (
    <div>
      <div className="flex-center w-[280px] h-[106px] border border-[var(--border-color)]">
        <Link href="/login">
          <button className="w-[212px] h-[59px] bg-[#8544E2] rounded-lg text-white text-[18px] font-[600] leading-[59px] text-center">
            로그인
          </button>
        </Link>
      </div>
      <div className="mt-[-2px]">
        <Link href={"/signup"}>
          <button className="w-[93.5px] h-[25px] border border-[var(--border-color)] text-[12px] text-[#98A2B3] text-center bg-[rgb(249,250,251)]">
            회원가입
          </button>
        </Link>
        <button className="w-[93px] h-[25px] border-t border-b border-[var(--border-color)] text-[12px] text-[#98A2B3] text-center bg-[rgb(249,250,251)]">
          ID 찾기
        </button>
        <button className="w-[93.5px] h-[25px] border border-[var(--border-color)] text-[12px] text-[#98A2B3] text-center bg-[rgb(249,250,251)]">
          PW 찾기
        </button>
      </div>
    </div>
  );
}
