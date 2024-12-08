export default function CommentItem() {
  return (
    <div className="flex gap-2 w-[1216px] min-h-[169px] mx-auto px-[24px] py-[32px]">
      <div>
        <img
          className="rounded-full border-[#F2F4F7] object-cover w-[51px] h-[51px] border-2"
          src="/community/no-character.png"
          alt="no-character"
        />
      </div>
      <div className="flex flex-col">
        <div className="relative flex items-center justify-between w-[1088px] h-[36px]">
          <div className="flex-center gap-2">
            <img
              className="w-[20px] h-[20px]"
              src="/community/lv_67.png"
              alt="level"
            />
            <span>티모</span>
            <span className="flex-center w-[49px] h-[22px] rounded-full text-[12px] text-[#0C6812] border border-green-600">
              작성자
            </span>
            <span className="text-[14px] text-[#98A2B3]">16시간 전</span>
          </div>
          <div className="group">
            <img
              className="w-[20px] h-[20px] group-hover:opacity-100"
              src="/community/ico-dots-horizon-20.svg"
              alt="더보기"
            />
            {/* 더보기 메뉴 1 */}
            {/*          <div className="group-hover:opacity-100 opacity-0 absolute right-[-1px] flex flex-col items-center z-10 w-[81px] h-[92px] bg-white rounded-[8px] border border-[var(--border-color)]">
                  <div className="flex-center w-[81px] h-[41] py-[10px] gap-x-2  text-[14px] cursor-pointer">
                    <img src="/community/ico-report-20.svg" alt="ico-report" />
                    <span>신고</span>
                  </div>
                  <div className="flex-center w-[81px] h-[41] py-[10px] gap-1 text-[14px] cursor-pointer">
                    <img src="/community/ico-block-20.svg" alt="ico-block" />
                    <span>차단</span>
                  </div>
                </div> */}

            {/* 더보기 메뉴2 */}
            <div className="group-hover:opacity-100 opacity-0 absolute right-[-1px] flex flex-col items-center z-10 w-[81px] h-[92px] bg-white rounded-[8px] border border-[var(--border-color)]">
              <div className="flex-center w-[81px] h-[41] py-[10px] gap-x-2  text-[14px] cursor-pointer">
                <img src="/community/ico-pencil-20.svg" alt="ico-pencil" />
                <span>수정</span>
              </div>
              <div className="flex-center w-[81px] h-[41] py-[10px] gap-1 text-[14px] cursor-pointer">
                <img src="/community/ico-trash-20.svg" alt="ico-trash" />
                <span>삭제</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[1088px] min-h-[48px] font-bold py-[12px]">
          <p>산타코스튬 무조건드릴게요</p>
        </div>
        <div className="flex items-center justify-between w-[1088px] h-[37px]">
          <button className="w-[80px] h-[37px] font-bold text-[#344054] text-[12px] px-[12px] rounded-lg border border-[var(--border-color)]">
            답글 달기
          </button>
          <button className="flex-center w-[58px] h-[37px] rounded-[8px] flex items-center gap-x-[6px] border border-gray-300">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.4932 5.63581C10.4938 3.2984 7.15975 2.66964 4.65469 4.81001C2.14964 6.95038 1.79697 10.529 3.7642 13.0604C5.39982 15.1651 10.3498 19.6041 11.9721 21.0408C12.1536 21.2016 12.2444 21.2819 12.3502 21.3135C12.4426 21.3411 12.5437 21.3411 12.6361 21.3135C12.7419 21.2819 12.8327 21.2016 13.0142 21.0408C14.6365 19.6041 19.5865 15.1651 21.2221 13.0604C23.1893 10.529 22.8797 6.92787 20.3316 4.81001C17.7835 2.69216 14.4925 3.2984 12.4932 5.63581Z"
                stroke="#98A2B3"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
            <span className="text-[18px] font-bold leading-[27px] text-gray-400">
              0
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
