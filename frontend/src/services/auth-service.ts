import ILoginResponse from "@/models/response/login-response";
import { createUsers } from "./seed-service";

export const login = async (login: string, senha: string): Promise<ILoginResponse> => {
  createUsers();
  
  const usersJson = localStorage.getItem("users");
  const users = usersJson ? JSON.parse(usersJson) : [];

  const usuarioEncontrado = users.find((user: ILoginResponse) => user.usuario.email === login);

  localStorage.setItem("logged_user", JSON.stringify(usuarioEncontrado));

  if (usuarioEncontrado) {
    return usuarioEncontrado;
  } else {
    localStorage.clear();
    return Promise.reject("Usuário não encontrado");
  }
};

export const logout = async (login: string): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  localStorage.clear();
}

export const setToken = (token: string) => {
  localStorage.setItem("token", token);
}

export const getToken = (): string | null => {
  return localStorage.getItem("token");
}

export const isLoggedIn = (): boolean => {
  return localStorage.getItem("token") ? true : false;
}
