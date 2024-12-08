import axios from "axios";

// User 관련 서비스 함수
export const getProfile = async (email: string): Promise<string> => {
  try {
    const response = await axios.post("/api/services/getUserProfile", {
      email,
    });

    return response.data.profileURL; // 성공 시 데이터 반환
  } catch (error: any) {
    console.error(error.response?.data?.error || error.message);
    throw new Error(error.response?.data?.error || error.message); // 에러를 상위에서 처리
  }
};
