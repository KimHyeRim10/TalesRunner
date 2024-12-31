import { supabase } from "@/utils/supabaseClient";
import type { NextApiRequest, NextApiResponse } from "next";
import sanitizeHtml from "sanitize-html";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //POST 메서드만 허용함. 만약 다른 메서드 GET,PUT 등을 사용하면 응답과 함께 종료함.
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { title, content, nickname, levelURL, nicknameColor } = req.body;

  // XSS 방어: 제목 필터링 (HTML 태그 제거)
  const sanitizedTitle = sanitizeHtml(title, {
    allowedTags: [], // 제목에서는 모든 HTML 태그를 제거
    allowedAttributes: {}, // 속성도 허용하지 않음
  });

  // XSS 방어: 내용 필터링 (허용된 태그만 남김)
  const sanitizedContent = sanitizeHtml(content, {
    allowedTags: ["b", "i", "em", "strong", "a"], // 허용할 태그
    allowedAttributes: {
      a: ["href"], // a 태그의 href 속성만 허용
    },
  });

  try {
    // Supabase에 데이터 삽입
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
  } catch (err: any) {
    console.error("게시판 저장 실패:", err.message);
    return res.status(500).json({ error: err.message });
  }
}
