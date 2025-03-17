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
            secret: process.env.RECAPTCHA_SECRET_KEY,
            response: captchaToken,
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

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, error: "Email and Password are required" });
  }

  const { data, error } = await supabase
    .from("member")
    .select("email,password,user_nickname")
    .eq("email", email)
    .single();

  if (error || !data) {
    return res
      .status(401)
      .json({ success: false, error: "Invalid email or password" });
  }

  const isMatch = await bcrypt.compare(password, data.password);

  if (!isMatch) {
    return res
      .status(401)
      .json({ success: false, error: "Invalid email or password" });
  }

  try {
    const login_token = jwt.sign(
      { email: data.email, nickname: data.user_nickname },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
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
