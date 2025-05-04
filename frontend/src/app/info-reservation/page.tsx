'use client';
import React from "react";
import Header from "../../components/Header";
import HeaderBanner from "@/components/HeaderBanner";
import { Reservation } from "../interfaces/reservation-types";
import CancelReservationButton from "@/components/CancelReservationButton";

const infoReservation: React.FC = () => {
  const reservationData: Reservation = {
    code: "VOO456",
    dateTime: "2025-04-03T03:00:00",
    origin: "São Paulo (GRU)",
    destination: "Rio de Janeiro (GIG)",
    amountSpent: 4500,
    milesSpent: 300,
    flightStatus: "Criada",
  };

  const handleCheckIn = () => {
    alert("Check-in realizado com sucesso!");
  };

  const isFlightWithin48Hours = () => {
    const flightDate = new Date(reservationData.dateTime);
    const now = new Date();
    const diffInHours = (flightDate.getTime() - now.getTime()) / (1000 * 60 * 60);
    return diffInHours <= 48 && diffInHours > 0;
  };

  return (
    <div>
      <Header />
      <HeaderBanner text="Verifique sua reserva aqui" />

      <div className="flex justify-center -mt-20 md:-mt-24 px-4">
        <div className="p-6 bg-white shadow-xl flex flex-col gap-5 w-full max-w-3xl rounded-md font-pathway">
          <div className="flex flex-col md:flex-row align-center justify-center md:justify-between gap-6 text-3xl">
            <p className="font-400">Código da Reserva: {reservationData.code}</p>
            <p className="font-400">Estado: {reservationData.flightStatus}</p>
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-6 text-3xl">
            <p className="font-400">
              Data/Hora de Embarque:{" "}
              {new Date(reservationData.dateTime).toLocaleString()}
            </p>
            <p className="font-400">
              Valor Gasto: R${reservationData.amountSpent}
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-6 text-3xl">
            <p className="font-400">Origem: {reservationData.origin}</p>
            <p className="font-400">Destino: {reservationData.destination}</p>
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-6 text-3xl">
            <p className="font-400">Milhas Gastas: {reservationData.milesSpent}</p>
          </div>
          <div className="flex flex-row justify-center gap-6">
            {isFlightWithin48Hours() && (
              <button
                onClick={handleCheckIn}
                className="px-6 py-2 bg-green-500 text-white text-2xl rounded-md hover:bg-green-700 transition-all"
              >
                Fazer Check-in
              </button>
            )}
            <CancelReservationButton reservationCode={reservationData.code} telaAtual={true}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default infoReservation;
