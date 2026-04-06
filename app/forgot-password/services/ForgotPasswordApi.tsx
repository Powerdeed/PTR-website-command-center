import { UserType } from "@app/login/types/userCredentials.types";

import { apiRequest } from "@lib/api/apiRequest";

export const getUserWithEmail = async (email: string): Promise<UserType> => {
  const user = await apiRequest<UserType>({
    method: "GET",
    url: `/users?email=${email}`,
  });

  return user;
};

export const requestReset = async (data: { email: string }) =>
  await apiRequest({
    method: "POST",
    url: "/auth/request-reset",
    data,
  });

export const verifyOTP = async (data: { email: string; otp: string }) => {
  const userata = await apiRequest<{
    resetToken: string;
  }>({
    method: "POST",
    url: "/auth/verify-otp",
    data,
  });

  return userata;
};

export const resetPassword = async (data: {
  resetToken: string;
  newPassword: string;
}) =>
  await apiRequest({
    method: "POST",
    url: "/auth/reset-password",
    data,
  });
