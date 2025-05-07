"use client";

import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import IAutocadastroRequest from "@/models/requests/autocadastro-request";

const RegisterForm: React.FC<{
  onSubmit: SubmitHandler<IAutocadastroRequest>;
}> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<IAutocadastroRequest>();

  const cep = watch("endereco.cep");

  useEffect(() => {
    const fetchEndereco = async (cepValue: string) => {
      const onlyNumbersCep = cepValue.replace(/\D/g, "");
      if (onlyNumbersCep.length === 8) {
        try {
          const res = await fetch(
            `https://viacep.com.br/ws/${onlyNumbersCep}/json/`
          );
          const data = await res.json();

          if (!data.erro) {
            setValue("endereco.rua", data.logradouro || "");
            setValue("endereco.complemento", data.complemento || "");
            setValue("endereco.cidade", data.localidade || "");
            setValue("endereco.uf", data.uf || "");
          }
        } catch (err) {
          console.error("Erro ao buscar endereço no ViaCEP:", err);
        }
      }
    };

    if (cep) {
      fetchEndereco(cep);
    }
  }, [cep, setValue]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 pb-2 w-full max-w-md"
    >
      <h2 className="text-3xl font-medium mb-4 text-center text-white">
        Autocadastro
      </h2>

      <div className="mb-2">
        <label htmlFor="cpf" className="block font-light text-white pb-2">
          CPF
        </label>
        <input
          type="text"
          id="cpf"
          {...register("cpf", { required: "CPF is required" })}
          className="w-full p-2 rounded bg-gray-100 border-0 text-gray-800 focus:outline-none"
          autoComplete="off"
        />
        {errors.cpf && <p className="text-red-800">{errors.cpf.message}</p>}
      </div>

      <div className="mb-2">
        <label htmlFor="nome" className="block font-light text-white pb-2">
          Nome
        </label>
        <input
          type="text"
          id="nome"
          {...register("nome", { required: "Name is required" })}
          className="w-full p-2 rounded bg-gray-100 border-0 text-gray-800 focus:outline-none"
          autoComplete="off"
        />
        {errors.nome && <p className="text-red-800">{errors.nome.message}</p>}
      </div>

      <div className="mb-2">
        <label htmlFor="email" className="block font-light text-white pb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          {...register("email", { required: "Email is required" })}
          className="w-full p-2 rounded bg-gray-100 border-0 text-gray-800 focus:outline-none"
          autoComplete="off"
        />
        {errors.email && <p className="text-red-800">{errors.email.message}</p>}
      </div>

      <div className="mb-2">
        <label htmlFor="usuario" className="block font-light text-white pb-2">
          Usuário
        </label>
        <input
          type="text"
          id="usuario"
          {...register("usuario", { required: "Usuário é obrigatório" })}
          className="w-full p-2 rounded bg-gray-100 border-0 text-gray-800 focus:outline-none"
          autoComplete="off"
        />
        {errors.usuario && (
          <p className="text-red-800">{errors.usuario.message}</p>
        )}
      </div>

      <div className="mb-2">
        <label
          htmlFor="endereco.cep"
          className="block font-light text-white pb-2"
        >
          CEP
        </label>
        <input
          type="text"
          id="endereco.cep"
          {...register("endereco.cep", { required: "CEP é obrigatório" })}
          className="w-full p-2 rounded bg-gray-100 border-0 text-gray-800 focus:outline-none"
        />
        {errors.endereco?.cep && (
          <p className="text-red-800">{errors.endereco.cep.message}</p>
        )}
      </div>

      <div className="mb-2">
        <label
          htmlFor="endereco.uf"
          className="block font-light text-white pb-2"
        >
          UF
        </label>
        <input
          type="text"
          id="endereco.uf"
          {...register("endereco.uf", { required: "UF é obrigatório" })}
          className="w-full p-2 rounded bg-gray-100 border-0 text-gray-800 focus:outline-none"
        />
        {errors.endereco?.uf && (
          <p className="text-red-800">{errors.endereco.uf.message}</p>
        )}
      </div>

      <div className="mb-2">
        <label
          htmlFor="endereco.cidade"
          className="block font-light text-white pb-2"
        >
          Cidade
        </label>
        <input
          type="text"
          id="endereco.cidade"
          {...register("endereco.cidade", { required: "Cidade é obrigatória" })}
          className="w-full p-2 rounded bg-gray-100 border-0 text-gray-800 focus:outline-none"
        />
        {errors.endereco?.cidade && (
          <p className="text-red-800">{errors.endereco.cidade.message}</p>
        )}
      </div>

      <div className="mb-2">
        <label
          htmlFor="endereco.rua"
          className="block font-light text-white pb-2"
        >
          Rua
        </label>
        <input
          type="text"
          id="endereco.rua"
          {...register("endereco.rua", { required: "Rua é obrigatória" })}
          className="w-full p-2 rounded bg-gray-100 border-0 text-gray-800 focus:outline-none"
        />
        {errors.endereco?.rua && (
          <p className="text-red-800">{errors.endereco.rua.message}</p>
        )}
      </div>

      <div className="mb-2">
        <label
          htmlFor="endereco.numero"
          className="block font-light text-white pb-2"
        >
          Número
        </label>
        <input
          type="text"
          id="endereco.numero"
          {...register("endereco.numero", { required: "Número é obrigatório" })}
          className="w-full p-2 rounded bg-gray-100 border-0 text-gray-800 focus:outline-none"
        />
        {errors.endereco?.numero && (
          <p className="text-red-800">{errors.endereco.numero.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="endereco.complemento"
          className="block font-light text-white pb-2"
        >
          Complemento
        </label>
        <input
          type="text"
          id="endereco.complemento"
          {...register("endereco.complemento")}
          className="w-full p-2 rounded bg-gray-100 border-0 text-gray-800 focus:outline-none"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-amber-800 text-white py-2 rounded font-pathway"
      >
        Registrar
      </button>
    </form>
  );
};

export default RegisterForm;
