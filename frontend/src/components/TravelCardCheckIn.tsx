"use client";
import React from "react";
import "../app/globals.css";
import { Flight, Reservation } from "@/types/interfaces";

// Interface para combinar dados do voo e da reserva
interface ReservationWithFlightDetails {
  reservation: Reservation;
  flight: Flight;
}

interface TravelCardCheckInProps {
  flight: ReservationWithFlightDetails;
  onCheckIn: (code: string) => void;
}

const TravelCardCheckIn: React.FC<TravelCardCheckInProps> = ({
  flight,
  onCheckIn,
}) => {
  const departureDate = new Date(flight.flight.date);
  const departureTime = flight.flight.time;

  const handleCheckIn = (code: string) => {
    onCheckIn(code);
    alert("O check-in do voo foi realizado com sucesso!");
    flight.reservation.status = "CHECK-IN";
  };

  return (
    <div
      className="rounded-md px-8 pt-6 pb-8 m-4 bg-[#D9D9D9]"
      style={{ fontFamily: "Pathway Gothic One, sans-serif" }}
    >
      <div className="flex text-[32px]">
        <div className="flex flex-4/5 pr-15 flex-row">
          <div className="flex min-w-[100%] flex-col justify-between">
            <div className="flex justify-between">
              <div>
                <p>
                  <span className="font-semibold">Data: </span>
                  {departureDate.toLocaleDateString("pt-BR", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </p>
              </div>
              <div>
                <p>
                  <span className="font-semibold">Horário: </span>
                  {departureTime}
                </p>
              </div>
            </div>
            <div className="flex justify-between">
              <p>
                <span className="font-semibold">Origem: </span>
                {flight.flight.origin}
              </p>
              <p>
                <span className="font-semibold">→</span>
              </p>
              <p>
                <span className="font-semibold">Destino: </span>
                {flight.flight.destination}
              </p>
            </div>
            <div className="mt-2">
              <p>
                <span className="font-semibold">Código de Reserva: </span>
                {flight.reservation.code}
              </p>
            </div>
            <div className="mt-2">
              <p>
                <span className="font-semibold">Status do Voo: </span>
                {flight.flight.status}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-1/5 justify-center">
          <div className="flex flex-col">
            <button
              className={`my-2 py-0.5 px-12 rounded-[15] hover:cursor-pointer ${
                flight.reservation.status === "CHECK-IN"
                  ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                  : "hover:bg-[rgba(255,61,0,0.54)] bg-[#FF3D00] text-white"
              }`}
              onClick={() => handleCheckIn(flight.reservation.code)}
              disabled={flight.reservation.status === "CHECK-IN"}
            >
              Check-in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelCardCheckIn;
