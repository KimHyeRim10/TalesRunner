import Link from "next/link";
import Image from "next/image";
import ExternalLinkIcon from "@/icons/home/ExternalLinkIcon";

export default function NavBar() {
  interface DropDownItem {
    label: string;
    hasicon: "true" | "false";
    gap?: string;
    link?: string;
  }

  interface DropDown {
    category: string;
    items: DropDownItem[];
  }

  const dropdownList: DropDown[] = [
    {
      category: "새소식",
      items: [
        { label: "공지사항", hasicon: "false" },
        { label: "업데이트", hasicon: "false" },
        { label: "이벤트", hasicon: "false" },
        { label: "삐에로 놀이터", hasicon: "false" },
        { label: "개발 핫이슈", hasicon: "false" },
        { label: "리그소식", hasicon: "false" },
      ],
    },
    {
      category: "게임소개",
      items: [
        { label: "테일즈런너소개", hasicon: "false" },
        { label: "캐릭터 소개", hasicon: "true", gap: "gap-1 " },
        { label: "테런 스토리", hasicon: "true", gap: "gap-1 " },
        { label: "게임 가이드", hasicon: "true", gap: "gap-1 " },
        { label: "업데이트 맵", hasicon: "true", gap: "gap-1 " },
        { label: "런너의 옷장", hasicon: "true", gap: "gap-1 " },
      ],
    },
    {
      category: "커뮤니티",
      items: [
        {
          label: "런너게시판",
          hasicon: "false",
          link: "/community/runners/all",
        },
        { label: "런너채팅방", hasicon: "false", link: "/community/chat" },
        { label: "공략게시판", hasicon: "false" },
        { label: "길드게시판", hasicon: "false" },
        { label: "토론게시판", hasicon: "false" },
        { label: "TR크리에이터", hasicon: "false" },
      ],
    },
    {
      category: "랭킹",
      items: [
        { label: "종합랭킹", hasicon: "false" },
        { label: "일일랭킹", hasicon: "false" },
        { label: "주간랭킹", hasicon: "false" },
        { label: "월간랭킹", hasicon: "false" },
        { label: "친구랭킹", hasicon: "false" },
        { label: "커플월간랭킹", hasicon: "false" },
      ],
    },
    {
      category: "고객지원",
      items: [
        { label: "도움말/문의하기", hasicon: "true", gap: "gap-1 " },
        { label: "2차 비밀번호 초기화", hasicon: "false" },
        { label: "다운로드", hasicon: "false" },
        { label: "확률형 아이템", hasicon: "true", gap: "gap-1 " },
      ],
    },
  ];

  return (
    <div className="group relative flex-center max-w-[2560px] min-w-[1440px] mx-auto">
      <div className="w-[1280px] h-[80px] px-8 flex justify-between items-center">
        <a className="left-8" href="/">
          <Image width={100} height={63} src="/header/tr-ci.svg" alt="TRlogo" />
        </a>
        <nav>
          <ul className="flex h-[80px] items-center">
            <li className="flex-center w-[150px] leading-10 font-[600] text-lg hover:text-green-600 text-gray-900 hover:underline underline-offset-[31px] decoration-green-600 decoration-[3px]">
              새소식
            </li>
            <li className="flex-center w-[150px] leading-10 font-[600] text-lg hover:text-green-600 text-gray-900 hover:underline underline-offset-[31px] decoration-green-600 decoration-[3px]">
              게임소개
            </li>
            <li className="flex-center w-[150px] leading-10 font-[600] text-lg hover:text-green-600 text-gray-900 hover:underline underline-offset-[31px] decoration-green-600 decoration-[3px]">
              커뮤니티
            </li>
            <li className="flex-center w-[150px] leading-10 font-[600] text-lg hover:text-green-600 text-gray-900 hover:underline underline-offset-[31px] decoration-green-600 decoration-[3px]">
              랭킹
            </li>
            <li className="group flex-center gap-1 w-[150px] leading-10 font-[600] text-lg hover:text-green-600 text-gray-900 hover:underline underline-offset-[31px] decoration-green-600 decoration-[3px]">
              고객지원
              <svg
                className="group-hover/sub:stroke-green-600"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="group-hover/sub:stroke-green-600"
                  d="M12.25 5.25001L12.25 1.75001M12.25 1.75001H8.74999M12.25 1.75001L7 7M5.83333 1.75H4.55C3.56991 1.75 3.07986 1.75 2.70552 1.94074C2.37623 2.10852 2.10852 2.37623 1.94074 2.70552C1.75 3.07986 1.75 3.56991 1.75 4.55V9.45C1.75 10.4301 1.75 10.9201 1.94074 11.2945C2.10852 11.6238 2.37623 11.8915 2.70552 12.0593C3.07986 12.25 3.56991 12.25 4.55 12.25H9.45C10.4301 12.25 10.9201 12.25 11.2945 12.0593C11.6238 11.8915 11.8915 11.6238 12.0593 11.2945C12.25 10.9201 12.25 10.4301 12.25 9.45V8.16667"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </li>
          </ul>
        </nav>

        <div className="flex justify-end">
          <div className="w-[70px] h-[30px] flex-center bg-gray-600 rounded-lg gap-1">
            <span className="text-white text-[12px]">PC방</span>
            <span className="text-gray-500 text-[12px]">OFF</span>
          </div>
        </div>
      </div>

      {/* dropdown */}
      <div className="absolute invisible h-[288px] w-full top-[80px] max-w-[2560px] min-w-[1440px]  group-hover:visible group-hover:animate-fadein z-30 bg-white">
        <div className="flex justify-center w-[1280px] mx-auto">
          <div className="flex w-[750px] pt-6 ml-[30px]">
            {dropdownList.map((category, index) => (
              <ul className="pb-6" key={index}>
                {category.items.map((item, idx) => (
                  <Link href={item.link || "#"} key={item.label}>
                    <li
                      key={idx}
                      className={`flex-center w-[150px] ${item.gap} text-base leading-10 text-gray-700 font-bold hover:text-[#439F46]`}
                    >
                      {item.label}
                      {item.hasicon === "true" && <ExternalLinkIcon />}
                    </li>
                  </Link>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
