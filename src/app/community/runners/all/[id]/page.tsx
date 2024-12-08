import CommnetInput from "@/component/community/comment/CommentInput";
import CommentItem from "@/component/community/comment/CommentItem";
import ReplyItem from "@/component/community/comment/ReplyItem";
import ReplyInput from "@/component/community/comment/ReplyInput";
import React from "react";

export default function BoardDetailpage() {
  return (
    <div className="w-[1280px] h-auto px-8 mb-[200px]">
      <div className="flex justify-between text-2xl font-[600] leading-9 text-gray-900">
        런너게시판
        <div className="flex gap-3">
          <button className="flex-center w-[90px] h-[40px] font-bold text-[14px] px-[14px] bg-white text-[#344054] border border-[var(--border-color)] rounded-[8px]">
            <img src="/community/ico-list-20.svg" alt="ico-list" />
            <span>목록</span>
          </button>
          <button className="flex-center w-[90px] h-[40px] font-bold text-[14px] px-[14px] bg-[#098212] text-white rounded-[8px]">
            <img src="/community/ico-edit-20.svg" alt="ico-edit" />
            <span>글쓰기</span>
          </button>
        </div>
      </div>
      {/* 게시판 제목 부분 */}
      <div className="flex flex-col gap-y-1 w-[1216px] h-[108px] bg-[#F9FAFB] py-[20px] px-[32px] mt-[40px]">
        <div className="flex-center w-[40px] h-[25px] text-[10px] border border-[#F9DBAF] bg-[#FEF6EE] text-[#B93815] px-2 rounded-full font-bold">
          자유
        </div>
        <div className="text-[24px] font-bold overflow-hidden text-gray-700 leading-9 text-ellipsis">
          교환구해요
        </div>
      </div>
      {/* 작성자 닉네임 */}
      <div className="flex items-center justify-between w-[1216px] h-[76px] border-b border-[var(--border-color)] px-8 py-4">
        <div className="flex items-center gap-3">
          <span className="flex-center gap-2">
            <img
              className="w-[20px] h-[20px]"
              src="/community/lv_67.png"
              alt="lv_67.png"
            />
            <span>티모</span>
          </span>
          <span className="text-[14px] font-[400] text-gray-400">
            2024-11-27 01:53
          </span>
        </div>
        <div className="flex items-center gap-[50px]">
          <div className="flex items-center gap-5">
            <span className="flex gap-x-1 text-gray-400">
              <img
                className="w-[18px] h-[18px]"
                src="/community/ico-heart-18.svg"
                alt="ico-heart"
              />
              0
            </span>
            <span className="flex gap-x-1 text-gray-400">
              <img
                className="w-[18px] h-[18px]"
                src="/community/ico-eye-18.svg"
                alt="ico-eye"
              />
              7
            </span>
            <span className="flex gap-x-1 text-gray-400">
              <img
                className="w-[18px] h-[18px]"
                src="/community/ico-message-18.svg"
                alt="ico-message"
              />
              7
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button className="w-[44px] h-[44px] flex-center rounded-lg border border-gray-300 hover:border-[#D0D5DD] ">
              <img src="/community/ico-link-20.svg" alt="ico-link" />
            </button>
            <button className="w-[44px] h-[44px] flex-center rounded-lg border border-gray-300 hover:border-[#D0D5DD] ">
              <img src="/community/ico-report-20.svg" alt="ico-report" />
            </button>
            {/* 작성자 */}
            {/*        <button className="w-[44px] h-[44px] flex-center rounded-lg border border-gray-300 hover:border-[#D0D5DD] ">
              <img src="/community/ico-pencil-20.svg" alt="ico-pencil" />
            </button>
            <button className="w-[44px] h-[44px] flex-center rounded-lg border border-gray-300 hover:border-[#D0D5DD] ">
              <img src="/community/ico-trash-20.svg" alt="ico-trash" />
            </button> */}
          </div>
        </div>
      </div>

      {/* 게시판 내용 */}
      <div className="w-[1216px] h-auto px-[32px] pt-[20px] red">
        게시판 내용입니당 <br />
        게시판 내용입니당 <br />
        게시판 내용입니당 <br />
        게시판 내용입니당 <br />
        게시판 내용입니당 <br />
        게시판 내용입니당 <br />
        게시판 내용입니당 <br />
        게시판 내용입니당 <br />
        게시판 내용입니당 <br />
        게시판 내용입니당 <br />
        게시판 내용입니당 <br />
        게시판 내용입니당 <br />
        게시판 내용입니당 <br />
        게시판 내용입니당 <br />
        게시판 내용입니당 <br />
        게시판 내용입니당 <br />
        게시판 내용입니당 <br />
        게시판 내용입니당 <br />
        게시판 내용입니당 <br />
      </div>

      {/* 게시판 좋아요 부분 */}
      <div className="flex-center w-[1216px] h-[154px] py-[48px]">
        <button className="flex-center h-[59px] w-[92px] rounded-full flex items-center py-[22px] gap-x-[10px] border border-gray-300">
          <svg
            width="24"
            height="24"
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

      {/* 작성자 정보 */}
      <div className="flex-center">
        <div className="flex-center w-[1152px] h-[146px] mb-[64px] border border-gray-200 rounded-[8px]">
          <div className="flex items-center  gap-4 w-[881px] h-[96px]">
            <img
              className="rounded-full border-[#F2F4F7] object-cover w-[96px] h-[96px] border-4"
              src="/community/no-character.png"
              alt="no-character"
            />
            <span className="flex-center gap-2">
              <img
                className="w-[20px] h-[20px]"
                src="/community/lv_67.png"
                alt="lv_67.png"
              />
              <span>티모</span>
              <span className="flex-center gap-1 w-[63px] h-[30px] text-[#0C6812] border border-[#0C6812] text-[11px] px-[10px] rounded-[8px]">
                <img
                  className="w-[14px] h-[15px]"
                  src="/community/ico-home-14.svg"
                  alt="home-14"
                />
                광장
              </span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex-center w-[117px] h-[37px] font-bold text-[12px] px-[14px] bg-white text-[#344054] border border-[var(--border-color)] rounded-[8px]">
              <img src="/community/ico-list-20.svg" alt="ico-list" />
              <span>작성글 보기</span>
            </button>
            <button className="flex-center w-[75px] h-[37px] font-bold text-[12px] px-[14px] bg-white text-[#344054] border border-[var(--border-color)] rounded-[8px]">
              <img src="/community/ico-block-20.svg" alt="ico-block" />
              <span>차단</span>
            </button>
          </div>
        </div>
      </div>

      {/* 댓글 작성 하기 */}
      <CommnetInput />

      <div>
        {/* 댓글 개수 div */}
        <div className="flex items-center gap-3 mt-[64px] w-[1216px] h-[73px] bg-[#F9FAFB] px-[32px]">
          <span className="text-[20px] text-[#98A2B3]">댓글</span>
          <span className="text-[20px] text-[#098212]">7</span>
        </div>

        {/* 댓글 */}
        <CommentItem />

        {/* 대댓글 ui */}
        <ReplyItem />

        {/* 대댓글 인풋 */}
        <ReplyInput />

        {/* 답글 더보기 버튼*/}
        <div className="mb-[20px] mx-[550px]">
          <button className="flex-center w-[117px] h-[37px] text-[#98A2B3] rounded-[8px] border border-[var(--border-color)]">
            답글 더보기
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 8L10 13L15 8"
                stroke="#98A2B3"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
