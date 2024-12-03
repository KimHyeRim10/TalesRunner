import { Cookies } from "react-cookie";

const cookies = new Cookies(); // 인스턴스 생성

// 쿠키 읽기
export const getCookie = (name: string): string | undefined => {
  return cookies.get(name); // react-cookie에서 제공하는 get 메서드 사용
};

export const removeCookie = (name: string): void => {
  cookies.remove(name); // 추가 옵션 없이 호출
};
