import Image from "next/image";

export default function HomeSection4() {
  type Content = Record<"image" | "alt" | "color" | "title", string>;

  const contentList: Content[] = [
    {
      image: "/home/section4-1.jpg",
      alt: "section4-1",
      color: "#CD400E",
      title: "테런시작하기",
    },
    {
      image: "/home/section4-2.jpg",
      alt: "section4-2",
      color: "#1C965A",
      title: "캐릭터 소개",
    },
    {
      image: "/home/section4-3.jpg",
      alt: "section4-3",
      color: "#0B60C9",
      title: "테런 스토리",
    },
    {
      image: "/home/section4-4.jpg",
      alt: "section4-4",
      color: "#26C1BF",
      title: "낚시",
    },
    {
      image: "/home/section4-5.jpg",
      alt: "section4-5",
      color: "#87B84C",
      title: "공원",
    },
    {
      image: "/home/section4-6.jpg",
      alt: "section4-6",
      color: "#D5A720",
      title: "팜",
    },
  ];

  return (
    <>
      <section className="flex w-[1216px] h-[257px]">
        <div className="w-[624px] flex flex-col gap-1">
          <div className="h-[30px] text-[20px] font-bold lending-[30px]">
            콘텐츠
          </div>
          <div className="flex gap-x-[11px] gap-y-3 flex-wrap w-[624px]">
            {contentList.map((item) => (
              <div
                key={item.alt}
                className={`w-[190px] h-[104px] relative flex items-center bg-gradient-to-t to-transparent from-[0.17%] to-[65.81%] from-[${item.color}] cursor-pointer`}
              >
                <Image
                  width={190}
                  height={104}
                  className="absolute -z-[1] top-0 left-0"
                  src={item.image}
                  alt={item.alt}
                />
                <p className="w-full text-[18px] text-white font-[500] leading-[18px] text-center pb-4 mt-auto">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-x-8">
          <Image
            width={280}
            height={257}
            className="w-[280px] h-[257px]"
            src="/home/section4-vip.png"
            alt="vip"
          />
          <Image
            width={280}
            height={257}
            src="/home/section4-birthday.jpg"
            alt="birthday"
          />
        </div>
      </section>
    </>
  );
}
