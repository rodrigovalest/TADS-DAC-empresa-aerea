"use client";
import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import HeaderBanner from "@/components/HeaderBanner";
import { Flight, Reservation } from "@/types/interfaces";
import CancelReservationButton from "@/components/CancelReservationButton";

const InfoReservation: React.FC = () => {
  // Estado para armazenar a data formatada
  const [formattedDate, setFormattedDate] = useState<string>("");

  // Criar dados mockados usando as interfaces corretas
  const flightData: Flight = {
    id: "f123",
    date: "2025-04-03",
    time: "03:00:00",
    origin: "São Paulo (GRU)",
    destination: "Rio de Janeiro (GIG)",
    status: "CONFIRMADO",
    value: 4500,
    miles: 300,
  };

  const reservationData: Reservation = {
    id: "r456",
    flightId: "f123",
    status: "CHECK-IN",
    code: "VOO456",
  };

  // Formatar a data após a hidratação
  useEffect(() => {
    const flightDate = new Date(`${flightData.date}T${flightData.time}`);
    setFormattedDate(flightDate.toLocaleString());
  }, [flightData.date, flightData.time]);

  const handleCheckIn = () => {
    alert("Check-in realizado com sucesso!");
  };

  const isFlightWithin48Hours = () => {
    const flightDate = new Date(`${flightData.date}T${flightData.time}`);
    const now = new Date();
    const diffInHours =
      (flightDate.getTime() - now.getTime()) / (1000 * 60 * 60);
    return diffInHours <= 48 && diffInHours > 0;
  };

  return (
    <div>
      <Header />
      <HeaderBanner text="Verifique sua reserva aqui" />

      <div className="flex justify-center -mt-20 md:-mt-24 px-4">
        <div className="p-6 bg-white shadow-xl flex flex-col gap-5 w-full max-w-3xl rounded-md font-pathway">
          <div className="flex flex-col md:flex-row align-center justify-center md:justify-between gap-6 text-3xl">
            <p className="font-400">
              Código da Reserva: {reservationData.code}
            </p>
            <p className="font-400">Estado: {reservationData.status}</p>
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-6 text-3xl">
            <p className="font-400">
              Data/Hora de Embarque:{" "}
              {formattedDate || `${flightData.date} ${flightData.time}`}
            </p>
            <p className="font-400">Valor: R${flightData.value}</p>
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-6 text-3xl">
            <p className="font-400">Origem: {flightData.origin}</p>
            <p className="font-400">Destino: {flightData.destination}</p>
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-6 text-3xl">
            <p className="font-400">Milhas: {flightData.miles}</p>
          </div>
          <div className="flex flex-row justify-center gap-6">
            {isFlightWithin48Hours() &&
              reservationData.status === "CHECK-IN" && (
                <button
                  onClick={handleCheckIn}
                  className="px-6 py-2 bg-green-500 text-white text-2xl rounded-md hover:bg-green-700 transition-all"
                >
                  Fazer Check-in
                </button>
              )}
            <CancelReservationButton
              reservationCode={reservationData.code}
              telaAtual={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoReservation;
