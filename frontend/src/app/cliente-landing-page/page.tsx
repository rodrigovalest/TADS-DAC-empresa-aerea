import React from 'react';
import '../../app/globals.css';
import TravelCardRecord from '@/components/TravelCardRecord';
import Header from "../../components/Header"
import HeaderBanner from '@/components/HeaderBanner';

const ClienteLandingPage: React.FC = () => {
  return (
    <div>
        <Header/>
        <HeaderBanner text="Verifique seu histórico de viagens aqui" />
        <div className="rounded-3xl border-3 w-[85vw] border-black mx-auto -mt-12 bg-white">
            {Array.from({ length: 5 }).map((_, index) => (
                <TravelCardRecord key={index} />
            ))}
        </div>
    </div>
  );
};

export default ClienteLandingPage;