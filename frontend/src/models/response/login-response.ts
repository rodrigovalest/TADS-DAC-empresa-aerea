import { UserType } from "../types/user-type";
import IUsuarioResponse from "./usuario-response";

export default interface ILoginResponse {
  access_token: string;
  token_type: string;
  usuario: IUsuarioResponse;
  tipo: UserType;
}
