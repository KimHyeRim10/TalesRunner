import { supabase } from "@/utils/supabaseClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const { boardId, commentId, replyId } = req.query;

    const { error } = await supabase
      .from("reply")
      .delete()
      .eq("board_id", boardId)
      .eq("comment_id", commentId)
      .eq("id", replyId);

    if (error) {
      return res.status(500).json({ error: "댓글 삭제 중 오류 발생" });
    }

    return res.status(200).json({
      success: true,
      message: "댓글이 성공적으로 삭제되었습니다.",
    });
  }
}
