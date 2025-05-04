"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import IAutocadastroRequest from "@/models/requests/autocadastro-request";

const RegisterForm: React.FC<{ onSubmit: SubmitHandler<IAutocadastroRequest> }> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAutocadastroRequest>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 pb-2 w-full max-w-md">
      <h2 className="text-3xl font-medium mb-4 text-center text-white">Autocadastro</h2>

      <div className="mb-2">
        <label htmlFor="cpf" className="block font-light text-white pb-2">CPF</label>
        <input
          type="text"
          id="cpf"
          {...register("cpf", { required: "CPF is required" })}
          className="w-full p-2 rounded bg-gray-100 border-0 text-gray-800 focus:outline-none"
          autoComplete="off"
        />
        {errors.cpf && <p className="text-red-500">{errors.cpf.message}</p>}
      </div>

      <div className="mb-2">
        <label htmlFor="nome" className="block font-light text-white pb-2">Nome</label>
        <input
          type="text"
          id="nome"
          {...register("nome", { required: "Name is required" })}
          className="w-full p-2 rounded bg-gray-100 border-0 text-gray-800 focus:outline-none"
          autoComplete="off"
        />
        {errors.nome && <p className="text-red-500">{errors.nome.message}</p>}
      </div>

      <div className="mb-2">
        <label htmlFor="email" className="block font-light text-white pb-2">Email</label>
        <input
          type="email"
          id="email"
          {...register("email", { required: "Email is required" })}
          className="w-full p-2 rounded bg-gray-100 border-0 text-gray-800 focus:outline-none"
          autoComplete="off"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      <div className="mb-2">
        <label htmlFor="usuario" className="block font-light text-white pb-2">Usuário</label>
        <input
          type="text"
          id="usuario"
          {...register("usuario", { required: "Usuário é obrigatório" })}
          className="w-full p-2 rounded bg-gray-100 border-0 text-gray-800 focus:outline-none"
          autoComplete="off"
        />
        {errors.usuario && <p className="text-red-500">{errors.usuario.message}</p>}
      </div>

      <div className="mb-2">
        <label htmlFor="endereco.cep" className="block font-light text-white pb-2">CEP</label>
        <input
          type="text"
          id="endereco.cep"
          {...register("endereco.cep", { required: "CEP é obrigatório" })}
          className="w-full p-2 rounded bg-gray-100 border-0 text-gray-800 focus:outline-none"
        />
        {errors.endereco?.cep && <p className="text-red-500">{errors.endereco.cep.message}</p>}
      </div>

      <div className="mb-2">
        <label htmlFor="endereco.uf" className="block font-light text-white pb-2">UF</label>
        <input
          type="text"
          id="endereco.uf"
          {...register("endereco.uf", { required: "UF é obrigatório" })}
          className="w-full p-2 rounded bg-gray-100 border-0 text-gray-800 focus:outline-none"
        />
        {errors.endereco?.uf && <p className="text-red-500">{errors.endereco.uf.message}</p>}
      </div>

      <div className="mb-2">
        <label htmlFor="endereco.cidade" className="block font-light text-white pb-2">Cidade</label>
        <input
          type="text"
          id="endereco.cidade"
          {...register("endereco.cidade", { required: "Cidade é obrigatória" })}
          className="w-full p-2 rounded bg-gray-100 border-0 text-gray-800 focus:outline-none"
        />
        {errors.endereco?.cidade && <p className="text-red-500">{errors.endereco.cidade.message}</p>}
      </div>

      <div className="mb-2">
        <label htmlFor="endereco.bairro" className="block font-light text-white pb-2">Bairro</label>
        <input
          type="text"
          id="endereco.bairro"
          {...register("endereco.bairro", { required: "Bairro é obrigatório" })}
          className="w-full p-2 rounded bg-gray-100 border-0 text-gray-800 focus:outline-none"
        />
        {errors.endereco?.bairro && <p className="text-red-500">{errors.endereco.bairro.message}</p>}
      </div>

      <div className="mb-2">
        <label htmlFor="endereco.rua" className="block font-light text-white pb-2">Rua</label>
        <input
          type="text"
          id="endereco.rua"
          {...register("endereco.rua", { required: "Rua é obrigatória" })}
          className="w-full p-2 rounded bg-gray-100 border-0 text-gray-800 focus:outline-none"
        />
        {errors.endereco?.rua && <p className="text-red-500">{errors.endereco.rua.message}</p>}
      </div>

      <div className="mb-2">
        <label htmlFor="endereco.numero" className="block font-light text-white pb-2">Número</label>
        <input
          type="text"
          id="endereco.numero"
          {...register("endereco.numero", { required: "Número é obrigatório" })}
          className="w-full p-2 rounded bg-gray-100 border-0 text-gray-800 focus:outline-none"
        />
        {errors.endereco?.numero && <p className="text-red-500">{errors.endereco.numero.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="endereco.complemento" className="block font-light text-white pb-2">Complemento</label>
        <input
          type="text"
          id="endereco.complemento"
          {...register("endereco.complemento")}
          className="w-full p-2 rounded bg-gray-100 border-0 text-gray-800 focus:outline-none"
        />
      </div>

      <button type="submit" className="w-full bg-amber-800 text-white py-2 rounded font-pathway">
        Registrar
      </button>
    </form>
  );
};

export default RegisterForm;
