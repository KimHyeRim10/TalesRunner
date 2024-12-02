import Link from "next/link";

export default function HomeSection1() {
  return (
    <>
      <section className="w-[1216px] h-[240px] flex justify-between items-center">
        <div>
          {/* 공지사항 */}
          <div className="w-[280px] h-[30px] flex justify-between">
            <span className="h-[30px] text-[20px] font-bold">공지사항</span>
            <img width={14} height={14} src="/home/ico-add-14.svg" alt="+" />
          </div>
          {/* 안내메시지 */}
          <div className="flex flex-col pt-4 pb-[22px] gap-y-2 w-[280px] h-[158px]">
            <div className="flex items-center gap-x-1">
              <span className="flex-center w-[38px] h-[22px] text-[12px] font-bold text-[#0C6812] text-center bg-[#ECFDF3] border border-[rgb(171,239,198)] rounded-[999px]">
                안내
              </span>
              <p className="w-[211px] h-[24px] text-[16px] truncate hover:underline leading-6 text-base cursor-pointer">
                [안내] 개인정보처리방침 변경...
              </p>
              <img
                width={18}
                height={18}
                src="/home/ico-new-18.svg"
                alt="new"
              />
            </div>
            <div className="flex items-center gap-x-1">
              <span className="flex-center w-[38px] h-[22px] text-[12px] font-bold text-[#0C6812] text-center bg-[#ECFDF3] border border-[rgb(171,239,198)] rounded-[999px]">
                안내
              </span>
              <p className="w-[211px] h-[24px] text-[16px] truncate hover:underline leading-6 text-base cursor-pointer">
                11월 20일 (수) 정기 점검 완료...
              </p>
              <img
                width={18}
                height={18}
                src="/home/ico-new-18.svg"
                alt="new"
              />
            </div>
            <div className="flex items-center gap-x-1">
              <span className="flex-center w-[38px] h-[22px] text-[12px] font-bold text-[#0C6812] text-center bg-[#ECFDF3] border border-[rgb(171,239,198)] rounded-[999px]">
                안내
              </span>
              <p className="w-[211px] h-[24px] text-[16px] truncate hover:underline leading-6 text-base cursor-pointer">
                계정 이관 보상 5,000 보너스 캐시
              </p>
            </div>
            <div className="flex items-center gap-x-1">
              <span className="flex-center w-[38px] h-[22px] text-[12px] font-bold text-[#0C6812] text-center bg-[#ECFDF3] border border-[rgb(171,239,198)] rounded-[999px]">
                안내
              </span>
              <p className="w-[211px] h-[24px] text-[16px] truncate hover:underline leading-6 text-base cursor-pointer">
                11월 11일 (월) 임심 점검 진행 완료...
              </p>
            </div>
          </div>

          {/* 이벤트소식/업데이트소식 버튼 */}
          <div className="flex justify-between">
            <img
              width={138}
              height={52}
              src="/home/guide.png"
              alt="이벤트소식"
            />
            <img
              width={138}
              height={52}
              src="/home/update.png"
              alt="업데이트소식"
            />
          </div>
        </div>
        {/* section1 이미지 부분 */}
        <img width={592} height={240} src="/home/section1.png" alt="section1" />
        {/* 게임시작/로그인 */}
        <div className="w-[280px]">
          {/* 게임시작버튼 */}
          <div className="relative group w-[280px] h-[108px] text-white flex items-center justify-center gap-y-1">
            <img
              className="w-full h-full object-cover"
              src="/home/file.svg"
              alt="게임시작버튼"
            />
            <button className="absolute top-[15px] group-hover:animate-game leading-[54px] text-4xl -tracking-[.02em] font-[600] z-10  hover:scale-110 ">
              게임시작
            </button>
            <ul className="absolute top-[70px] flex gap-6 items-center text-xs font-[500] z-10">
              <li className="hover:underline">다운로드</li>
              <li>|</li>
              <li className="hover:underline">문제해결</li>
            </ul>
            <img
              className="absolute mix-blend-screen group-hover:mix-blend-plus-lighter"
              src="/home/circle01.svg"
              alt="circle01"
            />
            <img
              className="absolute mix-blend-screen group-hover:mix-blend-plus-lighter"
              src="/home/circle02.svg"
              alt="circle02"
            />
            <img
              className="absolute start animate-start w-[280px] h-[108px] group-hover:hidden mix-blend-overlay"
              src="/home/light.svg"
              alt="light"
            />
            <img
              className="absolute start animate-start w-[280px] h-[108px] group-hover:hidden mix-blend-soft-light opacity-50"
              src="/home/big-light.svg"
              alt="big-light"
            />
          </div>
          {/* 비로그인 시 보여지는 UI */}
          <div>
            <div className="flex-center w-[280px] h-[106px] border border-[var(--border-color)]">
              <Link href="/login">
                <button className="w-[212px] h-[59px] bg-[#8544E2] rounded-lg text-white text-[18px] font-[600] leading-[59px] text-center">
                  로그인
                </button>
              </Link>
            </div>
            <div className="mt-[-2px]">
              <Link href={"/signup"}>
                <button className="w-[93.5px] h-[25px] border border-[var(--border-color)] text-[12px] text-[#98A2B3] text-center bg-[rgb(249,250,251)]">
                  회원가입
                </button>
              </Link>
              <button className="w-[93px] h-[25px] border-t border-b border-[var(--border-color)] text-[12px] text-[#98A2B3] text-center bg-[rgb(249,250,251)]">
                ID 찾기
              </button>
              <button className="w-[93.5px] h-[25px] border border-[var(--border-color)] text-[12px] text-[#98A2B3] text-center bg-[rgb(249,250,251)]">
                PW 찾기
              </button>
            </div>
          </div>
          {/* 로그인 시 보여지는 UI */}
          {/*    <div>
            <div>
              <div className="flex-center w-[280px] h-[106px] border border-[var(--border-color)]">
                <div className="flex gap-x-4">
                  <div className="flex flex-col gap-y-2 w-[49px] h-[80px]">
                    <img
                      className="w-[48px] h-[48px] rounded-full object-cover border border-[var(--border-color)]"
                      src="/home/no-character.png"
                      alt="프로필이미지"
                    />
                    <button className="w-[48px] h-[22px] flex-center border border-[var(--border-color)] rounded-full text-xs font-medium text-gray-400 ">
                      <img
                        className="w-[12px] h-[12px] pr-[px]"
                        src="/home/ico-home-12.svg"
                        alt="homeicon"
                      />
                      광장
                    </button>
                  </div>
                  <div className="w-[183px] h-[80px] flex flex-col text-xs text-gray-500 font-[400] leading-[18px]">
                    <div className="flex items-center">
                      <img
                        className="w-[20px] h-[20px] mr-2 pointer-events-none"
                        src="/home/lv_106.png"
                        alt="Level image"
                      />
                      <span className="font-[400] truncate text-xs pl-1 text-[rgb(255,165,0)]">
                        짱구
                      </span>
                    </div>
                    <div className="flex gap-1 mb-2">
                      <span className="basis-6 text-[12px] text-[#667085]">
                        길드
                      </span>
                      <span className="text-[12px] text-[#475467] font-bold">
                        가입 길드가 없습니다.
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="basis-6 text-[12px] text-[#667085]">
                        TR
                      </span>
                      <span className="text-[12px] text-[#439F46] font-bold">
                        2,000,000
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="basis-6 text-[12px] text-[#667085] mr-1">
                        캐시
                      </span>
                      <span className="text-[12px] text-[#f04C27] font-bold mr-[130px]">
                        0
                      </span>
                      <img
                        className="w-4 h-4 "
                        src="/home/ico-plus-circle-16.svg"
                        alt="ico-plus"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-[-2px]">
              <button className="w-[140px] h-[25px] border-t border-b border-l border-[var(--border-color)] text-[12px] text-[#98A2B3] text-center bg-[rgb(249,250,251)]">
                정보수정
              </button>
              <button className="w-[140px] h-[25px] border border-[var(--border-color)] text-[12px] text-[#98A2B3] text-center bg-[rgb(249,250,251)]">
                로그아웃
              </button>
            </div>
          </div> */}
        </div>
      </section>
    </>
  );
}
