"use client";

import { useState } from "react";

import { forgotPasswordContext } from "./ForgotPasswordContext";
import { CODE_DIGITS_NUMBER } from "../constants/numberOfDigitsInCode";

export default function ForgotPasswordProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [emailValidationError, setEmailValidationError] = useState("");

  const [emailExistsError, setEmailExistsError] = useState("");

  const [email, setEmail] = useState("");

  const [sendingCode, setSendingCode] = useState(false);

  const [isCodeSent, setIsCodeSent] = useState(false);

  const [code, setCode] = useState<string[]>(
    Array(CODE_DIGITS_NUMBER).fill(""),
  );

  const [sendingCodeError, setSendingCodeError] = useState("");

  const [time, setTime] = useState(60);

  const [timer, setTimer] = useState<string | number>("");

  const [startTimer, setStartTimer] = useState(false);

  const [verifying, setVerifying] = useState(false);

  const [verified, setVerified] = useState(false);

  const [verifyingError, setVerifyingError] = useState("");

  const [password, setPassword] = useState("");

  const [passwordAgain, setPasswordAgain] = useState("");

  const [loggingIn, setLoggingIn] = useState(false);

  const [loggingInError, setLoggingInError] = useState("");
  return (
    <forgotPasswordContext.Provider
      value={{
        emailValidationError,
        setEmailValidationError,
        email,
        setEmail,
        emailExistsError,
        setEmailExistsError,
        sendingCode,
        setSendingCode,
        isCodeSent,
        setIsCodeSent,

        code,
        setCode,
        sendingCodeError,
        setSendingCodeError,
        time,
        setTime,
        timer,
        setTimer,
        startTimer,
        setStartTimer,
        verifying,
        setVerifying,
        verified,
        setVerified,
        verifyingError,
        setVerifyingError,

        password,
        setPassword,
        passwordAgain,
        setPasswordAgain,
        loggingIn,
        setLoggingIn,
        loggingInError,
        setLoggingInError,
      }}
    >
      {children}
    </forgotPasswordContext.Provider>
  );
}
