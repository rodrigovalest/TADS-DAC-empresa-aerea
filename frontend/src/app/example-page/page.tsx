"use client";
import React, { useState } from "react";
import BuyMilesDialog from "@/components/BuyMilesDialog";

const ExamplePage: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Função chamada ao confirmar a compra de milhas
  const handleBuyMiles = (amount: number) => {
    alert(`Você comprou ${amount} milhas!`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* Botão para abrir o diálogo */}
      <button
        className="px-4 py-2 bg-orange-500 text-white rounded-md"
        onClick={() => setIsDialogOpen(true)}
      >
        Abrir Formulário
      </button>

      {/* Componente de diálogo para comprar milhas */}
      <BuyMilesDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleBuyMiles}
      />
    </div>
  );
};

export default ExamplePage;
