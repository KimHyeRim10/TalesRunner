import { supabase } from "@/utils/supabaseClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Missing email in request query" });
  }

  try {
    const { data, error } = await supabase
      .from("member")
      .select("nickname_color")
      .eq("email", email)
      .single();

    if (error) {
      console.error("Supabase 에러:", error.message);
      throw error;
    }

    // nickname_color가 없을 경우 기본값 설정
    const nicknameColor = data?.nickname_color || "#FFA500";

    res.status(200).json({ nicknameColor });
  } catch (err: any) {
    console.error("서버 에러:", err.message);
    return res.status(500).json({ error: err.message });
  }
}
