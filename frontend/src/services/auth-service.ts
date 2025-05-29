import axios from "axios";
import Cookies from "js-cookie";
import ILoginRequest from "@/models/requests/login-request";
import ILoginResponse from "@/models/response/login-response";
import ILogoutRequest from "@/models/requests/logout-request";

// Depois mudar para a url do Api Gateway
const API_BASE_URL = "https://localhost:8084";

const authService = {
  login: async (data: ILoginRequest): Promise<ILoginResponse> => {
    try {
      const response = await axios.post<ILoginResponse>(
        `${API_BASE_URL}/login`,
        data
      );

      const { access_token, token_type, tipo, usuario } = response.data;

      // Armazenar dados localmente
      localStorage.setItem("logged_user", JSON.stringify(usuario));
      localStorage.setItem("user_role", tipo);
      localStorage.setItem("token", access_token);

      Cookies.set("token", access_token);
      Cookies.set("role", tipo);

      return response.data;
    } catch (error: any) {
      localStorage.clear();
      Cookies.remove("token");
      Cookies.remove("role");

      throw new Error(error.response?.data?.message || "Erro ao fazer login");
    }
  },

  logout: async (): Promise<void> => {
    try {
      const loggedUserJson = localStorage.getItem("logged_user");

      if (!loggedUserJson) {
        throw new Error("Usuário não encontrado no localStorage");
      }

      const loggedUser = JSON.parse(loggedUserJson);
      const email = loggedUser?.usuario?.email;

      const logoutData: ILogoutRequest = {
        login: email,
      };

      await axios.post(`${API_BASE_URL}/auth/logout`, logoutData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      localStorage.clear();
      Cookies.remove("token");
      Cookies.remove("role");
    } catch (error: any) {
      console.error("Erro ao fazer logout:", error);
      throw error;
    }
  },
};

export default authService;
