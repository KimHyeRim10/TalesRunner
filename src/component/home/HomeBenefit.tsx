export default function HomeBenefit() {
  type Benefit = Record<"iconImage" | "iconAlt" | "title", string>;

  const benefitList: Benefit[] = [
    {
      iconImage: "/home/ico-user-24.svg",
      iconAlt: "신규혜택",
      title: "신규 혜택",
    },
    {
      iconImage: "/home/ico-return-24.svg",
      iconAlt: "복귀혜택",
      title: "복귀 혜택",
    },
    {
      iconImage: "/home/ico-vip-24.svg",
      iconAlt: "VIP혜택",
      title: "VIP 혜택",
    },
    {
      iconImage: "/home/ico-pc-24.svg",
      iconAlt: "PC혜택",
      title: "PC 혜택",
    },
    {
      iconImage: "/home/ico-pin-24.svg",
      iconAlt: "PC방찾기",
      title: "PC방 찾기",
    },
  ];

  return (
    <div className="flex items-center justify-between w-[1216px] h-[67px] bg-[#F9FAFB] font-bold cursor-pointe ">
      {benefitList.map((item) => (
        <div
          key={item.title}
          className="flex-center gap-x-2 w-[243px] h-[59px] bg-[#F9FAFB]"
        >
          <img
            className="w-[20px] h-[20px]"
            src={item.iconImage}
            alt={item.iconAlt}
          />
          <p className="h-[27px] text-[18px] text-[#667085] text-lg leading-[27px] cursor-pointer">
            {item.title}
          </p>
        </div>
      ))}
    </div>
  );
}
