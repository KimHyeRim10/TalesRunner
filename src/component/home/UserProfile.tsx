"use Client";

import axios from "axios";
import Image from "next/image";
import { removeUser } from "@/utils/localStorage";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { UserInfo } from "@/types/userInfo";
import { useUser } from "@/context/UserContext";
import LevelImageModal from "./LevelImageModal";
import NicknameColorModal from "./NicknameColorModal";
import LoginActions from "./LoginActions";

interface UserProfileProps {
  user: UserInfo | null; // null을 허용
  setUser: React.Dispatch<React.SetStateAction<UserInfo | null>>; // 상태 변경 함수
}

const UserProfile: React.FC<UserProfileProps> = () => {
  const router = useRouter();
  const { user, setUser, profileURL, setProfileURL, levelURL, nicknameColor } =
    useUser();
  const [profileImage, setProfileImage] = useState<string>(
    "/home/no-character.png"
  ); // 기본 이미지

  const [isLevelModalOpen, setLevelModalOpen] = useState(false); // 모달 상태 관리
  const [isNickNameModal, setNickNameModal] = useState(false);

  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (profileURL) {
      setProfileImage(profileURL);
    }
  }, [profileURL]);

  const handleLogout = () => {
    alert("로그아웃 되었습니다");
    removeUser();
    setUser(null); // 로그아웃 후 상태 업데이트
    router.push("/");
  };

  if (!user) {
    return <LoginActions />;
  }

  /* supabase storage에 이미지 업로드하기  */
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = async () => {
      try {
        const base64 = reader.result;
        const response = await axios.post("/api/uploads/profileImage", {
          file: base64,
          nickname: user.nickname,
        });

        const uploadedUrl = response.data.url;

        if (uploadedUrl) {
          setProfileURL(uploadedUrl); // Context 상태 업데이트
          await saveImageUrl(user.email, uploadedUrl);
        }
      } catch (error) {
        console.log("이미지 업로드 실패:", error);
        alert("이미지 업로드 실패");
      }
    };

    reader.readAsDataURL(file);
  };

  /* supabase에 저장된 url을 DB member 테이블 profile 컬럼에 저장하기 */
  const saveImageUrl = async (email: string, imageUrl: string) => {
    try {
      const response = await axios.post("/api/uploads/saveProfileImage", {
        email,
        imageUrl,
      });

      if (!response.data.success) {
        throw new Error(response.data.error || "Failed to save image URL");
      }
    } catch (error) {
      console.error("API 호출 실패:", error);
    }
  };

  // 레벨 모달  핸들러
  const handleLevelOpenModal = () => {
    setLevelModalOpen(true);
  };

  const handleLevelCloseModal = () => {
    setLevelModalOpen(false);
  };

  // 닉네임 모달  핸들러
  const openNickNameModal = () => {
    setNickNameModal(true);
  };

  const closeNickNameModal = () => {
    setNickNameModal(false);
  };

  return (
    <div>
      <div>
        <div className="flex-center w-[280px] h-[106px] border border-[var(--border-color)]">
          <div className="flex gap-x-4">
            <div className="flex flex-col gap-y-2 w-[49px] h-[80px]">
              <div className="profile-tooltip">
                <label htmlFor="profile-upload" className="cursor-pointer">
                  <Image
                    width={48}
                    height={48}
                    style={{ width: "48px", height: "48px" }}
                    className="rounded-full object-cover border"
                    src={profileImage}
                    alt="프로필 이미지"
                  />
                </label>
                <span className="profile-tooltip-text">프로필 이미지 변경</span>
                <input
                  id="profile-upload"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageUpload}
                />
              </div>
              <button className="w-[48px] h-[22px] flex-center border border-[var(--border-color)] rounded-full text-[10px] font-medium text-gray-400 ">
                <Image
                  width={12}
                  height={12}
                  className="w-[12px] h-[12px] pr-[px]"
                  src="/home/ico-home-12.svg"
                  alt="homeicon"
                />
                광장
              </button>
            </div>
            <div className="w-[183px] h-[80px] flex flex-col text-xs text-gray-500 font-[400] leading-[18px]">
              <div className="flex items-center">
                <div className="profile-tooltip">
                  <Image
                    width={20}
                    height={20}
                    className="w-[20px] h-[20px] mr-2 custor-pointer"
                    src={levelURL || "/uploads/v1/level/lv_03.png"}
                    alt="Level image"
                    onClick={handleLevelOpenModal}
                  />
                  <span className="profile-tooltip-text">레벨 변경</span>
                </div>

                {isLevelModalOpen && (
                  <LevelImageModal onLevelModalClose={handleLevelCloseModal} />
                )}

                <div className="profile-tooltip">
                  <span
                    style={{ color: nicknameColor || "#FFA500" }}
                    onClick={openNickNameModal}
                    className="font-[400] truncate text-xs pl-1 cursor-pointer"
                  >
                    {user.nickname}
                  </span>
                  <span className="profile-tooltip-text">닉네임 색상 변경</span>

                  {showTooltip && (
                    <span className="showtooltip-text">
                      🔥 [프로필, 레벨, 닉네임]을 클릭해 자유롭게 설정해 보세요!
                    </span>
                  )}
                </div>

                {/* 닉네임 모달 */}
                {isNickNameModal && (
                  <NicknameColorModal
                    onNicknameModalClose={closeNickNameModal}
                  />
                )}
              </div>

              <div className="flex gap-1 mb-2">
                <span className="basis-6 text-[12px] text-[#667085]">길드</span>
                <span className="text-[12px] text-[#475467] font-bold">
                  가입 길드가 없습니다.
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="basis-6 text-[12px] text-[#667085]">TR</span>
                <span className="text-[12px] text-[#439F46] font-bold">
                  2,000,000
                </span>
              </div>
              <div className="flex items-center">
                <span className="basis-6 text-[12px] text-[#667085] mr-1">
                  캐시
                </span>
                <span className="text-[12px] text-[#f04C27] font-bold mr-[130px]">
                  0
                </span>
                <Image
                  width={16}
                  height={16}
                  src="/home/ico-plus-circle-16.svg"
                  alt="ico-plus"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[-2px]">
        <button className="w-[140px] h-[25px] border-t border-b border-l border-[var(--border-color)] text-[12px] text-[#98A2B3] text-center bg-[rgb(249,250,251)]">
          정보수정
        </button>
        <button
          onClick={handleLogout}
          className="w-[140px] h-[25px] border border-[var(--border-color)] text-[12px] text-[#98A2B3] text-center bg-[rgb(249,250,251)]"
        >
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
