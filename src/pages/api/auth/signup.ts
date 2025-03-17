import { supabase } from "@/utils/supabaseClient";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const formData = req.body;

  try {
    const hashedPassword = await bcrypt.hash(formData.userPass, 10);

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
