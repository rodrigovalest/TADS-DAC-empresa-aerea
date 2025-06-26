import React from "react";
import IVooResponse from "@/models/response/voo-response";

interface ActionModalProps {
  flight: IVooResponse;
  actionType: "confirmar" | "cancelar" | "realizar" | "";
  reservationCodeInput: string;
  setReservationCodeInput: (value: string) => void;
  onClose: () => void;
  onConfirm: () => void;
}

const ActionModal: React.FC<ActionModalProps> = ({
  flight,
  actionType,
  reservationCodeInput,
  setReservationCodeInput,
  onClose,
  onConfirm,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">
          {actionType === "confirmar" && "Confirmar Embarque"}
          {actionType === "cancelar" && "Cancelar Voo"}
          {actionType === "realizar" && "Realizar Voo"}
        </h2>

        <div className="mb-4">
          <p><strong>Data:</strong> {flight.data}</p>
          <p><strong>Origem:</strong> {flight.aeroporto_origem?.nome}</p>
          <p><strong>Destino:</strong> {flight.aeroporto_destino?.nome}</p>
        </div>

        {actionType === "confirmar" && (
          <div className="mb-4">
            <label className="block mb-2">Código da Reserva:</label>
            <input
              type="text"
              className="border p-2 w-full rounded"
              value={reservationCodeInput}
              onChange={(e) => setReservationCodeInput(e.target.value)}
              placeholder="Digite o código da reserva"
            />
          </div>
        )}

        <div className="flex justify-end space-x-2">
          <button
            onClick={onConfirm}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full"
          >
            Confirmar
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-full"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActionModal;
