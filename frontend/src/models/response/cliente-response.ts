import IEnderecoResponse from "./endereco-request";

export default interface IClienteResponse {
  codigo: number;
  cpf: string;
  email: string;
  nome: string;
  saldoMilhas: number;
  endereco: IEnderecoResponse;
}
