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
    const { data, error } = await supabase
      .from("member")
      .update({ profile: imageUrl })
      .eq("email", email);

    if (error) {
      throw error;
    }

    res.status(200).json({ success: true, data });
  } catch (err: unknown) {
    console.error({ err: (err as Error).message || "Unknown error" });
    return res
      .status(500)
      .json({ error: (err as Error).message || "An unknown error occurred" });
  }
}
