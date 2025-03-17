"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "@/context/FormContext";
import { useState, useRef } from "react";
import ToolTip from "@/component/signup/ToolTip";
import {
  validateCheckForm,
  passCheck,
  validateUserPass,
} from "@/utils/validate";
import { useEffect } from "react";
import axios from "axios";

export default function SignupForm() {
  const router = useRouter();
  const { formData, handleChange, clearFormData } = useForm();
  const [isNickNameValid, setIsNickNameValid] = useState(false);
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorNickNameMsg, setErrorNickNameMsg] = useState("");
  const [isNickNameChecked, setIsNickNameChecked] = useState(false);
  const [emailOtp, setEmailOtp] = useState("");
  const [isOtpChecked, setIsOtpChecked] = useState(false);
  const [isOtpValid, setIsOtpValid] = useState(false);

  useEffect(() => {
    return () => {
      clearFormData();
    };
  }, []);

  const userNameRef = useRef<HTMLInputElement>(null);
  const userNickNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const userPassRef = useRef<HTMLInputElement>(null);
  const userPassCheckRef = useRef<HTMLInputElement>(null);

  const refs = {
    userNameRef,
    userNickNameRef,
    emailRef,
    userPassRef,
    userPassCheckRef,
  };

  const handleNickNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nickname = e.target.value;
    const isValid =
      /^[a-zA-Z0-9\uAC00-\uD7A3]*$/.test(nickname) && nickname.length >= 2;
    handleChange(e);
    setIsNickNameValid(isValid);

    if (isValid) {
      setErrorNickNameMsg("");
    } else {
      setErrorNickNameMsg("한글,영문 2자이상 가능");
    }
  };

  const handleCheckNickName = async () => {
    try {
      const response = await axios.get("/api/auth/checkNickName", {
        params: { nickname: formData.userNickName },
      });

      if (response.data.isAvailable) {
        alert("사용 가능한 닉네임입니다.");
        setIsNickNameChecked(true);
      } else {
        alert("이미 사용 중인 닉네임입니다.");
        setIsNickNameChecked(false);
      }
    } catch (error) {
      console.log("닉네임 중복 확인 오류:", error);
      alert("닉네임 중복 확인 중 오류가 발생했습니다.");
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    const emailValue = e.target.value;
    setEmail(emailValue);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (emailRegex.test(emailValue)) {
      setIsEmailValid(true);
      setErrorMessage("");
    } else {
      setIsEmailValid(false);
      setErrorMessage("유효한 이메일을 입력하세요.");
    }
  };

  const sendEmail = async () => {
    const response = await axios.post("/api/auth/sendEmail", {
      email: formData.email,
    });
    try {
      if (response.data.success) {
        alert("이메일 발송 성공! 이메일을 확인해 주세요");
      }
    } catch (error) {
      console.log("이메일 발송 실패", error);
    }
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    const emailOtp = e.target.value;

    if (!/^\d*$/.test(emailOtp)) {
      return;
    }
    setEmailOtp(emailOtp);
    if (emailOtp.length === 6) {
      setIsOtpChecked(true);
    } else {
      setIsOtpChecked(false);
    }
  };

  const handleOtpValidation = async () => {
    const response = await axios.post("/api/auth/otpValidation", {
      email: formData.email,
      otp: emailOtp,
    });
    try {
      if (response.data.success) {
        alert("이메일 인증 성공!");
        setIsOtpValid(true);
      } else {
        alert("인증번호가 일치하지 않습니다.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendVerification = async () => {
    if (!isEmailValid) {
      setErrorMessage("유효한 이메일을 입력하세요.");
      return;
    }

    try {
      const response = await axios.get("/api/auth/checkEmail", {
        params: { email: formData.email },
      });

      if (response.data.isAvailable) {
        setErrorMessage("");
        setIsEmailValid(true);

        sendEmail();
      } else {
        alert("이미 사용 중인 이메일입니다! 다른 이메일을 사용해 주세요");
        setErrorMessage("다른 이메일을 입력해 주세요");
        setIsEmailValid(false);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "오류가 발생했습니다.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCheckForm(formData, refs)) {
      return;
    }
    if (!passCheck(formData)) {
      return;
    }
    if (!validateUserPass(formData, refs)) {
      return;
    }
    if (!isNickNameChecked) {
      alert("닉네임 중복확인을 진행해 주세요.");
      return;
    }
    if (!isEmailValid) {
      alert("이메일 확인을 진행해 주세요.");
      return;
    }
    if (!isOtpValid) {
      alert("이메일 인증번호 확인을 진행해 주세요");
      return;
    }
    try {
      const response = await axios.post("/api/auth/signup", formData);
      if (response.data.message) {
        alert("회원가입 성공!");
        router.push("/signup/complete");
      }
    } catch (error) {
      console.error(error.response?.data?.error || error.message);
      alert("회원가입에 실패했습니다.");
    }
  };

  return (
    <div>
      <div className="w-[448px] h-[582px] px-[32px] justify-center mt-[96px] mb-[600px]">
        <Link href={"/"}>
          <Image
            width={214}
            height={40}
            className="mx-auto"
            src="/header/rhaon-ci.png"
            alt="logo"
          />
        </Link>
        <div>
          <ul>
            <li className="w-[384px] h-[76px] mt-[40px]">
              <label className="text-[14px] text-[#344054] mb-[6px] font-bold">
                이름
              </label>
              <div>
                <input
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  ref={refs.userNameRef}
                  className="w-[251px] h-[48px] border border-[var(--border-color)] rounded-[8px] px-[14px]"
                  type="text"
                  placeholder="이름을 입력하세요"
                />
              </div>
            </li>

            <li className="w-[384px] h-[76px] mt-3">
              <label className="text-[14px] text-[#344054] mb-[6px] font-bold">
                닉네임
              </label>
              <div className="flex-center gap-1">
                <input
                  name="userNickName"
                  value={formData.userNickName}
                  onChange={handleNickNameChange}
                  ref={refs.userNickNameRef}
                  className="w-[251px] h-[48px] border border-[var(--border-color)] rounded-[8px] px-[14px]"
                  type="text"
                  placeholder="닉네임을 입력하세요"
                />
                <button
                  onClick={handleCheckNickName}
                  className={`w-[127px] h-[48px] text-[16px] px-[13px] rounded-[8px] ${
                    isNickNameValid
                      ? "bg-[#8544E2] text-white"
                      : "bg-[#f2f4f7] text-[#98A2B3]"
                  }`}
                  disabled={!isNickNameValid}
                >
                  중복 확인
                </button>
              </div>
            </li>

            <li>
              {errorNickNameMsg && (
                <div>
                  <p className="text-red-500">{errorNickNameMsg}</p>
                </div>
              )}
            </li>

            <li className="w-[384px] h-[76px] mt-3">
              <label className="text-[14px] text-[#344054] mb-[6px] font-bold">
                이메일
              </label>
              <div className="flex items-center gap-1">
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleEmailChange}
                  ref={refs.emailRef}
                  className="w-[250px] h-[48px] border border-[var(--border-color)] rounded-[8px] px-[14px]"
                  type="text"
                  placeholder="이메일을 입력하세요"
                />
                <button
                  onClick={handleSendVerification}
                  className={`w-[127px] h-[48px] text-[16px] px-[13px] rounded-[8px] ${
                    errorMessage === "" && email
                      ? "bg-[#8544E2] text-white"
                      : "bg-[#f2f4f7] text-[#98A2B3]"
                  }`}
                  disabled={!email || errorMessage !== ""}
                >
                  인증메일 발송
                </button>
              </div>
            </li>

            <li>
              {errorMessage && (
                <div>
                  <p className="text-red-500">{errorMessage}</p>
                </div>
              )}
            </li>

            <li className="w-[384px] h-[76px] mt-3">
              <label className="text-[14px] text-[#344054] mb-[6px] font-bold">
                인증번호
              </label>
              <div className="flex items-center gap-1">
                <input
                  name="emailOtp"
                  value={emailOtp}
                  onChange={handleOtpChange}
                  className="w-[250px] h-[48px] border border-[var(--border-color)] rounded-[8px] px-[14px]"
                  type="text"
                  placeholder="인증번호 확인"
                />
                <button
                  onClick={handleOtpValidation}
                  className={`w-[127px] h-[48px] rounded-[8px] px-[13px] text-[16px] ${
                    isOtpChecked
                      ? "bg-[#8544E2] text-white"
                      : "text-[#98A2B3] text-[16px] bg-[#f2f4f7]"
                  }`}
                >
                  인증번호 확인
                </button>
              </div>
            </li>

            <li className="w-[384px] h-[76px] mt-3">
              <label className="text-[14px] text-[#344054] mb-[6px] font-bold">
                비밀번호
              </label>
              <div>
                <input
                  name="userPass"
                  value={formData.userPass}
                  onChange={handleChange}
                  ref={refs.userPassRef}
                  className="w-[381px] h-[48px] border border-[var(--border-color)] rounded-[8px] px-[14px]"
                  type="password"
                  placeholder="비밀번호 (영문, 숫자, 특수문자 8~16자)"
                />
              </div>
            </li>

            <li className="w-[384px] h-[76px] mt-3">
              <div className="flex items-center justify-between mb-[6px]">
                <label className="text-[14px] text-[#344054] font-bold">
                  비밀번호 재입력
                </label>
                <ToolTip />
              </div>
              <div>
                <input
                  name="userPassCheck"
                  value={formData.userPassCheck}
                  onChange={handleChange}
                  ref={refs.userPassCheckRef}
                  className="w-[381px] h-[48px] border border-[var(--border-color)] rounded-[8px] px-[14px]"
                  type="password"
                  placeholder="비밀번호 재입력"
                />
              </div>
            </li>
          </ul>

          <button
            onClick={handleSubmit}
            className="w-[384px] h-[50px] px-[13px] text-white bg-[#8544E2] text-[16px] rounded-[8px] mt-7"
            type="submit"
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}
