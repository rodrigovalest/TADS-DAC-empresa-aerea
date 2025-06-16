import api from "@/config/api";
import Cookies from "js-cookie";
import ILoginRequest from "@/models/requests/login-request";
import ILoginResponse from "@/models/response/login-response";

const authService = {
  login: async (data: ILoginRequest): Promise<ILoginResponse> => {
    try {
      const response = await api.post("/auth/login", data);
      const loginData = response.data;

      localStorage.setItem("logged_user", JSON.stringify(loginData));
      localStorage.setItem("user_role", loginData.tipo);
      localStorage.setItem("token", loginData.access_token);

      Cookies.set("token", loginData.access_token);
      Cookies.set("role", loginData.tipo);

      return loginData;
    } catch {
      localStorage.clear();
      Cookies.remove("token");
      Cookies.remove("role");
      return Promise.reject("Usuário ou senha incorretos");
    }
  },

  logout: async (): Promise<void> => {
    try {
      await api.post("/auth/logout");
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
