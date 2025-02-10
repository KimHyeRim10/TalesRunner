"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import GridIcon from "@/icons/home/GridIcon";

export default function HomeCarousel() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  interface SlidesType {
    id: number;
    image: string;
    alt: string;
    title: string;
  }

  const slides: SlidesType[] = [
    {
      id: 1,
      image: "/home/c1.jpg",
      alt: "c1",
      title: "윈터 테런 홀리데이이!",
    },
    {
      id: 2,
      image: "/home/c2.jpg",
      alt: "c2",
      title: "테일즈런너 x 네이버웹툰 콜라보 2탄 공개!",
    },
    {
      id: 3,
      image: "/home/c3.jpg",
      alt: "c3",
      title: "네이버웹툰 포즈 완.전.정.복!",
    },
    {
      id: 4,
      image: "/home/c4.jpg",
      alt: "c4",
      title: "다시, 설렘의 카오스로!",
    },
    {
      id: 5,
      image: "/home/c5.jpg",
      alt: "c5",
      title: "테일즈런너x네이버웹툰 콜라보 등장!",
    },
    {
      id: 6,
      image: "/home/c6.jpg",
      alt: "c6",
      title: " [PV OST]시간 너머를 달려 출시",
    },
    { id: 7, image: "/home/c7.jpg", alt: "c7", title: "아린의 연구일지" },
    {
      id: 8,
      image: "/home/c8.jpg",
      alt: "c8",
      title: " 2024 동화나라 테런 슈페데이",
    },
    {
      id: 9,
      image: "/home/c9.jpg",
      alt: "c9",
      title: "아이디어 페스티벌 크리에이티어 부문",
    },
    {
      id: 10,
      image: "/home/c10.jpg",
      alt: "c10",
      title: " 테일즈런너 RPG 사전 예약 OPEN",
    },
    {
      id: 11,
      image: "/home/c11.jpg",
      alt: "c11",
      title: "라스트 카오스 웹툰 4화 공개",
    },
    {
      id: 12,
      image: "/home/c12.jpg",
      alt: "c12",
      title: "테일즈런너 서비스 이관 안내",
    },
    { id: 13, image: "/home/c13.jpg", alt: "c13", title: "'꼭'확인해주세요 " },
    { id: 14, image: "/home/c14.jpg", alt: "c14", title: "신규 런너 지원 " },
    { id: 15, image: "/home/c15.jpg", alt: "c15", title: "복귀 런너 지원 " },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <>
      {/* main-image */}
      <div className="w-full max-w-[2560px] h-[400px]">
        <Image
          width={2560}
          height={400}
          src={slides[currentIndex].image}
          alt={slides[currentIndex].alt}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-[2560px] h-[56px] flex justify-center bg-[#101828]">
        {/* image-title */}
        <div className="w-[1280px] h-[56px] flex-center">
          <div className="flex-center text-[14px] text-[#667085] px-8">
            <div className="w-[280px] h-[56px] flex-center cursor-pointer">
              {slides[(currentIndex - 1 + slides.length) % slides.length].title}
            </div>
            <div className="w-[280px] h-[56px] flex-center cursor-pointer text-white">
              {slides[currentIndex].title}
            </div>
            <div className="w-[280px] h-[56px] flex-center cursor-pointer">
              {slides[(currentIndex + 1) % slides.length].title}
            </div>
          </div>
          <div className="w-[280px] h-[56px] text-[14px] text-[#667085] bg-[rgb(52,64,84)] flex-center gap-2">
            {/* < 아이콘 */}
            <svg
              className="group cursor-pointer"
              onClick={handlePrevious}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="group-hover:stroke-white"
                d="M15.5 18L9.5 12L15.5 6"
                stroke="#D0D5DD"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
            <div className="flex-center gap-1 text-[rgb(225,225,225)]">
              <span>{slides[currentIndex].id}</span>
              <span>/</span>
              <span>{slides.length}</span>
            </div>
            {/* > 아이콘 */}
            <svg
              className="group cursor-pointer"
              onClick={handleNext}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="group-hover:stroke-white"
                d="M9.5 18L15.5 12L9.5 6"
                stroke="#D0D5DD"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>

            {/* 4정사각형 아이콘 */}
            <GridIcon />
          </div>
        </div>
      </div>
    </>
  );
}
