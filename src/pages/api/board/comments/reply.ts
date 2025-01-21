import { supabase } from "@/utils/supabaseClient";
import type { NextApiRequest, NextApiResponse } from "next";
import sanitizeHtml from "sanitize-html";

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

  // XSS 방어: 내용 필터링 (허용된 태그만 남김)
  const sanitizedContent = sanitizeHtml(content, {
    allowedTags: ["b", "i", "em", "strong", "a"], // 허용할 태그
    allowedAttributes: {
      a: ["href"], // a 태그의 href 속성만 허용
    },
  });

  try {
    const { data, error } = await supabase.from("reply").insert([
      {
        board_id: boardId,
        comment_id: commentId,
        user_nickname: nickname,
        content: sanitizedContent,
        profile: profileURL,
        user_level: levelURL,
        nickname_color: nicknameColor,
      },
    ]);

    if (error) {
      throw new Error(error.message);
    }

    return res.status(200).json({ success: true, data });
  } catch (err: unknown) {
    const message =
      (err as Error).message || "댓글 저장 중 알 수 없는 오류가 발생했습니다.";
    console.error("댓글 저장 실패:", message);
    return res.status(500).json({ error: message });
  }
}
