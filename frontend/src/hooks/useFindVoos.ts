import { useMutation } from "@tanstack/react-query";
import vooService from "../services/voo-service";
import { toast } from "react-toastify";
import IBuscarVooResponse from "@/models/response/buscar-voo-response";
import { ApiError } from "@/config/api";

export function useFindVoos() {
  return useMutation<
    IBuscarVooResponse,
    ApiError,
    {
      data: string | null;
      origem: string | null;
      destino: string | null;
      inicio: string | null;
      fim: string | null;
    }
  >({
    mutationFn: async (params) => {
      return await vooService.findVoos(
        params.data,
        params.origem,
        params.destino,
        params.inicio,
        params.fim
      );
    },

    onError: (error: ApiError) => {
      console.warn("[Buscar voos error]", error.status, error.message);
      toast.error(error.message || "Erro ao buscar voos. Tente novamente.");
    },
  });
}
