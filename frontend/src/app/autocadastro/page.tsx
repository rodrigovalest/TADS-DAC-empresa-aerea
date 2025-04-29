"use client";

import React from "react";
import RegisterForm from "./register-form";
import IAutocadastroRequest from "@/models/requests/autocadastro-request";
import clienteService from "@/services/cliente-service";
import IAutocadastroResponse from "@/models/response/autocadastro-response";

const RegisterPage: React.FC = () => {
  const handleRegister = (data: IAutocadastroRequest) => {
    clienteService.autocadastro(data)
      .then((response: IAutocadastroResponse) => {
        console.log("Autocadastro success:", response);
      })
      .catch((error) => {
        console.error("Autocadastro error:", error);
        alert(error);
      });
  };

  return (
    <div className="flex justify-between w-full h-screen items-center bg-gray-200">
      <div className="flex justify-center items-center w-1/2 h-full bg-orange-500">
				<RegisterForm onSubmit={handleRegister} />
			</div>

      <div className="w-1/2 h-full bg-amber-400 bg-cover bg-center" style={{ backgroundImage: 'url(/images/card-register-page.png)' }}>
      </div>
    </div>
  );
};

export default RegisterPage;
