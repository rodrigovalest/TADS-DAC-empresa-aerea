'use client';
import React from 'react';
import '../app/globals.css';
import Link from "next/link";
import CancelReservationButton from './CancelReservationButton';



const TravelCardRecord: React.FC = () => {
    const handleCheckIn = () => {
        alert("Check-in realizado com sucesso!");
      };
    return (
    <div className="rounded-md px-8 pt-6 pb-8 m-4 bg-[#D9D9D9]"
      style={{ fontFamily: 'Pathway Gothic One, sans-serif' }}>
        <div className="flex text-[32px]">
            <div className="flex flex-4/5 pr-15 flex-row">
                <div className="flex min-w-[100%] flex-col justify-between">
                    <div className="flex justify-between">
                        <div>
                            <p>
                                <span className="font-semibold">Data: </span>05/12/2025
                            </p>
                        </div>
                        <div>
                            <p>
                                <span className="font-semibold">Horário: </span>22:00
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <p>
                            <span className="font-semibold">Origem: </span>São Paulo
                        </p>
                        <p>
                            <span className="font-semibold">→</span>
                        </p>
                        <p>
                            <span className="font-semibold">Destino: </span>Rio de Janeiro
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex flex-1/5 justify-center">
                <div className="flex flex-col">
                <Link href="/info-reservation" className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-[15] hover:bg-blue-700 hover:cursor-pointer transition">
                <button >
                    Ver Detalhes
                </button>
                </Link>
                    <CancelReservationButton reservationCode="" telaAtual={false}/>
                    
                </div>
            </div>
        </div>
    </div>
  );
};

export default TravelCardRecord;