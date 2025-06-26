import { useMutation } from "@tanstack/react-query";
import reservaService from "@/services/reserva-service";
import IEstadoReservaResponse from "@/models/response/estado-reserva-response";

const useCheckInReserva = () => {
  return useMutation<IEstadoReservaResponse, Error, number>({
    mutationFn: (reservaId: number) =>
      reservaService.mudarEstadoReserva({
        reservaId,
        estado: "CHECK-IN",
      }),
  });
};

export default useCheckInReserva;