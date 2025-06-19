"use client";

import React from "react";
import RegisterForm from "./register-form";
import IAutocadastroRequest from "@/models/requests/autocadastro-request";
import clienteService from "@/services/cliente-service";
import IAutocadastroResponse from "@/models/response/autocadastro-response";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Link from "next/link";

const RegisterPage: React.FC = () => {
  const handleRegister = (data: IAutocadastroRequest) => {
    clienteService
      .autocadastro(data)
      .then((response: IAutocadastroResponse) => {
        console.log("Autocadastro success:", response);
        window.location.href = "/login";
      })
      .catch((error) => {
        console.error("Autocadastro error:", error);
        alert("Erro ao realizar cadastro. Tente novamente.");
      });
  };

  return (
    <div className="flex w-full min-h-screen bg-gray-200">
     <Link href="/">
      <a
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          zIndex: 9999,
          cursor: 'pointer',
          color: 'white',
          fontSize: '24px',
          display: 'inline-flex',
          alignItems: 'center',
          textDecoration: 'none',
        }}
        aria-label="Voltar para home"
      >
        <FontAwesomeIcon icon={faArrowLeft} size="lg" />
      </a>
    </Link>
      <div className="flex w-1/2 flex-col min-h-screen  bg-orange-500">
     
        <div className="flex justify-center items-start">
          <RegisterForm onSubmit={handleRegister} />
        </div>
        <div className="text-white w-full flex justify-center pb-2">
          Já possui cadastro?{" "}
          <a className="pl-2 font-bold" href="/login">
            {" "}
            Clique aqui
          </a>
        </div>
      </div>
      <div
        className="w-1/2 bg-amber-400 bg-cover bg-center"
        style={{ backgroundImage: "url(/images/card-register-page.png)" }}
      ></div>
    </div>
  );
};

export default RegisterPage;