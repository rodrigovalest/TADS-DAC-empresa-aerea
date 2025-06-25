'use client';

import React from 'react';
import Link from 'next/link';
import CancelReservationButton from './CancelReservationButton';
import IListarReservaResponse from '@/models/response/listar-reservas.response';

interface TravelCardRecordProps {
  reserva: IListarReservaResponse;
}

const TravelCardRecord: React.FC<TravelCardRecordProps> = ({ reserva }) => {
  const dataObj = new Date(reserva.voo.data);
  const dataFormatada = dataObj.toLocaleDateString('pt-BR');
  const horario = dataObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  return (
    <div
      className="rounded-md px-8 pt-6 pb-8 m-4 bg-[#D9D9D9]"
      style={{ fontFamily: 'Pathway Gothic One, sans-serif' }}
    >
      <div className="flex text-[32px]">
        <div className="flex flex-4/5 pr-15 flex-row">
          <div className="flex min-w-[100%] flex-col justify-between">
            <div className="flex justify-between">
              <div>
                <p>
                  <span className="font-semibold">Data: </span>
                  {dataFormatada}
                </p>
              </div>
              <div>
                <p>
                  <span className="font-semibold">Horário: </span>
                  {horario}
                </p>
              </div>              
            </div>
            <div className="flex justify-between">
              <p>
                <span className="font-semibold">Origem: </span>
                {reserva.voo.aeroporto_origem.cidade}
              </p>
              <p>
                <span className="font-semibold">→</span>
              </p>
              <p>
                <span className="font-semibold">Destino: </span>
                {reserva.voo.aeroporto_destino.cidade}
              </p>
            </div>

            <div>
              <p>
                <span className="font-semibold">Estado: </span>
                {reserva.estado}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-1/5 justify-center items-center">
          <div className="flex flex-col gap-2">
            <Link
              href={`/info-reservation?codigo=${reserva.codigo}`}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-center"
            >
              Ver Detalhes
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelCardRecord;
