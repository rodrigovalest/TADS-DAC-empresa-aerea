"use client";

import React, { useState } from "react";
import Image from "next/image"; // Corrigido para usar <Image />
import "../../../public/styles/login.css";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import Header from "@/components/Header";
import MenuFuncionario from "@/components/MenuFuncionario";
import { useRouter } from "next/navigation"; // Correção para redirecionamento

const aeroportos = [
  "Aeroporto Internacional de Guarulhos (GRU)",
  "Aeroporto Internacional do Galeão (GIG)",
  "Aeroporto Internacional de Brasília (BSB)",
  "Aeroporto de Congonhas (CGH)",
  "Aeroporto Santos Dumont (SDU)",
  "Aeroporto Internacional do Recife (REC)",
  "Aeroporto Internacional Salgado Filho (POA)",
  "Aeroporto Internacional de Salvador (SSA)",
  "Aeroporto Internacional de Curitiba (CWB)",
  "Aeroporto Internacional de Fortaleza (FOR)",
];

const RegisterFly = () => {
  const [valor, setValor] = useState("");
  const [milhas, setMilhas] = useState(0);
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [poltronas, setPoltronas] = useState("");
  const [origem, setOrigem] = useState("");
  const [destino, setDestino] = useState("");

  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = event.target.value.replace(/[^0-9.]/g, "");
    const inputNumber = parseFloat(inputValue);

    if (!isNaN(inputNumber) && inputNumber > 0) {
      setValor(inputValue);
      setMilhas(parseFloat((inputNumber * 5).toFixed(3)));
    } else {
      setValor("");
      setMilhas(0);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!data || !hora || !poltronas || !origem || !destino || !valor) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    if (origem === destino) {
      alert("Aeroporto de origem e destino não podem ser iguais.");
      return;
    }

    const vooData = {
      data,
      hora,
      quantidadePoltronas: parseInt(poltronas),
      aeroportoOrigem: origem,
      aeroportoDestino: destino,
      valorPassagem: parseFloat(valor),
      valorMilhas: milhas,
    };

    try {
      const response = await fetch("http://localhost:8000/voos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(vooData),
      });

      if (!response.ok) throw new Error("Erro ao cadastrar voo.");

      const result = await response.json();
      console.log("Resposta da API:", result);
      alert("Voo criado com sucesso!");
      router.push("/employee"); // Correto para apps Next.js
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro ao cadastrar voo. Tente novamente.");
    }
  };

  return (
    <div className="flex h-screen">
      <MenuFuncionario />
      <div className="w-1/2 bg-black flex justify-center items-center">
        <Image
          className="w-full h-full object-cover object-top"
          src="/registerfly.jpg"
          alt="Imagem de voo"
          width={800}
          height={800}
        />
      </div>

      <div className="w-1/2 flex justify-center items-center p-8 flex-col">
        <div className="text-[#FF3D00] text-3xl font-semibold">Cadastrar Voo</div>
        <div className="w-full max-w-md bg-white rounded-lg p-6">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <TextField
              label="Data"
              type="date"
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
            <TextField
              label="Hora"
              type="time"
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              value={hora}
              onChange={(e) => setHora(e.target.value)}
            />
            <TextField
              label="Quantidade de poltronas"
              type="number"
              fullWidth
              required
              value={poltronas}
              onChange={(e) => setPoltronas(e.target.value)}
            />
            <FormControl fullWidth>
              <InputLabel>Aeroporto de origem</InputLabel>
              <Select required value={origem} onChange={(e) => setOrigem(e.target.value)}>
                <MenuItem value="">Selecione o Aeroporto</MenuItem>
                {aeroportos.map((aeroporto, i) => (
                  <MenuItem key={i} value={aeroporto}>
                    {aeroporto}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Aeroporto de destino</InputLabel>
              <Select required value={destino} onChange={(e) => setDestino(e.target.value)}>
                <MenuItem value="">Selecione</MenuItem>
                {aeroportos.map((aeroporto, i) => (
                  <MenuItem key={i} value={aeroporto}>
                    {aeroporto}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Valor da passagem"
              type="text"
              fullWidth
              required
              value={valor}
              onChange={handleChange}
            />
            {valor && <span>ou {milhas} pontos em milhas</span>}
            <Button
              variant="contained"
              className="bg-[#FF3D00] hover:bg-[#D63000]"
              type="submit"
              fullWidth
            >
              Registrar
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterFly;
