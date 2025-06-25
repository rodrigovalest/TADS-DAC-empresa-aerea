import { useQuery } from "@tanstack/react-query";
import vooService from "@/services/voo-service";

export const useFindAeroportos = () => {
  return useQuery({
    queryKey: ["aeroportos"],
    queryFn: vooService.findAllAeroportos,
  });
};
