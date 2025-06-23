import axios from "axios";
import Cookies from "js-cookie";

const API_GATEWAY_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL || "http://localhost:8000";

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
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("[API] Erro na resposta:", {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      url: error.config?.url,
      method: error.config?.method,
    });
    
    if (error.response) {
      const { status, data } = error.response;
      
      if (status === 401) {
        console.log("[API] Token inválido, removendo autenticação");
        Cookies.remove("token");
        Cookies.remove("role");
        localStorage.clear();
      }
      
      return Promise.reject({
        message: data?.message || data?.error || `Erro ${status}`,
        status,
        data
      });
    } else if (error.request) {
      console.error("[API] Sem resposta do servidor");
      return Promise.reject({
        message: "Erro de conexão com o servidor. Verifique se o API Gateway está rodando.",
        status: 0
      });
    } else {
      console.error("[API] Erro na configuração:", error.message);
      return Promise.reject({
        message: error.message,
        status: 0
      });
    }
  }
);

export default api;
