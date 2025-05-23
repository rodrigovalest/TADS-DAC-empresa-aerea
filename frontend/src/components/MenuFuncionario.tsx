"use client";
import Link from "next/link";
import { useState } from "react";
import BuyMilesDialog from "./BuyMilesDialog";

export default function MenuFuncionario () {
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
            <Link href="/employee">Home</Link>
          </li>
          <li>
            <Link href="/lista-funcionarios">Funcionarios</Link>
          </li>
          <li>
            <Link href="/voo">Cadastrar Voo</Link>
          </li>
        </ul>
        <ul className="absolute bottom-4 left-4 space-y-4">
          <li>
            <Link href="/logout">Sair</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
