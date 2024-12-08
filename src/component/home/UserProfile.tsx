"use Client";

import { removeUser } from "@/utils/localStorage";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import { UserInfo } from "@/types/userInfo";
import { useUser } from "@/context/UserContext";

interface UserProfileProps {
  user: UserInfo | null; // null을 허용
  setUser: React.Dispatch<React.SetStateAction<UserInfo | null>>; // 상태 변경 함수
}

const UserProfile: React.FC<UserProfileProps> = ({ user, setUser }) => {
  const router = useRouter();
  const { profileURL, setProfileURL } = useUser();
  const [profileImage, setProfileImage] = useState<string>(
    "/home/no-character.png"
  ); // 기본 이미지

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
    return <div>사용자 정보가 없습니다.</div>;
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
        console.error("이미지 업로드 실패:", error);
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

  return (
    <div>
      <div>
        <div className="flex-center w-[280px] h-[106px] border border-[var(--border-color)]">
          <div className="flex gap-x-4">
            <div className="flex flex-col gap-y-2 w-[49px] h-[80px]">
              <label htmlFor="profile-upload" className="cursor-pointer">
                <img
                  className="w-[48px] h-[48px] rounded-full object-cover border"
                  src={profileImage}
                  alt="프로필 이미지"
                />
              </label>
              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageUpload}
              />
              <button className="w-[48px] h-[22px] flex-center border border-[var(--border-color)] rounded-full text-xs font-medium text-gray-400 ">
                <img
                  className="w-[12px] h-[12px] pr-[px]"
                  src="/home/ico-home-12.svg"
                  alt="homeicon"
                />
                광장
              </button>
            </div>
            <div className="w-[183px] h-[80px] flex flex-col text-xs text-gray-500 font-[400] leading-[18px]">
              <div className="flex items-center">
                <img
                  className="w-[20px] h-[20px] mr-2 pointer-events-none"
                  src="/home/lv_106.png"
                  alt="Level image"
                />
                <span className="font-[400] truncate text-xs pl-1 text-[rgb(255,165,0)]">
                  {user.nickname}
                </span>
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
                <img
                  className="w-4 h-4 "
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
