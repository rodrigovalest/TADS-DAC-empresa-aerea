import axios from "axios";
import Cookies from "js-cookie";
import ILoginResponse from "@/models/response/login-response";
import ILoginRequest from "@/models/requests/login-request";

const API_GATEWAY_URL = "http://localhost:8000"; 

const authService = {
  login: async (data: ILoginRequest): Promise<ILoginResponse> => {
    try {
      const response = await axios.post<ILoginResponse>(`${API_GATEWAY_URL}/auth/login`, data);
      const loginResponse: ILoginResponse = response.data;

      localStorage.setItem("logged_user", JSON.stringify(loginResponse));
      localStorage.setItem("user_role", loginResponse.tipo);
      localStorage.setItem("token", loginResponse.access_token);

      Cookies.set("token", loginResponse.access_token);
      Cookies.set("role", loginResponse.tipo);

      return loginResponse;
    } catch (error) {
      localStorage.clear();
      Cookies.remove("token");
      Cookies.remove("role");

      return Promise.reject("Usuário ou senha incorretos");
    }
  },

  logout: async (): Promise<void> => {
    try {
      const token = Cookies.get("token");
      if (token) {
        await axios.post(
          `${API_GATEWAY_URL}/auth/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    } finally {
      localStorage.clear();
      Cookies.remove("token");
      Cookies.remove("role");
    }
  },
};

export default authService;
