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

  cancelarReserva: async (id: number): Promise<IEstadoReservaResponse> => {
    const response = await fetch(`http://localhost:8082/reservas/${id}/cancelar`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao cancelar reserva");
    }

    return await response.json();
  },

  mudarEstadoReserva: async (data: IMudarEstadoReservaRequest): Promise<IEstadoReservaResponse> => {
    throw new Error("Not implemented yet");
	},
};

export default reservaService;
