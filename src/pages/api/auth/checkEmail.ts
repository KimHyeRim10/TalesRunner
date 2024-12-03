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

  const { email } = req.query;
  console.log("email ->", email);

  if (!email) {
    res.status(400).json({ error: "Email is required" });
    return;
  }

  const { data, error } = await supabase
    .from("member")
    .select("email")
    .eq("email", email);

  if (error) {
    res.status(500).json({ error: "Database error" });
    return;
  }

  console.log("받은데타 =>", data);

  res.status(200).json({ isAvailable: data.length === 0 });
}
