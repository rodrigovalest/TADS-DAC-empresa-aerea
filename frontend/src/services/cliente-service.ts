import axios from "axios";
import IAutocadastroRequest from "@/models/requests/autocadastro-request";
import IComprarMilhasRequest from "@/models/requests/comprar-milhas-request";
import IAutocadastroResponse from "@/models/response/autocadastro-response";
import IClienteResponse from "@/models/response/cliente-response";

// Depois mudar para a url do Api Gateway
const API_BASE_URL = "https://localhost:8080";

const clienteService = {
  autocadastro: async (
    autocadastroRequest: IAutocadastroRequest
  ): Promise<IAutocadastroResponse> => {
    try {
      const response = await axios.post<IAutocadastroResponse>(
        `${API_BASE_URL}/clientes`,
        autocadastroRequest
      );

      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Erro no autocadastro");
    }
  },

  findAllClientes: async (): Promise<IClienteResponse[]> => {
    const response = await axios.get<IClienteResponse[]>(
      `${API_BASE_URL}/clientes`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    return response.data;
  },

  findClienteById: async (clienteId: number): Promise<IClienteResponse> => {
    const response = await axios.get<IClienteResponse>(
      `${API_BASE_URL}/clientes/${clienteId}`,
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
      `${API_BASE_URL}/clientes/${clienteId}/reservas`,
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
      `${API_BASE_URL}/clientes/${clienteId}/milhas`,
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
      `${API_BASE_URL}/clientes/extrato-milhas`,
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
