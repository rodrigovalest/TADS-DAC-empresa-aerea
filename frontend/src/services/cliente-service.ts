import IAutocadastroRequest from "@/models/requests/autocadastro-request";
import IAutocadastroResponse from "@/models/response/autocadastro-response";

export const autocadastro = async (
  autocadastroRequest: IAutocadastroRequest
): Promise<IAutocadastroResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const usersJson = localStorage.getItem("users");
  const users = usersJson ? JSON.parse(usersJson) : [];

  const existente = users.find(
    (u: any) => u.usuario.email === autocadastroRequest.email
  );

  if (existente) {
    return {
      codigo: existente.usuario.codigo,
      cpf: existente.usuario.cpf,
      email: existente.usuario.email,
      nome: existente.usuario.nome ?? "",
    };
  }

  const novoCodigo = users.length + 1;

  const novoUsuario = {
    access_token: "fake_token",
    token_type: "bearer",
    tipo: "CLIENTE",
    usuario: {
      codigo: novoCodigo,
      cpf: autocadastroRequest.cpf,
      email: autocadastroRequest.email,
      nome: autocadastroRequest.nome,
    },
  };

  users.push(novoUsuario);
  localStorage.setItem("users", JSON.stringify(users));

  return {
    codigo: novoCodigo,
    cpf: autocadastroRequest.cpf,
    email: autocadastroRequest.email,
    nome: autocadastroRequest.nome,
  };
};
