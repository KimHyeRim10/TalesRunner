import { supabase } from "@/utils/supabaseClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, imageUrl } = req.body;

  if (!email || !imageUrl) {
    return res.status(400).json({ error: "Missing userId or imageUrl" });
  }

  try {
    // Supabase DB 업데이트
    const { data, error } = await supabase
      .from("member")
      .update({ profile: imageUrl })
      .eq("email", email);

    if (error) {
      throw error;
    }

    res.status(200).json({ success: true, data });
  } catch (err: any) {
    console.error({ err: err.message });
    return res.status(500).json({ error: err.message });
  }
}
