export interface ITransacaoMilhas {
  data: string; 
  valor_reais?: number; 
  quantidade_milhas: number; 
  descricao: string;
  codigo_reserva?: number; 
  tipo: 'ENTRADA' | 'SAIDA';
}

export default interface IExtratoMilhasResponse {
  codigo: number; 
  saldo_milhas: number; 
  transacoes: ITransacaoMilhas[];
}
