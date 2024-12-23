"use client";

import { useState, useEffect } from "react";

export default function Modal() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  interface ModalType {
    id: number;
    image: string;
    alt: string;
  }

  const modal: ModalType[] = [
    { id: 1, image: "/home/m1.jpg", alt: "m1" },
    { id: 2, image: "/home/m2.jpg", alt: "m2" },
    { id: 3, image: "/home/m3.jpg", alt: "m3" },
    { id: 4, image: "/home/m4.jpg", alt: "m4" },
    { id: 5, image: "/home/m5.jpg", alt: "m5" },
    { id: 6, image: "/home/m6.jpg", alt: "m6" },
    { id: 7, image: "/home/m7.jpg", alt: "m7" },
    { id: 8, image: "/home/m8.jpg", alt: "m8" },
    { id: 9, image: "/home/m9.jpg", alt: "m9" },
  ];

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const closeModal = () => setIsOpen(false);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % modal.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? modal.length - 1 : prevIndex - 1
    );
  };

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(goToNext, 3000); // 자동 슬라이드
    return () => clearInterval(interval);
  }, [modal.length]);

  if (!isOpen) return null;

  return (
    <div className="relative overlay">
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="w-[700px] h-[400px] rounded-t-[8px] relative overflow-hidden">
          {/* 이미지 */}
          <img
            src={modal[currentIndex].image}
            alt={modal[currentIndex].alt}
            className="absolute w-full h-full object-cover"
          />

          {/* 점(dot) 네비게이션 */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3 space-x-2">
            {modal.map((_, index) => (
              <button
                key={index}
                onClick={() => goToIndex(index)}
                className={`w-3 h-3 rounded-full ${
                  currentIndex === index ? "bg-[#098121]" : "bg-gray-200"
                }`}
              ></button>
            ))}
          </div>
        </div>

        {/* 하단 닫기 영역 */}
        <div className="flex px-[24px] items-center justify-between rounded-b-[12px] w-[700px] h-[48px]">
          <span
            onClick={closeModal}
            className="text-[#475467] font-bold text-[14px] cursor-pointer"
          >
            오늘 하루 동안 열지 않기
          </span>
          <span onClick={closeModal}>
            <img
              className="w-[20px] h-[20px]"
              src="/home/ico-x-close-20.svg"
              alt="X"
            />
          </span>
        </div>
        {/* 화살표 버튼 */}
        <button
          onClick={goToPrev}
          className="absolute w-[56px] h-[56px] left-[-70px] top-1/2 transform -translate-y-1/2 bg-[#00000080] bg-opacity-80 p-2 rounded-[8px] shadow"
        >
          <img
            className="w-[40px] h-[40px]"
            src="/home/ico-chevron-left-40.svg"
            alt="ico-chevron"
          />
        </button>
        <button
          onClick={goToNext}
          className="absolute  w-[56px] h-[56px] right-[-70px] top-1/2 transform -translate-y-1/2 bg-[#00000080] bg-opacity-80 p-2 rounded-[8px]  shadow"
        >
          <img
            className="w-[40px] h-[40px]"
            src="/home/ico-chevron-right-40.svg"
            alt="chevron-right"
          />
        </button>
      </div>

      <style jsx>{`
        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .modal {
          position: relative;
          background: white;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          min-width: 300px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
