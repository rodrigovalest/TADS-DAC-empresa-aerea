"use client";

import React, { useState } from 'react';
import '../../app/globals.css';
import Header from "../../components/Header";
import HeaderBanner from '@/components/HeaderBanner';
import TravelCardCheckIn from '@/components/TravelCardCheckIn';
import { Flight } from '../interfaces/flight';

const mockFlights: Flight[] = [
  {
    id: '1',
    destination: "New York",
    dateTime: new Date(new Date().getTime() + 3 * 60 * 60 * 1000).toISOString(),
    flightStatus: "CHECK-IN",
    code: 'ASD123',
    origin: 'Rio de Janeiro',
    amountSpent: 0,
    milesSpent: 0
  },
  {
    id: '2',
    destination: "London",
    dateTime: new Date(new Date().getTime() + 3 * 60 * 60 * 1000).toISOString(),
    flightStatus: "CONFIRMADA",
    code: 'RTY765',
    origin: 'São Paulo',
    amountSpent: 0,
    milesSpent: 0
  },
  {
    id: '3',
    destination: "Tokyo",
    dateTime: new Date(new Date().getTime() + 3 * 60 * 60 * 1000).toISOString(),
    flightStatus: "CONFIRMADA",
    code: 'JHG934',
    origin: 'Curitiba',
    amountSpent: 0,
    milesSpent: 0
  },
];

const CheckInPage: React.FC = () => {
  const [flights, setFlights] = useState(mockFlights);

  const handleCheckIn = (code: string) => {
    setFlights((prevFlights) =>
      prevFlights.map((flight) =>
        flight.code === code ? { ...flight, flightStatus: "CHECK-IN" } : flight
      )
    );
  };

  const upcomingFlights = flights.filter((flight) => {
    const now = new Date();
    const dateTime = new Date(flight.dateTime);
    return dateTime > now && dateTime <= new Date(now.getTime() + 48 * 60 * 60 * 1000);
  });

  return (
    <div className="mb-10">
        <Header />
        <HeaderBanner htmlContent="Seu <span class='text-[#FF3D00] font-bold'>vôo</span> está a sua espera" />
        <div className="rounded-3xl border-3 w-[85vw] border-black mx-auto mt-8 bg-white p-4">
          {upcomingFlights.map((flight) => (
            <TravelCardCheckIn key={flight.id} flight={flight} onCheckIn={handleCheckIn} />
          ))}
        </div>
    </div>
  );
};

export default CheckInPage;