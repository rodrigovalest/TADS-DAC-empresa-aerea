"use client";
import React, { useState } from "react";
import Header from "../../components/Header";
import HeaderBanner from "@/components/HeaderBanner";
import { Reservation } from "../interfaces/reservation-types";
import SearchIcon from "@mui/icons-material/Search";

const searchReservationPage: React.FC = () => {
  const [reservationCode, setReservationCode] = useState<string>("");
  const [reservationData, setReservationData] = useState<Reservation | null>(
    null
  );
  const [errorMessage, setErrorMessage] = useState<string>("");

  const fetchReservationDetails = async () => {
    // Simulação de uma chamada à API para buscar os detalhes da reserva
    if (reservationCode === "VOO456") {
      const mockData: Reservation = {
        code: "VOO456",
        dateTime: "2025-04-18T03:00:00",
        origin: "São Paulo (GRU)",
        destination: "Rio de Janeiro (GIG)",
        amountSpent: 4500,
        milesSpent: 300,
        flightStatus: "Criada",
      };
      setReservationData(mockData);
      setErrorMessage(""); // Remove a mensagem de erro
    } else {
      setReservationData(null);
      setErrorMessage(
        "Reserva não encontrada. Verifique o código e tente novamente."
      );
    }
  };

  const handleCheckIn = () => {
    // Adicionar Message quando tiver
    alert("Check-in realizado com sucesso!");
  };

  const handleCancelReservation = () => {
    // Adicionar Message quando tiver
    alert("Reserva cancelada com sucesso!");
  };

  const isFlightWithin48Hours = () => {
    if (!reservationData) return false;
    const flightDate = new Date(reservationData.dateTime);
    const now = new Date();
    const diffInHours =
      (flightDate.getTime() - now.getTime()) / (1000 * 60 * 60);
    return diffInHours <= 48 && diffInHours > 0;
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      fetchReservationDetails();
    }
  };

  return (
    <div>
      <Header />
      <HeaderBanner
        text="Verifique sua reserva aqui"
        body={
          <div className="flex justify-center w-full">
            <div className="flex flex-row bg-oranged py-2 px-4 w-full max-w-5xl mx-auto mt-5 rounded-md">
              <input
                type="text"
                placeholder="Digite aqui o código da reserva"
                value={reservationCode}
                onChange={(e) => setReservationCode(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full rounded-full px-4 py-3 text-black bg-white text-lg pr-12"
              />
              <button
                onClick={fetchReservationDetails}
                className="transform -ml-10 text-gray-500 hover:text-gray-700"
              >
                <SearchIcon />
              </button>
            </div>
          </div>
        }
      />

      {errorMessage && (
        <div className="flex justify-center mt-4">
          <p className="text-red-500 text-lg">{errorMessage}</p>
        </div>
      )}

      {reservationData && (
        <div className="flex justify-center -mt-20 md:-mt-24 px-4">
          <div className="p-6 bg-white shadow-xl flex flex-col gap-5 w-full max-w-3xl rounded-md font-pathway">
            <div className="flex flex-col md:flex-row align-center justify-center md:justify-between gap-6 text-3xl">
              <p className="font-400">
                Código da Reserva: {reservationData.code}
              </p>
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
              <p className="font-400">
                Milhas Gastas: {reservationData.milesSpent}
              </p>
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
              <button
                onClick={handleCancelReservation}
                className="px-6 py-2 bg-red-500 text-white text-2xl rounded-md hover:bg-red-700 transition-all"
              >
                Cancelar Reserva
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default searchReservationPage;
