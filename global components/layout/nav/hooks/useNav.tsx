"use client";

import { logOutUser } from "@app/login/services/authUser";
import { ApiError } from "@lib/api/utils/apiError";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

export default function useNav() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [profileOptions, setProfileOptions] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);

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

  useEffect(() => {
    const getUser = () => {
      const storedUser = localStorage.getItem("user");

      const user: User | null = storedUser ? JSON.parse(storedUser) : null;

      setUser(user);
    };

    getUser();
  }, []);

  return {
    user,
    searchQuery,
    setSearchQuery,
    profileOptions,
    openNotifications,
    setOpenNotifications,
    setProfileOptions,
    handleLogout,
  };
}
