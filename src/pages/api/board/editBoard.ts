import { supabase } from "@/utils/supabaseClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const { id, title, content } = req.body;

    const { data, error } = await supabase
      .from("board")
      .update({ title, content })
      .eq("id", id)
      .select("*"); // 수정된 데이터를 반환

    if (error) {
      return res
        .status(500)
        .json({ success: false, message: "게시글 수정 중 오류 발생", error });
    }

    if (!data || data.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "게시글을 찾을 수 없습니다." });
    }

    return res.status(200).json({
      success: true,
      message: "게시글이 성공적으로 수정되었습니다.",
      data,
    });
  }
}
