// src/pages/employee-home/index.tsx
"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import FlightBanner from "@/components/FlightBanner";
import FlightsList from "@/components/FlightsList";
import ActionModal from "@/components/ActionModal";
import { Flight, Reservation } from "@/types/interfaces";
import { useFlightManagement } from "@/hooks/useFlightManagement";
import MenuFuncionario from "@/components/MenuFuncionario";

const EmployeeHomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [actionType, setActionType] = useState<"confirmar" | "cancelar" | "realizar" | "">("");
  const [reservationCodeInput, setReservationCodeInput] = useState("");

  const { 
    flights, 
    upcomingFlights, 
    handleConfirmBoarding, 
    handleCancelFlight, 
    handleCompleteFlight 
  } = useFlightManagement();

  const handleOpenModal = (flight: Flight, action: typeof actionType) => {
    setSelectedFlight(flight);
    setActionType(action);
    setReservationCodeInput("");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedFlight(null);
    setActionType("");
  };

  const handleConfirmAction = () => {
    if (!selectedFlight) return;

    let success = false;

    if (actionType === "confirmar") {
      if (reservationCodeInput.trim() === "") {
        alert("Por favor, insira o código da reserva.");
        return;
      }
      success = handleConfirmBoarding(selectedFlight.id, reservationCodeInput.trim());
    } else if (actionType === "cancelar") {
      success = handleCancelFlight(selectedFlight.id);
    } else if (actionType === "realizar") {
      success = handleCompleteFlight(selectedFlight.id);
    }

    handleCloseModal();
  };

  return (
    <div>
      <MenuFuncionario />
      <div className="min-h-screen bg-gray-100">
        <FlightBanner />
        
        <div className="max-w-4xl mx-auto -mt-10 pb-10">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-700 mx-4">
            <div className="p-6">
              <FlightsList 
                flights={upcomingFlights} 
                onOpenModal={handleOpenModal} 
              />
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
    </div>
  );
};

export default EmployeeHomePage;