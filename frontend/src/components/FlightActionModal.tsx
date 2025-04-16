import React, { useState, useEffect } from "react";
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
  const [confirmCancellation, setConfirmCancellation] =
    useState<boolean>(false); // Confirmação para cancelamento

  // Reset form states when the modal opens or changes flight/action
  useEffect(() => {
    setReservationCode("");
    setErrorMessage("");
    setConfirmCancellation(false);
  }, [flight.id, actionType]);

  // Função específica para confirmar embarque
  const handleConfirmBoarding = () => {
    if (!reservationCode) {
      setErrorMessage("Por favor, insira o código de reserva.");
      return false;
    }

    // Simulação de validação do código de reserva
    if (reservationCode !== "RES123") {
      setErrorMessage("Código de reserva inválido ou não pertence a este voo.");
      return false;
    }

    setErrorMessage(""); // Limpar mensagem de erro
    return true;
  };

  // Função específica para cancelar voo
  const handleCancelFlight = () => {
    if (!confirmCancellation) {
      setErrorMessage(
        "Por favor, confirme o cancelamento marcando a caixa de seleção."
      );
      return false;
    }

    setErrorMessage(""); // Limpar mensagem de erro
    return true;
  };

  // Função específica para realizar voo
  const handleCompleteFlight = () => {
    // Aqui você pode adicionar validações específicas para a realização do voo
    // Nenhuma condição específica para realizar voo neste momento
    setErrorMessage(""); // Limpar mensagem de erro
    return true;
  };

  // Função para fechar o modal e resetar os estados
  const handleClose = () => {
    setReservationCode("");
    setErrorMessage("");
    setConfirmCancellation(false);
    onClose();
  };

  // Função principal que chama as funções específicas de acordo com o tipo de ação
  const handleConfirm = () => {
    let success = false;

    // Chama a função específica de acordo com o tipo de ação
    if (actionType === "confirmar") {
      success = handleConfirmBoarding();
    } else if (actionType === "cancelar") {
      success = handleCancelFlight();
    } else if (actionType === "realizar") {
      success = handleCompleteFlight();
    }

    // Se a ação foi bem-sucedida, chama onConfirm e fecha o modal
    if (success) {
      onConfirm();
      // Reset states before closing
      setReservationCode("");
      setErrorMessage("");
      setConfirmCancellation(false);
      onClose();
    }
  };

  // Verifica se o botão deve estar desativado com base no tipo de ação
  const isButtonDisabled = () => {
    if (actionType === "confirmar") {
      return reservationCode.trim() === ""; // Desativado se o código de reserva estiver vazio
    } else if (actionType === "cancelar") {
      return !confirmCancellation; // Desativado se a confirmação não estiver marcada
    }
    return false; // Para "realizar", o botão sempre estará habilitado
  };

  return (
    <div className="fixed inset-0 bg-blackopacity50 flex justify-center items-center z-50">
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
          {new Date(flight.dateTime).toLocaleString()}
        </p>
        <p>
          <strong>Origem:</strong> {flight.origin}
        </p>
        <p>
          <strong>Destino:</strong> {flight.destination}
        </p>

        {/* Campo para digitar o código de reserva (apenas para confirmar embarque) */}
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

        {/* Confirmação para cancelamento de voo */}
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

        {/* Mensagem específica para realizar voo */}
        {actionType === "realizar" && (
          <div className="mt-6">
            <p className="text-amber-600 font-medium">
              Ao confirmar a realização deste voo, o status será alterado para
              "Realizado" e não poderá ser modificado.
            </p>
          </div>
        )}

        {/* Mensagem de erro */}
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
