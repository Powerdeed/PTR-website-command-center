"use client";

import { useRouter } from "@node_modules/next/navigation";

export default function useNav() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  return { handleLogout };
}
