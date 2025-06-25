import { ApiError } from "@/config/api";
import ICriarReservaRequest from "@/models/requests/criar-reserva-request";
import IReservaResponse from "@/models/response/reserva-response";
import reservaService from "@/services/reserva-service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useRealizarReserva = () => {
  return useMutation<IReservaResponse, ApiError, ICriarReservaRequest>({
    mutationFn: reservaService.criarReserva,
    
    onSuccess: () => {
      toast.success("Reserva realizada com sucesso!");
    },

    onError: () => {
      toast.error("Erro ao realizar reserva. Tente novamente.");
    },
  });
};

export default useRealizarReserva;
