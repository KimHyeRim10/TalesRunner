import HomeCarousel from "@/component/home/HomeCarousel";
import Carousel from "@/component/home/Carousel";
import HomeSection1 from "@/component/home/HomeSection1";
import HomeSection2 from "@/component/home/HomeSection2";
import HomeSection3 from "@/component/home/HomeSection3";
import HomeSection4 from "@/component/home/HomeSection4";
import HomeBenefit from "@/component/home/HomeBenefit";
import Modal from "@/component/home/Modal";

export default function Home() {
  return (
    <div>
      <Carousel />
      <Modal />
      <div className="h-[1520px] flex flex-col items-center px-8 pt-12 pb-16 gap-y-16 ">
        <HomeSection1 />
        <HomeSection2 />
        <HomeSection3 />
        <HomeSection4 />
        <HomeBenefit />
      </div>
    </div>
  );
}
