import IListarReservaResponse from '@/models/response/listar-reservas.response';
import reservaService from '@/services/reserva-service';
import { useQuery } from '@tanstack/react-query';

const useFindReservaByCodigoVoo = (codigoVoo: number) => {
  return useQuery<IListarReservaResponse []>({
    queryKey: ['reservas-codigovoo', codigoVoo],
    queryFn: () => reservaService.findReservasByCodigoVoo(codigoVoo),
  });
};

export default useFindReservaByCodigoVoo;
