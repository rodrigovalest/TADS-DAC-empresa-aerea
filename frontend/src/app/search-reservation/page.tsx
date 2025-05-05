"use client";
import React, { useState } from "react";
import Header from "../../components/Header";
import HeaderBanner from "@/components/HeaderBanner";
import { Reservation } from "../interfaces/reservation-types";
import SearchIcon from "@mui/icons-material/Search";
import { Flight } from "../interfaces/flight";

const searchReservationPage: React.FC = () => {
  const [reservationCode, setReservationCode] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [allReservations, setAllReservations] = useState<Flight[]>([
    {
      code: "VOO123",
      dateTime: "2025-05-05T03:00:00",
      origin: "São Paulo (GRU)",
      destination: "Rio de Janeiro (GIG)",
      amountSpent: 4500,
      milesSpent: 300,
      flightStatus: "CONFIRMADA",
    },
    {
      code: "VOO456",
      dateTime: "2025-05-20T10:00:00",
      origin: "Brasília (BSB)",
      destination: "Salvador (SSA)",
      amountSpent: 3200,
      milesSpent: 200,
      flightStatus: "CONFIRMADA",
    },
  ]);

  const fetchFilteredReservations = () => {
    // Filtra as reservas com base no código digitado, permitindo buscas parciais
    return allReservations.filter((reservation) =>
      reservation.code.toLowerCase().includes(reservationCode.toLowerCase())
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReservationCode(e.target.value);
  };

  const handleCheckIn = (reservationCode: string) => {
    const updatedReservations = allReservations.map((reservation) =>
      reservation.code === reservationCode
        ? { ...reservation, flightStatus: "CHECK-IN" }
        : reservation
    );
    setAllReservations(updatedReservations); // Update state with new reservations
    setErrorMessage(""); // Clear any error messages
    alert("Check-in realizado com sucesso!");
  };

  const handleCancelReservation = () => {
    // Adicionar Message quando tiver
    alert("Reserva cancelada com sucesso!");
  };

  const isFlightWithin48Hours = (reservation: Reservation) => {
    const flightDate = new Date(reservation.dateTime);
    const now = new Date();
    const diffInHours =
      (flightDate.getTime() - now.getTime()) / (1000 * 60 * 60);
    return diffInHours <= 48 && diffInHours > 0;
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      fetchFilteredReservations();
    }
  };

  return (
    <div className="mb-10">
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
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="uppercase w-full rounded-full px-4 py-3 text-black bg-white text-lg pr-12"
              />
              <button
                onClick={fetchFilteredReservations}
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

      <div className="flex justify-center mt-4 px-4">
        <div className="flex flex-col gap-6 w-full max-w-5xl">
          {fetchFilteredReservations().map((reservation) => (
            <div
              key={reservation.code}
              className="p-6 bg-white shadow-xl flex flex-col gap-5 w-full rounded-md font-pathway"
            >
              <div className="flex flex-col md:flex-row align-center justify-center md:justify-between gap-6 text-3xl">
                <p className="font-400">Código da Reserva: {reservation.code}</p>
                <p className="font-400">Estado: {reservation.flightStatus}</p>
              </div>
              <div className="flex flex-col md:flex-row justify-between gap-6 text-3xl">
                <p className="font-400">
                  Data/Hora de Embarque:{" "}
                  {new Date(reservation.dateTime).toLocaleString()}
                </p>
                <p className="font-400">
                  Valor Gasto: R${reservation.amountSpent}
                </p>
              </div>
              <div className="flex flex-col md:flex-row justify-between gap-6 text-3xl">
                <p className="font-400">Origem: {reservation.origin}</p>
                <p className="font-400">Destino: {reservation.destination}</p>
              </div>
              <div className="flex flex-col md:flex-row justify-between gap-6 text-3xl">
                <p className="font-400">
                  Milhas Gastas: {reservation.milesSpent}
                </p>
              </div>
              <div className="flex flex-row justify-center gap-6">
                {reservation.flightStatus === "CONFIRMADA" &&
                  isFlightWithin48Hours(reservation) && (
                    <button
                      onClick={() => handleCheckIn(reservation.code)}
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default searchReservationPage;
