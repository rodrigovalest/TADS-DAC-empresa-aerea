import ILoginResponse from "@/models/response/login-response";

export const createUsers = () => {
  const existingUsersJson = localStorage.getItem("users");
  const existingUsers: ILoginResponse[] = existingUsersJson
    ? JSON.parse(existingUsersJson)
    : [];

  const nextCodigo = existingUsers.length + 1;

  const newUsers: ILoginResponse[] = [
    {
      access_token: "fake_token",
      token_type: "bearer",
      tipo: "FUNCIONARIO",
      usuario: {
        codigo: nextCodigo,
        cpf: "000.111.222-33",
        email: "funcionario1@teste.com",
      },
    },
    {
      access_token: "fake_token",
      token_type: "bearer",
      tipo: "CLIENTE",
      usuario: {
        codigo: nextCodigo + 1,
        cpf: "111.222.333-44",
        email: "cliente@email.com",
      },
    },
    {
      access_token: "fake_token",
      token_type: "bearer",
      tipo: "CLIENTE",
      usuario: {
        codigo: nextCodigo + 2,
        cpf: "111.222.333-44",
        email: "tralalero@email.com",
      },
    },
  ];

  const updatedUsers = [...existingUsers, ...newUsers];
  localStorage.setItem("users", JSON.stringify(updatedUsers));
};
