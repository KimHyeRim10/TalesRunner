import { supabase } from "@/utils/supabaseClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //GET 메서드만 허용함. 만약 다른 메서드 POST,PUT 등을 사용하면 응답과 함께 종료함.
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
    .eq("user_nickname", nickname); // eq를 사용// user_nickname값이 nickname과 동일한 행을 필터링함

  if (error) {
    res.status(500).json({ error: "Database error" });
    return;
  }

  res.status(200).json({ isAvailable: data.length === 0 });
}
