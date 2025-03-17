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

  const { title, content, nickname, levelURL, nicknameColor } = req.body;

  const sanitizedTitle = sanitizeHtml(title, {
    allowedTags: [],
    allowedAttributes: {},
  });

  const sanitizedContent = sanitizeHtml(content, {
    allowedTags: ["b", "i", "em", "strong", "a"],
    allowedAttributes: {
      a: ["href"],
    },
  });

  try {
    const { data, error } = await supabase.from("board").insert([
      {
        user_nickname: nickname,
        title: sanitizedTitle,
        content: sanitizedContent,
        user_level: levelURL,
        nickname_color: nicknameColor,
      },
    ]);

    if (error) {
      throw new Error(error.message);
    }

    return res.status(200).json({ success: true, data });
  } catch (err: unknown) {
    const message = (err as Error).message || "An unknown error occurred";
    console.error("게시판 저장 실패:", message);
    return res.status(500).json({ error: message });
  }
}
