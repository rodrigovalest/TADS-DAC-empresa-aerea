import React from "react";
import IVooResponse from "@/models/response/voo-response";
import { useRouter } from "next/navigation";

interface FlightCardProps {
  voo: IVooResponse;
  onOpenModal: (voo: IVooResponse, action: "confirmar" | "cancelar" | "realizar") => void;
}

const FlightCard: React.FC<FlightCardProps> = ({ voo, onOpenModal }) => {
  const router = useRouter();

  const onConfirmBoarding = () => {
    router.push("/confirmar-embarques/" + voo.codigo);
  }

  return (
    <div className="bg-gray-200 rounded-lg p-4 mb-4">
      <div className="grid grid-cols-1 gap-2">
        <div className="flex items-center justify-between w-full">
          <p className="font-medium">Data: {voo.data}</p>
          <p className="font-medium">Valor: R$ {voo.valor_passagem}</p>
        </div>

        <div className="flex items-center justify-between w-full">
          <span className="text-left">Origem: {voo.aeroporto_origem.nome}</span>
          <span className="text-right">Destino: {voo.aeroporto_destino.nome}</span>
        </div>

        <div className="flex items-center justify-between w-full">
          <span className="text-left">Estado: {voo.estado}</span>
        </div>

        <div className="flex justify-between mt-2">
          {voo.estado === 'CONFIRMADO' && (
            <button
              onClick={() => onOpenModal(voo, "realizar")}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl text-sm font-bold"
            >
              Realizar voo
            </button>
          )}

          {voo.estado === 'CONFIRMADO' && (
            <button
              onClick={onConfirmBoarding}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl text-sm font-bold"
            >
              Confirmar embarque
            </button>
          )}

          {voo.estado === 'CONFIRMADO' && (
            <button
              onClick={() => onOpenModal(voo, "cancelar")}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl text-sm font-bold"
            >
              Cancelar voo
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlightCard;
