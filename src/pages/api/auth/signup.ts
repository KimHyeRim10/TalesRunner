import { supabase } from "@/utils/supabaseClient";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //POST 메서드만 허용함. 만약 다른 메서드 GET,PUT 등을 사용하면 응답과 함께 종료함.
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const formData = req.body;

  try {
    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(formData.userPass, 10);

    // Supabase에 데이터 삽입
    const { data, error } = await supabase.from("member").insert([
      {
        user_name: formData.userName,
        user_nickname: formData.userNickName,
        email: formData.email,
        password: hashedPassword,
      },
    ]);

    if (error) {
      throw new Error(error.message);
    }

    return res.status(200).json({ message: "회원가입 성공", data });
  } catch (err: unknown) {
    const message =
      (err as Error).message || "회원가입 중 알 수 없는 오류가 발생했습니다.";
    console.error("회원가입 실패:", message);
    return res.status(500).json({ error: message });
  }
}
