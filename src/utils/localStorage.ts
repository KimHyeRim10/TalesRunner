import { getCookie } from "@/utils/cookies";

interface UserInfo {
  id: number;
  nickname: string;
  email: string;
}

export const getUser = (): UserInfo | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const userInfo = localStorage.getItem("userInfo");
  const token = getCookie("x-auth-jwt");

  if (userInfo && token) {
    return JSON.parse(userInfo);
  }
  return null;
};

export const removeUser = (): void => {
  document.cookie = "x-auth-jwt=; path=/; max-age=0;";
  localStorage.removeItem("userInfo");
};
