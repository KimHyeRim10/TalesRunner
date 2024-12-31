import Image from "next/image";

export default function Footer() {
  return (
    <div className="border-t border-t-[var(--border-color)] py-[64px] h-[309px] m-auto">
      <div className="w-[1280px] m-auto">
        <Image
          width={161}
          height={30}
          src="/footer/rhaon-ci (1).png"
          alt="logo"
        />
        <div className="flex justify-between">
          <div className="h-[24px] flex-center gap-4 text-[12px] mt-4 text-[#475467] font-bold">
            <span>회사소개</span>
            <span>이용약관</span>
            <span className="text-[#F04C28]">개인정보처리방침</span>
            <span>운영정책</span>
            <span>청소년보호정책</span>
            <span>테일즈런너PC방</span>
          </div>
          <div className="flex-center gap-5">
            <a href="https://www.facebook.com/rhaonTRofficial/">
              <Image
                width={24}
                height={25}
                src="/footer/ico-facebook-24.svg"
                alt="ico-facebook"
              />
            </a>
            <a href="https://www.youtube.com/@rhaon_tr_official">
              <Image
                width={24}
                height={25}
                src="/footer/ico-youtube-24.svg"
                alt="ico-youtub"
              />
            </a>
            <a href="https://www.instagram.com/rhaon_tr_official">
              <Image
                width={24}
                height={25}
                src="/footer/ico-instagram-24.svg"
                alt="ico-instagram"
              />
            </a>
            <a href="https://x.com/TR_Official_KR">
              <Image
                width={24}
                height={25}
                src="/footer/ico-twitter-24.svg"
                alt="ico-twitter"
              />
            </a>
          </div>
        </div>

        <div className="flex justify-between text-[12px] text-[#98A2B3] mt-4">
          <div>
            <div className="flex gap-2">
              <span>회사명 : (주)라온엔터테인먼트</span>
              <span>대표이사 : 박재숙</span>
              <span>통신판매업 신고번호 : 제2008-대구 남구-0114호</span>
            </div>
            <div className="flex gap-2">
              <span>
                주소 : (42403) 대구광역시 남구 명덕로 104 계명대학교 전문관
                509호
              </span>
              <span>사업자등록번호 : 514-81-37077</span>
            </div>
            <div className="flex gap-2">
              <span>E-mail : privacy@rhaon.co.kr</span>
              <span>Tel : 053-655-3274</span>
            </div>
          </div>
          <div>
            <Image
              width={600}
              height={61}
              className="pointer-events-none"
              src="/footer/grading-table.jpg"
              alt="grading-table"
            />
          </div>
        </div>

        <div className="text-[12px] text-[#667085] mt-4">
          <span>
            ⓒ RHAON Entertainment. All Rights Reserved. Blomics. All Rights
            Reserved.
          </span>
        </div>
      </div>
    </div>
  );
}
