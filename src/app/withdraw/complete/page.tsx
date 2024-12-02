import Link from "next/link";

export default function WithDrawComplete() {
  return (
    <div>
      <div className="w-[448px] h-[582px] px-[32px] justify-center mt-[96px] mb-[600px]">
        <Link href={"/"}>
          <img
            className="w-[214px] h-[40px] mx-auto"
            src="/header/rhaon-ci.png"
            alt="logo"
          />
        </Link>
        <img
          className="mx-auto w-[150px] h-[160px] mt-[40px] mb-[30px]"
          src="/signup/rhaoni.png"
          alt="라오니"
        />

        <h3 className="flex-center mx-auto w-[342px] h-[42] text-[#101828] pb-[12px] text-[20px] font-bold">
          회원탈퇴 신청이 완료되었습니다.
        </h3>

        <div className="text-center text-[15px] text-[#475467] leading-[24px]">
          <p>탈퇴 신청 이후 15일간 계정복구(탈퇴 취소)가 가능하며,</p>
          <p>기간 경과시 영구 삭제 처리됩니다.</p>
        </div>

        <Link href={"/"}>
          <button
            className="w-[384px] h-[50px] px-[13px] text-white bg-[#8544E2] text-[16px] rounded-[8px] mt-7"
            type="submit"
          >
            확인
          </button>
        </Link>
      </div>
    </div>
  );
}
