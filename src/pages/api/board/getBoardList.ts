import { supabase } from "@/utils/supabaseClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Supabase에서 게시판 데이터 가져오기
    const { data, error } = await supabase
      .from("board")
      .select("*")
      .order("created_at", { ascending: false }); // 최신순 정렬

    if (error) {
      throw new Error(error.message);
    }

    return res.status(200).json({ success: true, boardList: data });
  } catch (err: any) {
    console.error("게시판 목록 가져오기 실패:", err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
}
