import Link from "next/link";

export default function WithDraw() {
  return (
    <div>
      <div className="w-[448px] px-[32px]  justify-center mt-[96px] mb-[600px] red">
        <Link href={"/"}>
          <img
            className="w-[214px] h-[40px] mx-auto"
            src="/header/rhaon-ci.png"
            alt="logo"
          />
        </Link>

        <h3 className="flex-center mx-auto w-[342px] h-[42] text-[#101828] pb-[12px] text-[20px] font-bold mt-[30px]">
          회원탈퇴 신청
        </h3>

        <div className="flex-center text-[15px] text-[#475467] leading-[24px]">
          탈퇴하고자 하는 회원의 계정 정보를 확인해주세요.
        </div>

        <div className="mt-[20px] w-[384px] h-[179px] border border-[var(--border-color)] rounded-[8px] px-[20px]">
          <div className="font-bold text-center w-[342px] h-[89px]  border-b border-[var(--border-color)]  py-[20px] text-[#101828] text-[16px]">
            아이디
            <div className="text-[16px] text-[#8544E2]">test123@naver.com</div>
          </div>

          <div className="font-bold text-center w-[342px] h-[89px] py-[20px] text-[#101828] text-[16px]">
            닉네임
            <div className="text-[16px] text-[#8544E2]">Guest</div>
          </div>
        </div>

        <div className="flex flex-col gap-[12px] mt-[30px] bg-[#f9FaFb] p-[16px] text-[12px] rounded-[8px]">
          <h2 className="font-bold mt-[30px] text-[13px]">회원탈퇴 안내사항</h2>
          <h2 className="font-bold mt-[30px] mb-[10px] text-[13px]">
            회원탈퇴 전 꼭 확인해주세요!
          </h2>
          <p>
            회원탈퇴 시 영구히 사용할 수 없으며, 해당 계정으로 구매한 모든 게임
            내 캐릭터, 아이템, 전적, 유료 콘텐츠 일체와 라온 캐시가 영구히
            삭제됩니다.
          </p>
          <p>
            단, 탈퇴 후에도 등록하였던 게시물(커뮤니티 게시글 및 댓글)은 그대로
            남아있습니다. 삭제를 원하는 게시글이 있다면 반드시 탈퇴 전 비공개
            처리하거나 삭제하시기 바랍니다.
          </p>
          <p>
            회원탈퇴 시 캐시 잔액이 남아 있는 경우, 이를 환불 신청하거나 탈퇴
            신청 전에 소진하여야 합니다.
          </p>
          <p>
            회원탈퇴를 신청한 계정은 신청일로부터 15일간 계정 복구(탈퇴 취소)가
            가능하며, 기간 경과(신청일로부터 30일간 보관) 이후 영구 삭제
            처리됩니다.
          </p>
          <p>
            법령에 따라 보존의무가 있는 정보는 회원 탈퇴 이후에도 해당 기간동안
            보관될 수 있습니다.
          </p>
        </div>

        <div className="flex-center gap-1 mt-4">
          <input
            className="w-[20px] h-[20px] rouunded-[8px] border border-[var(--border-color)]"
            type="checkbox"
          />
          <p className="text-[13px] text-[#475467]">
            회원 탈퇴에 대한 안내를 모두 확인하였으며, 이에 동의합니다.
          </p>
        </div>

        <button className="w-[120px] h-[32px] mt-[20px] rounded-[8px] font-bold flex-center gap-1 text-[11px] text-[#344054] border border-[var(--border-color)]">
          캐시 잔액 확인하기
          <img src="/signup/arrow-square-up-right.svg" alt="arrow-square" />
        </button>

        <div className="flex items-center justify-between mt-[20px]">
          <button className="w-[184px] h-[50px] text-[16px] font-bold px-[13px] rounded-[8px] border border-[var(--border-color)]">
            탈퇴 취소
          </button>
          <button className="w-[184px] h-[50px] text-[16px] text-[#98A2B3] bg-[#f2f4f7] font-bold  px-[13px] rounded-[8px] border border-[var(--border-color)]">
            탈퇴 확인
          </button>
        </div>
      </div>
    </div>
  );
}
