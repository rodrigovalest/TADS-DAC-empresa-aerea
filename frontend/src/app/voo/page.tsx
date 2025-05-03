"use client";

import React, { useState } from "react";
import '../../../public/styles/login.css';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import Header from "@/components/header";

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

const [valor, setValor] = useState('');
const [milhas, setMilhas] = useState(0);
const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = event.target.value;
    inputValue = inputValue.replace(/[^0-9.]/g, "");
    const inputNumber = parseFloat(inputValue) 

    if (inputNumber && inputNumber > 0) {
        setValor(inputValue);
        setMilhas(parseFloat((inputNumber * 5).toFixed(3)));
    } else {
        setValor(""); 
        setMilhas(0)
    }
};
    return (
        <div className="flex h-screen">
            <Header/>
            <div className="w-1/2 bg-black flex justify-center items-center">
                <img className="w-full h-full object-cover object-top" src="registerfly.jpg" alt="Imagem de voo" />
            </div>

            <div className="w-1/2 flex justify-center items-center p-8 flex-col">
                    <div className="text-[#FF3D00] text-3xl font-semibold">
                        Cadastrar Voo
                    </div>
                <div className="w-full max-w-md bg-white  rounded-lg p-6">
                    <form className="flex flex-col gap-4">
                        
                        <TextField label="Código do Voo" variant="outlined" fullWidth required />
                        <TextField label="Data" type="date" variant="outlined" fullWidth InputLabelProps={{ shrink: true }} required />
                        <TextField label="Hora" type="time" variant="outlined" fullWidth InputLabelProps={{ shrink: true }} required />

                        <FormControl fullWidth>
                            <InputLabel>Aeroporto de origem</InputLabel>
                            <Select required>
                                <MenuItem value="">Selecione o Aeroporto</MenuItem>
                                {aeroportos.map((aeroporto, index) => (
                                    <MenuItem key={index} value={aeroporto}>
                                        {aeroporto}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth >
                            <InputLabel>Aeroporto de destino</InputLabel>
                            <Select required>
                                <MenuItem value="">Selecione</MenuItem>
                                {aeroportos.map((aeroporto, index) => (
                                    <MenuItem key={index} value={aeroporto}>
                                        {aeroporto}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <TextField
                            label="Valor da passagem"
                            type="text"
                            variant="outlined"
                            fullWidth
                            required
                            value={valor}
                            onChange={handleChange}
                        />
                                {valor ? (
                                         <span>ou {milhas} pontos em milhas</span>
                                    ) : (<div></div>)}
                       
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
