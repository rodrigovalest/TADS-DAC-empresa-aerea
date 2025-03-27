import React from 'react';
import '../../app/globals.css';
import TravelCardRecord from '@/components/TravelCardRecord';

const ClienteLandingPage: React.FC = () => {
  return (
    <div>
        <div className="flex items-center justify-center p-8 text-center bg-cover min-h-100"
            style={{ backgroundImage: "url('/images/header-cliente-landing-page.png')", 
                fontFamily: 'Pathway Gothic One, sans-serif' }}>
        <h2 className="text-white text-[64px]">
            Verifique seu histórico de viagens aqui
        </h2>
        </div>
        <div className="rounded-3xl border-3 w-[85vw] border-black mx-auto -mt-12 bg-white">
            {Array.from({ length: 5 }).map((_, index) => (
                <TravelCardRecord key={index} />
            ))}
        </div>
    </div>
  );
};

export default ClienteLandingPage;