import IListarReservaResponse from "@/models/response/listar-reservas.response";
import reservaService from "@/services/reserva-service";
import { useQuery } from "@tanstack/react-query";

const useFindReservasByUser = () => {
  return useQuery<IListarReservaResponse[], Error>({
    queryKey: ["reservas-usuario"],
    queryFn: reservaService.findAllReservasByUser,
  });
};

export default useFindReservasByUser;
