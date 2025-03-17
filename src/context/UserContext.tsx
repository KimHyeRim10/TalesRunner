"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { getProfile, getLevel, getNicknameColor } from "@/services/userService";
import { getUser } from "@/utils/localStorage";
import { UserInfo } from "@/types/userInfo";

interface UserContextProps {
  user: UserInfo | null;
  profileURL: string | null;
  levelURL: string | null;
  nicknameColor: string | null;
  setUser: React.Dispatch<React.SetStateAction<UserInfo | null>>;
  setProfileURL: (profile: string) => void;
  setLevelURL: (level: string) => void;
  setNicknameColor: (color: string) => void;
  refreshUserData: () => void;
}

const UserContext = createContext<UserContextProps | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [profileURL, setProfileURL] = useState<string | null>(null);
  const [levelURL, setLevelURL] = useState<string | null>(null);
  const [nicknameColor, setNicknameColor] = useState<string | null>(null);

  const fetchUserData = async () => {
    const user = getUser();
    if (!user || !user.email) {
      return;
    }
    setUser(user);

    try {
      const [profile, level, color] = await Promise.all([
        getProfile(user.email),
        getLevel(user.email),
        getNicknameColor(user.email),
      ]);

      setProfileURL(profile || "/home/no-character.png");
      setLevelURL(level || "/uploads/v1/level/lv_03.png");
      setNicknameColor(color || "#FFA500");
    } catch (error) {
      console.error("유저 데이터 가져오기 실패:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const refreshUserData = () => {
    fetchUserData();
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        profileURL,
        setProfileURL,
        levelURL,
        setLevelURL,
        nicknameColor,
        setNicknameColor,
        refreshUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
