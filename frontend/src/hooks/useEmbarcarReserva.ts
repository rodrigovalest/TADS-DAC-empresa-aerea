import { useMutation } from '@tanstack/react-query';
import reservaService from '@/services/reserva-service';
import { toast } from 'react-toastify';
import { ApiError } from '@/config/api';
import IReservaResponse from '@/models/response/reserva-response';

const useEmbarcarReserva = () => {
  return useMutation<IReservaResponse, ApiError, number>({
    mutationFn: reservaService.embarcarReserva,
    
    onSuccess: () => {
      toast.success("Embarque confirmado com sucesso!");
    },

    onError: (error) => {
      const message = error?.message || "Erro ao confirmar embarque. Tente novamente.";
      toast.error(message);
    },
  });
};

export default useEmbarcarReserva;
