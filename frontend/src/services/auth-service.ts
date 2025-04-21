import Cookies from 'js-cookie';
import ILoginResponse from "@/models/response/login-response";
import { createUsers } from "./seed-service";

export const login = async (login: string, senha: string): Promise<ILoginResponse> => {
  createUsers();
  
  const usersJson = localStorage.getItem("users");
  const users = usersJson ? JSON.parse(usersJson) : [];

  const usuarioEncontrado = users.find((user: ILoginResponse) => user.usuario.email === login);

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
};

export const logout = async (login: string): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  localStorage.clear();
}
