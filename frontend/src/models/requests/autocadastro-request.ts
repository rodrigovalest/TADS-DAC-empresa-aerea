import IEnderecoRequest from "./endereco-request";

export default interface IAutocadastroRequest {
  cpf: string;
  email: string;
  usuario: string;
  nome: string;
  saldo_milhas: number;
	endereco: IEnderecoRequest;
}
