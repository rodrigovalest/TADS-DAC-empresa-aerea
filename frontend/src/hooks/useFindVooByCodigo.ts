import { useQuery } from '@tanstack/react-query';
import IVooResponse from '@/models/response/voo-response';
import vooService from '@/services/voo-service';

const useFindVooByCodigo = (codigo: number) => {
  return useQuery<IVooResponse>({
    queryKey: ['voo', codigo],
    queryFn: () => vooService.findVooById(codigo),
  });
};

export default useFindVooByCodigo;
