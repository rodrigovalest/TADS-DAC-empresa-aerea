// src/pages/employee-home/index.tsx
"use client";

import React, { useEffect, useState } from "react";
import FlightBanner from "@/components/FlightBanner";
import FlightsList from "@/components/FlightsList";
import ActionModal from "@/components/ActionModal";
import { useFlightManagement } from "@/hooks/useFlightManagement";
import HeaderBanner from "@/components/HeaderBanner";
import MenuFuncionario from "@/components/MenuFuncionario";
import IVooResponse from "@/models/response/voo-response";

const EmployeeHomePage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState<IVooResponse | null>(null);
  const [actionType, setActionType] = useState<
    "confirmar" | "cancelar" | "realizar" | ""
  >("");
  const [reservationCodeInput, setReservationCodeInput] = useState("");

  const {
    flights,
    upcomingFlights,
    handleConfirmBoarding,
    handleCancelFlight,
    handleCompleteFlight,
  } = useFlightManagement();

  const handleOpenModal = (voo: IVooResponse, action: typeof actionType) => {
    setSelectedFlight(voo);
    setActionType(action);
    setReservationCodeInput("");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedFlight(null);
    setActionType("");
  };

  const handleConfirmAction = async () => {
    if (!selectedFlight) return;

    let success = false;

    if (actionType === "confirmar") {
      if (reservationCodeInput.trim() === "") {
        alert("Por favor, insira o código da reserva.");
        return;
      }
      success = await handleConfirmBoarding(
        selectedFlight.codigo,
        reservationCodeInput.trim()
      );
    } else if (actionType === "cancelar") {
      success = await handleCancelFlight(selectedFlight.codigo);
    } else if (actionType === "realizar") {
      success = await handleCompleteFlight(selectedFlight.codigo);
    }

    handleCloseModal();
  };


  return (
    <div>
      <MenuFuncionario />
      <HeaderBanner text="Próximos voos" />
      <div className="max-w-4xl mx-auto -mt-20 pb-10">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-700 mx-4">
          <div className="p-6">
            <FlightsList onOpenModal={handleOpenModal} />
          </div>
        </div>

        {showModal && selectedFlight && (
          <ActionModal
            flight={selectedFlight}
            actionType={actionType}
            reservationCodeInput={reservationCodeInput}
            setReservationCodeInput={setReservationCodeInput}
            onClose={handleCloseModal}
            onConfirm={handleConfirmAction}
          />
        )}
      </div>
    </div>
  );
};

export default EmployeeHomePage;
