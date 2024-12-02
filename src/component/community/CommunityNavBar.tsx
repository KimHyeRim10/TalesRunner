export default function CommunityNavBar() {
  return (
    <div className="sticky top-0 mb-12 max-w-[1981px] w-full min-w-min flex justify-center z-20 border-b border-[var(--border-color)] mx-auto ">
      <div className="w-[1280px] h-[64px] flex gap-x-11 px-8 bg-white">
        <ul className="flex items-center text-base leading-[64px] font-[600] gap-8 ">
          <li className="text-[#439F46] w-[90px] h-[64px] text-[16px] cursor-pointer">
            런너게시판
          </li>
          <li className="text-[#667085] w-[90px] h-[64px] text-[16px] cursor-pointer">
            창작게시판
          </li>
          <li className="text-[#667085] w-[90px] h-[64px] text-[16px] cursor-pointer">
            공략게시판
          </li>
          <li className="text-[#667085] w-[90px] h-[64px] text-[16px] cursor-pointer">
            길드게시판
          </li>
          <li className="text-[#667085] w-[90px] h-[64px] text-[16px] cursor-pointer">
            토론게시판
          </li>
          <li className="text-[#667085] w-[110px] h-[64px] text-[16px] cursor-pointer">
            TR크리에이터
          </li>
        </ul>
      </div>
    </div>
  );
}
