import IAtualizarFuncionarioRequest from "@/models/requests/atualizar-funcionario-request";
import IInserirFuncionarioRequest from "@/models/requests/inserir-funcionario-request";
import IFuncionarioResponse from "@/models/response/funcionario-response";
import IInserirFuncionarioResponse from "@/models/response/inserir-funcionario-response";

const funcionarioService = {
  inserirFuncionario: async (data: IInserirFuncionarioRequest): Promise<IInserirFuncionarioResponse> => {
    throw new Error("Not implemented yet");
  },

  findFuncionarioById: async (): Promise<IFuncionarioResponse> => {
    throw new Error("Not implemented yet");
  },

  atualizarFuncionario: async (data: IAtualizarFuncionarioRequest): Promise<IFuncionarioResponse> => {
    throw new Error("Not implemented yet");
  },

  findAllFuncionarios: async (): Promise<IFuncionarioResponse []> => {
    throw new Error("Not implemented yet");
  },
s
  removerFuncionario: async (): Promise<void> => {
    throw new Error("Not implemented yet");
  },
};

export default funcionarioService;
