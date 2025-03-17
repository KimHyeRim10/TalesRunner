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
    const { data, error } = await supabase
      .from("reply")
      .select("*")
      .eq("board_id", boardId)
      .order("created_at", { ascending: true });

    if (error) {
      throw new Error(error.message);
    }

    return res.status(200).json({ success: true, replyList: data });
  } catch (err: unknown) {
    const message =
      (err as Error).message ||
      "댓글 목록 가져오기 중 알 수 없는 오류가 발생했습니다.";
    console.error("댓글 목록 가져오기 실패:", message);
    return res.status(500).json({ success: false, error: message });
  }
}
