import IVooReservaResponse from "@/models/response/voo-reserva-response";

export default interface IReservaResponse {
  codigo: string;
  codigo_cliente: string;
  estado: string;
  voo: IVooReservaResponse
}
