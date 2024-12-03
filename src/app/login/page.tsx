"use client";

import Link from "next/link";
import SocialLogin from "@/component/SocialLogin";
import { useForm } from "@/context/FormContext";
import axios from "axios";
import { useRef, MutableRefObject } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const { formData, handleChange } = useForm();
  const router = useRouter();

  type InputRefs = Record<string, MutableRefObject<HTMLInputElement | null>>;

  const refs: InputRefs = {
    emailRef: useRef(null),
    userPassRef: useRef(null),
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/auth/login", {
        email: formData.email,
        password: formData.userPass,
      });

      if (response.data.message) {
        const { login_token, decoded } = response.data; // 토큰과 디코딩된 정보 가져오기
        const userInfo = {
          email: decoded.email,
          nickname: decoded.nickname,
          token: login_token,
        };

        // 로컬스토리지에 userInfo 저장
        localStorage.setItem("userInfo", JSON.stringify(userInfo));

        // 쿠키에 토큰 저장 (라이브러리 활용)
        document.cookie = `x-auth-jwt=${login_token}; path=/; max-age=3600;`;

        alert("로그인에 성공했습니다");

        router.push("/");
      } else {
        alert("로그인에 실패했습니다");
      }
    } catch (error) {
      console.error("로그인 확인 오류 :", error);
      alert("로그인 확인 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      <div className="w-[448px] h-[582px] px-[32px]  justify-center mt-[96px] mb-[600px] red">
        <Link href={"/"}>
          <img
            className="w-[214px] h-[40px] mx-auto"
            src="/header/rhaon-ci.png"
            alt="logo"
          />
        </Link>

        <form onSubmit={handleSubmit}>
          <div>
            <input
              className="border border-[#D0D5DD] rounded-[8px] mb-2 mt-10 w-[384px] h-[48px] text-[16px] px-[14px] text-[#101828]"
              type="text"
              name="email"
              value={formData.email}
              ref={refs.emailRef}
              onChange={handleChange}
              placeholder="이메일을 입력하세요"
            />
          </div>
          <div>
            <input
              className="border border-[#D0D5DD] rounded-[8px] mb-2 w-[384px] h-[48px] text-[16px] px-[14px] text-[#101828]"
              name="userPass"
              value={formData.userPass}
              onChange={handleChange}
              ref={refs.userPassRef}
              type="password"
              placeholder="비밀번호(영문, 숫자, 특수문자 8~16자)"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              className="w-[16px] h-[16px] border border-[#D0D5DD] rounded-[8px]"
              type="checkbox"
            />
            <span className="text-[14px] text-[#667085]">로그인 유지</span>
          </div>
          <button
            className="w-[384px] h-[50px] px-[13px] text-white bg-[#8544E2] text-[18px] rounded-[8px] mt-8"
            type="submit"
          >
            로그인
          </button>
          <div className="divide text-center mt-10">
            <span className="w-[100px]">또는</span>
          </div>
          <SocialLogin />
          <div className="flex items-center justify-between gap-4  mt-8 h-[20px] px-[16px] text-[14px] text-[#475467] mx-auto font-[600]">
            <span className="cursor-pointer">아이디 찾기</span>
            <span className="cursor-pointer">비밀번호 찾기</span>
            <Link href="/signup">
              <span className="cursor-pointer">회원가입</span>
            </Link>
          </div>
          <div className="channel-divide text-center mt-[20px]">
            <span className="text-[14px] h-[20px] w-[250px] text-[#475467] font-[600]">
              채널링(스토브/한게임) 회원이라면?
            </span>
          </div>
          <div className="flex justify-between mt-8 w-[384px] h-[31px]">
            <div className="flex-center cursor-pointer gap-[6px] w-[184px] h-[31px] border border-[#d5d5dd] rounded-[8px]">
              <img
                className="w-[20px] h-[20px]"
                src="/login/stove.png"
                alt="stove"
              />
              <span className="text-[#344054] text-[12px]">
                스토브 바로가기
              </span>
              <img
                className="w-[14px] h-[14px]"
                src="/login/ico-chevron-right-20.svg"
                alt="chevron-right-20"
              />
            </div>
            <div className="flex-center cursor-pointer gap-[6px] w-[184px] h-[31px] border border-[#d5d5dd] rounded-[8px]">
              <img
                className="w-[20px] h-[20px]"
                src="/login/hangame.png"
                alt="hangame"
              />
              <span className="text-[#344054] text-[12px]">
                한게임 바로가기
              </span>
              <img
                className="w-[14px] h-[14px]"
                src="/login/ico-chevron-right-20.svg"
                alt="chevron-right-20"
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
