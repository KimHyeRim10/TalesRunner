import { supabase } from "@/utils/supabaseClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    boardId,
    commentId,
    nickname,
    profileURL,
    content,
    levelURL,
    nicknameColor,
  } = req.body;

  try {
    const { data, error } = await supabase.from("reply").insert([
      {
        board_id: boardId,
        comment_id: commentId,
        user_nickname: nickname,
        content: content,
        profile: profileURL,
        user_level: levelURL,
        nickname_color: nicknameColor,
      },
    ]);

    if (error) {
      throw new Error(error.message);
    }

    return res.status(200).json({ success: true, data });
  } catch (err: any) {
    console.error("댓글 저장 실패:", err.message);
    return res.status(500).json({ error: err.message });
  }
}
