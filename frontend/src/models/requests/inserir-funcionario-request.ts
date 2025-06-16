export default interface IInserirFuncionarioRequest {
  codigo?: number;
  cpf: string;
  nome: string;
  email: string;
  telefone: string;
  senha?: string;
}
