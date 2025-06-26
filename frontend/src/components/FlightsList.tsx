"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Flight } from "@/types/interfaces";
import FlightCard from "./FlightCard";
import { useFindVoos } from "@/hooks/useFindVoos";
import IVooResponse from "@/models/response/voo-response";

interface FlightsListProps {
  onOpenModal: (
    voo: IVooResponse,
    action: "confirmar" | "cancelar" | "realizar"
  ) => void;
}

const FlightsList: React.FC<FlightsListProps> = ({ onOpenModal }) => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const { data, mutate: onFindVoos, isPending, isError} = useFindVoos();

  useEffect(() => {
    onFindVoos(
      {
        data: null,
        origem: null,
        destino: null,
        inicio: null,
        fim: null,
      }
    );
  }, [onFindVoos]);

  if (isPending) {
    return (
      <div className="text-center py-8">
        <p>Carregando voos...</p>
      </div>
    );
  }

  if (error || isError || !data) {
    return (
      <div className="text-center py-8 text-red-500">
        <p>Algo deu errado</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 font-bold">
      {data.voos.length > 0 ? (
        data.voos.map((voo) => (
          <FlightCard
            key={voo.codigo}
            voo={voo}
            onOpenModal={onOpenModal}
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
