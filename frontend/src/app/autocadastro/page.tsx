"use client";

import React from "react";
import RegisterForm from "./register-form";
import { IRegister } from "../interfaces/register";

const RegisterPage: React.FC = () => {
  const handleRegister = (data: IRegister) => {
    console.log("Form Data:", data);
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
