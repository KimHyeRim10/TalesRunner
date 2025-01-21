import { supabase } from "@/utils/supabaseClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const nickname = req.query.nickname;

  try {
    const { data, error } = await supabase
      .from("member")
      .select("profile")
      .eq("user_nickname", nickname);

    if (error) {
      console.error("Supabase error:", error.message);
      return res.status(500).json({ error: "Database query failed" });
    }

    return res.status(200).json(data);
  } catch (err: unknown) {
    const message = (err as Error).message || "Internal server error";
    console.error("Error fetching profile data:", message);
    return res.status(500).json({ error: message });
  }
}
