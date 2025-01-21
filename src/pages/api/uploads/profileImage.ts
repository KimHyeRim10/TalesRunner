import { supabase } from "@/utils/supabaseClient";
import type { NextApiRequest, NextApiResponse } from "next";
import { slugify } from "transliteration";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { file, nickname } = req.body;

    if (!file || !nickname) {
      return res.status(400).json({ error: "Missing file or nickname" });
    }

    // 한글을 영문으로 변환하고 URL-safe한 파일 이름 생성
    const sanitizedNickname = slugify(nickname); // 한글 → 영문 변환
    const fileName = `${sanitizedNickname}_${Date.now()}.png`.replace(
      /[^a-zA-Z0-9_.-]/g,
      ""
    );

    // Base64 데이터 추출 및 검증
    const base64 = file.split(",")[1]; // Base64 데이터만 추출
    const buffer = Buffer.from(base64, "base64");

    if (!Buffer.isBuffer(buffer) || buffer.length === 0) {
      throw new Error("Invalid Base64 buffer data");
    }

    // Supabase Storage에 업로드
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("profile-images")
      .upload(fileName, buffer, {
        contentType: "image/png",
        upsert: true,
      });

    if (uploadError) {
      console.error("Supabase 업로드 오류:", uploadError);
      throw uploadError;
    }

    // 업로드된 파일 URL 가져오기
    const { data: urlData } = supabase.storage
      .from("profile-images")
      .getPublicUrl(fileName);

    if (!urlData || !urlData.publicUrl) {
      throw new Error("Public URL 생성 실패");
    }

    // 성공적으로 반환
    res.status(200).json({ url: urlData.publicUrl });
  } catch (err: unknown) {
    console.error({ err: (err as Error).message || "Unknown error" });
    return res
      .status(500)
      .json({ error: (err as Error).message || "An unknown error occurred" });
  }
}
