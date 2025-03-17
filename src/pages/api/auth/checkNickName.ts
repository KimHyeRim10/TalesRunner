import { supabase } from "@/utils/supabaseClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { nickname } = req.query;

  if (!nickname) {
    res.status(400).json({ error: "Nickname is required" });
    return;
  }

  const { data, error } = await supabase
    .from("member")
    .select("user_nickname")
    .eq("user_nickname", nickname);

  if (error) {
    res.status(500).json({ error: "Database error" });
    return;
  }

  res.status(200).json({ isAvailable: data.length === 0 });
}
