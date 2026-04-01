"use client";

import { logOutUser } from "@app/login/services/authUser";
import { ApiError } from "@lib/utils/apiError";
import { useRouter } from "@node_modules/next/navigation";

export default function useNav() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logOutUser();

      localStorage.clear();

      router.push("/login");
    } catch (err: unknown) {
      if (err instanceof ApiError) {
        console.error(err.message);
      }
    }
  };

  return { handleLogout };
}
