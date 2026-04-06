// useInputCode.ts
"use client";
import { useContext, useEffect, useRef } from "react";
import { forgotPasswordContext } from "../context/ForgotPasswordContext";

export default function useInputCode() {
  const forgotPassContext = useContext(forgotPasswordContext);
  if (!forgotPassContext)
    throw new Error("forgotPassContext must be within a provider");

  const { code, setCode } = forgotPassContext;
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value.replace(/\D/g, "");
    if (!value) return;

    const newCode = [...code];
    newCode[index] = value[0];
    setCode(newCode);

    if (index < code.length - 1) inputsRef.current[index + 1]?.focus();
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace") {
      if (code[index]) {
        const newCode = [...code];
        newCode[index] = "";
        setCode(newCode);
      } else if (index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  return { inputsRef, handleChange, handleKeyDown };
}
