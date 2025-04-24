import IVooResponse from "./voo-response";

export default interface IBuscarVooResponse {
  inicio?: string;
  fim?: string;
  origem?: string,
  destino?: string,
  data?: string,
  voos: IVooResponse []
}