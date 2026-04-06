"use client";

import { useContext } from "react";

import { forgotPasswordContext } from "../context/ForgotPasswordContext";

import { ApiError } from "@lib/api/utils/apiError";
import { requestReset } from "../services/ForgotPasswordApi";

export default function useSendCodeToEmail() {
  const forgotPassContext = useContext(forgotPasswordContext);

  if (!forgotPassContext)
    throw new Error("forgotPassContext must be within a provider");

  const {
    email,
    setEmailExistsError,
    setSendingCode,
    setIsCodeSent,
    setTime,
    setStartTimer,
  } = forgotPassContext;

  const handleSendCodeToEmail = async () => {
    try {
      setSendingCode(true);

      await requestReset({ email });

      setIsCodeSent(true);
      setTime(60);
      setStartTimer(true);
    } catch (error) {
      if (error instanceof ApiError) {
        setEmailExistsError(
          error.status === 404 ? "No user matches this email" : error.message,
        );
        return;
      }

      setEmailExistsError("Something went wrong");
    } finally {
      setSendingCode(false);
    }
  };

  return { handleSendCodeToEmail };
}
