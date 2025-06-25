import React, { useState } from 'react';

interface MilesReservationProps {
  availableMiles: number;
  maxMilesAllowed: number;
  onReserve: (miles: number) => void;
}

function MilesReservation({ availableMiles, maxMilesAllowed, onReserve }: MilesReservationProps) {
  const [milesToUse, setMilesToUse] = useState(0);

  const handleChange = (e: any) => {
    let value = parseInt(e.target.value, 10);
    if (isNaN(value)) value = 0;
    value = Math.max(0, Math.min(value, availableMiles, maxMilesAllowed));
    setMilesToUse(value);
  };

  const handleReserve = () => {
    onReserve(milesToUse);
  };

  return (
    <div>
      <h3>Use Miles for Reservation</h3>
      <p>You have <strong>{availableMiles}</strong> miles available.</p>
      <p>Maximum miles allowed for this reservation: <strong>{maxMilesAllowed}</strong></p>
      <input
        type="number"
        min="0"
        max={Math.min(availableMiles, maxMilesAllowed)}
        value={milesToUse}
        onChange={handleChange}
      />
      <button onClick={handleReserve} disabled={milesToUse === 0}>
        Reserve with {milesToUse} miles
      </button>
    </div>
  );
}

export default MilesReservation;