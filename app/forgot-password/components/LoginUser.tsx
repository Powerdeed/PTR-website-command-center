"use client";

import Button from "@global components/ui/Button";
import Loader from "@global components/ui/Loader";
import { SectionTitle } from "@global components/ui/Title";

import useForgotPassword from "../hooks/useForgotPassword";

import { validatePassword } from "../utils/validatePassword";

export default function LoginUser() {
  const { state, actions } = useForgotPassword();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        const error = validatePassword(state.password);
        if (error) {
          state.setLoggingInError(error);
          return;
        }

        actions.handleLogin();
      }}
      className="feature-container-vertical w-100"
    >
      <SectionTitle title="Reset your password" style="text-center" />

      <div className="flex-1 vertical-layout__inner w-full">
        Type new password
        <div className="flex gap-2.5 items-center w-full">
          <input
            type="password"
            className="flex-1 w-full input-style field-sizing-content"
            value={state.password}
            onChange={(e) => {
              state.setLoggingInError("");
              state.setPassword(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="flex-1 vertical-layout__inner w-full">
        Re-type new password
        <div className="flex gap-2.5 items-center w-full">
          <input
            type="password"
            className="flex-1 w-full input-style field-sizing-content"
            value={state.passwordAgain}
            onChange={(e) => {
              state.setLoggingInError("");
              state.setPasswordAgain(e.target.value);
            }}
          />
        </div>
      </div>

      <Button
        buttonText={state.loggingIn ? "Resetting..." : "Reset Password"}
        type="submit"
        disabled={state.loggingIn}
      >
        {state.loggingIn && <Loader />}
      </Button>

      {state.loggingInError && (
        <div className="text-(--primary-red) text-center">
          {state.loggingInError}
        </div>
      )}
    </form>
  );
}
