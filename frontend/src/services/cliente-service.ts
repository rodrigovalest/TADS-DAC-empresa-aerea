import axios from "axios";
import IAutocadastroRequest from "@/models/requests/autocadastro-request";
import IComprarMilhasRequest from "@/models/requests/comprar-milhas-request";
import IAutocadastroResponse from "@/models/response/autocadastro-response";
import IClienteResponse from "@/models/response/cliente-response";
import { API_CONFIG } from "@/config/api";

const clienteService = {
  autocadastro: async (
    autocadastroRequest: IAutocadastroRequest
  ): Promise<IAutocadastroResponse> => {
    try {
      const response = await axios.post<IAutocadastroResponse>(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CLIENTES}`,
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
    const response = await axios.get<IClienteResponse>(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CLIENTES}/${clienteId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    return response.data;
  },

  findAllReservasByClienteId: async (clienteId: number) => {
    const response = await axios.get(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CLIENTES}/${clienteId}/reservas`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    return response.data;
  },

  comprarMilhas: async (clienteId: number, data: IComprarMilhasRequest) => {
    const response = await axios.put(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CLIENTES}/${clienteId}/milhas`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    return response.data;
  },

  extratoMilhas: async () => {
    const response = await axios.get(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CLIENTES}/extrato-milhas`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    return response.data;
  },
};

export default clienteService;
