import api from "@/config/api";
import ICriarReservaRequest from "@/models/requests/criar-reserva-request";
import IMudarEstadoReservaRequest from "@/models/requests/mudar-estado-reserva-request";
import IEstadoReservaResponse from "@/models/response/estado-reserva-response";
import IListarReservaResponse from "@/models/response/listar-reservas.response";
import IReservaResponse from "@/models/response/reserva-response";

const reservaService = {
  criarReserva: async (data: ICriarReservaRequest): Promise<IReservaResponse> => {
    const response = await api.post<IReservaResponse>("/reservas", data);
    return response.data;
  },

  consultarReserva: async (id: number): Promise<IReservaResponse> => {
    const response = await api.get<IReservaResponse>(`/reservas/${id}`);
    return response.data;
  },

  cancelarReserva: async (id: number): Promise<IEstadoReservaResponse> => {
    const response = await api.delete<IEstadoReservaResponse>(`/reservas/${id}`);
    return response.data;
  },

//TODO
  mudarEstadoReserva: async (data: IMudarEstadoReservaRequest): Promise<IEstadoReservaResponse> => {
    const response = await fetch(`http://localhost:8082/reservas/${data.estado}/estado`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ estado: data.estado }),
    });
  
    if (!response.ok) {
      throw new Error("Erro ao mudar estado da reserva");
    }
  
    return await response.json();
	},

  findAllReservasByUser: async (): Promise<IListarReservaResponse []> => {
    const response = await api.get<IListarReservaResponse []>("/reservas/user");
    return response.data;
  }
};

export default reservaService;