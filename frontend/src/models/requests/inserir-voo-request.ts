export default interface IMudarEstadoReservaRequest {
  data: string;
  valor_passagem: number;
  quantidade_poltronas_total: number;
  quantidade_poltronas_ocupadas: number;
  codigo_aeroporto_origem: string;
  codigo_aeroporto_destino: string;
}
