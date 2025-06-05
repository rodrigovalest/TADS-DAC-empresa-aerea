"use client";

import Cookies from "js-cookie";
import React, { useState } from "react";
import "../../../public/styles/login.css";
import { useForm } from "react-hook-form";
import authService from "@/services/auth-service";
import ILoginRequest from "@/models/requests/login-request";
import ILoginResponse from "@/models/response/login-response";
import { TextField, Button } from "@mui/material";

const Login = () => {

  const [isFormInvalid, setFormInvalid] = useState(false);
  const { register, handleSubmit } = useForm<ILoginRequest>();
  const [errorMessage, setErrorMessage] = React.useState("");

  const onSubmit = (data: ILoginRequest) => {
    authService
      .login(data)
      .then((res: ILoginResponse) => {
        console.log("login success:", res);

        Cookies.set("token", res.access_token);
        Cookies.set("role", res.tipo);

        if (res.tipo === "FUNCIONARIO") window.location.href = "/employee";
        else if (res.tipo === "CLIENTE")
          window.location.href = "/cliente-landing-page";
      })
      .catch((err) => {
        setFormInvalid(true);
        setErrorMessage("Usuário ou senha incorretos");
        console.error("Erro ao fazer login:", err);
      });
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-black flex justify-center items-center">
        <img
          className="w-full h-full object-cover"
          src="images/loginImg.png"
          alt="Imagem de voo"
        />
      </div>

      <div className="w-1/2 flex justify-center items-center p-8 flex-col">
        <div className="text-[#FF3D00] text-3xl font-semibold">Entrar</div>
        <div className="w-full max-w-md bg-white  rounded-lg p-6">
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              error={isFormInvalid}
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              required
              {...register("login")}
            />
            <TextField
              error={isFormInvalid}
              label="Senha"
              type="password"
              variant="outlined"
              helperText={errorMessage}
              fullWidth
              required
              {...register("senha")}
            />
            <div>
              É novo por aqui?{" "}
              <a className="pl-2 font-bold" href="/autocadastro">
                Clique aqui
              </a>
            </div>
            <Button
              variant="contained"
              className="bg-[#FF3D00] hover:bg-[#D63000]"
              type="submit"
              fullWidth
            >
              Entrar
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;