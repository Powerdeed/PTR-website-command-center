"use client";

import useForgotPassword from "../hooks/useForgotPassword";

import LoginUser from "./LoginUser";
import VerifyEmail from "./VerifyEmail";
import SendCodeToEmail from "./SendCodeToEmail";

export default function ForgotPasswordView() {
  const { state } = useForgotPassword();

  return (
    <div className="w-screen h-screen vertical-layout__outer items-center justify-center text-style__body">
      {!state.isCodeSent && <SendCodeToEmail />}

      {state.isCodeSent && !state.verified && <VerifyEmail />}

      {state.isCodeSent && state.verified && <LoginUser />}
    </div>
  );
}

// Add rate limiting on requestReset (prevent spam/abuse)
// Add OTP attempt limit (e.g. max 5 tries)
// Send OTP via email (nodemailer / resend / sendgrid)
// Don’t store resetToken in localStorage (use state if possible)
// Optional: auto-expire OTP UI timer sync with backend
