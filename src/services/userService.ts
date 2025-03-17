import axios from "axios";

export const handleAxiosError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    console.log(error.response?.data?.error || error.message);
    throw new Error(error.response?.data?.error || error.message);
  } else {
    console.log("예상치 못한 오류:", error);
    throw new Error("예상치 못한 오류 발생");
  }
};

export const getProfile = async (email: string): Promise<string> => {
  try {
    const response = await axios.post("/api/services/getUserProfile", {
      email,
    });

    return response.data.profileURL;
  } catch (error: unknown) {
    handleAxiosError(error);
    throw error;
  }
};

export const getLevel = async (email: string): Promise<string> => {
  try {
    const response = await axios.post("/api/services/getUserLevel", {
      email,
    });

    return response.data.levelURL;
  } catch (error: unknown) {
    handleAxiosError(error);
    throw error;
  }
};

export const getNicknameColor = async (email: string): Promise<string> => {
  try {
    const response = await axios.post("/api/services/getUserNicknameColor", {
      email,
    });

    return response.data.nicknameColor;
  } catch (error: unknown) {
    handleAxiosError(error);
    throw error;
  }
};
