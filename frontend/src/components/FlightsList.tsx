import React from "react";
import { useRouter } from "next/navigation";
import { Flight } from "@/types/interfaces";
import FlightCard from "./FlightCard";

interface FlightsListProps {
  flights: Flight[];
  onOpenModal: (flight: Flight, action: "confirmar" | "cancelar" | "realizar") => void;
}

const FlightsList: React.FC<FlightsListProps> = ({ flights, onOpenModal }) => {
  const router = useRouter();

  return (
    <div className="space-y-4 font-bold">
      {flights.length > 0 ? (
        flights.map((flight) => (
          <FlightCard 
            key={flight.id} 
            flight={flight} 
            onOpenModal={onOpenModal}
            onConfirmBoarding={() => router.push('/confirmacao-embarque')}
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