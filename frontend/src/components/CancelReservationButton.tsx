'use client';

import React from 'react';

interface CancelReservationButtonProps {
  reservationCode: string;
  telaAtual:boolean;
}

const CancelReservationButton: React.FC<CancelReservationButtonProps> = ({ reservationCode, telaAtual}) => {
  const handleCancel = () => {
    alert(`Reserva ${reservationCode} cancelada com sucesso!`);
    window.location.href = "/cliente-landing-page"
  };

  return (
    <button
      onClick={handleCancel}
      className={telaAtual?
        "px-6 py-2 bg-red-500 text-white text-2xl rounded-md hover:bg-red-700 transition-all"
        :
        "my-2 hover:bg-[rgba(255,61,0,0.54)] bg-[#FF3D00] text-white py-0.5 px-5 rounded-[15] hover:cursor-pointer"
      }>
      Cancelar Reserva
    </button>
  );
};

export default CancelReservationButton;
