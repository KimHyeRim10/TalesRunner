"use client";

import { useState, useEffect } from "react";

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
      title: "다시, 설렘의 카오스로!",
    },
    {
      id: 2,
      image: "/home/c2.jpg",
      alt: "c2",
      title: "테일즈런너x네이버웹툰 콜라보 등장!",
    },
    {
      id: 3,
      image: "/home/c3.jpg",
      alt: "c3",
      title: " [PV OST]시간 너머를 달려 출시",
    },
    { id: 4, image: "/home/c4.jpg", alt: "c4", title: "아린의 연구일지" },
    {
      id: 5,
      image: "/home/c5.jpg",
      alt: "c5",
      title: " 2024 동화나라 테런 슈페데이",
    },
    {
      id: 6,
      image: "/home/c6.jpg",
      alt: "c6",
      title: "아이디어 페스티벌 크리에이티어 부문",
    },
    {
      id: 7,
      image: "/home/c7.jpg",
      alt: "c7",
      title: " 테일즈런너 RPG 사전 예약 OPEN",
    },
    {
      id: 8,
      image: "/home/c8.jpg",
      alt: "c8",
      title: "라스트 카오스 웹툰 4화 공개",
    },
    {
      id: 9,
      image: "/home/c9.jpg",
      alt: "c9",
      title: "테일즈런너 서비스 이관 안내",
    },
    { id: 10, image: "/home/c10.jpg", alt: "c10", title: "'꼭'확인해주세요 " },
    { id: 11, image: "/home/c11.jpg", alt: "c11", title: "신규 런너 지원 " },
    { id: 12, image: "/home/c12.jpg", alt: "c12", title: "복귀 런너 지원 " },
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
      <div className="w-[2560px] h-[400px]">
        <img src={slides[currentIndex].image} alt={slides[currentIndex].alt} />
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
            <svg
              className="group cursor-pointer"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="group-hover:stroke-white"
                d="M8.9 3H5.1C4.53995 3 4.25992 3 4.04601 3.10899C3.85785 3.20487 3.70487 3.35785 3.60899 3.54601C3.5 3.75992 3.5 4.03995 3.5 4.6V8.4C3.5 8.96005 3.5 9.24008 3.60899 9.45399C3.70487 9.64215 3.85785 9.79513 4.04601 9.89101C4.25992 10 4.53995 10 5.1 10H8.9C9.46005 10 9.74008 10 9.95399 9.89101C10.1422 9.79513 10.2951 9.64215 10.391 9.45399C10.5 9.24008 10.5 8.96005 10.5 8.4V4.6C10.5 4.03995 10.5 3.75992 10.391 3.54601C10.2951 3.35785 10.1422 3.20487 9.95399 3.10899C9.74008 3 9.46005 3 8.9 3Z"
                stroke="#D0D5DD"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                className="group-hover:stroke-white"
                d="M19.9 3H16.1C15.5399 3 15.2599 3 15.046 3.10899C14.8578 3.20487 14.7049 3.35785 14.609 3.54601C14.5 3.75992 14.5 4.03995 14.5 4.6V8.4C14.5 8.96005 14.5 9.24008 14.609 9.45399C14.7049 9.64215 14.8578 9.79513 15.046 9.89101C15.2599 10 15.5399 10 16.1 10H19.9C20.4601 10 20.7401 10 20.954 9.89101C21.1422 9.79513 21.2951 9.64215 21.391 9.45399C21.5 9.24008 21.5 8.96005 21.5 8.4V4.6C21.5 4.03995 21.5 3.75992 21.391 3.54601C21.2951 3.35785 21.1422 3.20487 20.954 3.10899C20.7401 3 20.4601 3 19.9 3Z"
                stroke="#D0D5DD"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                className="group-hover:stroke-white"
                d="M19.9 14H16.1C15.5399 14 15.2599 14 15.046 14.109C14.8578 14.2049 14.7049 14.3578 14.609 14.546C14.5 14.7599 14.5 15.0399 14.5 15.6V19.4C14.5 19.9601 14.5 20.2401 14.609 20.454C14.7049 20.6422 14.8578 20.7951 15.046 20.891C15.2599 21 15.5399 21 16.1 21H19.9C20.4601 21 20.7401 21 20.954 20.891C21.1422 20.7951 21.2951 20.6422 21.391 20.454C21.5 20.2401 21.5 19.9601 21.5 19.4V15.6C21.5 15.0399 21.5 14.7599 21.391 14.546C21.2951 14.3578 21.1422 14.2049 20.954 14.109C20.7401 14 20.4601 14 19.9 14Z"
                stroke="#D0D5DD"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                className="group-hover:stroke-white"
                d="M8.9 14H5.1C4.53995 14 4.25992 14 4.04601 14.109C3.85785 14.2049 3.70487 14.3578 3.60899 14.546C3.5 14.7599 3.5 15.0399 3.5 15.6V19.4C3.5 19.9601 3.5 20.2401 3.60899 20.454C3.70487 20.6422 3.85785 20.7951 4.04601 20.891C4.25992 21 4.53995 21 5.1 21H8.9C9.46005 21 9.74008 21 9.95399 20.891C10.1422 20.7951 10.2951 20.6422 10.391 20.454C10.5 20.2401 10.5 19.9601 10.5 19.4V15.6C10.5 15.0399 10.5 14.7599 10.391 14.546C10.2951 14.3578 10.1422 14.2049 9.95399 14.109C9.74008 14 9.46005 14 8.9 14Z"
                stroke="#D0D5DD"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}
