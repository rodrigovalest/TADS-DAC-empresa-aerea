import IReservaResponse from '@/models/response/reserva-response';
import reservaService from '@/services/reserva-service';
import { useQuery } from '@tanstack/react-query';

const useFindReservaByCodigo = (codigo: number) => {
  return useQuery<IReservaResponse>({
    queryKey: ['reserva', codigo],
    queryFn: () => reservaService.consultarReserva(codigo),
  });
};

export default useFindReservaByCodigo;
