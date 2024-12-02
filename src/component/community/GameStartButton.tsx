export default function GameStartButton() {
  return (
    <div className="relative group w-[190px] h-[80px] text-white flex items-center justify-center gap-y-1">
      <img
        className="w-full h-full object-cover"
        src="/home/file.svg"
        alt="게임시작버튼"
      />
      <button className="absolute m-auto group-hover:animate-game leading-[54px] text-4xl -tracking-[.02em] font-[600] z-10  hover:scale-110 ">
        게임시작
      </button>
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
  );
}
