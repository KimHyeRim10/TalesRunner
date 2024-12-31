import { supabase } from "@/utils/supabaseClient";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, error: "Method not allowed" });
  }

  const { email, password, captchaToken, failedAttempts } = req.body;

  // Step 1: reCAPTCHA 검증 (3회 실패 이상인 경우만 실행)
  if (failedAttempts >= 3) {
    if (!captchaToken) {
      return res
        .status(400)
        .json({ success: false, error: "CAPTCHA token is required" });
    }

    try {
      const recaptchaResponse = await axios.post(
        "https://www.google.com/recaptcha/api/siteverify",
        null,
        {
          params: {
            secret: process.env.RECAPTCHA_SECRET_KEY, // 서버에서 관리하는 비밀 키
            response: captchaToken, // 클라이언트에서 전달받은 토큰
          },
        }
      );

      const { success } = recaptchaResponse.data;

      if (!success) {
        return res
          .status(401)
          .json({ success: false, error: "Invalid CAPTCHA token" });
      }
    } catch (error) {
      console.error("reCAPTCHA 검증 실패:", error);
      return res
        .status(500)
        .json({ success: false, error: "CAPTCHA verification failed" });
    }
  }

  // Step 2: 이메일 및 비밀번호 검증
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, error: "Email and Password are required" });
  }

  const { data, error } = await supabase
    .from("member")
    .select("email,password,user_nickname")
    .eq("email", email)
    .single(); // 하나만 가져와서 값을 비교함!

  if (error || !data) {
    return res
      .status(401)
      .json({ success: false, error: "Invalid email or password" }); // 보안상 상세 정보 노출하지 않음
  }

  // Step 3: 해시된 비밀번호 비교
  const isMatch = await bcrypt.compare(password, data.password);
  // password as stirng :  사용자가 입력한 비밀번호 , data.password : 데이터베이스에 저장된 해시 비밀번호
  // bcrypt.compare는 Promise<boolean>을 반환
  // 일치하면 true, 그렇지 않으면 false를 반환
  if (!isMatch) {
    return res
      .status(401)
      .json({ success: false, error: "Invalid email or password" }); // 비밀번호가 일치하지 않는 경우 응답
  }

  // Step 4: JWT 토큰 생성
  try {
    const login_token = jwt.sign(
      { email: data.email, nickname: data.user_nickname },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" } // 토큰 만료 시간 (1시간)
    );

    const decoded = jwt.verify(login_token, process.env.JWT_SECRET!);

    return res.status(200).json({
      success: true,
      login_token,
      decoded,
    });
  } catch (error) {
    console.error("JWT 생성 오류:", error);
    return res.status(500).json({
      success: false,
      error: "Token generation failed",
    });
  }
}
