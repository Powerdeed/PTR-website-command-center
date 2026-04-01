"use client";

import React, { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";

import { loginUser } from "../services/authUser";

import { getAuth } from "../utils/getAuth";

import { LoginContext } from "../context/LoginContext";
import { ApiError } from "@lib/utils/apiError";

export default function useLoginApi() {
  const router = useRouter();
  const loginContext = useContext(LoginContext);

  if (!loginContext) {
    throw new Error("login must be used within a MediaAssetsProvider");
  }

  const { userCredentials, setLoading, setError } = loginContext;

  const handleLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userCredentials.email || !userCredentials.password) {
      setError("Email and password are required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await loginUser(userCredentials);

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("user", JSON.stringify(data.user));

      router.push("/dashboard-overview");
    } catch (err: unknown) {
      if (err instanceof ApiError) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const { token } = getAuth();
    if (token) router.push("/dashboard-overview");
  }, [router]);

  return { router, handleLogin };
}
