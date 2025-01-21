import { supabase } from "@/utils/supabaseClient";
import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "이메일이 필요합니다." });
    }

    try {
      // OTP 생성 (6자리 숫자)
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10분 후 만료

      // Supabase에 테이블에 저장
      const { error: saveError } = await supabase
        .from("email_verifications")
        .upsert(
          {
            email: email,
            otp: otp,
            expires_at: expiresAt,
          },
          { onConflict: "email" } // email 컬럼 기준으로 충돌 처리
        );

      if (saveError) {
        throw new Error(saveError.message);
      }

      // nodemailer 사용
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_SERVICE,
        port: 587,
        secure: false, // TLS 사용
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      console.log("email", email);

      await transporter.sendMail({
        from: `"테일즈런너" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "[테일즈런너] 이메일 인증번호가 도착했습니다.", // 이메일 제목
        text: `인증번호는 ${otp} 입니다. 10분 내로 입력해 주세요.`,
      });

      return res
        .status(200)
        .json({ success: true, message: "OTP가 이메일로 발송되었습니다." });
    } catch (error: unknown) {
      const message =
        (error as Error).message || "알 수 없는 서버 오류가 발생했습니다.";
      return res.status(500).json({ success: false, message });
    }
  }
}
