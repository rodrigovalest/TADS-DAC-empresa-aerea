import React from "react";

const FlightBanner: React.FC = () => {
  return (
    <div
      className="w-full bg-cover bg-center h-48 flex items-center justify-center"
      style={{ backgroundImage: "url('/images/header-cliente-landing-page.png')" }}
    >
      <h1 className="text-white text-4xl font-bold drop-shadow-md">Próximos voos</h1>
    </div>
  );
};

export default FlightBanner;