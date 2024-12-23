import { supabase } from "@/utils/supabaseClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { boardId } = req.query;

  try {
    // Supabase에서 댓글 데이터 가져오기
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("board_id", boardId); // 최신순 정렬

    if (error) {
      throw new Error(error.message);
    }

    return res.status(200).json({ success: true, commentList: data });
  } catch (err: any) {
    console.error("댓글 목록 가져오기 실패:", err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
}
