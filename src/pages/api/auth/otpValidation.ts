import { supabase } from "@/utils/supabaseClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { email, otp } = req.body;

  const { data, error } = await supabase
    .from("email_verifications")
    .select("*")
    .eq("email", email)
    .eq("otp", otp)
    .single();

  if (!data) {
    return res.status(200).json({ success: false });
  }

  res.status(200).json({ success: true });
}
