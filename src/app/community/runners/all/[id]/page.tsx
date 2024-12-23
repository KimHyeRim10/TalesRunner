"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import React from "react";
import Link from "next/link";
import { format } from "date-fns";
import { getUser } from "@/utils/localStorage";

import CommnetInput from "@/component/community/comment/CommentInput";
import CommentItem from "@/component/community/comment/CommentItem";
import { UserInfo } from "@/types/userInfo";
import BoardLikeIcon from "@/icons/community/BoardLikeIcon";
import ChevronDownIcon from "@/icons/community/ChevronDownIcon";
import Runners from "../page";
import { useComment } from "@/context/CommentContext";

export default function BoardDetailpage() {
  const { id } = useParams() as { id: string }; // 반환 값을 { id: string }으로 단언
  const router = useRouter();
  const userInfo: UserInfo | null = getUser();
  const [boardData, setBoardData] = useState<any>(null);
  const [boardProfile, setBoardProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); //글쓰기 페이지로 가기위한 로그인됨 체크
  const { commentCount, getCommentCount } = useComment();

  const formatDateTime = (dateString: string): string => {
    return dateString ? format(new Date(dateString), "yyyy-MM-dd HH:mm") : "";
  };
  // 로컬 스토리지에서 데이터를 로드

  useEffect(() => {
    /* 조회수 업데이트 api*/
    const updateViewCount = async () => {
      try {
        const response = await axios.post("/api/board/updateView", {
          boardId: id,
        });
        /*     console.log("조회수 업데이트 성공:", response.data); */
      } catch (error) {
        console.log("조회수 업데이트 실패");
      }
    };
    updateViewCount();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("editBoardData");
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setBoardData(parsedData);
        localStorage.removeItem("editBoardData"); // 사용 후 데이터 삭제
      }
    }
  }, []);

  useEffect(() => {
    // 로그인 상태 확인
    if (userInfo) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    // 로컬스토리지에서 데이터 로드
    const savedData = localStorage.getItem("editBoardData");
    if (savedData) {
      setBoardData(JSON.parse(savedData));
      localStorage.removeItem("editBoardData"); // 사용 후 삭제
      setIsLoading(false); // 로딩 완료
      return; // 로컬 데이터를 우선적으로 사용
    }

    // 서버에서 데이터 로드
    const fetchBoardData = async () => {
      try {
        const boardResponse = await axios.get(`/api/board/${id}`);
        const boardData = boardResponse.data;

        setBoardData(boardData);
        setIsLoading(false);

        if (boardData[0]?.user_nickname) {
          const nickname = boardData[0].user_nickname;
          const profileResponse = await axios.get(
            "/api/board/boardDataProfile",
            { params: { nickname } }
          );
          setBoardProfile(profileResponse.data[0]?.profile);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false); // 에러 발생 시 로딩 종료
      }
    };
    fetchBoardData();
    getCommentCount(id);
  }, [id]);

  const handleWriteClick = () => {
    if (!isLoggedIn) {
      alert("로그인 후 이용해 주세요");
      router.push("/login");
      return;
    }
    router.push("/community/runners/write");
  };

  const handleEditBoard = () => {
    const boardDataToEdit = {
      id: boardData[0]?.id,
      title: boardData[0]?.title,
      content: boardData[0]?.content,
      user_level: boardData[0]?.user_level || "/uploads/v1/level/lv_03.png",
      nickname_color: boardData[0]?.nickname_color || "#FFA500",
    };
    localStorage.setItem("editBoardData", JSON.stringify(boardDataToEdit));
    router.push("/community/runners/write");
  };

  /* 게시판 내용 삭제 핸들러 */
  const handleDeleteBoard = async () => {
    try {
      const response = await axios.delete("/api/board/deleteBoard", {
        params: { id },
      });
      if (response) {
        alert("게시글이 삭제되었습니다.");
        router.push("/community/runners/all");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="w-[1280px] h-auto px-8 mb-[200px]">
      <div className="w-[1280px] h-auto px-8 mb-[200px]">
        <div className="flex justify-between text-2xl font-[600] leading-9 text-gray-900">
          런너게시판
          <div className="flex gap-3">
            <Link href={"/community/runners/all"}>
              <button className="flex-center w-[90px] h-[40px] font-bold text-[14px] px-[14px] bg-white text-[#344054] border border-[var(--border-color)] rounded-[8px]">
                <img src="/community/ico-list-20.svg" alt="ico-list" />
                <span>목록</span>
              </button>
            </Link>

            <button
              onClick={handleWriteClick}
              className="flex-center w-[90px] h-[40px] font-bold text-[14px] px-[14px] bg-[#098212] text-white rounded-[8px]"
            >
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
            {boardData[0]?.title}
          </div>
        </div>
        {/* 작성자 닉네임 */}
        <div className="flex items-center justify-between w-[1216px] h-[76px] border-b border-[var(--border-color)] px-8 py-4">
          <div className="flex items-center gap-3">
            <span className="flex-center gap-2">
              <img
                className="w-[20px] h-[20px]"
                src={boardData[0]?.user_level || "/uploads/v1/level/lv_03.png"}
                alt="level-image"
              />
              <span
                style={{ color: boardData[0]?.nickname_color || "#FFA500" }}
              >
                {boardData[0]?.user_nickname}
              </span>
            </span>
            <span className="text-[14px] font-[400] text-gray-400">
              {formatDateTime(boardData[0]?.created_at)}
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
                {boardData[0]?.views ?? 0}
              </span>
              <span className="flex gap-x-1 text-gray-400">
                <img
                  className="w-[18px] h-[18px]"
                  src="/community/ico-message-18.svg"
                  alt="ico-message"
                />
                {commentCount || 0}
              </span>
            </div>
            <div className="flex items-center gap-4">
              {/* 작성자 */}
              {boardData[0]?.user_nickname === userInfo?.nickname ? (
                <>
                  <button className="w-[44px] h-[44px] flex-center rounded-lg border border-gray-300 hover:border-[#D0D5DD] ">
                    <img src="/community/ico-link-20.svg" alt="ico-link" />
                  </button>
                  <button
                    onClick={handleEditBoard}
                    className="w-[44px] h-[44px] flex-center rounded-lg border border-gray-300 hover:border-[#D0D5DD] "
                  >
                    <img src="/community/ico-pencil-20.svg" alt="ico-pencil" />
                  </button>
                  <button
                    onClick={handleDeleteBoard}
                    className="w-[44px] h-[44px] flex-center rounded-lg border border-gray-300 hover:border-[#D0D5DD] "
                  >
                    <img src="/community/ico-trash-20.svg" alt="ico-trash" />
                  </button>
                </>
              ) : (
                <>
                  <button className="w-[44px] h-[44px] flex-center rounded-lg border border-gray-300 hover:border-[#D0D5DD] ">
                    <img src="/community/ico-link-20.svg" alt="ico-link" />
                  </button>
                  <button className="w-[44px] h-[44px] flex-center rounded-lg border border-gray-300 hover:border-[#D0D5DD] ">
                    <img src="/community/ico-report-20.svg" alt="ico-report" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* 게시판 내용 */}
        <div className="w-[1216px] h-auto px-[32px] pt-[50px]">
          {boardData[0]?.content}
        </div>

        {/* 게시판 좋아요 부분 */}
        <div className="flex-center w-[1216px] h-[154px] py-[48px]">
          <button className="flex-center h-[59px] w-[92px] rounded-full flex items-center py-[22px] gap-x-[10px] border border-gray-300">
            <BoardLikeIcon />
            <span className="text-[18px] font-bold leading-[27px] text-gray-400">
              0
            </span>
          </button>
        </div>

        {/* 작성자 정보 */}
        <div className="flex-center">
          <div className="flex items-center justify-between pl-[24px] px-[32px] w-[1152px] h-[146px] mb-[64px] border border-gray-200 rounded-[8px]">
            <div className="flex items-center gap-4 w-[881px] h-[96px]">
              <img
                className="rounded-full border-[#F2F4F7] object-cover w-[96px] h-[96px] border-4"
                src={boardProfile || "/community/no-character.png"}
                alt="no-character"
              />
              <span className="flex-center gap-2">
                <img
                  className="w-[20px] h-[20px]"
                  src={
                    boardData[0]?.user_level || "/uploads/v1/level/lv_03.png"
                  }
                  alt="lv_67.png"
                />
                <span
                  style={{ color: boardData[0]?.nickname_color || "#FFA500" }}
                >
                  {boardData[0]?.user_nickname}
                </span>
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
              {boardData[0]?.user_nickname === userInfo?.nickname ? (
                <>
                  <button className="flex-center w-[117px] h-[37px] font-bold text-[12px] bg-white text-[#344054] border border-[var(--border-color)] rounded-[8px]">
                    <img src="/community/ico-list-20.svg" alt="ico-list" />
                    <span>작성글 보기</span>
                  </button>
                </>
              ) : (
                <>
                  <button className="flex-center w-[117px] h-[37px] font-bold text-[12px] px-[14px] bg-white text-[#344054] border border-[var(--border-color)] rounded-[8px]">
                    <img src="/community/ico-list-20.svg" alt="ico-list" />
                    <span>작성글 보기</span>
                  </button>
                  <button className="flex-center w-[75px] h-[37px] font-bold text-[12px] px-[14px] bg-white text-[#344054] border border-[var(--border-color)] rounded-[8px]">
                    <img src="/community/ico-block-20.svg" alt="ico-block" />
                    <span>차단</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* 댓글 작성 하기 */}
        <CommnetInput id={id} />

        <div>
          {/* 댓글 개수 div */}
          <div className="flex items-center gap-3 mt-[64px] w-[1216px] h-[73px] bg-[#F9FAFB] px-[32px]">
            <span className="text-[20px] text-[#98A2B3]">댓글</span>
            <span className="text-[20px] text-[#098212]">
              {commentCount || 0}
            </span>
          </div>

          {/* 댓글 */}
          <CommentItem id={id} />

          {/* 답글 더보기 버튼*/}
          {commentCount > 10 && (
            <div className="mb-[20px] mx-[550px]">
              <button className="flex-center w-[117px] h-[37px] text-[#98A2B3] rounded-[8px] border border-[var(--border-color)]">
                답글 더보기
                <ChevronDownIcon />
              </button>
            </div>
          )}
        </div>
      </div>
      <Runners />
    </div>
  );
}
