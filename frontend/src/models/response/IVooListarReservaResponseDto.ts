import IAeroportoResponse from "./aeroporto-response";

export default interface IVooListarReservaResponse {
  codigo: string;
  data: string;
  aeroporto_origem: IAeroportoResponse;
  aeroporto_destino: IAeroportoResponse;
}
