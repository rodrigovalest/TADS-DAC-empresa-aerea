export default interface IAtualizarFuncionarioRequest {
  codigo: number;
  cpf: string;
  nome: string;
  email: string;
  telefone: string;
  senha?: string;
}
