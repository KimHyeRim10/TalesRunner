"use client";

import React from "react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { formatCreatedAt } from "@/utils/formatCreatedAt";
import { getUser } from "@/utils/localStorage";
import { UserInfo } from "@/types/userInfo";
import { useComment } from "@/context/CommentContext";

import ReplyItem from "./ReplyItem";
import ReplyInput from "./ReplyInput";
import CommentLikeIcon from "@/icons/community/CommentLikeIcon";

type Props = {
  id: string;
};

export default function CommentItem({ id }: Props) {
  const userInfo: UserInfo | null = getUser();
  const { commentList, getCommentList, fetchDeleteComment } = useComment();
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null); // ReplyInput 활성화 상태 관리

  /* 댓글리스트 가져오기 */
  useEffect(() => {
    getCommentList(id);
  }, [id]);

  const handleReplyClick = (commentId: string) => {
    setActiveReplyId((prev) => (prev === commentId ? null : commentId)); // 토글 방식
  };

  /* 댓글 삭제 */
  const handleDelete = (commentId: string) => {
    fetchDeleteComment(id, commentId);
  };

  return (
    <>
      {commentList.map((comment: any) => (
        <React.Fragment key={comment.id}>
          <div className="flex gap-2 w-[1216px] min-h-[169px] mx-auto px-[24px] py-[32px]">
            <div>
              <Image
                width={51}
                height={51}
                style={{ width: "51px", height: "51px" }}
                className="rounded-full border-[#F2F4F7] object-cover border-2"
                src={comment.profile}
                alt="no-character"
              />
            </div>
            <div className="flex flex-col">
              <div className="relative flex items-center justify-between w-[1088px] h-[36px]">
                <div className="flex-center gap-2">
                  <Image
                    width={20}
                    height={20}
                    src={comment.user_level || "/uploads/v1/level/lv_03.png"}
                    alt="level"
                  />
                  <span style={{ color: comment.nickname_color || "#FFA500" }}>
                    {comment.user_nickname}
                  </span>
                  {userInfo?.nickname === comment.user_nickname && (
                    <span className="flex-center w-[49px] h-[22px] rounded-full text-[12px] text-[#0C6812] border border-green-600">
                      작성자
                    </span>
                  )}
                  <span className="text-[14px] text-[#98A2B3]">
                    {formatCreatedAt(comment.created_at)}
                  </span>
                </div>
                <div className="group">
                  <Image
                    width={20}
                    height={20}
                    className="group-hover:opacity-100"
                    src="/community/ico-dots-horizon-20.svg"
                    alt="더보기"
                  />

                  {/* 더보기 메뉴1 */}
                  {userInfo?.nickname === comment.user_nickname ? (
                    <>
                      <div className="group-hover:opacity-100 opacity-0 absolute right-[-1px] flex flex-col justify-center items-center z-10 w-[81px] h-[92px] bg-white rounded-[8px] border border-[var(--border-color)]">
                        <div className="flex-center w-[81px] h-[41] py-[10px] gap-x-2  text-[14px] cursor-pointer">
                          <Image
                            width={16}
                            height={16}
                            src="/community/ico-pencil-20.svg"
                            alt="ico-pencil"
                          />
                          <span>수정</span>
                        </div>
                        <div
                          onClick={() => handleDelete(comment.id)}
                          className="flex-center w-[81px] h-[41] py-[10px] gap-2 text-[14px] cursor-pointer"
                        >
                          <Image
                            width={16}
                            height={16}
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
                          <Image
                            width={16}
                            height={16}
                            src="/community/ico-report-20.svg"
                            alt="ico-report"
                          />
                          <span>신고</span>
                        </div>
                        <div className="flex-center w-[81px] h-[41] py-[10px] gap-2 text-[14px] cursor-pointer">
                          <Image
                            width={16}
                            height={16}
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
              <div className="w-[1088px] min-h-[48px] font-bold py-[12px]">
                <p>{comment.content}</p>
              </div>
              <div className="flex items-center justify-between w-[1088px] h-[37px]">
                <button
                  onClick={() => handleReplyClick(comment.id)}
                  className="w-[80px] h-[37px] font-bold text-[#344054] text-[12px] px-[12px] rounded-lg border border-[var(--border-color)]"
                >
                  답글 달기
                </button>
                <button className="flex-center w-[58px] h-[37px] rounded-[8px] flex items-center gap-x-[6px] border border-gray-300">
                  <CommentLikeIcon />
                  <span className="text-[18px] font-bold leading-[27px] text-gray-400">
                    0
                  </span>
                </button>
              </div>
            </div>
          </div>
          <ReplyItem boardId={id} commentId={comment.id} />
          {activeReplyId === comment.id && (
            <ReplyInput boardId={id} commentId={comment.id} />
          )}
        </React.Fragment>
      ))}
    </>
  );
}
