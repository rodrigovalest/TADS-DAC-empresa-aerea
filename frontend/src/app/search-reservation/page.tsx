"use client";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import HeaderBanner from "@/components/HeaderBanner";
import { Flight, Reservation } from "@/types/interfaces";
import SearchIcon from "@mui/icons-material/Search";
import clienteService from "@/services/cliente-service";

// Interface para combinar dados do voo e da reserva
interface ReservationWithFlightDetails {
  reservation: Reservation;
  flight: Flight;
}

const SearchReservationPage: React.FC = () => {
  const [reservationCode, setReservationCode] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [allReservations, setAllReservations] = useState<ReservationWithFlightDetails[]>([]);

  const clienteId = typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("logged_user") || "{}")?.codigo
    : null;

  const fetchFilteredReservations = () => {
    // Filtra as reservas com base no código digitado, permitindo buscas parciais
    return allReservations.filter((item) =>
      item.reservation.code
        .toLowerCase()
        .includes(reservationCode.toLowerCase())
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReservationCode(e.target.value);
  };

  const handleCheckIn = (reservationId: string) => {
    const updatedReservations = allReservations.map((item) =>
      item.reservation.id === reservationId
        ? {
            ...item,
            reservation: {
              ...item.reservation,
              status: "EMBARCADO" as "EMBARCADO",
            },
          }
        : item
    );

    setAllReservations(updatedReservations);
    setErrorMessage("");
    alert("Check-in realizado com sucesso!");
  };

  const handleCancelReservation = (reservationId: string) => {
    const updatedReservations = allReservations.filter(
      (item) => item.reservation.id !== reservationId
    );

    setAllReservations(updatedReservations);
    setErrorMessage("");
    alert("Reserva cancelada com sucesso!");
  };

  const isFlightWithin48Hours = (item: ReservationWithFlightDetails) => {
    const flightDate = new Date(`${item.flight.date}T${item.flight.time}`);
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

  // Para formatar datas com consistência entre servidor e cliente
  const [formattedDates, setFormattedDates] = useState<Record<string, string>>(
    {}
  );

  useEffect(() => {
    const newFormattedDates: Record<string, string> = {};
    allReservations.forEach((item) => {
      const key = item.reservation.id;
      const date = new Date(`${item.flight.date}T${item.flight.time}`);
      newFormattedDates[key] = date.toLocaleString();
    });
    setFormattedDates(newFormattedDates);
  }, [allReservations]);

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
                onClick={() => fetchFilteredReservations()}
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
          {fetchFilteredReservations().map((item) => (
            <div
              key={item.reservation.id}
              className="p-6 bg-white shadow-xl flex flex-col gap-5 w-full rounded-md font-pathway"
            >
              <div className="flex flex-col md:flex-row align-center justify-center md:justify-between gap-6 text-3xl">
                <p className="font-400">
                  Código da Reserva: {item.reservation.code}
                </p>
                <p className="font-400">Estado: {item.reservation.status}</p>
              </div>
              <div className="flex flex-col md:flex-row justify-between gap-6 text-3xl">
                <p className="font-400">
                  Data/Hora de Embarque:{" "}
                  {formattedDates[item.reservation.id] ||
                    `${item.flight.date} ${item.flight.time}`}
                </p>
                <p className="font-400">Valor: R${item.flight.value}</p>
              </div>
              <div className="flex flex-col md:flex-row justify-between gap-6 text-3xl">
                <p className="font-400">Origem: {item.flight.origin}</p>
                <p className="font-400">Destino: {item.flight.destination}</p>
              </div>
              <div className="flex flex-col md:flex-row justify-between gap-6 text-3xl">
                <p className="font-400">Milhas: {item.flight.miles}</p>
              </div>
              <div className="flex flex-row justify-center gap-6">
                {item.flight.status === "CONFIRMADO" &&
                  item.reservation.status === "CHECK-IN" &&
                  isFlightWithin48Hours(item) && (
                    <button
                      onClick={() => handleCheckIn(item.reservation.id)}
                      className="px-6 py-2 bg-green-500 text-white text-2xl rounded-md hover:bg-green-700 transition-all"
                    >
                      Fazer Check-in
                    </button>
                  )}
                <button
                  onClick={() => handleCancelReservation(item.reservation.id)}
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

export default SearchReservationPage;
