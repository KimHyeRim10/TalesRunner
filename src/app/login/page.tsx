"use client";

import Link from "next/link";
import Image from "next/image";
import ReCAPTCHA from "react-google-recaptcha";
import SocialLogin from "@/component/signup/SocialLogin";
import { useForm } from "@/context/FormContext";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRef, MutableRefObject } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

type InputRefs = Record<string, MutableRefObject<HTMLInputElement | null>>;

export default function Login() {
  const { formData, handleChange, clearFormData } = useForm();
  const router = useRouter();
  const { refreshUserData } = useUser();

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY as string;
  const [failedAttempts, setFailedAttempts] = useState(0); // 실패 횟수
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaVerified, setCaptchaVerified] = useState(false); // reCAPTCHA 검증 상태
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const refs: InputRefs = {
    emailRef: useRef<HTMLInputElement | null>(null),
    userPassRef: useRef<HTMLInputElement | null>(null),
  };

  useEffect(() => {
    return () => {
      clearFormData(); // 페이지를 벗어날 때 초기화
    };
  }, []);

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token); // reCAPTCHA에서 받은 토큰 저장
    setCaptchaVerified(!!token); // CAPTCHA 검증 여부
  };

  // ReCAPTCHA 상태를 초기화하는 함수
  const resetCaptcha = () => {
    if (recaptchaRef.current) {
      recaptchaRef.current.reset(); // ReCAPTCHA 컴포넌트 초기화
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 실패 횟수 초과 시 CAPTCHA 검증 여부 확인
    if (failedAttempts >= 3 && !captchaVerified) {
      alert("체크박스를 클릭하여 인증을 완료하여 로봇이 아님을 증명해주세요.");
      return;
    }

    try {
      const response = await axios.post("/api/auth/login", {
        email: formData.email,
        password: formData.userPass,
        captchaToken: failedAttempts >= 3 ? captchaToken : undefined, // CAPTCHA 토큰 전송
        failedAttempts,
      });

      if (response.data.success) {
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
        setFailedAttempts(0); // 성공 시 실패 횟수 초기화
        setCaptchaVerified(false); // CAPTCHA 상태 초기화
        setCaptchaToken(null); // CAPTCHA 토큰 초기화
        refreshUserData(); // UserProvider 상태 즉시 업데이트
        router.push("/");
      } else {
        // 새로운 CAPTCHA 인증 필요
        setFailedAttempts((prev) => prev + 1);
        if (failedAttempts >= 3) {
          setCaptchaVerified(false); // CAPTCHA 검증 초기화
          setCaptchaToken(null); // 새로 인증 필요
        }
        alert("로그인에 실패했습니다");
      }
    } catch (error) {
      // 서버 오류 시 CAPTCHA 상태 초기화
      setFailedAttempts((prev) => prev + 1);
      setCaptchaVerified(false); // CAPTCHA 상태 초기화
      setCaptchaToken(null); // CAPTCHA 토큰 초기화
      resetCaptcha();
      alert("아이디 또는 비밀번호가 일치하지 않습니다. 다시 시도해 주세요.");
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-[448px] h-[582px] px-[32px]  justify-center mt-[96px] mb-[600px]">
        <Link href={"/"}>
          <Image
            width={214}
            height={40}
            style={{ width: "214px", height: "40px" }}
            className="mx-auto"
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

          <div className="flex items-center gap-2 mb-[10px]">
            <input
              className="w-[16px] h-[16px] border border-[#D0D5DD] rounded-[8px]"
              type="checkbox"
            />
            <span className="text-[14px] text-[#667085] relative top-[1px]">
              로그인 유지
            </span>
          </div>

          {failedAttempts >= 3 && (
            <ReCAPTCHA
              key={failedAttempts} // 강제 재렌더링
              ref={recaptchaRef} // ReCAPTCHA 초기화 참조
              sitekey={siteKey}
              onChange={handleCaptchaChange}
            />
          )}

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
              <Image
                width={20}
                height={20}
                style={{ width: "20px", height: "20px" }}
                src="/login/stove.png"
                alt="stove"
              />
              <span className="text-[#344054] text-[12px]">
                스토브 바로가기
              </span>
              <Image
                width={14}
                height={14}
                className="w-[14px] h-[14px]"
                src="/login/ico-chevron-right-20.svg"
                alt="chevron-right-20"
              />
            </div>
            <div className="flex-center cursor-pointer gap-[6px] w-[184px] h-[31px] border border-[#d5d5dd] rounded-[8px]">
              <Image
                width={20}
                height={20}
                style={{ width: "20px", height: "20px" }}
                src="/login/hangame.png"
                alt="hangame"
              />
              <span className="text-[#344054] text-[12px]">
                한게임 바로가기
              </span>
              <Image
                width={14}
                height={14}
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
