import { apiRequest } from "@/lib/apiRequest";
// import { getAuth } from "../utils/getAuth";
import { UserCredentials, UserType } from "../types/userCredentials.types";

// export const signUpUser = (data) =>
//   apiRequest({
//     method: "POST",
//     url: "/auth/sign-up",
//     data,
//   });

export const loginUser = (data: UserCredentials) =>
  apiRequest<{
    accessToken: string;
    refreshToken: string;
    user: UserType;
  }>({
    method: "POST",
    url: "/auth/sign-in",
    data,
  });

// export const getSessions = (data) =>
//   apiRequest({
//     method: "GET",
//     url: "/auth/sessions",
//     data,
//   });

// export const getCurrentUser = () =>
//   apiRequest({
//     method: "GET",
//     url: `/users/${getAuth().user.id}`,
//   });

// export const refreshToken = (data) =>
//   apiRequest({
//     method: "POST",
//     url: "/auth/refresh-token",
//     data,
//   });

export const logOutUser = () =>
  apiRequest({
    method: "POST",
    url: "/auth/sign-out",
  });

// export const logoutAll = (data) =>
//   apiRequest({
//     method: "POST",
//     url: "/auth/sign-out-all",
//     data,
//   });

// export const modifyUser = (data) =>
//   apiRequest({
//     method: "PUT",
//     url: `/users/${getAuth().user.id}`,
//     data,
//   });

// export const deleteUser = (data) =>
//   apiRequest({
//     method: "DELETE",
//     url: `/users/${getAuth().user.id}`,
//     data,
//   });
