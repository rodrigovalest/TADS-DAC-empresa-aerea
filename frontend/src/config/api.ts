import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";

export type ApiError = {
  status: number;
  message: string;
};

const API_GATEWAY_URL =
  process.env.NEXT_PUBLIC_API_GATEWAY_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: API_GATEWAY_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("[API] Erro na requisição:", error);
    return Promise.reject({
      status: 0,
      message: "Erro na configuração da requisição",
    } satisfies ApiError);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status ?? 0;
    const data = error.response?.data;
    const message =
      (data as any)?.message ||
      (data as any)?.error ||
      error.message ||
      "Erro desconhecido";

    console.error("[API] Erro na resposta:", {
      status,
      message,
      data,
      url: error.config?.url,
      method: error.config?.method,
    });

    if (status === 401) {
      console.warn("[API] Token inválido, limpando sessão");
      Cookies.remove("token");
      Cookies.remove("role");
      localStorage.clear();
    }

    return Promise.reject({
      status,
      message,
    } satisfies ApiError);
  }
);

export default api;
