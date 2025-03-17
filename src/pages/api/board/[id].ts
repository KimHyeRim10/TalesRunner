import { supabase } from "@/utils/supabaseClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const id = req.query.id;

  if (!id) {
    return res
      .status(400)
      .json({ error: "ID is required and must be a number" });
  }

  const { data, error } = await supabase.from("board").select("*").eq("id", id);

  if (error) {
    console.error("Supabase Query Error:", error);
    return res.status(500).json({ error: error.message });
  }

  if (!data) {
    return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
  }

  return res.status(200).json(data);
}
