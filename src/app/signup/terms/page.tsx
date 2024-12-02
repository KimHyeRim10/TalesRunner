"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "@/context/FormContext";
import { validateCheckTerms } from "@/utils/validate";

export default function SignupTerms() {
  const router = useRouter();
  const { formData, handleCheck } = useForm();

  const handleButtonClick = () => {
    validateCheckTerms(formData, router); // router 객체를 전달
  };

  return (
    <div>
      <div className="w-[448px] h-[582px] px-[32px]  justify-center mt-[96px] mb-[600px]">
        <Link href={"/"}>
          <img
            className="w-[214px] h-[40px] mx-auto"
            src="/header/rhaon-ci.png"
            alt="logo"
          />
        </Link>

        <div className="mt-[40px] mb-[30px]">
          <div className="flex items-center justify-between w-[384px] h-[63px] border-b border-[#cda9ff]">
            <div className="flex items-center gap-2">
              <input
                onChange={(e) => handleCheck("all", e.target.checked)}
                className="w-[20px] custom-input h-[20px] border rounded-md border-gray-300 checked:bg-purple-500"
                type="checkbox"
              />
              <label className="text-[14px]  text-[475467]" htmlFor="">
                모두 동의
              </label>
            </div>
            <img src="/signup/ico-chevron-right-20.svg" alt=">" />
          </div>
          <div className="flex items-center justify-between w-[384px] h-[63px] border-b boder-[var(--border-color)]">
            <div className="flex items-center gap-2">
              <input
                name="terms"
                checked={formData.terms}
                onChange={(e) => handleCheck("terms", e.target.checked)}
                className="w-[20px] h-[20px] border rounded-md border-gray-300 checked:bg-purple-500"
                type="checkbox"
              />
              <label className="text-[14px] text-[475467]" htmlFor="">
                라온 서비스 이용약관
              </label>
            </div>
            <img src="/signup/ico-chevron-right-20.svg" alt=">" />
          </div>
          <div className="flex items-center  justify-between w-[384px] h-[63px] border-b boder-[var(--border-color)]">
            <div className="flex items-center gap-2">
              <input
                name="personal"
                checked={formData.personal}
                onChange={(e) => handleCheck("personal", e.target.checked)}
                className="w-[20px] h-[20px]  border rounded-md border-gray-300 checked:bg-purple-500"
                type="checkbox"
              />
              <label className="text-[14px] text-[475467]" htmlFor="">
                개인정보 수집 및 이용 동의
              </label>
            </div>
            <img src="/signup/ico-chevron-right-20.svg" alt=">" />
          </div>
          <div className="flex items-center justify-between w-[384px] h-[63px] border-b boder-[var(--border-color)]">
            <div className="flex items-center gap-2">
              <input
                name="sns"
                checked={formData.sns}
                onChange={(e) => handleCheck("sns", e.target.checked)}
                className="w-[20px] h-[20px] border rounded-md border-gray-300 checked:bg-purple-500"
                type="checkbox"
              />
              <label className="text-[14px] text-[475467]" htmlFor="">
                광고성 정보 주신 동의&nbsp;
                <span className="text-[#8544E2]">(선택)</span>
              </label>
            </div>
            <img src="/signup/ico-chevron-right-20.svg" alt=">" />
          </div>
        </div>

        <button
          onClick={handleButtonClick}
          className="w-[384px] h-[50px] bg-[#f2f4f7] text-[#98a2b3] border border-[#f2f4f7] text-[16px] px-[13px] rounded-[8px]"
        >
          동의 후 계속하기
        </button>
      </div>
    </div>
  );
}
