import Image from "next/image";

export default function GameStartButton() {
  return (
    <div className="relative group w-[190px] h-[80px] text-white flex items-center justify-center gap-y-1">
      <Image
        width={190}
        height={80}
        priority
        className="w-full h-full object-cover"
        src="/home/file.svg"
        alt="게임시작버튼"
      />
      <button className="absolute m-auto group-hover:animate-game leading-[54px] text-4xl -tracking-[.02em] font-[600] z-10  hover:scale-110 ">
        게임시작
      </button>
      <Image
        width={280}
        height={108}
        className="absolute mix-blend-screen group-hover:mix-blend-plus-lighter"
        src="/home/circle01.svg"
        alt="circle01"
      />
      <Image
        width={280}
        height={108}
        className="absolute mix-blend-screen group-hover:mix-blend-plus-lighter"
        src="/home/circle02.svg"
        alt="circle02"
      />
      <Image
        width={280}
        height={108}
        className="absolute start animate-start group-hover:hidden mix-blend-overlay"
        src="/home/light.svg"
        alt="light"
      />
      <Image
        width={130}
        height={108}
        style={{ width: "130px", height: "108px" }}
        className="absolute start animate-start group-hover:hidden mix-blend-soft-light opacity-50"
        src="/home/big-light.svg"
        alt="big-light"
      />
    </div>
  );
}
