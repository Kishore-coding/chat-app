
import axios, { AxiosResponse } from "axios";

interface ErrorResponse {
  error: string; // Matches the `error` key in your Next.js response
}

export const postMethod = async <T>(url: string, data: unknown): Promise<AxiosResponse<T> | AxiosResponse<ErrorResponse>> => {
  try {
    const response = await axios.post<T>(url, data);
    return response;
  } catch (error:unknown) {
    console.error("Post request error:", error);
    if (axios.isAxiosError(error) && error.response) {
      return error.response as AxiosResponse<ErrorResponse>;
    }
    throw new Error("Unexpected error occurred");

  }
};

