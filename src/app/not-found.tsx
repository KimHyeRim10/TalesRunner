"use client";

import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  const goBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "/";
    }
  };

  return (
    <div>
      <div className="w-[594px] h-[1270px] px-[32px]  justify-center mt-[96px] mb-[600px]">
        <Image
          width={158}
          height={100}
          className="mx-auto"
          src="/header/tr-ci.svg"
          alt="logo"
        />
        <Image
          width={400}
          height={304}
          className="mx-auto mt-[20px]"
          src="/home/error.png"
          alt="error-image"
        />

        <h3 className="flex-center mt-[20px] text-[24px] text-[#F04C29] mx-auto font-[600]">
          요청하신 페이지를 찾을 수 없습니다.
        </h3>

        <div className="flex-center flex-col font-[600] mt-[20px] text-[16px] text-[#344054]">
          <p>페이지의 주소가 잘못 입력되었거나, 변경 혹은 삭제되어</p>
          <p>요청하신 페이지를 찾을 수 없습니다.</p>
          <p>입력하신 주소가 정확한지 다시 한번 확인해 주시기 바랍니다.</p>
        </div>

        <div className="flex-center mt-[20px] gap-5">
          <button
            onClick={goBack}
            className="border border-[var(--border-color)] font-[600] w-[127px] h-[48px] text-[16px] text-[#344054] rounded-[8px]"
          >
            이전 페이지
          </button>
          <Link href={"/"}>
            <button className="bg-[#098212] border border-[#098212] font-[600]  w-[127px] h-[48px] text-[16px] text-[#ffffff] rounded-[8px]">
              공식 홈패이지
            </button>
          </Link>
        </div>

        <p className="flex-center mt-[20px] text-[#667085] text-[12px]">
          ⓒ RHAON Entertainment. All Rights Reserved
        </p>
      </div>
    </div>
  );
}
