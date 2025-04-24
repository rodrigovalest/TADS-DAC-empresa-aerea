import { UserType } from "@/models/types/user-type";
import IUsuarioResponse from "@/models/response/usuario-response";

export default interface ILoginResponse {
  access_token: string;
  token_type: string;
  usuario: IUsuarioResponse;
  tipo: UserType;
}
