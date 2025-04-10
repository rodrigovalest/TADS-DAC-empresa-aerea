'use client';
import React from 'react';

interface CancelReservationButtonProps {
  reservationCode: string;
}

const CancelReservationButton: React.FC<CancelReservationButtonProps> = ({ reservationCode }) => {
  const handleCancel = () => {
    // Simula o cancelamento de uma reserva
    alert(`Reserva ${reservationCode} cancelada com sucesso!`);
  };

  return (
    <button
      onClick={handleCancel}
      className="px-6 py-2 bg-red-500 text-white text-2xl rounded-md hover:bg-red-700 transition-all"
    >
      Cancelar Reserva
    </button>
  );
};

export default CancelReservationButton;
