import Link from "next/link";
import Image from "next/image";

export default function SignupComplete() {
  return (
    <div>
      <div className="w-[448px] h-[582px] px-[32px]  justify-center mt-[96px] mb-[600px]">
        <Link href={"/"}>
          <Image
            width={214}
            height={40}
            className="mx-auto"
            src="/header/rhaon-ci.png"
            alt="logo"
          />
        </Link>
        <Image
          width={150}
          height={160}
          className="mx-auto mt-[40px] mb-[30px]"
          src="/signup/rhaoni.png"
          alt="라오니"
        />

        <h3 className="flex-center mx-auto w-[342px] h-[42] text-[#101828] pb-[12px] text-[20px] font-bold">
          회원가입을 환영합니다.
        </h3>

        <div className="flex-center text-[15px] text-[#475467] leading-[24px]">
          라온에서 제공하는 다양한 게임과 서비스를 즐겨보세요!
        </div>

        <Link href={"/"}>
          <button
            className="w-[384px] h-[50px] px-[13px] text-white bg-[#8544E2] text-[16px] rounded-[8px] mt-7"
            type="submit"
          >
            홈페이지로 이동하기
          </button>
        </Link>
      </div>
    </div>
  );
}
