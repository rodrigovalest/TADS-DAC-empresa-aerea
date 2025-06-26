"use client";

import React, { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import HeaderBanner from "@/components/HeaderBanner";
import SearchIcon from "@mui/icons-material/Search";
import CustomTableWhite from "@/components/CustomTableWhite";
import MenuFuncionario from "@/components/MenuFuncionario";
import useFindReservaByCodigoVoo from "@/hooks/useFindReservaByCodigoVoo";
import { toast } from "react-toastify";
import useEmbarcarReserva from "@/hooks/useEmbarcarReserva";

const ConfirmarEmbarquesPage: React.FC = () => {
  const params = useParams();
  const flightId = params.flightId as string;
  const [search, setSearch] = useState("");
  const embarcarReservaMutation = useEmbarcarReserva();

  const {
    data: reservas,
    isLoading,
    isError,
  } = useFindReservaByCodigoVoo(Number(flightId));

  const handleConfirmBoarding = (codigo: string) => {
    const reserva = reservas?.find((r) => r.codigo === codigo);
    if (!reserva) return;

    if (reserva.estado !== "CHECK-IN") {
      toast.error(`Erro: Reserva ${reserva.codigo} não está no status CHECK-IN.`);
      return;
    }

    embarcarReservaMutation.mutate(Number(codigo));
  };

  const filteredReservations = useMemo(() => {
    if (!reservas) return [];

    return reservas
      .filter((reserva) =>
        reserva.codigo
      )
      .map((reserva) => ({
        id: reserva.codigo,
        code: reserva.codigo,
        status: reserva.estado,
        flightDate: reserva.voo.data,
        flightTime: reserva.voo.data,
        flightOrigin: reserva.voo.aeroporto_origem.codigo,
        flightDestination: reserva.voo.aeroporto_destino.codigo,
      }));
  }, [reservas, search]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

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
      renderCell: (row: any) => row.status ?? "Desconhecido"
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
        const isDisabled = row.status !== "CHECK-IN";

        return (
          <button
            onClick={() => handleConfirmBoarding(row.code)}
            className={`text-white text-xl py-2 px-4 rounded-lg ${
              isDisabled
                ? "bg-gray-400 cursor-not-allowed opacity-70"
                : "bg-oranged hover:bg-browned"
            }`}
            disabled={isDisabled}
          >
            {isDisabled ? "Não é possível embarcar" : "Confirmar Embarque"}
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
                className="w-full rounded-full px-4 py-3 text-black bg-white text-lg pr-12"
              />
              <button
                onClick={() => {}}
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
          {isLoading ? (
            <div className="text-center text-lg text-gray-600">
              Carregando reservas...
            </div>
          ) : isError ? (
            <div className="text-center text-lg text-red-600">
              Erro ao carregar reservas.
            </div>
          ) : (
            <CustomTableWhite
              columns={columns}
              data={filteredReservations}
              showHeader={true}
              hideSortButtons={true}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmarEmbarquesPage;
