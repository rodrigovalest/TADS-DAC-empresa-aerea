"use client";

import React, { useEffect, useState } from "react";
import FlightActionModal from "./FlightActionModal";

// Interface para voo
export interface Flight {
  id: string;
  dateTime: string;
  origin: string;
  destination: string;
}

const EmployeeDashboard: React.FC = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [showModal, setShowModal] = useState(false); // Controla a visibilidade do modal
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null); // Voo selecionado para o modal
  const [actionType, setActionType] = useState<string>(""); // Tipo de ação (confirmar, cancelar, realizar)

  useEffect(() => {
    const mockFlights: Flight[] = [
      {
        id: "1",
        dateTime: "2025-05-12T10:00",
        origin: "São Paulo",
        destination: "Rio de Janeiro",
      },
      {
        id: "2",
        dateTime: "2025-05-12T15:30",
        origin: "Curitiba",
        destination: "Porto Alegre",
      },
      {
        id: "3",
        dateTime: "2025-05-12T18:45",
        origin: "Brasília",
        destination: "Fortaleza",
      },
    ];

    const sortedFlights = mockFlights.sort(
      (a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
    );
    setFlights(sortedFlights);
  }, []);

  // Função para abrir o modal
  const handleOpenModal = (flight: Flight, action: string) => {
    setSelectedFlight(flight);
    setActionType(action);
    setShowModal(true);
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedFlight(null);
    setActionType("");
  };

  const handleConfirmAction = () => {
    alert("Ação confirmada com sucesso!");
  };

  return (
    <div
      className="bg-cover bg-center min-h-screen flex flex-col items-center justify-start p-6"
      style={{
        backgroundImage: "url('/images/header-cliente-landing-page.png')",
        fontFamily: "Pathway Gothic One, sans-serif",
      }}
    >
      {/* Título */}
      <h2 className="text-white text-[64px] mt-10 text-center drop-shadow-lg">
        Voos nas Próximas 48 Horas
      </h2>
      {/* Tabela de Voos */}
      <div className="rounded-3xl border-4 w-[85vw] border-black mx-auto mt-8 bg-white shadow-2xl p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-xl">
            <thead className="bg-gray-300 text-black text-[20px] uppercase">
              <tr>
                <th className="border p-4">Data/Hora</th>
                <th className="border p-4">Origem</th>
                <th className="border p-4">Destino</th>
                <th className="border p-4">Ações</th>
              </tr>
            </thead>
            <tbody>
              {flights.map((flight) => (
                <tr
                  key={flight.id}
                  className="text-center bg-white hover:bg-gray-100 transition-all text-[18px]"
                >
                  <td className="border p-4 text-black font-semibold">
                    {new Date(flight.dateTime).toLocaleString()}
                  </td>
                  <td className="border p-4 text-black font-semibold">
                    {flight.origin}
                  </td>
                  <td className="border p-4 text-black font-semibold">
                    {flight.destination}
                  </td>
                  <td className="border p-4 flex justify-center gap-2">
                    <button
                      className="transition duration-300 ease-in-out hover:bg-[rgba(255,61,0,0.54)] bg-[#FF3D00] text-white font-semibold py-2 px-6 rounded-lg shadow-md"
                      onClick={() => handleOpenModal(flight, "confirmar")}
                    >
                      Confirmar Embarque
                    </button>
                    <button
                      className="transition duration-300 ease-in-out hover:bg-[rgba(255,61,0,0.54)] bg-[#FF3D00] text-white font-semibold py-2 px-6 rounded-lg shadow-md"
                      onClick={() => handleOpenModal(flight, "cancelar")}
                    >
                      Cancelar Voo
                    </button>
                    <button
                      className="transition duration-300 ease-in-out hover:bg-[rgba(255,61,0,0.54)] bg-[#FF3D00] text-white font-semibold py-2 px-6 rounded-lg shadow-md"
                      onClick={() => handleOpenModal(flight, "realizar")}
                    >
                      Realizar Voo
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Modal */}
      {showModal && selectedFlight && (
        <FlightActionModal
          flight={selectedFlight}
          actionType={actionType}
          onClose={handleCloseModal}
          onConfirm={handleConfirmAction}
        />
      )}{" "}
    </div>
  );
};

export default EmployeeDashboard;
