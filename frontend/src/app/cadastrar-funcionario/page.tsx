'use client';

import React, {useEffect, useState} from "react";
import '../../../public/styles/login.css';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import MenuFuncionario from "@/components/MenuFuncionario";
import Employee from "../interfaces/employee";

const StaffRegister = () => {
    const [errorCPF, setError] = useState(false);
    const [helperText, setHelperText] = useState('');



interface StaffRegisterProps {
  onAddEmployee: (employee: Employee) => void;
  initialData?: Employee | null;
}

const StaffRegister: React.FC<StaffRegisterProps> = ({ onAddEmployee, initialData }) => {
  const [formData, setFormData] = useState<Employee>({
    name: '',
    cpf: '',
    email: '',
    phone: '',
    password: '',
    user:''
  });

  const [errorCPF, setError] = useState(false);
  const [helperText, setHelperText] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'cpf' || name === 'phone') {
      const numericValue = value.replace(/\D/g, '');
      setFormData((prevData) => ({ ...prevData, [name]: numericValue }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
        <div className="text-[#FF3D00] text-3xl font-semibold">
          {initialData ? "Editar Funcionário" : "Registrar Novo Funcionário"}
        </div>
        <div className="">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <TextField
              label="CPF"
              name="cpf"
              type="text"
              variant="outlined"
              value={formData.cpf}
              onChange={handleChange}
              onBlur={(e) => {
                const trimmedValue = e.target.value.trim();
                setFormData((prevData) => ({ ...prevData, cpf: trimmedValue }));
                if (trimmedValue.length < 11) {
                  setError(true);
                  setHelperText('O CPF deve ter 11 dígitos');
                  return;
                }
                setError(false);
                setHelperText('');
              }}
              error={errorCPF}
              helperText={helperText}
              fullWidth
              required
              disabled={!!initialData}
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
    </div>
  );
};
}
export default StaffRegister;