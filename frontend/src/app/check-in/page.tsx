"use client";

import React, { useState } from "react";
import "../../app/globals.css";
import Header from "../../components/Header";
import HeaderBanner from "@/components/HeaderBanner";
import TravelCardCheckIn from "@/components/TravelCardCheckIn";
import { Flight, Reservation } from "@/types/interfaces";

// Interface para combinar dados do voo e da reserva
interface ReservationWithFlightDetails {
  reservation: Reservation;
  flight: Flight;
}

const mockFlights: ReservationWithFlightDetails[] = [
  {
    reservation: {
      id: "r1",
      code: "VOO123",
      flightId: "f1",
      status: "CHECK-IN",
    },
    flight: {
      id: "f1",
      date: "2025-05-07",
      time: "03:00:00",
      origin: "São Paulo (GRU)",
      destination: "Rio de Janeiro (GIG)",
      status: "CONFIRMADO",
      value: 4500,
      miles: 300,
    },
  },
  {
    reservation: {
      id: "r2",
      code: "VOO456",
      flightId: "f2",
      status: "CHECK-IN",
    },
    flight: {
      id: "f2",
      date: "2025-05-08",
      time: "10:00:00",
      origin: "Brasília (BSB)",
      destination: "Salvador (SSA)",
      status: "CONFIRMADO",
      value: 3200,
      miles: 200,
    },
  },
  {
    reservation: {
      id: "r3",
      code: "VOO789",
      flightId: "f3",
      status: "CHECK-IN",
    },
    flight: {
      id: "f3",
      date: "2025-05-07",
      time: "15:00:00",
      origin: "Rio de Janeiro (GIG)",
      destination: "São Paulo (GRU)",
      status: "CONFIRMADO",
      value: 5000,
      miles: 400,
    },
  },
  {
    reservation: {
      id: "r4",
      code: "VOO101",
      flightId: "f4",
      status: "CHECK-IN",
    },
    flight: {
      id: "f4",
      date: "2025-05-30",
      time: "18:00:00",
      origin: "São Paulo (GRU)",
      destination: "Belo Horizonte (CNF)",
      status: "CONFIRMADO",
      value: 2500,
      miles: 150,
    },
  },
];

const CheckInPage: React.FC = () => {
  const [flights, setFlights] = useState(mockFlights);

  const handleCheckIn = (code: string) => {
    setFlights((prevFlights) =>
      prevFlights.map((flight) =>
        flight.reservation.code === code
          ? { ...flight, flightStatus: "CHECK-IN" }
          : flight
      )
    );
  };

  const upcomingFlights = flights.filter((flight) => {
    const now = new Date();
    const dateTime = new Date(`${flight.flight.date}T${flight.flight.time}`);
    return (
      dateTime > now &&
      dateTime <= new Date(now.getTime() + 48 * 60 * 60 * 1000)
    );
  });

  return (
    <div className="mb-10">
      <Header />
      <HeaderBanner htmlContent="Seu <span class='text-[#FF3D00] font-bold'>vôo</span> está a sua espera" />
      <div className="rounded-3xl border-3 w-[85vw] border-black mx-auto mt-8 bg-white p-4">
        {upcomingFlights.map((flight) => (
          <TravelCardCheckIn
            key={flight.reservation.id}
            flight={flight}
            onCheckIn={handleCheckIn}
          />
        ))}
      </div>
    </div>
  );
};

export default CheckInPage;
