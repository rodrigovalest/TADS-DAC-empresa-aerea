'use client';

import React from 'react';
import '../../app/globals.css';
import TravelCardRecord from '@/components/TravelCardRecord';
import Header from '@/components/Header';
import HeaderBanner from '@/components/HeaderBanner';
import useFindReservasByUser from '@/hooks/useFindReservasByUser';

const CheckinPage: React.FC = () => {
  const { data: reservas, isLoading, isError } = useFindReservasByUser();

  const filtrarVoosProximas48h = (reservas: any[]) => {
    const agora = new Date();
    const em48h = new Date(agora.getTime() + (48 * 60 * 60 * 1000)); 

    return reservas.filter(reserva => {
      const dataVoo = new Date(reserva.voo.data);
      return dataVoo >= agora && dataVoo <= em48h;
    });
  };

  const reservasFiltradasPor48h = reservas ? filtrarVoosProximas48h(reservas) : [];

  return (
    <div>
      <Header />
      <HeaderBanner text="Seus voos nas próximas 48 horas" />
      <div className="rounded-3xl border-3 w-[85vw] border-black mx-auto -mt-12 bg-white p-4">
        {isLoading && <p className="text-center">Carregando reservas...</p>}
        {isError && <p className="text-center text-red-600">Erro ao carregar reservas.</p>}
        {!isLoading && !isError && reservasFiltradasPor48h.length === 0 && (
          <p className="text-center">Nenhum voo encontrado nas próximas 48 horas.</p>
        )}
        {reservasFiltradasPor48h &&
          reservasFiltradasPor48h
            .slice()
            .sort((a, b) => new Date(a.voo.data).getTime() - new Date(b.voo.data).getTime()) 
            .map((reserva) => (
              <TravelCardRecord key={reserva.codigo} reserva={reserva} />
            ))
        }
      </div>
    </div>
  );
};

export default CheckinPage;
