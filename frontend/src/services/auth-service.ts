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
    } catch (error: any) {
      console.error("[AUTH] Erro ao fazer login:", error);
      
      localStorage.clear();
      Cookies.remove("token");
      Cookies.remove("role");
      
      // Tratar diferentes tipos de erro
      if (error.status === 0) {
        return Promise.reject(error.message || "Erro de conexão com o servidor");
      } else if (error.status === 401) {
        return Promise.reject("Usuário ou senha incorretos");
      } else if (error.status === 404) {
        return Promise.reject("Usuário não encontrado");
      } else if (error.message) {
        return Promise.reject(error.message);
      } else {
        return Promise.reject("Erro interno do servidor. Tente novamente.");
      }
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
