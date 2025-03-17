import { supabase } from "@/utils/supabaseClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const { id, title, content, levelURL, nicknameColor } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "게시글 ID가 제공되지 않았습니다.",
      });
    }

    type UpdateData = {
      title?: string;
      content?: string;
      user_level?: string;
      nickname_color?: string;
    };

    const updateData: UpdateData = {};
    if (title !== undefined) updateData.title = title;
    if (content !== undefined) updateData.content = content;
    if (levelURL !== undefined) updateData.user_level = levelURL;
    if (nicknameColor !== undefined) updateData.nickname_color = nicknameColor;

    try {
      const { data, error } = await supabase
        .from("board")
        .update(updateData)
        .eq("id", id)
        .select("*");

      if (error) {
        console.error("Supabase Error:", error.message);
        return res.status(500).json({
          success: false,
          message: "게시글 수정 중 오류 발생",
          error: error.message,
        });
      }

      if (!data || data.length === 0) {
        return res.status(404).json({
          success: false,
          message: "게시글을 찾을 수 없습니다.",
        });
      }

      return res.status(200).json({
        success: true,
        message: "게시글이 성공적으로 수정되었습니다.",
        data,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "알 수 없는 오류";
      console.error("서버 오류:", message);
      return res.status(500).json({
        success: false,
        message: "서버 내부 오류가 발생했습니다.",
      });
    }
  }
}
