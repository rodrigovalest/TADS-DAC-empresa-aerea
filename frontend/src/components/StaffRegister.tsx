"use client";

import React, { useEffect, useState } from "react";
import { TextField, Button } from "@mui/material";
import Employee from "@/types/interfaces";

interface StaffRegisterProps {
  onAddEmployee: (employee: Employee) => void;
  initialData?: Employee | null;
}

const StaffRegister: React.FC<StaffRegisterProps> = ({ onAddEmployee, initialData }) => {
  const [formData, setFormData] = useState<Employee>({
    name: "",
    cpf: "",
    email: "",
    phone: "",
    password: "",
    user: "",
  });

  const [errorCPF, setErrorCPF] = useState(false);
  const [helperTextCPF, setHelperTextCPF] = useState("");

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: "",
        cpf: "",
        email: "",
        phone: "",
        password: "",
        user: "",
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "cpf" || name === "phone") {
      // Remove tudo que não for número
      const numericValue = value.replace(/\D/g, "");
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validação simples do CPF
    if (formData.cpf.length !== 11) {
      setErrorCPF(true);
      setHelperTextCPF("O CPF deve ter 11 dígitos");
      return;
    }

    setErrorCPF(false);
    setHelperTextCPF("");
    onAddEmployee(formData);
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-black flex justify-center items-center">
        <img
          className="w-full h-full object-cover object-top"
          src="images/airportstaffs.jpeg"
          alt="Imagem de voo"
        />
      </div>
      <div className="w-1/2 flex justify-center items-center p-8 flex-col">
        <div className="text-[#FF3D00] text-3xl font-semibold mb-4">
          {initialData ? "Editar Funcionário" : "Registrar Novo Funcionário"}
        </div>
        <form className="flex flex-col gap-4 w-full max-w-md" onSubmit={handleSubmit}>
          <TextField
            label="CPF"
            name="cpf"
            type="text"
            variant="outlined"
            value={formData.cpf}
            onChange={handleChange}
            onBlur={(e) => {
              const trimmedValue = e.target.value.trim();
              setFormData((prev) => ({ ...prev, cpf: trimmedValue }));
              if (trimmedValue.length !== 11) {
                setErrorCPF(true);
                setHelperTextCPF("O CPF deve ter 11 dígitos");
              } else {
                setErrorCPF(false);
                setHelperTextCPF("");
              }
            }}
            error={errorCPF}
            helperText={helperTextCPF}
            fullWidth
            required
            disabled={!!initialData} // CPF não editável se for edição
          />
          <TextField
            label="Nome"
            name="name"
            type="text"
            variant="outlined"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            variant="outlined"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Telefone"
            name="phone"
            type="text"
            variant="outlined"
            value={formData.phone}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Senha"
            name="password"
            type="password"
            variant="outlined"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            required={!initialData} // Requer senha só no cadastro
          />
          <TextField
            label="Usuário"
            name="user"
            type="text"
            variant="outlined"
            value={formData.user}
            onChange={handleChange}
            fullWidth
            required
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
