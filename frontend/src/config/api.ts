import axios from "axios";
import Cookies from "js-cookie";

const API_GATEWAY_URL = process.env.API_GATEWAY_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: API_GATEWAY_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
