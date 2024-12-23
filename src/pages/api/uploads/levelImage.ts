import { supabase } from "@/utils/supabaseClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { levelImage, nickname } = req.body;

  try {
    // 1. 스토리지에서 이미지 URL 생성
    const { data: publicUrlData } = supabase.storage
      .from("level-images")
      .getPublicUrl(levelImage);

    const levelImageUrl = publicUrlData.publicUrl;

    if (!levelImageUrl) {
      return res
        .status(404)
        .json({ error: "해당 이미지 URL을 찾을 수 없습니다." });
    }

    // 2. member 테이블의 level 컬럼 업데이트
    const { error: updateError } = await supabase
      .from("member")
      .update({ level: levelImageUrl })
      .eq("user_nickname", nickname);

    if (updateError) {
      return res.status(500).json({
        error: "데이터 업데이트에 실패했습니다.",
        details: updateError,
      });
    }

    return res.status(200).json({
      message: "레벨 이미지가 성공적으로 저장되었습니다.",
      levelImageUrl: levelImageUrl,
    });
  } catch (err: any) {
    return res.status(500).json({
      error: "서버 오류가 발생했습니다.",
      details: (err as Error).message,
    });
  }
}
