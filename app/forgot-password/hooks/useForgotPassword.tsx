"use client";

import useAutoSubmitCode from "./useAutoSubmitCode";
import useCodeInputTimer from "./useCodeInputTimer";
import useForgotPasswordState from "./useForgotPasswordState";
import useInputChange from "./useInputChange";
import useLoginWithNewPassword from "./useLoginWithNewPassword";
import useSendCodeToEmail from "./useSendCodeToEmail";

export default function useForgotPassword() {
  const autoSubmit = useAutoSubmitCode();
  const codeInputTimer = useCodeInputTimer();
  const state = useForgotPasswordState();
  const inputChange = useInputChange();
  const loginWithNewPassword = useLoginWithNewPassword();
  const sendCodeToEmail = useSendCodeToEmail();

  return {
    state,
    actions: {
      ...codeInputTimer,
      ...autoSubmit,
      ...inputChange,
      ...loginWithNewPassword,
      ...sendCodeToEmail,
    },
  };
}
