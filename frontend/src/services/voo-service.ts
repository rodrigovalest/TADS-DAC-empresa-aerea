import api from "@/config/api";
import IInserirVooRequest from "@/models/requests/inserir-voo-request";
import IMudarEstadoVooRequest from "@/models/requests/mudar-estado-voo-request";
import IAeroportoResponse from "@/models/response/aeroporto-response";
import IBuscarVooResponse from "@/models/response/buscar-voo-response";
import IEstadoVooResponse from "@/models/response/estado-voo-response";
import IVooResponse from "@/models/response/voo-response";

const vooService = {
  findAllAeroportos: async (): Promise<IAeroportoResponse []> => {
    const response = await api.get<IAeroportoResponse []>("/aeroportos");
    return response.data;
  },
  
  mudarEstadoVoo: async (data: IMudarEstadoVooRequest): Promise<IEstadoVooResponse> => {
    throw new Error("Not implemented yet");
  },
  
  inserirVoo: async (data: IInserirVooRequest): Promise<IEstadoVooResponse> => {
    try {
      const response = await api.post<IEstadoVooResponse>("/voos", data);
      return response.data;
    } catch (error: any) {
      console.error("Erro ao inserir voo:", error);
      throw new Error(error.message || "Erro ao inserir voo");
    }
  },

  findVooById: async (data: number): Promise<IVooResponse> => {
    const response = await api.get<IVooResponse>(`/voos/${data}`);
    return response.data;
  },

  findVoos: async (
    data: string | null,
    origem: string | null,
    destino: string | null,
    inicio: string | null,
    fim: string | null,
  ): Promise<IBuscarVooResponse> => {
    const response = await api.get<IBuscarVooResponse>("/voos", {
      params: {
        data,
        origem,
        destino,
        inicio,
        fim,
      },
    });
    return response.data;
  },
};

export default vooService;
