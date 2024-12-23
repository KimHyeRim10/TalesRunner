"use client";

import React, { useEffect } from "react";
import { getUser } from "@/utils/localStorage";
import { UserInfo } from "@/types/userInfo";
import { formatCreatedAt } from "@/utils/formatCreatedAt";
import ReplyLikeIcon from "@/icons/community/ReplyLikeIcon";
import { useComment } from "@/context/CommentContext";

type Props = {
  boardId: string; // id 값을 props로 받을 것임
  commentId: string;
};

export default function ReplyItem({ boardId, commentId }: Props) {
  const userInfo: UserInfo | null = getUser();
  const { replyList, getReplyList, fetchDeleteReply } = useComment();

  useEffect(() => {
    getReplyList(boardId, commentId);
  }, [boardId]);

  const filteredReplies = replyList.filter(
    (reply) => reply.comment_id === commentId
  );

  /* 대댓글 삭제 */
  const handleDeleteReply = (replyId: string) => {
    fetchDeleteReply(boardId, commentId, replyId);
  };

  return (
    <>
      {filteredReplies.map((reply: any) => (
        <React.Fragment key={reply.id}>
          <div className="flex gap-3 w-[1216px] min-h-[169px] mx-auto  px-8 py-6 pl-[96px]">
            <div>
              <img
                className="rounded-full border-[#F2F4F7] object-cover w-[51px] h-[51px] border-2"
                src={reply.profile}
                alt="no-character"
              />
            </div>
            <div className="flex w-[1016px] flex-col">
              <div className="relative flex items-center justify-between h-[36px]">
                <div className="flex-center gap-2">
                  <img
                    className="w-[20px] h-[20px]"
                    src={reply.user_level || "/uploads/v1/level/lv_03.png"}
                    alt="level"
                  />
                  <span style={{ color: reply.nickname_color || "#FFA500" }}>
                    {reply.user_nickname}
                  </span>
                  {userInfo?.nickname === reply.user_nickname && (
                    <span className="flex-center w-[49px] h-[22px] rounded-full text-[12px] text-[#0C6812] border border-green-600">
                      작성자
                    </span>
                  )}
                  <span className="text-[14px] text-[#98A2B3]">
                    {formatCreatedAt(reply.created_at)}
                  </span>
                </div>
                <div className="group">
                  <img
                    className="w-[20px] h-[20px] group-hover:opacity-100"
                    src="/community/ico-dots-horizon-20.svg"
                    alt="더보기"
                  />

                  {/* 더보기 메뉴1 */}
                  {userInfo?.nickname === reply.user_nickname ? (
                    <>
                      <div className="group-hover:opacity-100 opacity-0 absolute right-[-1px] flex flex-col justify-center items-center z-10 w-[81px] h-[92px] bg-white rounded-[8px] border border-[var(--border-color)]">
                        <div className="flex-center w-[81px] h-[41] py-[10px] gap-x-2  text-[14px] cursor-pointer">
                          <img
                            src="/community/ico-pencil-20.svg"
                            alt="ico-pencil"
                          />
                          <span>수정</span>
                        </div>
                        <div
                          onClick={() => handleDeleteReply(reply.id)}
                          className="flex-center w-[81px] h-[41] py-[10px] gap-1 text-[14px] cursor-pointer"
                        >
                          <img
                            src="/community/ico-trash-20.svg"
                            alt="ico-trash"
                          />
                          <span>삭제</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="group-hover:opacity-100 opacity-0 absolute right-[-1px] flex flex-col justify-center items-center z-10 w-[81px] h-[92px] bg-white rounded-[8px] border border-[var(--border-color)]">
                        <div className="flex-center w-[81px] h-[41] py-[10px] gap-x-2  text-[14px] cursor-pointer">
                          <img
                            src="/community/ico-report-20.svg"
                            alt="ico-report"
                          />
                          <span>신고</span>
                        </div>
                        <div className="flex-center w-[81px] h-[41] py-[10px] gap-1 text-[14px] cursor-pointer">
                          <img
                            src="/community/ico-block-20.svg"
                            alt="ico-block"
                          />
                          <span>차단</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="min-h-[48px] font-bold py-[12px]">
                <p>{reply.content}</p>
              </div>
              <div className="flex items-center justify-end w-[1012px] h-[37px]">
                <button className="flex-center w-[58px] h-[37px] rounded-[8px] flex items-center gap-x-[6px] border border-gray-300">
                  <ReplyLikeIcon />
                  <span className="text-[18px] font-bold leading-[27px] text-gray-400">
                    0
                  </span>
                </button>
              </div>
            </div>
          </div>
        </React.Fragment>
      ))}
    </>
  );
}
