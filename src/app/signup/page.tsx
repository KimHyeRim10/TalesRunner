"use client";

import Link from "next/link";
import Image from "next/image";
import SocialLogin from "@/component/signup/SocialLogin";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/signup/terms");
  };

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
        <h3 className="text-[20px] font-[600] text=[#101828] pb-[12px] text-center leading-[30px] mt-[30px]">
          RHAON 가입을 시작합니다!
        </h3>
        <div className="text-[16px] leading-[24px] text-[#475467] text-center">
          회원가입을 위해 가입 방식을 선택하세요.
        </div>
        <button
          className="w-[384px] h-[50px] px-[13px] text-white bg-[#8544E2] text-[16px] rounded-[8px] mt-7"
          type="submit"
          onClick={handleButtonClick}
        >
          이메일로 가입
        </button>

        <div className="divide text-center mt-8">
          <span className="w-[100px]">또는</span>
        </div>

        <SocialLogin />

        <div className="flex-center mt-8">
          <a
            className="text-[14px] font-bold text-[#475467] leading-[21px] underline underline-offset-4 mx-auto"
            href="#"
          >
            &apos;간편 로그인(SNS) 가입&apos; 유의사항 안내
          </a>
        </div>
      </div>
    </div>
  );
}
