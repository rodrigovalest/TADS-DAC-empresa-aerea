import ICodigoAeroporto from "@/models/response/codigo-aeroporto-response";

export default interface IVooResponse {
  codigo: string;
  data: string;
  aeroporto_origem: ICodigoAeroporto,
  aeroporto_destino: ICodigoAeroporto
}
