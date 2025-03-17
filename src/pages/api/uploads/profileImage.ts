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

    const sanitizedNickname = slugify(nickname);
    const fileName = `${sanitizedNickname}_${Date.now()}.png`.replace(
      /[^a-zA-Z0-9_.-]/g,
      ""
    );

    const base64 = file.split(",")[1];
    const buffer = Buffer.from(base64, "base64");

    if (!Buffer.isBuffer(buffer) || buffer.length === 0) {
      throw new Error("Invalid Base64 buffer data");
    }

    const { error: uploadError } = await supabase.storage
      .from("profile-images")
      .upload(fileName, buffer, {
        contentType: "image/png",
        upsert: true,
      });

    if (uploadError) {
      console.error("Supabase 업로드 오류:", uploadError);
      throw uploadError;
    }

    const { data: urlData } = supabase.storage
      .from("profile-images")
      .getPublicUrl(fileName);

    if (!urlData || !urlData.publicUrl) {
      throw new Error("Public URL 생성 실패");
    }

    res.status(200).json({ url: urlData.publicUrl });
  } catch (err: unknown) {
    console.error({ err: (err as Error).message || "Unknown error" });
    return res
      .status(500)
      .json({ error: (err as Error).message || "An unknown error occurred" });
  }
}
