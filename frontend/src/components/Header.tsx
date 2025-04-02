"use client";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
            <Link href="/mileage-history">Milhas</Link>
          </li>
          <li>
            <Link href="/cliente-landing-page">Voos</Link>
          </li>
          <li>
            <Link href="/cliente-landing-page">Minhas reservas</Link>
          </li>
          <li>
            <Link href="/cliente-landing-page">Check-In</Link>
          </li>
        </ul>
        <ul className="absolute bottom-4 left-4 space-y-4">
          <li>
            <Link href="/cliente-landing-page">Sair</Link>
          </li>
        </ul>
      </nav>
      <h2 className="text-white">1200 pts</h2>
    </div>
  );
}
