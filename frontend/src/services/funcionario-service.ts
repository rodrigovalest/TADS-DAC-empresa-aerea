import IAtualizarFuncionarioRequest from "@/models/requests/atualizar-funcionario-request";
import IInserirFuncionarioRequest from "@/models/requests/inserir-funcionario-request";
import IFuncionarioResponse from "@/models/response/funcionario-response";
import IInserirFuncionarioResponse from "@/models/response/inserir-funcionario-response";

const API_GATEWAY_URL = "http://localhost:8000"; 
const funcionarioService = {
  inserirFuncionario: async (data: IInserirFuncionarioRequest): Promise<IInserirFuncionarioResponse> => {
    throw new Error("Not implemented yet");
  },

  findFuncionarioById: async (id: number): Promise<IFuncionarioResponse> => {
    const response = await fetch(`${API_GATEWAY_URL}/funcionarios/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Funcionário com id ${id} não encontrado`);
      }
      throw new Error("Erro ao buscar funcionário");
    }
  
    return await response.json();
  },

  atualizarFuncionario: async ( id: number, data: IAtualizarFuncionarioRequest): Promise<IFuncionarioResponse> => {
    const response = await fetch(`${API_GATEWAY_URL}/funcionarios/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      throw new Error(`Erro ao atualizar funcionário com ID ${id}`);
    }
  
    return await response.json();
  },

  findAllFuncionarios: async (): Promise<IFuncionarioResponse []> => {
    const response = await fetch(`${API_GATEWAY_URL}/funcionarios/listarFuncionarios`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (!response.ok) {
      throw new Error("Erro ao buscar funcionários");
    }
  
    return await response.json();
  },

  removerFuncionario: async (id: number): Promise<void> => {
    const response = await fetch(`${API_GATEWAY_URL}/funcionarios/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (!response.ok) {
      throw new Error(`Erro ao remover funcionário com ID ${id}`);
    }
  },
};

export default funcionarioService;
