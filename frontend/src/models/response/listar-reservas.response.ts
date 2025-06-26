import { EstadoReservaType } from "../types/estado-reserva.type";
import IVooListarReservaResponse from "./IVooListarReservaResponseDto";

export default interface IListarReservaResponse {
  codigo: string;
  data: string;
  valor: string;
  codigo_cliente: string;
  milhas_utilizadas: string;
  quantidade_poltronas: string;
  estado: EstadoReservaType;
  voo: IVooListarReservaResponse;
}
