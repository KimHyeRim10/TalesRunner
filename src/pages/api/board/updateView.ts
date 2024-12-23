import { supabase } from "@/utils/supabaseClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { boardId } = req.body;

    try {
      // 현재 조회수 가져오기
      const { data: board, error: fetchError } = await supabase
        .from("board")
        .select("views")
        .eq("id", boardId)
        .single();

      if (fetchError || !board) {
        throw new Error("게시글 정보를 가져오는 중 오류 발생");
      }

      // 조회수 업데이트
      const { error: updateError } = await supabase
        .from("board")
        .update({ views: board.views + 1 })
        .eq("id", boardId);

      if (updateError) {
        throw new Error("조회수 업데이트 중 오류 발생");
      }

      res.status(200).json({
        message: "조회수 업데이트 성공",
        newViewCount: board.views + 1,
      });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
}
