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
    } catch (err: unknown) {
      const message =
        (err as Error).message ||
        "조회수 업데이트 중 알 수 없는 오류가 발생했습니다.";
      console.error("조회수 업데이트 실패:", message);
      return res.status(500).json({ error: message });
    }
  }
}
