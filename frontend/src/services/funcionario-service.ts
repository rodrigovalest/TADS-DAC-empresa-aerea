import api from "@/config/api";
import IInserirFuncionarioRequest from "@/models/requests/inserir-funcionario-request";
import IAtualizarFuncionarioRequest from "@/models/requests/atualizar-funcionario-request";
import IFuncionarioResponse from "@/models/response/funcionario-response";
import IInserirFuncionarioResponse from "@/models/response/inserir-funcionario-response";

const funcionarioService = {
  inserirFuncionario: async (
    data: IInserirFuncionarioRequest
  ): Promise<IInserirFuncionarioResponse> => {
    const response = await api.post("/funcionarios", data);
    return response.data;
  },

  atualizarFuncionario: async (
    id: number,
    data: IAtualizarFuncionarioRequest
  ): Promise<IFuncionarioResponse> => {
    const response = await api.put(`/funcionarios/${id}`, data);
    return response.data;
  },

  findFuncionarioById: async (id: number): Promise<IFuncionarioResponse> => {
    const response = await api.get(`/funcionarios/${id}`);
    return response.data;
  },

  findAllFuncionarios: async (): Promise<IFuncionarioResponse[]> => {
    const response = await api.get("/funcionarios");
    return response.data;
  },

  removerFuncionario: async (id: number): Promise<void> => {
    await api.delete(`/funcionarios/${id}`);
  },
};

export default funcionarioService;
