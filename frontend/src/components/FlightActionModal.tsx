import { Flight } from "@/types/interfaces";
import React, { useState, useEffect } from "react";

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
  const [confirmCancellation, setConfirmCancellation] = useState<boolean>(false); // Confirmação para cancelamento

  // Reset form states when the modal opens or changes flight/action
  useEffect(() => {
    setReservationCode("");
    setErrorMessage("");
    setConfirmCancellation(false);
  }, [flight.id, actionType]);


  const getFlightDateTime = () => {
    // Exemplo: date = "2023-07-20", time = "13:30"
    // Cria string "2023-07-20T13:30:00"
    const dateTimeString = `${flight.date}T${flight.time}:00`;
    return new Date(dateTimeString);
  };

  const handleConfirmBoarding = () => {
    if (!reservationCode) {
      setErrorMessage("Por favor, insira o código de reserva.");
      return false;
    }

    if (reservationCode !== "RES123") {
      setErrorMessage("Código de reserva inválido ou não pertence a este voo.");
      return false;
    }

    setErrorMessage("");
    return true;
  };

  const handleCancelFlight = () => {
    if (!confirmCancellation) {
      setErrorMessage(
        "Por favor, confirme o cancelamento marcando a caixa de seleção."
      );
      return false;
    }

    setErrorMessage("");
    return true;
  };

  const handleCompleteFlight = () => {
    setErrorMessage("");
    return true;
  };

  const handleClose = () => {
    setReservationCode("");
    setErrorMessage("");
    setConfirmCancellation(false);
    onClose();
  };

  const handleConfirm = () => {
    let success = false;

    if (actionType === "confirmar") {
      success = handleConfirmBoarding();
    } else if (actionType === "cancelar") {
      success = handleCancelFlight();
    } else if (actionType === "realizar") {
      success = handleCompleteFlight();
    }

    if (success) {
      onConfirm();
      setReservationCode("");
      setErrorMessage("");
      setConfirmCancellation(false);
      onClose();
    }
  };

  const isButtonDisabled = () => {
    if (actionType === "confirmar") {
      return reservationCode.trim() === "";
    } else if (actionType === "cancelar") {
      return !confirmCancellation;
    }
    return false;
  };

  return (
    <div className="fixed inset-0 bg-black opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[60vw] text-black relative">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-semibold mb-4 text-black">
            {actionType === "confirmar"
              ? "Confirmar Embarque"
              : actionType === "cancelar"
              ? "Cancelar Voo"
              : "Realizar Voo"}
          </h3>
        </div>
        <p>
          <strong>Data/Hora:</strong>{" "}
          {getFlightDateTime().toLocaleString()}
        </p>
        <p>
          <strong>Origem:</strong> {flight.origin}
        </p>
        <p>
          <strong>Destino:</strong> {flight.destination}
        </p>

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
              placeholder="Digite o código da reserva"
            />
          </div>
        )}

        {actionType === "cancelar" && (
          <div className="mt-6">
            <p className="text-red-600 font-medium mb-4">
              Atenção! Ao cancelar este voo, todas as reservas associadas serão
              canceladas automaticamente. Esta ação não pode ser desfeita.
            </p>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="confirmCancellation"
                checked={confirmCancellation}
                onChange={(e) => setConfirmCancellation(e.target.checked)}
                className="mr-2 h-5 w-5"
              />
              <label
                htmlFor="confirmCancellation"
                className="text-lg font-semibold"
              >
                Confirmo que desejo cancelar este voo
              </label>
            </div>
          </div>
        )}

        {actionType === "realizar" && (
          <div className="mt-6">
            <p className="text-amber-600 font-medium">
              Ao confirmar a realização deste voo, o status será alterado para
              "Realizado" e não poderá ser modificado.
            </p>
          </div>
        )}

        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}

        <div className="mt-6 flex justify-between gap-4">
          <button
            onClick={handleConfirm}
            disabled={isButtonDisabled()}
            className={`py-2 px-6 rounded-lg ${
              isButtonDisabled()
                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                : "hover:bg-[rgba(255,61,0,0.54)] bg-[#FF3D00] text-white"
            }`}
          >
            {actionType === "confirmar"
              ? "Confirmar Embarque"
              : actionType === "cancelar"
              ? "Cancelar Voo"
              : "Confirmar Realização"}
          </button>
          <button
            onClick={handleClose}
            className="hover:bg-gray-300 bg-gray-200 text-black py-2 px-6 rounded-lg"
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightActionModal;
