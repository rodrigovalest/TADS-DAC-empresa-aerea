import Cookies from 'js-cookie';
import ILoginResponse from "@/models/response/login-response";
import seedService from "./seed-service";
import ILoginRequest from '@/models/requests/login-request';
import ILogoutRequest from '@/models/requests/logout-request';

const authService = {
  login: async (data: ILoginRequest): Promise<ILoginResponse> => {
    seedService.createUsers();
    
    const usersJson = localStorage.getItem("users");
    const users = usersJson ? JSON.parse(usersJson) : [];

    const usuarioEncontrado = users.find((user: ILoginResponse) => user.usuario.email === data.login);

    if (usuarioEncontrado) {
      localStorage.setItem("logged_user", JSON.stringify(usuarioEncontrado));
      localStorage.setItem("user_role", usuarioEncontrado.tipo);
      localStorage.setItem("token", "fake_token");

      return usuarioEncontrado;
    } else {
      localStorage.clear();

      Cookies.remove("token");
      Cookies.remove("role");

      return Promise.reject("Usuário não encontrado");
    }
  },

  logout: async (data: ILogoutRequest): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    localStorage.clear();
  }
}

export default authService;
