import IAeroportoResponse from "./aeroporto-response";

export default interface IVooReservaResponse {
  codigo: string;
  data: string;
  aeroporto_origem: IAeroportoResponse,
  aeroporto_destino: IAeroportoResponse
}
