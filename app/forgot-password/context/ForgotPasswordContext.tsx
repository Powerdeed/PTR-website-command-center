"use client";

import { createContext, Dispatch } from "react";

type ForgotPasswordState = {
  verifying: boolean;
  setVerifying: Dispatch<React.SetStateAction<boolean>>;

  sendingCode: boolean;
  setSendingCode: Dispatch<React.SetStateAction<boolean>>;

  // SEND CODE TO EMAIL STATES
  emailValidationError: string;
  setEmailValidationError: Dispatch<React.SetStateAction<string>>;

  emailExistsError: string;
  setEmailExistsError: Dispatch<React.SetStateAction<string>>;

  email: string;
  setEmail: Dispatch<React.SetStateAction<string>>;

  isCodeSent: boolean;
  setIsCodeSent: Dispatch<React.SetStateAction<boolean>>;

  // VERIFY CODE STATES

  code: string[];
  setCode: Dispatch<React.SetStateAction<string[]>>;

  sendingCodeError: string;
  setSendingCodeError: Dispatch<React.SetStateAction<string>>;

  time: number;
  setTime: Dispatch<React.SetStateAction<number>>;

  timer: string | number;
  setTimer: Dispatch<React.SetStateAction<string | number>>;

  startTimer: boolean;
  setStartTimer: Dispatch<React.SetStateAction<boolean>>;

  verified: boolean;
  setVerified: Dispatch<React.SetStateAction<boolean>>;

  verifyingError: string;
  setVerifyingError: Dispatch<React.SetStateAction<string>>;

  // LOGGING IN WITH NEW PASSWORD STATES

  password: string;
  setPassword: Dispatch<React.SetStateAction<string>>;

  passwordAgain: string;
  setPasswordAgain: Dispatch<React.SetStateAction<string>>;

  loggingIn: boolean;
  setLoggingIn: Dispatch<React.SetStateAction<boolean>>;

  loggingInError: string;
  setLoggingInError: Dispatch<React.SetStateAction<string>>;
};

export const forgotPasswordContext = createContext<ForgotPasswordState | null>(
  null,
);
