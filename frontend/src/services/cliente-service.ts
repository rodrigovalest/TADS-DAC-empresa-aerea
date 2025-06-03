import axios from "axios";
import IAutocadastroRequest from "@/models/requests/autocadastro-request";
import IComprarMilhasRequest from "@/models/requests/comprar-milhas-request";
import IAutocadastroResponse from "@/models/response/autocadastro-response";
import IClienteResponse from "@/models/response/cliente-response";

const API_GATEWAY_URL = "http://localhost:8000";

const clienteService = {
  autocadastro: async (
    autocadastroRequest: IAutocadastroRequest
  ): Promise<IAutocadastroResponse> => {
    try {
      const response = await axios.post<IAutocadastroResponse>(
        `${API_GATEWAY_URL}/clientes`,
        autocadastroRequest
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao realizar autocadastro:", error);
      throw new Error("Erro ao realizar autocadastro");
    }
  },

  findAllClientes: async (): Promise<IClienteResponse []> => {
    throw new Error("Not implemented yet");
  },

  findClienteById: async (clienteId: number): Promise<IClienteResponse> => {
    throw new Error("Not implemented yet");
  },

  findAllReservasByClienteId: async (clienteId: number) => {
    throw new Error("Not implemented yet");
  },

  comprarMilhas: async (data: IComprarMilhasRequest) => {
    throw new Error("Not implemented yet");
  },

  extratoMilhas: async () => {
    throw new Error("Not implemented yet");
  },
};

export default clienteService;
