import api from "@/config/api";
import IAutocadastroRequest from "@/models/requests/autocadastro-request";
import IAutocadastroResponse from "@/models/response/autocadastro-response";
import IClienteResponse from "@/models/response/cliente-response";
import IComprarMilhasResponse from "@/models/response/comprar-milhas-response";
import IExtratoMilhasResponse from "@/models/response/extrato-milhas-response";

const clienteService = {
  autocadastro: async (
    autocadastroRequest: IAutocadastroRequest
  ): Promise<IAutocadastroResponse> => {
    try {
      const response = await api.post<IAutocadastroResponse>("/clientes", autocadastroRequest);
      return response.data;
    } catch (error) {
      console.error("Erro ao realizar autocadastro:", error);
      throw new Error("Erro ao realizar autocadastro");
    }
  },

  findAllClientes: async (): Promise<IClienteResponse[]> => {
    try {
      const response = await api.get<IClienteResponse[]>("/clientes");
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
      throw new Error("Erro ao buscar clientes");
    }
  },

  findClienteById: async (clienteId: number): Promise<IClienteResponse> => {
    try {
      const response = await api.get<IClienteResponse>(`/clientes/${clienteId}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar cliente:", error);
      throw new Error("Erro ao buscar cliente");
    }
  },

  findAllReservasByClienteId: async (clienteId: number) => {
    try {
      const response = await api.get(`/clientes/${clienteId}/reservas`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar reservas do cliente:", error);
      throw new Error("Erro ao buscar reservas do cliente");
    }
  },

  comprarMilhas: async (clienteId: number, quantidade: number): Promise<IComprarMilhasResponse> => {
    try {
      const response = await api.put<IComprarMilhasResponse>(`/clientes/${clienteId}/milhas`, { quantidade });
      return response.data;
    } catch (error: any) {
      console.error("Erro ao comprar milhas:", error);
      throw new Error(error.message || "Erro ao comprar milhas");
    }
  },

  extratoMilhas: async (clienteId: number): Promise<IExtratoMilhasResponse> => {
    try {
      const response = await api.get<IExtratoMilhasResponse>(`/clientes/${clienteId}/milhas`);
      return response.data;
    } catch (error: any) {
      console.error("Erro ao buscar extrato de milhas:", error);
      throw new Error(error.message || "Erro ao buscar extrato de milhas");
    }
  },
};

export default clienteService;
