"use client";

import { useContext, useEffect, useRef } from "react";
import { forgotPasswordContext } from "../context/ForgotPasswordContext";
import { ApiError } from "@lib/api/utils/apiError";

export default function useCodeInputTimer() {
  const forgotPassContext = useContext(forgotPasswordContext);

  if (!forgotPassContext)
    throw new Error("forgotPassContext must be within a provider");

  const {
    setTime,
    setTimer,
    startTimer,
    setStartTimer,
    setSendingCode,
    setSendingCodeError,
  } = forgotPassContext;

  const timerRef = useRef(false);

  useEffect(() => {
    if (!startTimer || timerRef.current) return;

    timerRef.current = true;

    setTimer("01:00");

    const countdown = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(countdown);
          setStartTimer(false);
          setTimer("00:00");
          timerRef.current = false;
          return 0;
        }

        const newTime = prevTime - 1;

        const m = Math.floor(newTime / 60)
          .toString()
          .padStart(2, "0");

        const s = (newTime % 60).toString().padStart(2, "0");

        setTimer(`${m}:${s}`);

        return newTime;
      });
    }, 1000);

    return () => {
      clearInterval(countdown);
    };
  }, [startTimer]);

  const handleCodeResend = async () => {
    try {
      setSendingCode(true);

      // your resend OTP code here
    } catch (error) {
      if (error instanceof ApiError) setSendingCodeError("Error sending OTP");
    } finally {
      setSendingCode(false);
      setTime(60);
      setStartTimer(true);
    }
  };

  return { handleCodeResend };
}
