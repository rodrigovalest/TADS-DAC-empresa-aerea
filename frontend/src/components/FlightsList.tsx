"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Flight } from "@/types/interfaces";
import FlightCard from "./FlightCard";

interface FlightsListProps {
  onOpenModal: (
    flight: Flight,
    action: "confirmar" | "cancelar" | "realizar"
  ) => void;
}

const FlightsList: React.FC<FlightsListProps> = ({ onOpenModal }) => {
  const router = useRouter();
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await fetch("http://localhost:8000/voos", {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Erro ao buscar voos.");
        }

        const data = await response.json();
        setFlights(data);
      } catch (error: any) {
        console.error("Erro ao carregar voos:", error);
        setError("Erro ao carregar voos. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-8">
        <p>Carregando voos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 font-bold">
      {flights.length > 0 ? (
        flights.map((flight) => (
          <FlightCard
            key={flight.id}
            flight={flight}
            onOpenModal={onOpenModal}
            onConfirmBoarding={() =>
              router.push("/confirmar-embarques/" + flight.id)
            }
          />
        ))
      ) : (
        <div className="text-center py-8">
          <p>Não há voos confirmados nas próximas 48 horas.</p>
        </div>
      )}
    </div>
  );
};

export default FlightsList;
