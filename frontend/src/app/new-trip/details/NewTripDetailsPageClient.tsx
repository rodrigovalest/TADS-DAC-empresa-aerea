"use client";

import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import HeaderBanner from '@/components/HeaderBanner';

const NewTripDetailsPageClient = () => {
  const searchParams = useSearchParams();

  const id = searchParams.get('id');
  const date = searchParams.get('date');
  const time = searchParams.get('time');
  const origin = searchParams.get('origin');
  const destination = searchParams.get('destination');
  const value = searchParams.get('value');
  const miles = searchParams.get('miles');
  const status = searchParams.get('status');

  return (
    <div className="mb-10">
      <Header />
      <HeaderBanner htmlContent="Confira os <span class='text-[#FF3D00] font-bold'>detalhes</span> da sua viagem!" />
      <div className="p-5 rounded-3xl border-2 w-[85vw] border-black mx-auto mt-12 bg-white">
        <h1 className="text-xl font-bold mb-4">Detalhes da Viagem</h1>
        <ul className="space-y-2">
          <li><strong>ID:</strong> {id}</li>
          <li><strong>Data:</strong> {date}</li>
          <li><strong>Hora:</strong> {time}</li>
          <li><strong>Origem:</strong> {origin}</li>
          <li><strong>Destino:</strong> {destination}</li>
          <li><strong>Valor:</strong> R$ {value}</li>
          <li><strong>Milhas:</strong> {miles}</li>
          <li><strong>Status:</strong> {status}</li>
        </ul>
      </div>
    </div>
  );
};

export default NewTripDetailsPageClient;
