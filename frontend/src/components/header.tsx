"use client";
import Link from "next/link";
import { useState } from "react";
import BuyMilesDialog from "./BuyMilesDialog";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPointsModalOpen, setIsPointsModalOpen] = useState(false);
  const openPointsModal = () => setIsPointsModalOpen(true);
  const closePointsModal = () => setIsPointsModalOpen(false);
  const handleSubmit = (amount: number) =>{}
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
            <a href="/cliente-landing-page">Home</a>
          </li>
          <li>
            <a href="/new-trip">Nova reserva</a>
          </li>
          <li>
            <Link href="/mileage-history">Extrato de milhas</Link>
            <a href="/mileage-history">Milhas</a>
          </li>
          <li>
            <a href="/cliente-landing-page">Voos</a>
          </li>
          <li>
            <a href="/cliente-landing-page">Minhas reservas</a>
          </li>
          <li>
            <a href="/search-reservation">Procurar reserva</a>
          </li>
          <li>
            <a href="/cliente-landing-page">Check-in</a>
          </li>
        </ul>
        <ul className="absolute bottom-4 left-4 space-y-4">
          <li>
            <a href="/cliente-landing-page">Sair</a>
          </li>
        </ul>
      </nav>
      <h2 className="text-white cursor-pointer"
          onClick={openPointsModal} >1200 pts</h2>
          <BuyMilesDialog isOpen={isPointsModalOpen} onClose={closePointsModal} onSubmit={handleSubmit}/>
    </div>
    
  );
}
