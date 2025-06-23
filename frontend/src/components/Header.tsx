"use client";
import Link from "next/link";
import { useState } from "react";
import BuyMilesDialog from "./BuyMilesDialog";
import { useMilhas } from "@/hooks/useMilhas";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPointsModalOpen, setIsPointsModalOpen] = useState(false);
  const { saldoMilhas, loading, error, comprarMilhas, recarregarSaldo } = useMilhas();

  const openPointsModal = () => setIsPointsModalOpen(true);
  const closePointsModal = () => setIsPointsModalOpen(false);
  
  const handleSubmit = async (amount: number) => {
    const success = await comprarMilhas(amount);
    if (success) {
      await recarregarSaldo();
    } else {
      console.error("[Header] Erro ao comprar milhas:", error);
    }
  };
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    
  return (
    <div className="fixed flex min-w-[100%] bg-[#00000080] flex-row justify-between items-center p-4">
      <img
        src="/icons/icon-menu.png"
        alt="menu"
        onClick={toggleMenu}
        className="cursor-pointer"
      />
      <nav
        className={`fixed top-0 left-0 h-full w-64 bg-black text-white p-4 transition-all transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <img
          src="/icons/icon-menu.png"
          alt="close menu"
          onClick={toggleMenu}
          className="cursor-pointer absolute top-4 right-4"
        />
        <ul className="space-y-4 pt-10">
          <li>
            <Link href="/cliente-landing-page">Home</Link>
          </li>
          <li>
            <Link href="/new-trip">Nova reserva</Link>
          </li>
          <li>
            <Link href="/mileage-history">Extrato de milhas</Link>
          </li>
          <li>
            <Link href="/search-reservation">Minhas reservas</Link>
          </li>
          <li>
            <Link href="/check-in">Check-in</Link>
          </li>
        </ul>
        <ul className="absolute bottom-4 left-4 space-y-4">
          <li>
            <Link href="/logout">Sair</Link>
          </li>
        </ul>
      </nav>
      <h2 className="text-white cursor-pointer" onClick={openPointsModal}>
        {loading ? "Carregando..." : `Milhas: ${saldoMilhas.toLocaleString()} pts`}
      </h2>
      <BuyMilesDialog
        isOpen={isPointsModalOpen}
        onClose={closePointsModal}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
