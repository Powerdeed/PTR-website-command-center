// utils/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5500/api/v1/",
});

api.interceptors.response.use(
  (response) => response,
  (err) => {
    console.log("INTERCEPTOR ERROR:", err.response);

    if (err.response?.status === 401) {
      // 🔥 token expired / invalid

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      // redirect to login
      window.location.href = "/login";
    }

    return Promise.reject(err);
  },
);

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export const apiRequest = async (config) => {
  try {
    const res = await api(config);
    return res.data;
  } catch (err) {
    console.log("FULL ERROR:", err);

    throw new Error(
      err.response?.data?.message || err.message || "Something went wrong",
    );
  }
};
