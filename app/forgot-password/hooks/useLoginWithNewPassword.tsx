"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";

import { forgotPasswordContext } from "../context/ForgotPasswordContext";

import { ApiError } from "@lib/api/utils/apiError";

import { resetPassword } from "../services/ForgotPasswordApi";

export default function useLoginWithNewPassword() {
  const router = useRouter();
  const forgotPassContext = useContext(forgotPasswordContext);

  if (!forgotPassContext)
    throw new Error("forgotPassContext must be within a provider");

  const { password, passwordAgain, setLoggingIn, setLoggingInError } =
    forgotPassContext;

  const handleLogin = async () => {
    if (password !== passwordAgain)
      return setLoggingInError("*Password and retyped password must match*");

    try {
      setLoggingIn(true);
      setLoggingInError("");

      const resetToken = JSON.stringify(localStorage.getItem("resetToken"));

      await resetPassword({
        resetToken,
        newPassword: password,
      });

      router.push("/login");
    } catch (err: unknown) {
      if (err instanceof ApiError) {
        setLoggingInError(err.message);
      }
    } finally {
      setLoggingIn(false);
    }
  };

  return { handleLogin };
}
