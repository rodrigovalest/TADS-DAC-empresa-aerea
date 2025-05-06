"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import HeaderBanner from "@/components/HeaderBanner";
import SearchIcon from "@mui/icons-material/Search";
import CustomTableWhite from "@/components/CustomTableWhite";
import MenuFuncionario from "@/components/MenuFuncionario";
import { Flight, Reservation } from "@/types/interfaces";

const ConfirmarEmbarquesPage: React.FC = () => {
  const params = useParams();
  const flightId = params.flightId as string;

  const [flight, setFlight] = useState<Flight | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [search, setSearch] = useState("");

  // Mock data para o voo e reservas

  useEffect(() => {
    // Mock data para o voo
    const mockFlight: Flight = {
      id: flightId,
      date: "24/05/2025",
      time: "10:00",
      origin: "Curitiba",
      destination: "Rio de Janeiro",
      status: "CONFIRMADO",
      value: 500,
      miles: 2500,
    };

    // Mock data para as reservas usando a interface Reservation
    const mockReservations: Reservation[] = [
      {
        id: "r1",
        code: "RES123",
        flightId: flightId,
        status: "CHECK-IN",
      },
      {
        id: "r2",
        code: "RES456",
        flightId: flightId,
        status: "EMBARCADO",
      },
      {
        id: "r3",
        code: "RES789",
        flightId: flightId,
        status: "CHECK-IN",
      },
      // Reserva que não pertence a este voo para testar
      {
        id: "r4",
        code: "RES321",
        flightId: "outro-voo",
        status: "CHECK-IN",
      },
      {
        id: "r5",
        code: "RES000",
        flightId: flightId,
        status: "CHECK-IN",
      },
    ];

    setFlight(mockFlight);
    setReservations(mockReservations);
  }, [flightId]);

  const handleConfirmBoarding = (id: string) => {
    const reservation = reservations.find((r) => r.id === id);
    if (!reservation) return;
    if (reservation.flightId !== flightId) {
      alert(`Erro: Reserva ${reservation.code} não pertence a este voo.`);
      return;
    }
    if (reservation.status !== "CHECK-IN") {
      alert(`Erro: Reserva ${reservation.code} não está no status CHECK-IN.`);
      return;
    }
    alert(`Embarque confirmado para reserva ${reservation.code}`);
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "EMBARCADO" } : r))
    );
  };

  const fetchFilteredReservations = () => {
    // Filtra as reservas com base no código digitado
    return reservations.filter((reservation) =>
      reservation.code.toLowerCase().includes(search.toLowerCase())
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      fetchFilteredReservations();
    }
  };

  // Aqui combino os dados do voo e da reserva para exibição na tabela
  const reservationsWithFlightDetails = fetchFilteredReservations().map(
    (reservation) => ({
      ...reservation,
      flightDate: flight?.date || "",
      flightTime: flight?.time || "",
      flightOrigin: flight?.origin || "",
      flightDestination: flight?.destination || "",
    })
  );

  // Definição das colunas para o CustomTableWhite
  const columns = [
    {
      header: "Código da Reserva",
      accessor: "code",
      sortable: true,
    },
    {
      header: "Check-in",
      accessor: "status",
      sortable: false,
      renderCell: (row: any) =>
        row.status === "EMBARCADO" ? "EMBARCADO" : "CHECK-IN",
    },
    {
      header: "Data/Hora",
      accessor: "dateTime",
      sortable: true,
      renderCell: (row: any) => `${row.flightDate} ${row.flightTime}`,
    },
    {
      header: "Origem/Destino",
      accessor: "originDestination",
      sortable: true,
      renderCell: (row: any) =>
        `${row.flightOrigin} -> ${row.flightDestination}`,
    },
    {
      header: "Ação",
      accessor: "action",
      sortable: false,
      renderCell: (row: any) => {
        const isEmbarcado = row.status === "EMBARCADO";

        return (
          <button
            onClick={() => handleConfirmBoarding(row.id)}
            className={`text-white text-xl py-2 px-4 rounded-lg ${
              isEmbarcado
                ? "bg-gray-400 cursor-not-allowed opacity-70"
                : "bg-oranged hover:bg-browned"
            }`}
            disabled={isEmbarcado}
          >
            {isEmbarcado ? "Já Embarcado" : "Confirmar Embarque"}
          </button>
        );
      },
    },
  ];

  return (
    <div className="mb-10">
      <MenuFuncionario />

      <HeaderBanner
        body={
          <div className="flex justify-center w-full">
            <div className="flex flex-row bg-oranged py-2 px-4 w-full max-w-5xl mx-auto mt-5 rounded-md">
              <input
                type="text"
                placeholder="Digite aqui o código da reserva"
                value={search}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="w-full rounded-full px-4 py-3 text-black bg-white text-lg pr-12"
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
      <div className="-mt-25">
        <div className="flex flex-col px-20 justify-center">
          <CustomTableWhite
            columns={columns}
            data={reservationsWithFlightDetails}
            showHeader={true}
            hideSortButtons={true}
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmarEmbarquesPage;
