"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

import { getUser } from "@/utils/localStorage";
import { formatCreatedAt } from "@/utils/formatCreatedAt";
import BoardNotice from "@/component/community/BoardNotice";
import CheckIcon from "@/icons/community/CheckIcon";

export default function Runners() {
  const router = useRouter();
  const [isTitleDropdown, setIsTitleDropdown] = useState(false);
  const [isNicknameDropdown, setIsNicknameDropdown] = useState<number | null>(
    null
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [boardList, setBoardList] = useState([]);

  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const itemsPerPage = 15; // 페이지당 보여줄 항목 수
  const maxPageButtons = 10; // 네비게이션 바에 표시할 최대 페이지 수
  const pagesPerJump = 10; // 10페이지씩 건너뛸 때 사용

  // 페이지네이션 처리
  const startIndex = (currentPage - 1) * itemsPerPage; // 현재 페이지의 시작 인덱스
  const endIndex = startIndex + itemsPerPage; // 현재 페이지의 끝 인덱스
  const currentItems = boardList.slice(startIndex, endIndex); // 현재 페이지에 해당하는 데이터

  const totalPages = Math.ceil(boardList.length / itemsPerPage); // 전체 페이지 수 계산

  // 현재 페이지를 기준으로 네비게이션 바에 표시할 페이지 범위 계산
  const startPage = Math.max(currentPage - Math.floor(maxPageButtons / 2), 1);
  const endPage = Math.min(startPage + maxPageButtons - 1, totalPages);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  /* 검색바 드롭다운  */
  const isTitleDropdownOpen = () => {
    setIsTitleDropdown(!isTitleDropdown);
  };

  /* 닉네임 드롭다운 */
  const isNicknameDropdownOpen = (id: number) => {
    setIsNicknameDropdown((prevId) => (prevId === id ? null : id));
  };

  useEffect(() => {
    // 로그인 여부 확인
    const userInfo = getUser();
    if (userInfo) {
      setIsLoggedIn(true); // 로그인 상태 설정
    } else {
      setIsLoggedIn(false); // 로그아웃 상태 설정
    }

    const fetchBoardList = async () => {
      try {
        const response = await axios.get("/api/board/getBoardList");
        if (response.data.success) {
          setBoardList(response.data.boardList);
        } else {
          console.error("게시판 목록 가져오기 실패:", response.data.error);
        }
      } catch (error) {
        console.error("API 호출 실패:", error);
      }
    };

    fetchBoardList();
  }, []);

  const handleWriteClick = () => {
    if (!isLoggedIn) {
      alert("로그인 후 이용해 주세요");
      router.push("/login");
      return;
    }
    router.push("/community/runners/write");
  };

  return (
    <>
      <div className="w-[1280px] h-[1496px] px-8 mb-[200px]">
        <div className="flex items-center justify-between mb-[32px]">
          <div className="text-2xl font-[600] leading-9 text-gray-900">
            런너게시판
          </div>
          <form className="flex gap-2 items-center " action="">
            <div className="relative flex items-center justify-between text-[14px] rounded-[8px] border border-[var(--border-color)] w-[105px] h-[40px] px-[14px]">
              제목
              <img
                onClick={isTitleDropdownOpen}
                className="w-[20px] h-[20px]"
                src="/community/arrow-bottom.jpg"
                alt="arrow-bottom"
              />
              {/* 제목 드롭다운 */}
              {isTitleDropdown && (
                <div className="absolute left-0 top-[50px] z-10 flex flex-col w-[104px] h-[135px] rounded-[8px] border border-[var(--border-color)] py-1 text-[14px] bg-white text-[#344054] ">
                  <div className="flex items-center justify-start h-[41px] leading-[41px] px-3 hover:bg-gray-50 cursor-pointer">
                    제목
                  </div>
                  <div className="flex items-center justify-start h-[41px] leading-[41px] px-3 hover:bg-gray-50 cursor-pointer">
                    제목 + 본문
                  </div>
                  <div className="flex items-center justify-start h-[41px] leading-[41px] px-3 hover:bg-gray-50 cursor-pointer">
                    작성자
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between py-[8px] px-[12px] w-[269px] h-[46px] border border-[var(--border-color)] rounded-[8px]">
              <input type="text" name="" placeholder="검색어를 입력하세요" />
              <img
                className="w-[16px] h-[16px]"
                src="/community/ico-search-16.svg"
                alt="돋보기"
              />
            </div>
          </form>
        </div>

        {/* 카테고리 탭 */}
        <div className="flex w-[1216] h-[48px]">
          <div className="flex-center w-[304px] h-[48px] text-[16px] font-bold text-[#667085]  border-l border-r border-t-2 border-t-green-700 bg-white border-[var(--border-color)]">
            전체
          </div>
          <div className="flex-center w-[304px] h-[48px] text-[16px] font-bold text-[#667085] bg-[#F9FAFB] border border-[var(--border-color)]">
            자유
          </div>
          <div className="flex-center w-[304px] h-[48px] text-[16px] font-bold text-[#667085] bg-[#F9FAFB] border border-[var(--border-color)]">
            추첨
          </div>
          <div className="flex-center w-[304px] h-[48px] text-[16px] font-bold text-[#667085] bg-[#F9FAFB] border border-[var(--border-color)]">
            설문
          </div>
        </div>
        {/* 게시판 */}
        <div className="flex gap-4 w-[1216px] h-[30px] mb-[16px] mt-[35px] text-[14px] font-bold">
          <p className="flex gap-1 items-center">
            <CheckIcon />
            <span>최신 등록순</span>
          </p>
          <p className="flex gap-1 items-center">
            <CheckIcon />
            <span className="text-gray-400">최신 댓글등록순</span>
          </p>
          <p className="flex gap-1 items-center">
            <CheckIcon />
            <span className="text-gray-400">좋아요</span>
          </p>
        </div>
        {/* 게시판 목록 */}
        <div className="mb-8 text-base">
          {/* 게시판 공지 테이블 */}
          <BoardNotice />
          {/* 게시판 테이블  */}
          <table>
            <colgroup>
              <col className="w-[656px]" />
              <col className="w-[120px]" />
              <col className="w-[120px]" />
              <col className="w-[200px]" />
              <col className="w-[120px]" />
            </colgroup>
            <tbody>
              {/* 게시판 제목 리스트 */}
              {currentItems.map((board: any) => (
                <tr
                  key={board.id}
                  className="h-[72px] border-b border-[var(--border-color)]"
                >
                  <td>
                    <div className="flex items-center h-[72px]">
                      <span className="ml-4 mr-3 w-[40px] h-[25px] text-[10px] border border-[#F9DBAF] bg-[#FEF6EE] text-[#B93815] px-2 rounded-full font-bold">
                        자유
                      </span>
                      <Link href={`/community/runners/all/${board.id}`}>
                        <span className="flex items-center text-[16px] text-[#344054] truncate cursor-pointer max-w-[580px]">
                          <p className="hover:underline truncate">
                            {board.title}
                          </p>
                          &nbsp;
                          <p className="text-green-700">
                            {board.comment_count > 0
                              ? `[${board.comment_count}]`
                              : ""}
                          </p>
                        </span>
                      </Link>
                    </div>
                  </td>
                  <td className="pl-6 pr-0">
                    <span className="flex gap-x-1 text-gray-400">
                      <img
                        className="w-[18px] h-[18px]"
                        src="/community/ico-eye-18.svg"
                        alt="ico-eye"
                      />
                      {board.views ?? 0}
                    </span>
                  </td>
                  <td className="pl-6 pr-0">
                    <span className="flex gap-x-1 text-gray-400">
                      <img
                        className="w-[18px] h-[18px]"
                        src="/community/ico-heart-18.svg"
                        alt="ico-heart"
                      />
                      0
                    </span>
                  </td>
                  <td className="flex items-center h-[72px] pl-[6px] pr-[6px] ">
                    <img
                      className="mr-2"
                      src={board.user_level || "/uploads/v1/level/lv_03.png"}
                      alt="pierrot"
                    />
                    <div className="relative">
                      <span
                        style={{ color: board.nickname_color || "#FFA500" }}
                        onClick={() => isNicknameDropdownOpen(board.id)}
                        className="text-[16px] text-[#475467] cursor-pointer"
                      >
                        {board.user_nickname}
                      </span>
                      {isNicknameDropdown === board.id && (
                        <div className="absolute top-[25px] z-10 flex flex-col items-center justify-center text-center p-[6px] text-[12px] text-[#475467] font-bold w-[110px] h-[91px] rounded-[8px] bg-white border border-[var(--border-color)]">
                          <div className="flex-1 flex items-center justify-center cursor-pointer">
                            작성글 보기
                          </div>
                          <div className="flex-1 flex items-center justify-center cursor-pointer">
                            광장으로 가기
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="text-[16px] text-[#98A2B3] text-center">
                    {formatCreatedAt(board.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 페이지 네비게이션 바 */}
        <div className="grid grid-cols-6 w-[1216px] h-[40px]">
          <div className="col-start-2 col-span-4 flex justify-center gap-x-[2px]">
            {/* "10페이지 이전" 버튼 */}
            <button
              onClick={() =>
                handlePageChange(Math.max(currentPage - pagesPerJump, 1))
              }
              disabled={currentPage <= pagesPerJump}
              className="w-[40px] h-[40px] p-2 rounded-lg bg-gray-50 cursor-pointer disabled:cursor-not-allowed"
            >
              <img
                src="/community/ico-chevron-left-double-bold-24.svg"
                alt="left-double"
              />
            </button>

            {/* "이전" 버튼 */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="w-[40px] h-[40px] p-2 rounded-lg bg-gray-50 cursor-pointer disabled:cursor-not-allowed"
            >
              <img
                src="/community/ico-chevron-left-bold-24.svg"
                alt="left-bold"
              />
            </button>

            {Array.from(
              { length: endPage - startPage + 1 },
              (_, index) => startPage + index
            ).map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`bg-white w-[40px] h-[40px] p-2 rounded-lg cursor-pointer text-gray-500 hover:text-green-600 ${
                  currentPage === pageNumber
                    ? "text-green-600 underline decoration-2  underline-offset-4 decoration-green-600"
                    : "hover:text-green-600"
                }`}
              >
                {pageNumber}
              </button>
            ))}

            {/* "다음" 버튼 */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="w-[40px] h-[40px] p-2 rounded-lg bg-gray-50 cursor-pointer disabled:cursor-not-allowed"
            >
              <img
                src="/community/ico-chevron-right-bold-24.svg"
                alt="right-bold"
              />
            </button>

            {/* "10페이지 이후" 버튼 */}
            <button
              onClick={() =>
                handlePageChange(
                  Math.min(currentPage + pagesPerJump, totalPages)
                )
              }
              disabled={currentPage + pagesPerJump > totalPages}
              className="w-[40px] h-[40px] p-2 rounded-lg bg-gray-50 cursor-pointer disabled:cursor-not-allowed"
            >
              <img
                src="/community/ico-chevron-right-double-bold-24.svg"
                alt="right-double"
              />
            </button>
          </div>

          {/* 글쓰기 버튼 div */}
          <div className="col-span-1 flex justify-end">
            <button
              onClick={handleWriteClick}
              className="flex-center w-[90px] h-[40px] font-bold text-[14px] px-[14px] bg-[#098212] text-white rounded-[8px]"
            >
              <img src="/community/ico-edit-20.svg" alt="ico-edit" />
              <span>글쓰기</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
