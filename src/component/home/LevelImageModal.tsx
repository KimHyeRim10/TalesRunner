"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { getUser } from "@/utils/localStorage";
import { UserInfo } from "@/types/userInfo";
import { useUser } from "@/context/UserContext";

interface LevelImageModalProps {
  onLevelModalClose: () => void;
}

interface LevelItem {
  src: string;
  data: string;
  alt: string;
}

interface Category {
  category: string;
  items: LevelItem[];
}

interface LevelData {
  categories: Category[];
}

export default function LevelImageModal({
  onLevelModalClose,
}: LevelImageModalProps) {
  const { refreshUserData } = useUser();
  const [levelList, setLevelList] = useState<LevelData>({ categories: [] });

  useEffect(() => {
    const getFetchData = async () => {
      try {
        const url = "/data/level.json";
        const response = await axios.get(url);
        setLevelList(response.data);
      } catch (error) {
        console.error("데이터 불러오기 실패:", error);
      }
    };

    getFetchData();
  }, []);

  /* 레벨이미지 member테이블 저장 핸들러 */
  const handleLevelImageClick = async (levelImage: string) => {
    try {
      const userInfo: UserInfo | null = getUser();
      const nickname = userInfo?.nickname;

      const response = await axios.post("/api/uploads/levelImage", {
        levelImage,
        nickname,
      });
      /*    console.log("레벨 이미지 저장 성공:", response.data); */
      alert("레벨 이미지가 변경되었습니다!");
      refreshUserData(); // UserProvider 상태 즉시 업데이트
      onLevelModalClose();
    } catch (error: any) {
      console.log("레벨 이미지 저장 실패:", error);
    }
  };

  return (
    <div className="relative overlay" onClick={onLevelModalClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="bg-white w-[500px] h-[500px] overflow-auto [clip-path:inset(0_round_8px)] m-[20px] rounded-[8px] p-[20px]">
          <div className="flex flex-col gap-[30px]">
            <p className="font-bold text-[15px]">
              클릭하여 원하는 레벨로 설정해 보세요!
            </p>
            {levelList.categories.map((category: Category) => (
              <div key={category.category} className="text-left">
                {/* 카테고리 제목 */}
                <p className="highlighter text-left text-[15px] font-bold mb-[40px]">
                  {category.category}
                </p>
                {/* 이미지 리스트 */}
                <ul className="flex-center gap-[40px]">
                  {category.items.map((level) => (
                    <li key={level.data} className="flex-center">
                      <img
                        src={level.src}
                        alt={level.alt}
                        className="cursor-pointer w-[25px] h-[25px]"
                        onClick={() => handleLevelImageClick(level.data)}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
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
