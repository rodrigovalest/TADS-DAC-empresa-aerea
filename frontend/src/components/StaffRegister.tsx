"use client";

import React, { useEffect, useState } from "react";
import { TextField, Button } from "@mui/material";
import IFuncionarioResponse from "@/models/response/funcionario-response";
import IInserirFuncionarioRequest from "@/models/requests/inserir-funcionario-request";
import IAtualizarFuncionarioRequest from "@/models/requests/atualizar-funcionario-request";

interface StaffRegisterProps {
  onAddEmployee: (employee: IInserirFuncionarioRequest) => void;
  onEditEmployee: (employee: IAtualizarFuncionarioRequest) => void;
  initialData?: IFuncionarioResponse | null;
}

type FormDataType = {
  codigo?: number;
  cpf: string;
  nome: string;
  email: string;
  telefone: string;
  senha?: string;
};

const StaffRegister: React.FC<StaffRegisterProps> = ({
  onAddEmployee,
  onEditEmployee,
  initialData,
}) => {
  const [formData, setFormData] = useState<FormDataType>({
    cpf: "",
    nome: "",
    email: "",
    telefone: "",
    senha: "",
  });

  const [errorCPF, setErrorCPF] = useState(false);
  const [helperTextCPF, setHelperTextCPF] = useState("");

  useEffect(() => {
    if (initialData) {
      setFormData({
        codigo: initialData.codigo,
        cpf: initialData.cpf,
        nome: initialData.nome,
        email: initialData.email,
        telefone: initialData.telefone,
        senha: "",
      });
    } else {
      setFormData({
        cpf: "",
        nome: "",
        email: "",
        telefone: "",
        senha: "",
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const normalizedValue =
      name === "cpf" || name === "telefone" ? value.replace(/\D/g, "") : value;

    setFormData((prev) => ({
      ...prev,
      [name]: normalizedValue,
    }));
  };

  const validateCPF = (cpf: string): boolean => cpf.length === 11;

  const handleCPFBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const trimmed = e.target.value.trim();
    setFormData((prev) => ({ ...prev, cpf: trimmed }));

    if (!initialData && !validateCPF(trimmed)) {
      setErrorCPF(true);
      setHelperTextCPF("O CPF deve ter 11 dígitos");
    } else {
      setErrorCPF(false);
      setHelperTextCPF("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!initialData && !validateCPF(formData.cpf)) {
      setErrorCPF(true);
      setHelperTextCPF("O CPF deve ter 11 dígitos");
      return;
    }

    setErrorCPF(false);
    setHelperTextCPF("");

    const dataToSubmit = { ...formData };

    if (initialData) {
      if (!dataToSubmit.senha) {
        delete dataToSubmit.senha;
      }

      const atualizacao: IAtualizarFuncionarioRequest = {
        codigo: dataToSubmit.codigo!,
        cpf: dataToSubmit.cpf,
        nome: dataToSubmit.nome,
        email: dataToSubmit.email,
        telefone: dataToSubmit.telefone,
        senha: dataToSubmit.senha,
      };

      onEditEmployee(atualizacao);
    } else {
      const insercao: IInserirFuncionarioRequest = {
        cpf: dataToSubmit.cpf,
        nome: dataToSubmit.nome,
        email: dataToSubmit.email,
        telefone: dataToSubmit.telefone,
        senha: dataToSubmit.senha!,
      };

      onAddEmployee(insercao);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-black flex justify-center items-center">
        <img
          className="w-full h-full object-cover object-top"
          src="images/airportstaffs.jpeg"
          alt="Imagem de funcionários do aeroporto"
        />
      </div>
      <div className="w-1/2 flex justify-center items-center p-8 flex-col">
        <div className="text-[#FF3D00] text-3xl font-semibold mb-4">
          {initialData ? "Editar Funcionário" : "Registrar Novo Funcionário"}
        </div>
        <form
          className="flex flex-col gap-4 w-full max-w-md"
          onSubmit={handleSubmit}
        >
          <TextField
            label="CPF"
            name="cpf"
            type="text"
            variant="outlined"
            value={formData.cpf}
            onChange={handleChange}
            onBlur={handleCPFBlur}
            error={errorCPF}
            helperText={helperTextCPF}
            fullWidth
            required
            disabled={!!initialData}
            inputProps={{
              maxLength: 11,
              pattern: "[0-9]*",
            }}
          />
          <TextField
            label="Nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Telefone"
            name="telefone"
            type="tel"
            value={formData.telefone}
            onChange={handleChange}
            fullWidth
            required
            inputProps={{
              pattern: "[0-9]*",
            }}
          />
          <Button
            variant="contained"
            className="bg-[#FF3D00] hover:bg-[#D63000]"
            type="submit"
            fullWidth
          >
            {initialData ? "Salvar Alterações" : "Registrar"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default StaffRegister;
