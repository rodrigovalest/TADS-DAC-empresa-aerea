import { EstadoVooType } from "../types/estado-voo.type";
import IAeroportoResponse from "./aeroporto-response";

export default interface IVooResponse {
  codigo: string;
  data: string;
  valor: number;
  valor_passagem: string;
  quantidade_poltronas_total: number;
  quantidade_poltronas_ocupadas: number;
  estado: EstadoVooType;
  aeroporto_origem: IAeroportoResponse,
  aeroporto_destino: IAeroportoResponse
}
