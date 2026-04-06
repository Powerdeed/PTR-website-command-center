"use client";

import { useContext, useEffect } from "react";

import { useRouter } from "next/navigation";

import { forgotPasswordContext } from "../context/ForgotPasswordContext";

import { verifyOTP } from "../services/ForgotPasswordApi";

import { ApiError } from "@lib/api/utils/apiError";

export default function useAutoSubmitCode() {
  const router = useRouter();

  const forgotPassContext = useContext(forgotPasswordContext);

  if (!forgotPassContext)
    throw new Error("forgotPassContext must be within a provider");

  const {
    email,
    code,
    verified,
    setVerified,
    verifying,
    setVerifying,
    setLoggingInError,
  } = forgotPassContext;

  useEffect(() => {
    setLoggingInError("");

    if (!code.every((digit) => digit !== "") || verifying || verified) return;

    const verifyingOTP = async () => {
      try {
        setVerifying(true);

        const data = await verifyOTP({ email, otp: code.join("") });

        localStorage.setItem("resetToken", data.resetToken);
        setVerified(true);
      } catch (error) {
        if (error instanceof ApiError) {
          setLoggingInError(error.message);
        } else {
          setLoggingInError("Something went wrong");
        }
      } finally {
        setVerifying(false);
      }
    };

    verifyingOTP();
  }, [code, verifying, verified]);

  useEffect(() => {
    setLoggingInError("");
  }, [code]);

  const handleRouteBackToLogin = () => {
    router.push("/login");
  };

  return { handleRouteBackToLogin };
}
