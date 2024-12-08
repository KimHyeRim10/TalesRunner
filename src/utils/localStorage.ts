import { getCookie /* removeCookie */ } from "@/utils/cookies";

interface UserInfo {
  id: number;
  nickname: string;
  email: string;
}

export const getUser = (): UserInfo | null => {
  if (typeof window === "undefined") {
    return null; // 서버에서 실행될 때는 null 반환
  }

  const userInfo = localStorage.getItem("userInfo");
  const token = getCookie("x-auth-jwt");

  if (userInfo && token) {
    return JSON.parse(userInfo); // userInfo를 파싱하여 반환
  }
  return null; // 유저 정보가 없을 때
};

export const removeUser = (): void => {
  // 쿠키 삭제
  document.cookie = "x-auth-jwt=; path=/; max-age=0;";

  // 로컬스토리지 초기화
  localStorage.removeItem("userInfo");
};
