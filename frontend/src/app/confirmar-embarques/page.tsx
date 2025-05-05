"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import HeaderBanner from "@/components/HeaderBanner";
import SearchIcon from "@mui/icons-material/Search";
import CustomTableWhite from "@/components/CustomTableWhite";
import { Reservation as BaseReservation } from "@/app/interfaces/reservation-types";
import MenuFuncionario from "@/components/MenuFuncionario";

// Atualizando a interface para estender a de reservation-types
interface Reservation extends BaseReservation {
  id: string;
  flightId: string;
  // Sobrescrevendo flightStatus para um tipo restrito
  flightStatus: "CHECK-IN" | "EMBARCADO";
  // Assume que "code" corresponde a reservationCode e "dateTime" a flightDateTime
}

const ConfirmarEmbarquesPage: React.FC = () => {
  const searchParams = useSearchParams();
  const flightId = searchParams.get("flightId");

  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Dados mock atualizados para usar as propriedades da interface modificada
    const mockReservations: Reservation[] = [
      {
        id: "r1",
        code: "RES123",
        flightId: flightId || "undefined",
        flightStatus: "CHECK-IN",
        dateTime: "2025-05-12T10:00",
        destination: "Rio de Janeiro",
        origin: "Curitiba",
        amountSpent: 0,
        milesSpent: 0,
      },
      {
        id: "r2",
        code: "RES456",
        flightId: flightId || "undefined",
        flightStatus: "EMBARCADO",
        dateTime: "2025-05-12T10:00",
        destination: "Rio de Janeiro",
        origin: "Curitiba",
        amountSpent: 0,
        milesSpent: 0,
      },
      {
        id: "r3",
        code: "RES789",
        flightId: flightId || "undefined",
        flightStatus: "CHECK-IN",
        dateTime: "2025-05-12T10:00",
        destination: "Rio de Janeiro",
        origin: "Curitiba",
        amountSpent: 0,
        milesSpent: 0,
      },
      // Reserva que não pertence a este voo para testar
      {
        id: "r4",
        code: "RES321",
        flightId: "outro-voo",
        flightStatus: "CHECK-IN",
        dateTime: "2025-05-12T10:00",
        destination: "São Paulo",
        origin: "Curitiba",
        amountSpent: 0,
        milesSpent: 0,
      },
      // Exemplo adicional
      {
        id: "r5",
        code: "RES000",
        flightId: flightId || "undefined",
        flightStatus: "CHECK-IN",
        dateTime: "2025-05-12T10:00",
        destination: "Belo Horizonte",
        origin: "Curitiba",
        amountSpent: 0,
        milesSpent: 0,
      },
    ];
    setReservations(mockReservations);
  }, [flightId]);

  const handleConfirmBoarding = (id: string) => {
    const reservation = reservations.find((r) => r.id === id);
    if (!reservation) return;
    if (reservation.flightId !== flightId) {
      alert(`Erro: Reserva ${reservation.code} não pertence a este voo.`);
      return;
    }
    if (reservation.flightStatus !== "CHECK-IN") {
      alert(`Erro: Reserva ${reservation.code} não está no status CHECK-IN.`);
      return;
    }
    alert(`Embarque confirmado para reserva ${reservation.code}`);
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, flightStatus: "EMBARCADO" } : r))
    );
  };

  const fetchFilteredReservations = () => {
    // Filtra as reservas com base no código digitado (agora "code")
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

  // Definição das colunas para o CustomTableWhite com as propriedades atualizadas
  const columns = [
    {
      header: "Código da Reserva",
      accessor: "code",
      sortable: true,
    },
    {
      header: "Check-in",
      accessor: "flightStatus",
      sortable: false,
      renderCell: (row: Reservation) =>
        row.flightStatus === "EMBARCADO" ? "EMBARCADO" : "CHECK-IN",
    },
    {
      header: "Data/Hora",
      accessor: "dateTime",
      sortable: true,
      renderCell: (row: Reservation) => new Date(row.dateTime).toLocaleString(),
    },
    {
      header: "Origem/Destino",
      accessor: "originDestination",
      sortable: true,
      renderCell: (row: Reservation) => `${row.origin} -> ${row.destination}`,
    },
    {
      header: "Ação",
      accessor: "action",
      sortable: false,
      renderCell: (row: Reservation) => (
        <button
          onClick={() => handleConfirmBoarding(row.id)}
          className="bg-oranged hover:bg-browned text-white text-xl py-2 px-4 rounded-lg "
          disabled={row.flightStatus === "EMBARCADO"}
        >
          Confirmar Embarque
        </button>
      ),
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
            data={fetchFilteredReservations()}
            showHeader={true}
            hideSortButtons={true}
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmarEmbarquesPage;
