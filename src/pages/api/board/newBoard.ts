import { supabase } from "@/utils/supabaseClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //POST 메서드만 허용함. 만약 다른 메서드 GET,PUT 등을 사용하면 응답과 함께 종료함.
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { title, content, nickname } = req.body;

  try {
    // Supabase에 데이터 삽입
    const { data, error } = await supabase.from("board").insert([
      {
        title: title,
        content: content,
        user_nickname: nickname,
      },
    ]);

    if (error) {
      throw new Error(error.message);
    }

    return res.status(200).json({ success: true, data });
  } catch (err: any) {
    console.error("게시판 저장 실패:", err.message);
    return res.status(500).json({ error: err.message });
  }
}
