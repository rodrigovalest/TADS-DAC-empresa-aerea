import ICodigoAeroporto from "@/models/response/codigo-aeroporto-response";

export default interface IVooReservaResponse {
  codigo: string;
  aeroporto_origem: ICodigoAeroporto,
  aeroporto_destino: ICodigoAeroporto
}
