import { supabase } from "@/utils/supabaseClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const { id } = req.query;

    const { error } = await supabase.from("board").delete().eq("id", id);

    if (error) {
      return res.status(500).json({ error: "게시글 삭제 중 오류 발생" });
    }

    return res.status(200).json({
      success: true,
      message: "게시글이 성공적으로 삭제되었습니다.",
    });
  }
}
