import IVooReservaResponse from "@/models/response/voo-reserva-response";
import { EstadoReservaType } from "../types/estado-reserva.type";

export default interface IReservaResponse {
  codigo: string;
  data: string;
  valor: string;
  codigo_cliente: string;
  milhas_utilizadas: string;
  quantidade_poltronas: string;
  estado: EstadoReservaType;
  voo: IVooReservaResponse;
}
