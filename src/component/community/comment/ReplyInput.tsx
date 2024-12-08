export default function Input() {
  return (
    <div className="flex justify-end gap-3 w-[1216px] min-h-[180px] pr-[32px] pl-[96px]">
      <div>
        <img
          className="rounded-full border-[#F2F4F7] object-cover w-[52px] h-[52px] border-2"
          src="/community/no-character.png"
          alt="no-character"
        />
      </div>
      <div className="border border-[var(--border-color)] rounded-[8px] w-[1024px] h-auto px-[14px] py-3">
        <div className="min-h-[96px] border-b border-[var(--border-color)]">
          <div
            className="placeholder-comment w-[1000px] min-h-[90px] outline-none"
            contentEditable="true"
            data-placeholder="댓글을 입력해 주세요."
          ></div>
        </div>
        <div className="flex justify-between gap-1 items-center p-[8px] w-[994px] h-[58px]">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="stroke-gray-400 "
              d="M12.15 15.75H5.19853C4.74417 15.75 4.51699 15.75 4.41179 15.6602C4.32051 15.5822 4.27207 15.4652 4.28149 15.3456C4.29234 15.2077 4.45298 15.047 4.77426 14.7257L11.1515 8.34853C11.4485 8.05152 11.597 7.90301 11.7682 7.84737C11.9189 7.79842 12.0811 7.79842 12.2318 7.84737C12.403 7.90301 12.5515 8.05152 12.8485 8.34853L15.75 11.25V12.15M12.15 15.75C13.4101 15.75 14.0402 15.75 14.5215 15.5048C14.9448 15.289 15.289 14.9448 15.5048 14.5215C15.75 14.0402 15.75 13.4101 15.75 12.15M12.15 15.75H5.85C4.58988 15.75 3.95982 15.75 3.47852 15.5048C3.05516 15.289 2.71095 14.9448 2.49524 14.5215C2.25 14.0402 2.25 13.4101 2.25 12.15V5.85C2.25 4.58988 2.25 3.95982 2.49524 3.47852C2.71095 3.05516 3.05516 2.71095 3.47852 2.49524C3.95982 2.25 4.58988 2.25 5.85 2.25H12.15C13.4101 2.25 14.0402 2.25 14.5215 2.49524C14.9448 2.71095 15.289 3.05516 15.5048 3.47852C15.75 3.95982 15.75 4.58988 15.75 5.85V12.15M7.875 6.375C7.875 7.20343 7.20343 7.875 6.375 7.875C5.54657 7.875 4.875 7.20343 4.875 6.375C4.875 5.54657 5.54657 4.875 6.375 4.875C7.20343 4.875 7.875 5.54657 7.875 6.375Z"
              stroke="#344054"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          <div className="flex items-center gap-3">
            <span className="text-[14px] text-[#98A2B3]">0 / 1000</span>
            <button className="w-[80px] h-[41px] rounded-lg text-[#344054] text-[14px] bg-white border">
              취소
            </button>
            <button className="w-[80px] h-[41px] rounded-lg text-white text-[14px] bg-[#475467]">
              등록
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
