export default function HomeSection2() {
  interface PierrotNewsItem {
    image: string;
    alt: string;
    title: string;
  }

  const pierrotNewsList: PierrotNewsItem[] = [
    {
      image: "/home/section2-1.jpg",
      alt: "section2-1",
      title: "아린의 연구일지",
    },
    {
      image: "/home/section2-2.jpg",
      alt: "section2-2",
      title: "[이벤트] 11월의 NEW 핫타임 이벤트 안내",
    },
    {
      image: "/home/section2-3.jpg",
      alt: "section2-3",
      title: "제 1회 아이디어 페스티벌 투표 진행 중!",
    },
    {
      image: "/home/section2-4.jpg",
      alt: "section2-4",
      title: "[이벤트] 11월의 커뮤니티 이벤트",
    },
  ];

  return (
    <>
      <section className="w-[1216px] h-[278px] flex flex-col gap-y-4">
        <div className="h-[30px] text-[20px] font-bold lending-[30px]">
          삐에로 소식
        </div>
        <div className="flex justify-between text-[14px] text-gray-700 font-[500] lending-[21px] text-ellipsis overflow-hidden line-clamp-2">
          {pierrotNewsList.map((item) => (
            <div key={item.title} className="w-[280px] cursor-pointer">
              <img
                className="h-[157px] w-[280px]"
                src={item.image}
                alt={item.alt}
              />
              <div className="h-[74px] w-[280px] p-[16px] border border-[var(--border-color)]">
                {item.title}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
