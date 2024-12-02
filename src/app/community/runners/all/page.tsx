"use client";
import { useState } from "react";

export default function Runners() {
  const [isTitleDropdown, setIsTitleDropdown] = useState(false);
  const [isNicknameDropdown, setIsNicknameDropdown] = useState(false);

  const isTitleDropdownOpen = () => {
    setIsTitleDropdown(!isTitleDropdown);
  };

  const isNicknameDropdownOpen = () => {
    setIsNicknameDropdown(!isNicknameDropdown);
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
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="stroke-gray-600"
                d="M16.6666 5L7.49998 14.1667L3.33331 10"
                stroke="#475467"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
            <span>최신 등록순</span>
          </p>
          <p className="flex gap-1 items-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="stroke-gray-400"
                d="M16.6666 5L7.49998 14.1667L3.33331 10"
                stroke="#475467"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
            <span className="text-gray-400">최신 댓글등록순</span>
          </p>
          <p className="flex gap-1 items-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="stroke-gray-400"
                d="M16.6666 5L7.49998 14.1667L3.33331 10"
                stroke="#475467"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
            <span className="text-gray-400">좋아요</span>
          </p>
        </div>
        {/* 게시판 공지 테이블 */}
        <div className="mb-8 text-base ">
          <table className="table-fixed w-full border-collapse">
            <colgroup>
              <col className="w-[896px]" />
              <col className="w-[200px]" />
              <col className="w-[120px]" />
            </colgroup>
            <tbody>
              <tr className="h-[72px] bg-[#F9FAFB] border-b border-[var(--border-color)]">
                <td>
                  <div className="flex items-center h-[72px]">
                    <span className="ml-4 mr-3 w-[40px] h-[25px] text-[10px] border border-[#ABEFC6] bg-[#ECFDF3] text-green-700 px-2 rounded-full font-bold">
                      공지
                    </span>
                    <span className="text-[16px] text-[#344054] truncate hover:underline">
                      이관/이전 시 유의사항 안내
                    </span>
                  </div>
                </td>
                <td>
                  <div className="flex items-center pl-[6px] gap-2 h-[72px]">
                    <img
                      className="w-[20px] h-[20px]"
                      src="/community/lv_998 (2).png"
                      alt="pierrot"
                    />
                    <span className="text-[16px] text-[#475467]">GM삐에로</span>
                  </div>
                </td>
                <td className="text-[16px] text-[#98A2B3] text-center">
                  2024.09.12
                </td>
              </tr>
              <tr className="h-[72px] bg-[#F9FAFB] border-b border-[var(--border-color)]">
                <td>
                  <div className="flex items-center h-[72px]">
                    <span className="ml-4 mr-3 w-[40px] h-[25px] text-[10px] border border-[#ABEFC6] bg-[#ECFDF3] text-green-700 px-2 rounded-full font-bold">
                      공지
                    </span>
                    <span className="text-[16px] text-[#344054] truncate hover:underline">
                      이관/이전 관련 주요 문의사항 안내
                    </span>
                  </div>
                </td>
                <td>
                  <div className="flex items-center pl-[6px] gap-2 h-[72px]">
                    <img
                      className="w-[20px] h-[20px]"
                      src="/community/lv_998 (2).png"
                      alt="pierrot"
                    />
                    <span className="text-[16px] text-[#475467]">GM삐에로</span>
                  </div>
                </td>
                <td className="text-[16px] text-[#98A2B3] text-center">
                  2024.09.12
                </td>
              </tr>
            </tbody>
          </table>
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
              {/* 기본 map 돌릴 예시용 */}
              <tr className="h-[72px] border-b border-[var(--border-color)]">
                <td>
                  <div className="flex items-center h-[72px]">
                    <span className="ml-4 mr-3 w-[40px] h-[25px] text-[10px] border border-[#F9DBAF] bg-[#FEF6EE] text-[#B93815] px-2 rounded-full font-bold">
                      자유
                    </span>
                    <span className="text-[16px] text-[#344054] truncate hover:underline">
                      악마카인 얻고 싶은데요
                    </span>
                  </div>
                </td>
                <td className="pl-6 pr-0">
                  <span className="flex gap-x-1 text-gray-400">
                    <img
                      className="w-[18px] h-[18px]"
                      src="/community/ico-eye-18.svg"
                      alt="ico-eye"
                    />
                    7
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
                    src="/community/lv_111.png"
                    alt="pierrot"
                  />
                  <div className="relative">
                    <span
                      onClick={isNicknameDropdownOpen}
                      className="text-[16px] text-[#475467] cursor-pointer"
                    >
                      테런좋아요
                    </span>
                    {isNicknameDropdown && (
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
                  52분 전
                </td>
              </tr>

              {/* 14 tr */}
              {/*    <tr className="h-[72px] border-b border-[var(--border-color)]">
                <td>
                  <div className="flex items-center h-[72px]">
                    <span className="ml-4 mr-3 w-[40px] h-[25px] text-[10px] border border-[#F9DBAF] bg-[#FEF6EE] text-[#B93815] px-2 rounded-full font-bold">
                      자유
                    </span>
                    <span className="text-[16px] text-[#344054] truncate hover:underline">
                      악마카인 얻고 싶은데요
                    </span>
                  </div>
                </td>
                <td className="pl-6 pr-0">
                  <span className="flex gap-x-1 text-gray-400">
                    <img
                      className="w-[18px] h-[18px]"
                      src="/community/ico-eye-18.svg"
                      alt="ico-eye"
                    />
                    7
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
                <td className="flex items-center h-[72px] pl-[6px] pr-[6px]">
                  <img
                    className="mr-2"
                    src="/community/lv_111.png"
                    alt="pierrot"
                  />
                  <span className="text-[16px] text-[#475467]">테런좋아요</span>
                </td>
                <td className="text-[16px] text-[#98A2B3] text-center">
                  52분 전
                </td>
              </tr>
              <tr className="h-[72px] border-b border-[var(--border-color)]">
                <td>
                  <div className="flex items-center h-[72px]">
                    <span className="ml-4 mr-3 w-[40px] h-[25px] text-[10px] border border-[#F9DBAF] bg-[#FEF6EE] text-[#B93815] px-2 rounded-full font-bold">
                      자유
                    </span>
                    <span className="text-[16px] text-[#344054] truncate hover:underline">
                      악마카인 얻고 싶은데요
                    </span>
                  </div>
                </td>
                <td className="pl-6 pr-0">
                  <span className="flex gap-x-1 text-gray-400">
                    <img
                      className="w-[18px] h-[18px]"
                      src="/community/ico-eye-18.svg"
                      alt="ico-eye"
                    />
                    7
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
                <td className="flex items-center h-[72px] pl-[6px] pr-[6px]">
                  <img
                    className="mr-2"
                    src="/community/lv_111.png"
                    alt="pierrot"
                  />
                  <span className="text-[16px] text-[#475467]">테런좋아요</span>
                </td>
                <td className="text-[16px] text-[#98A2B3] text-center">
                  52분 전
                </td>
              </tr>
              <tr className="h-[72px] border-b border-[var(--border-color)]">
                <td>
                  <div className="flex items-center h-[72px]">
                    <span className="ml-4 mr-3 w-[40px] h-[25px] text-[10px] border border-[#F9DBAF] bg-[#FEF6EE] text-[#B93815] px-2 rounded-full font-bold">
                      자유
                    </span>
                    <span className="text-[16px] text-[#344054] truncate hover:underline">
                      악마카인 얻고 싶은데요
                    </span>
                  </div>
                </td>
                <td className="pl-6 pr-0">
                  <span className="flex gap-x-1 text-gray-400">
                    <img
                      className="w-[18px] h-[18px]"
                      src="/community/ico-eye-18.svg"
                      alt="ico-eye"
                    />
                    7
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
                <td className="flex items-center h-[72px] pl-[6px] pr-[6px]">
                  <img
                    className="mr-2"
                    src="/community/lv_111.png"
                    alt="pierrot"
                  />
                  <span className="text-[16px] text-[#475467]">테런좋아요</span>
                </td>
                <td className="text-[16px] text-[#98A2B3] text-center">
                  52분 전
                </td>
              </tr>
              <tr className="h-[72px] border-b border-[var(--border-color)]">
                <td>
                  <div className="flex items-center h-[72px]">
                    <span className="ml-4 mr-3 w-[40px] h-[25px] text-[10px] border border-[#F9DBAF] bg-[#FEF6EE] text-[#B93815] px-2 rounded-full font-bold">
                      자유
                    </span>
                    <span className="text-[16px] text-[#344054] truncate hover:underline">
                      악마카인 얻고 싶은데요
                    </span>
                  </div>
                </td>
                <td className="pl-6 pr-0">
                  <span className="flex gap-x-1 text-gray-400">
                    <img
                      className="w-[18px] h-[18px]"
                      src="/community/ico-eye-18.svg"
                      alt="ico-eye"
                    />
                    7
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
                <td className="flex items-center h-[72px] pl-[6px] pr-[6px]">
                  <img
                    className="mr-2"
                    src="/community/lv_111.png"
                    alt="pierrot"
                  />
                  <span className="text-[16px] text-[#475467]">테런좋아요</span>
                </td>
                <td className="text-[16px] text-[#98A2B3] text-center">
                  52분 전
                </td>
              </tr>
              <tr className="h-[72px] border-b border-[var(--border-color)]">
                <td>
                  <div className="flex items-center h-[72px]">
                    <span className="ml-4 mr-3 w-[40px] h-[25px] text-[10px] border border-[#F9DBAF] bg-[#FEF6EE] text-[#B93815] px-2 rounded-full font-bold">
                      자유
                    </span>
                    <span className="text-[16px] text-[#344054] truncate hover:underline">
                      악마카인 얻고 싶은데요
                    </span>
                  </div>
                </td>
                <td className="pl-6 pr-0">
                  <span className="flex gap-x-1 text-gray-400">
                    <img
                      className="w-[18px] h-[18px]"
                      src="/community/ico-eye-18.svg"
                      alt="ico-eye"
                    />
                    7
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
                <td className="flex items-center h-[72px] pl-[6px] pr-[6px]">
                  <img
                    className="mr-2"
                    src="/community/lv_111.png"
                    alt="pierrot"
                  />
                  <span className="text-[16px] text-[#475467]">테런좋아요</span>
                </td>
                <td className="text-[16px] text-[#98A2B3] text-center">
                  52분 전
                </td>
              </tr>
              <tr className="h-[72px] border-b border-[var(--border-color)]">
                <td>
                  <div className="flex items-center h-[72px]">
                    <span className="ml-4 mr-3 w-[40px] h-[25px] text-[10px] border border-[#F9DBAF] bg-[#FEF6EE] text-[#B93815] px-2 rounded-full font-bold">
                      자유
                    </span>
                    <span className="text-[16px] text-[#344054] truncate hover:underline">
                      악마카인 얻고 싶은데요
                    </span>
                  </div>
                </td>
                <td className="pl-6 pr-0">
                  <span className="flex gap-x-1 text-gray-400">
                    <img
                      className="w-[18px] h-[18px]"
                      src="/community/ico-eye-18.svg"
                      alt="ico-eye"
                    />
                    7
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
                <td className="flex items-center h-[72px] pl-[6px] pr-[6px]">
                  <img
                    className="mr-2"
                    src="/community/lv_111.png"
                    alt="pierrot"
                  />
                  <span className="text-[16px] text-[#475467]">테런좋아요</span>
                </td>
                <td className="text-[16px] text-[#98A2B3] text-center">
                  52분 전
                </td>
              </tr>
              <tr className="h-[72px] border-b border-[var(--border-color)]">
                <td>
                  <div className="flex items-center h-[72px]">
                    <span className="ml-4 mr-3 w-[40px] h-[25px] text-[10px] border border-[#F9DBAF] bg-[#FEF6EE] text-[#B93815] px-2 rounded-full font-bold">
                      자유
                    </span>
                    <span className="text-[16px] text-[#344054] truncate hover:underline">
                      악마카인 얻고 싶은데요
                    </span>
                  </div>
                </td>
                <td className="pl-6 pr-0">
                  <span className="flex gap-x-1 text-gray-400">
                    <img
                      className="w-[18px] h-[18px]"
                      src="/community/ico-eye-18.svg"
                      alt="ico-eye"
                    />
                    7
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
                <td className="flex items-center h-[72px] pl-[6px] pr-[6px]">
                  <img
                    className="mr-2"
                    src="/community/lv_111.png"
                    alt="pierrot"
                  />
                  <span className="text-[16px] text-[#475467]">테런좋아요</span>
                </td>
                <td className="text-[16px] text-[#98A2B3] text-center">
                  52분 전
                </td>
              </tr>
              <tr className="h-[72px] border-b border-[var(--border-color)]">
                <td>
                  <div className="flex items-center h-[72px]">
                    <span className="ml-4 mr-3 w-[40px] h-[25px] text-[10px] border border-[#F9DBAF] bg-[#FEF6EE] text-[#B93815] px-2 rounded-full font-bold">
                      자유
                    </span>
                    <span className="text-[16px] text-[#344054] truncate hover:underline">
                      악마카인 얻고 싶은데요
                    </span>
                  </div>
                </td>
                <td className="pl-6 pr-0">
                  <span className="flex gap-x-1 text-gray-400">
                    <img
                      className="w-[18px] h-[18px]"
                      src="/community/ico-eye-18.svg"
                      alt="ico-eye"
                    />
                    7
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
                <td className="flex items-center h-[72px] pl-[6px] pr-[6px]">
                  <img
                    className="mr-2"
                    src="/community/lv_111.png"
                    alt="pierrot"
                  />
                  <span className="text-[16px] text-[#475467]">테런좋아요</span>
                </td>
                <td className="text-[16px] text-[#98A2B3] text-center">
                  52분 전
                </td>
              </tr>
              <tr className="h-[72px] border-b border-[var(--border-color)]">
                <td>
                  <div className="flex items-center h-[72px]">
                    <span className="ml-4 mr-3 w-[40px] h-[25px] text-[10px] border border-[#F9DBAF] bg-[#FEF6EE] text-[#B93815] px-2 rounded-full font-bold">
                      자유
                    </span>
                    <span className="text-[16px] text-[#344054] truncate hover:underline">
                      악마카인 얻고 싶은데요
                    </span>
                  </div>
                </td>
                <td className="pl-6 pr-0">
                  <span className="flex gap-x-1 text-gray-400">
                    <img
                      className="w-[18px] h-[18px]"
                      src="/community/ico-eye-18.svg"
                      alt="ico-eye"
                    />
                    7
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
                <td className="flex items-center h-[72px] pl-[6px] pr-[6px]">
                  <img
                    className="mr-2"
                    src="/community/lv_111.png"
                    alt="pierrot"
                  />
                  <span className="text-[16px] text-[#475467]">테런좋아요</span>
                </td>
                <td className="text-[16px] text-[#98A2B3] text-center">
                  52분 전
                </td>
              </tr>
              <tr className="h-[72px] border-b border-[var(--border-color)]">
                <td>
                  <div className="flex items-center h-[72px]">
                    <span className="ml-4 mr-3 w-[40px] h-[25px] text-[10px] border border-[#F9DBAF] bg-[#FEF6EE] text-[#B93815] px-2 rounded-full font-bold">
                      자유
                    </span>
                    <span className="text-[16px] text-[#344054] truncate hover:underline">
                      악마카인 얻고 싶은데요
                    </span>
                  </div>
                </td>
                <td className="pl-6 pr-0">
                  <span className="flex gap-x-1 text-gray-400">
                    <img
                      className="w-[18px] h-[18px]"
                      src="/community/ico-eye-18.svg"
                      alt="ico-eye"
                    />
                    7
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
                <td className="flex items-center h-[72px] pl-[6px] pr-[6px]">
                  <img
                    className="mr-2"
                    src="/community/lv_111.png"
                    alt="pierrot"
                  />
                  <span className="text-[16px] text-[#475467]">테런좋아요</span>
                </td>
                <td className="text-[16px] text-[#98A2B3] text-center">
                  52분 전
                </td>
              </tr>
              <tr className="h-[72px] border-b border-[var(--border-color)]">
                <td>
                  <div className="flex items-center h-[72px]">
                    <span className="ml-4 mr-3 w-[40px] h-[25px] text-[10px] border border-[#F9DBAF] bg-[#FEF6EE] text-[#B93815] px-2 rounded-full font-bold">
                      자유
                    </span>
                    <span className="text-[16px] text-[#344054] truncate hover:underline">
                      악마카인 얻고 싶은데요
                    </span>
                  </div>
                </td>
                <td className="pl-6 pr-0">
                  <span className="flex gap-x-1 text-gray-400">
                    <img
                      className="w-[18px] h-[18px]"
                      src="/community/ico-eye-18.svg"
                      alt="ico-eye"
                    />
                    7
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
                <td className="flex items-center h-[72px] pl-[6px] pr-[6px]">
                  <img
                    className="mr-2"
                    src="/community/lv_111.png"
                    alt="pierrot"
                  />
                  <span className="text-[16px] text-[#475467]">테런좋아요</span>
                </td>
                <td className="text-[16px] text-[#98A2B3] text-center">
                  52분 전
                </td>
              </tr>
              <tr className="h-[72px] border-b border-[var(--border-color)]">
                <td>
                  <div className="flex items-center h-[72px]">
                    <span className="ml-4 mr-3 w-[40px] h-[25px] text-[10px] border border-[#F9DBAF] bg-[#FEF6EE] text-[#B93815] px-2 rounded-full font-bold">
                      자유
                    </span>
                    <span className="text-[16px] text-[#344054] truncate hover:underline">
                      악마카인 얻고 싶은데요
                    </span>
                  </div>
                </td>
                <td className="pl-6 pr-0">
                  <span className="flex gap-x-1 text-gray-400">
                    <img
                      className="w-[18px] h-[18px]"
                      src="/community/ico-eye-18.svg"
                      alt="ico-eye"
                    />
                    7
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
                <td className="flex items-center h-[72px] pl-[6px] pr-[6px]">
                  <img
                    className="mr-2"
                    src="/community/lv_111.png"
                    alt="pierrot"
                  />
                  <span className="text-[16px] text-[#475467]">테런좋아요</span>
                </td>
                <td className="text-[16px] text-[#98A2B3] text-center">
                  52분 전
                </td>
              </tr>
              <tr className="h-[72px] border-b border-[var(--border-color)]">
                <td>
                  <div className="flex items-center h-[72px]">
                    <span className="ml-4 mr-3 w-[40px] h-[25px] text-[10px] border border-[#F9DBAF] bg-[#FEF6EE] text-[#B93815] px-2 rounded-full font-bold">
                      자유
                    </span>
                    <span className="text-[16px] text-[#344054] truncate hover:underline">
                      악마카인 얻고 싶은데요
                    </span>
                  </div>
                </td>
                <td className="pl-6 pr-0">
                  <span className="flex gap-x-1 text-gray-400">
                    <img
                      className="w-[18px] h-[18px]"
                      src="/community/ico-eye-18.svg"
                      alt="ico-eye"
                    />
                    7
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
                <td className="flex items-center h-[72px] pl-[6px] pr-[6px]">
                  <img
                    className="mr-2"
                    src="/community/lv_111.png"
                    alt="pierrot"
                  />
                  <span className="text-[16px] text-[#475467]">테런좋아요</span>
                </td>
                <td className="text-[16px] text-[#98A2B3] text-center">
                  52분 전
                </td>
              </tr>
              <tr className="h-[72px] border-b border-[var(--border-color)]">
                <td>
                  <div className="flex items-center h-[72px]">
                    <span className="ml-4 mr-3 w-[40px] h-[25px] text-[10px] border border-[#F9DBAF] bg-[#FEF6EE] text-[#B93815] px-2 rounded-full font-bold">
                      자유
                    </span>
                    <span className="text-[16px] text-[#344054] truncate hover:underline">
                      악마카인 얻고 싶은데요
                    </span>
                  </div>
                </td>
                <td className="pl-6 pr-0">
                  <span className="flex gap-x-1 text-gray-400">
                    <img
                      className="w-[18px] h-[18px]"
                      src="/community/ico-eye-18.svg"
                      alt="ico-eye"
                    />
                    7
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
                    src="/community/lv_111.png"
                    alt="pierrot"
                  />
                  <div className="relative">
                    <span
                      onClick={isNicknameDropdownOpen}
                      className="text-[16px] text-[#475467] cursor-pointer"
                    >
                      테런좋아요
                    </span>
                    {isNicknameDropdown && (
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
                  52분 전
                </td>
              </tr> */}
              {/* 14 tr 끝----- */}
            </tbody>
          </table>
        </div>

        {/* 페이지 네비게이션 바 */}
        <div className="grid grid-cols-6 w-[1216px] h-[40px]">
          <div className="col-start-2 col-span-4 flex justify-center gap-x-[2px]">
            <button className="w-[40px] h-[40px] p-2 rounded-lg bg-gray-50 cursor-pointer disabled:cursor-not-allowed">
              <img
                src="/community/ico-chevron-left-double-bold-24.svg"
                alt="left-double"
              />
            </button>
            <button className="w-[40px] h-[40px] p-2 rounded-lg bg-gray-50 cursor-pointer disabled:cursor-not-allowed">
              <img
                src="/community/ico-chevron-left-bold-24.svg"
                alt="left-bold"
              />
            </button>
            <button className="bg-white w-[40px] h-[40px] p-2 rounded-lg cursor-pointer disabled:cursor-not-allowed text-gray-500 hover:text-green-600">
              <span>1</span>
            </button>
            <button className="w-[40px] h-[40px] p-2 rounded-lg bg-gray-50 cursor-pointer disabled:cursor-not-allowed">
              <img
                src="/community/ico-chevron-right-bold-24.svg"
                alt="right-bold"
              />
            </button>
            <button className="w-[40px] h-[40px] p-2 rounded-lg bg-gray-50 cursor-pointer disabled:cursor-not-allowed">
              <img
                src="/community/ico-chevron-right-double-bold-24.svg"
                alt="right-double"
              />
            </button>
          </div>
          <div className="col-span-1 flex justify-end">
            <button className="flex-center w-[90px] h-[40px] font-bold text-[14px] px-[14px] bg-[#098212] text-white rounded-[8px]">
              <img src="/community/ico-edit-20.svg" alt="ico-edit" />
              <span>글쓰기</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
