import { supabase } from "@/utils/supabaseClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Missing email in request query" });
  }

  try {
    const { data, error } = await supabase
      .from("member")
      .select("level")
      .eq("email", email)
      .single();

    if (error) {
      console.error("Supabase 에러:", error.message);
      throw error;
    }

    const levelURL = data?.level || "/uploads/v1/level/lv_03.png";

    res.status(200).json({ levelURL });
  } catch (err: unknown) {
    console.error({ err: (err as Error).message || "Unknown error" });
    return res
      .status(500)
      .json({ error: (err as Error).message || "An unknown error occurred" });
  }
}
