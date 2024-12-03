import { supabase } from "@/utils/supabaseClient";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 보안상 민감한 데이터는 post요청함!
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { email, password } = req.body;
  console.log("email ->", email);
  console.log("password ->", password);

  if (!email || !password) {
    res.status(400).json({ error: "Email and Password are required" });
    return;
  }

  const { data, error } = await supabase
    .from("member")
    .select("email ,password,  user_nickname")
    .eq("email", email)
    .single(); // 하나만 가져와서 값을 비교함!

  if (error || !data) {
    res.status(401).json({ error: "Invalid email or password" }); // 보안상 상세 정보 노출하지 않음
    return;
  }

  // 해시된 비밀번호 비교

  const isMatch = await bcrypt.compare(password as string, data.password);
  // password as stirng :  사용자가 입력한 비밀번호 , data.password : 데이터베이스에 저장된 해시 비밀번호
  // bcrypt.compare는 Promise<boolean>을 반환
  // 일치하면 true, 그렇지 않으면 false를 반환
  if (isMatch) {
    console.log("비밀번호 일치");
  } else {
    console.log("비밀번호 불일치");
  }

  // JWT 토큰 생성
  const login_token = jwt.sign(
    { email: data.email, nickname: data.user_nickname },
    process.env.JWT_SECRET!,
    {
      expiresIn: "1h", // 토큰 만료 시간 (1시간)
    }
  );
  console.log("토큰 =>", login_token);

  const decoded = jwt.verify(login_token, process.env.JWT_SECRET!);
  console.log("디코딩된 토큰:", decoded);

  res.status(200).json({
    message: true,
    login_token,
    decoded,
  });
}
