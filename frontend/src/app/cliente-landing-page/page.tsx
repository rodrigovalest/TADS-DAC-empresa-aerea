'use client';

import React from 'react';
import '../../app/globals.css';
import TravelCardRecord from '@/components/TravelCardRecord';
import Header from '@/components/Header';
import HeaderBanner from '@/components/HeaderBanner';
import useFindReservasByUser from '@/hooks/useFindReservasByUser';

const ClienteLandingPage: React.FC = () => {
  const { data: reservas, isLoading, isError } = useFindReservasByUser();

  return (
    <div>
      <Header />
      <HeaderBanner text="Verifique seu histórico de viagens aqui" />
      <div className="rounded-3xl border-3 w-[85vw] border-black mx-auto -mt-12 bg-white p-4">
        {isLoading && <p className="text-center">Carregando reservas...</p>}
        {isError && <p className="text-center text-red-600">Erro ao carregar reservas.</p>}
        {reservas?.length === 0 && <p className="text-center">Nenhuma reserva encontrada.</p>}
        {reservas?.map((reserva) => (
          <TravelCardRecord key={reserva.codigo} reserva={reserva} />
        ))}
      </div>
    </div>
  );
};

export default ClienteLandingPage;
