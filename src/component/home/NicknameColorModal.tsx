"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { getUser } from "@/utils/localStorage";
import { UserInfo } from "@/types/userInfo";
import { useUser } from "@/context/UserContext";

interface NicknameModalProps {
  onNicknameModalClose: () => void;
}

interface NicknameColorItem {
  title: string;
  color: string;
}

export default function NicknameColorModal({
  onNicknameModalClose,
}: NicknameModalProps) {
  const { refreshUserData } = useUser();
  const [colorList, setColorList] = useState<NicknameColorItem[]>([]);

  useEffect(() => {
    const getFetchData = async () => {
      try {
        const url = "/data/nickname.json";
        const response = await axios.get(url);
        setColorList(response.data);
      } catch (error) {
        console.error("데이터 불러오기 실패:", error);
      }
    };

    getFetchData();
  }, []);

  /* 닉네임 컬러 member테이블 저장 핸들러 */
  const handleNickNameClick = async (nicknameColor: string) => {
    try {
      const userInfo: UserInfo | null = getUser();
      const nickname = userInfo?.nickname;

      await axios.post("/api/uploads/nicknameColor", {
        nicknameColor,
        nickname,
      });
      /*    console.log("닉네임 색상 저장 성공:", response.data); */
      alert("닉네임 색상이 변경되었습니다!");
      refreshUserData(); // UserProvider 상태 즉시 업데이트
      onNicknameModalClose();
    } catch (error: unknown) {
      const message =
        (error as Error).message ||
        "닉네임 컬러 저장 중 알 수 없는 오류가 발생했습니다.";
      console.log("닉네임 컬러 저장 실패:", message);
    }
  };

  return (
    <div className="relative overlay" onClick={onNicknameModalClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="bg-white w-[350px] h-[400px] overflow-auto [clip-path:inset(0_round_8px)] m-[30px] rounded-[8px] p-[20px]">
          <div className="flex flex-col gap-[23px]">
            <p className="text-[13px]">
              클릭하여 원하는 닉네임 색상으로 변경해 보세요!
            </p>
            {colorList.map((item, index) => (
              <p
                key={index}
                className={`text-[20px] font-bold cursor-pointer`}
                style={{ color: item.color }}
                onClick={() => handleNickNameClick(item.color)} // 클릭 시 컬러 업데이트
              >
                {item.title}
              </p>
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
