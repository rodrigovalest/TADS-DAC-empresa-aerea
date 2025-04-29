import React from "react";
import { Flight } from "@/types/interfaces";

interface FlightCardProps {
  flight: Flight;
  onOpenModal: (flight: Flight, action: "confirmar" | "cancelar" | "realizar") => void;
  onConfirmBoarding: () => void;
}

const FlightCard: React.FC<FlightCardProps> = ({ flight, onOpenModal, onConfirmBoarding }) => {
  return (
    <div className="bg-gray-200 rounded-lg p-4 mb-4">
      <div className="grid grid-cols-1 gap-2">
        <div className="flex justify-between">
          <p className="font-medium">Data: {flight.date}</p>
          <p className="font-medium">Horário: {flight.time}</p>
        </div>
        <div className="flex items-center justify-between w-full px-4">
          <span className="text-left">Origem: {flight.origin}</span>
          <span className="text-right">Destino: {flight.destination}</span>
        </div>
        <div className="flex justify-between mt-2">
          <button
            onClick={() => onOpenModal(flight, "realizar")}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl text-sm font-bold"
          >
            Realizar voo
          </button>
          <button
            onClick={onConfirmBoarding}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl text-sm font-bold"
          >
            Confirmar embarque
          </button>
          <button
            onClick={() => onOpenModal(flight, "cancelar")}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl text-sm font-bold"
          >
            Cancelar voo
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;