import IInserirVooRequest from "@/models/requests/inserir-voo-request";
import IMudarEstadoVooRequest from "@/models/requests/mudar-estado-voo-request";
import IAeroportoResponse from "@/models/response/aeroporto-response";
import IEstadoVooResponse from "@/models/response/estado-voo-response";
import IVooResponse from "@/models/response/voo-response";

const vooService = {
  findAllAeroportos: async (): Promise<IAeroportoResponse []> => {
    throw new Error("Not implemented yet");
  },
  
  mudarEstadoVoo: async (data: IMudarEstadoVooRequest): Promise<IEstadoVooResponse> => {
    throw new Error("Not implemented yet");
  },
  
  inserirVoo: async (data: IInserirVooRequest): Promise<IEstadoVooResponse> => {
    throw new Error("Not implemented yet");
  },

  findVooById: async (data: number): Promise<IEstadoVooResponse> => {
    throw new Error("Not implemented yet");
  },

  findVoos: async (
    data: string | null,
    origem: string | null,
    destino: string | null,
    inicio: string | null,
    fim: string | null,
  ): Promise<IVooResponse> => {
    throw new Error("Not implemented yet");  
  },
};
  
export default vooService;
