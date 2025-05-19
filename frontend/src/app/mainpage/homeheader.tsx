"use client";

import React, { useState } from "react";
import "../../../public/styles/header.css";

const HomeHeader = () => {
  return (
    <header className="header shadow-lg flex px-10 py-3 justify-between items-center text-[#D63000]">
      <img width="70vh" src="/images/airtads-logo.png" alt="AirTads Logo" />
      <div className="flex gap-2">
        <a href="/login">Entrar</a>
        <a href="/autocadastro">Criar conta</a>
      </div>
    </header>
  );
};

export default HomeHeader;
