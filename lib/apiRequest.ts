import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

import { api } from "./axios";
import { ApiError } from "./utils/apiError";

export const apiRequest = async <T>(config: AxiosRequestConfig): Promise<T> => {
  try {
    const res: AxiosResponse<T> = await api(config);
    return res.data;
  } catch (err: unknown) {
    // Narrow unknown to AxiosError
    if (axios.isAxiosError(err)) {
      throw new ApiError(
        err.response?.data?.message || "Something went wrong",
        err.response?.status || 500,
        err.response?.data,
      );
    }

    throw new ApiError(
      err instanceof Error ? err.message : "Something went wrong",
      500,
    );
  }
};
