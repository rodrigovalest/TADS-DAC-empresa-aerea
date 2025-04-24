import ICriarReservaRequest from "@/models/requests/criar-reserva-request";
import IMudarEstadoReservaRequest from "@/models/requests/mudar-estado-reserva-request";
import IEstadoReservaResponse from "@/models/response/estado-reserva-response";
import IReservaResponse from "@/models/response/reserva-response";

const reservaService = {
  criarReserva: async (data: ICriarReservaRequest): Promise<IReservaResponse> => {
    throw new Error("Not implemented yet");
  },

  consultarReserva: async (): Promise<IReservaResponse> => {
    throw new Error("Not implemented yet");
  },

  cancelarReserva: async (): Promise<IEstadoReservaResponse> => {
    throw new Error("Not implemented yet");
  },

  mudarEstadoReserva: async (data: IMudarEstadoReservaRequest): Promise<IEstadoReservaResponse> => {
    throw new Error("Not implemented yet");
	},
};

export default reservaService;
