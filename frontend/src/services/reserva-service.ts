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
    const response = await fetch(`http://localhost:8082/reservas/${id}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error("Erro ao cancelar reserva");
    }

    return await response.json();
  },
  //TODO
  mudarEstadoReserva: async (
    { reservaId, estado }: IMudarEstadoReservaRequest
  ): Promise<IEstadoReservaResponse> => {
    const { data } = await api.patch<IEstadoReservaResponse>(
      `/reservas/${reservaId}/estado`,
      { estado }
    );
    return data;
  },

  findAllReservasByUser: async (): Promise<IListarReservaResponse[]> => {
    const response = await api.get<IListarReservaResponse[]>("/reservas/user");
    return response.data;
  }
};

export default reservaService;
