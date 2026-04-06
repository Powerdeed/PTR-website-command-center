"use client";

import { useContext } from "react";
import { forgotPasswordContext } from "../context/ForgotPasswordContext";

export default function useForgotPasswordState() {
  const forgotPassContext = useContext(forgotPasswordContext);

  if (!forgotPassContext)
    throw new Error("forgotPassContext must be within a provider");

  return { ...forgotPassContext };
}
