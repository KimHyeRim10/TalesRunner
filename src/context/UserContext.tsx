"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { getProfile } from "@/services/userService";
import { getUser } from "@/utils/localStorage"; // getUser 함수 임포트

interface UserInfo {
  email: string;
}

interface UserContextProps {
  profileURL: string | null;
  setProfileURL: (url: string) => void;
}

const UserContext = createContext<UserContextProps | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [profileURL, setProfileURL] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfileImage = async () => {
      /*   if (typeof window !== "undefined") { */
      const userInfo: UserInfo | null = getUser();
      console.log("User info from localStorage:", userInfo);

      if (userInfo?.email) {
        const email = userInfo.email;
        const url = await getProfile(email); // API 호출
        setProfileURL(url || "/home/no-character.png");
      } else {
        setProfileURL("/home/no-character.png");
        /*        } */
      }
    };

    fetchProfileImage();
  }, []);

  return (
    <UserContext.Provider value={{ profileURL, setProfileURL }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom Hook
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  console.log("useUser context:", context); // 상태 출력
  return context;
};
