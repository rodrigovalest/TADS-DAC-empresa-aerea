import React, { useState } from "react";
import { Flight } from "./EmployeeDashboard";

interface FlightActionModalProps {
  flight: Flight;
  actionType: string;
  onClose: () => void;
  onConfirm: () => void;
}

const FlightActionModal: React.FC<FlightActionModalProps> = ({
  flight,
  actionType,
  onClose,
  onConfirm,
}) => {
  const [reservationCode, setReservationCode] = useState<string>(""); // Código de reserva digitado
  const [errorMessage, setErrorMessage] = useState<string>(""); // Mensagem de erro

  const handleConfirm = () => {
    if (!reservationCode) {
      setErrorMessage("Por favor, insira o código de reserva.");
      return;
    }

    // Simulação de validação do código de reserva
    if (reservationCode !== "RES123") {
      setErrorMessage("Código de reserva inválido ou não pertence a este voo.");
      return;
    }

    setErrorMessage(""); // Limpar mensagem de erro
    onConfirm(); // Chamar a função de confirmação
    onClose(); // Fechar o modal
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[60vw] text-black relative">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-semibold mb-4 text-black">
            Ação:{" "}
            {actionType === "confirmar"
              ? "Confirmar Embarque"
              : actionType === "cancelar"
              ? "Cancelar Voo"
              : "Realizar Voo"}
          </h3>
        </div>
        <p>
          <strong>Data/Hora:</strong>{" "}
          {new Date(flight.dateTime).toLocaleString()}
        </p>
        <p>
          <strong>Origem:</strong> {flight.origin}
        </p>
        <p>
          <strong>Destino:</strong> {flight.destination}
        </p>

        {/* Campo para digitar o código de reserva */}
        {actionType === "confirmar" && (
          <div className="mt-6">
            <label
              htmlFor="reservationCode"
              className="block text-lg font-semibold mb-2"
            >
              Código de Reserva:
            </label>
            <input
              type="text"
              id="reservationCode"
              value={reservationCode}
              onChange={(e) => setReservationCode(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
            {errorMessage && (
              <p className="text-red-500 mt-2">{errorMessage}</p>
            )}
          </div>
        )}

        <div className="mt-6 flex justify-between gap-4">
          <button
            onClick={handleConfirm}
            className="hover:bg-[rgba(255,61,0,0.54)] bg-[#FF3D00] text-white py-2 px-6 rounded-lg"
          >
            Confirmar
          </button>
          <button
            onClick={onClose}
            className="hover:bg-gray-300 bg-gray-200 text-black py-2 px-6 rounded-lg"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightActionModal;
