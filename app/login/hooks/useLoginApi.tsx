"use client";

import React, { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";

import { apiRequest } from "@lib/api/api.js";
import { getAuth } from "@lib/api/auth/getAuth";

import { LoginContext } from "../context/LoginContext";

export default function useLoginApi() {
  const loginContext = useContext(LoginContext);

  if (!loginContext) {
    throw new Error("login must be used within a MediaAssetsProvider");
  }

  const router = useRouter();
  const { userCredentials, setLoading, setError } = loginContext;

  const handleLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      if (!userCredentials.email || !userCredentials.password) {
        setError("Email and password are required");
        return;
      }

      const data = await apiRequest({
        method: "POST",
        url: "/auth/sign-in",
        data: userCredentials,
      });

      try {
        localStorage.setItem("accessToken", data.data.accessToken);
        localStorage.setItem("refreshToken", data.data.refreshToken);
        localStorage.setItem("user", JSON.stringify(data.data.user));
      } catch {
        setError("Failed to store session");
      }

      router.push("/dashboard-overview");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
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
