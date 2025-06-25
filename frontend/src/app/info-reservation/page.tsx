"use client";
export const dynamic = "force-dynamic";

import { Suspense } from "react";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import HeaderBanner from "@/components/HeaderBanner";
import CancelReservationButton from "@/components/CancelReservationButton";
import useFindReservaByCodigo from "@/hooks/useFindReservaByCodigo";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

function InfoReservationContent() {
  const searchParams = useSearchParams();
  const codigoParam = searchParams.get("codigo");
  const router = useRouter();

  const codigo = Number(codigoParam);
  const { data: reserva, isLoading, isError } = useFindReservaByCodigo(codigo);
  const [formattedDate, setFormattedDate] = useState<string>("");

  useEffect(() => {
    if (reserva?.voo?.data) {
      const data = new Date(reserva.voo.data);
      setFormattedDate(data.toLocaleString("pt-BR", {
        dateStyle: "short",
        timeStyle: "short"
      }));
    }
  }, [reserva]);

  const isFlightWithin48Hours = (): boolean => {
    if (!reserva?.voo?.data) return false;
    const flightDate = new Date(reserva.voo.data);
    const now = new Date();
    const diffInHours = (flightDate.getTime() - now.getTime()) / (1000 * 60 * 60);
    return diffInHours <= 48 && diffInHours > 0;
  };

  if (isLoading) {
    return <div className="p-5 text-center">Carregando reserva...</div>;
  }

  if (isError || !reserva || isNaN(codigo)) {
    toast.error("Erro ao buscar dados da reserva. Tente novamente.");
    router.replace("/cliente-landing-page");
    return <div className="p-5 text-center text-red-600">Erro ao carregar dados da reserva.</div>;
  }

  return (
    <div>
      <Header />
      <HeaderBanner text="Verifique sua reserva aqui" />

      <div className="flex justify-center -mt-20 md:-mt-24 px-4">
        <div className="p-6 bg-white shadow-xl flex flex-col gap-5 w-full max-w-3xl rounded-md font-pathway">
          <div className="flex flex-col md:flex-row justify-between gap-6 text-3xl">
            <p><span className="font-semibold">Código da Reserva:</span> {reserva.codigo}</p>
            <p><span className="font-semibold">Status:</span> {reserva.estado}</p>
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-6 text-3xl">
            <p><span className="font-semibold">Data/Hora de Embarque:</span> {formattedDate}</p>
            <p><span className="font-semibold">Valor:</span> R${reserva.valor}</p>
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-6 text-3xl">
            <p><span className="font-semibold">Origem:</span> {reserva.voo?.aeroporto_origem?.cidade}</p>
            <p><span className="font-semibold">Destino:</span> {reserva.voo?.aeroporto_destino?.cidade}</p>
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-6 text-3xl">
            <p><span className="font-semibold">Milhas:</span> {reserva.milhas_utilizadas}</p>
          </div>

          <div className="flex flex-row justify-center gap-6">
            {isFlightWithin48Hours() && reserva.estado === "CRIADA" && (
              <button
                onClick={() => alert("Check-in realizado com sucesso!")}
                className="px-6 py-2 bg-green-500 text-white text-2xl rounded-md hover:bg-green-700 transition-all"
              >
                Fazer Check-in
              </button>
            )}

            {!['CANCELADA', 'CANCELADA VOO', 'REALIZADA', 'NÃO REALIZADA'].includes(reserva.estado) && (
              <CancelReservationButton reservationCode={reserva.codigo} telaAtual={true} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function InfoReservationPage() {
  return (
    <Suspense fallback={<div>Carregando reserva...</div>}>
      <InfoReservationContent />
    </Suspense>
  );
}