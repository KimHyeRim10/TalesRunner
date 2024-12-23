import { supabase } from "@/utils/supabaseClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { nicknameColor, nickname } = req.body;

  try {
    const { data, error } = await supabase
      .from("member")
      .update({ nickname_color: nicknameColor })
      .eq("user_nickname", nickname);

    if (error) {
      throw error;
    }

    res.status(200).json({ success: true, data });
  } catch (err: any) {
    console.error({ err: err.message });
    return res.status(500).json({ error: err.message });
  }
}
