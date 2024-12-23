export default function HomeSection3() {
  type CreatorContent = Record<
    | "image"
    | "alt"
    | "iconImage"
    | "iconAlt"
    | "iconWidth"
    | "iconName"
    | "background"
    | "title"
    | "name",
    string
  >;

  const creatorContentList: CreatorContent[] = [
    {
      image: "/home/section3-1.jpg",
      alt: "section3-1",
      iconImage: "/home/ico-edit-12.svg",
      iconAlt: "블로그 아이콘",
      iconWidth: "78px",
      iconName: "블로그",
      background: "rgb(238,70,188)",
      title: "[테일즈런너] 테런, 그것이 궁금하다! - 빛과 어둠의 서",
      name: " 히아히야히야삐야",
    },
    {
      image: "/home/section3-2.jpg",
      alt: "section3-2",
      iconImage: "/home/ico-play-circle-12.svg",
      iconAlt: "동영상 아이콘",
      iconWidth: "78px",
      iconName: "동영상",
      background: "rgb(6,174,212)",
      title: '[테일즈런너] "푸른 생명의 땅" 맵 공략 | 01.19.96',
      name: "고스트8",
    },
    {
      image: "/home/section3-3.jpg",
      alt: "section3-3",
      iconImage: "/home/ico-book-open-12.svg",
      iconAlt: "연재만화 아이콘",
      iconWidth: "90px",
      iconName: "연재만화",
      background: "#875BF7",
      title: "리렆인구",
      name: "리렆인",
    },
    {
      image: "/home/section3-4.jpg",
      alt: "section3-4",
      iconImage: "/home/ico-edit-12.svg",
      iconAlt: "블로그 아이콘",
      iconWidth: "78px",
      iconName: "블로그",
      background: "rgb(238,70,188)",
      title: "[테일즈런너] 슈퍼테런데이",
      name: "영화를 좋아하는 사람 (영좋사)",
    },
  ];

  return (
    <>
      <section className="flex flex-col gap-y-4 w-[1216px] h-[310px]">
        <div className="h-[30px] text-[20px] font-bold lending-[30px]">
          TR 크리에이터 콘텐츠
        </div>
        <div className="flex justify-between items-end">
          {creatorContentList.map((item) => (
            <div key={item.alt} className="relative w-[280px] h-[158px]">
              <img
                className="object-cover w-full h-[158px]"
                src={item.image}
                alt={item.alt}
              />
              <span
                style={{
                  backgroundColor: item.background,
                  width: item.iconWidth,
                }}
                className="absolute top-2 left-2 z-10 h-[29px] flex-center gap-x-1 rounded-lg leading-[29px] text-[14px] font-[600] text-white"
              >
                <img
                  className="w-[12px] h-[29px]"
                  src={item.iconImage}
                  alt={item.iconAlt}
                />
                {item.iconName}
              </span>
              <div className="w-[280px] h-[106px] border border-[var(--border-color)] p-[16px]">
                <p className="w-[246px] h-[40px] text-[14px] text-[#344054] font-[500]">
                  {item.title}
                </p>
                <p className="w-[280px] h-[20px] text-[14px] text-[#344054] font-[500] mt-[12px]">
                  {item.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
