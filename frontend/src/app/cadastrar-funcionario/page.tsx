'use client'

import React, {useState} from "react";
import '../../../public/styles/login.css';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import MenuFuncionario from "@/components/MenuFuncionario";



const StaffRegister = () => {
    const [errorCPF, setError] = useState(false);
    const [helperText, setHelperText] = useState('');

    const checkCPF = (e:any) => {
        const inputvalue = e.target.value.trim();
        if(inputvalue.length  < 11){
            setError(true);
            setHelperText('O CPF deve ter 11 dígitos');
        }
        const cpf = inputvalue.split('').map(Number);
        const validador = (cpf: number[], factor: number) => {
        let total = 0;
        for (let i = 0; i < factor - 1; i++) {
            total += cpf[i] * (factor - i);
        }
        const resto = (total * 10) % 11;
        return resto === 10 ? 0 : resto;
        };

        const digito1 = validador(cpf, 10);
        const digito2 = validador(cpf, 11);

        if (cpf[9] !== digito1 || cpf[10] !== digito2) {
            setError(true);
            setHelperText('CPF inválido: dígitos verificadores incorretos');
        }
        else{
            setError(false);
            setHelperText('')
        }
        };

    return(
        <div className="flex h-screen">
            <MenuFuncionario/>
            <div className="w-1/2 bg-black flex justify-center items-center">
                <img className="w-full h-full object-cover object-top" src="images/airportstaffs.jpeg" alt="Imagem de voo" />
            </div>
            <div className="w-1/2 flex justify-center items-center p-8 flex-col">
                    <div className="text-[#FF3D00] text-3xl font-semibold">
                        Registrar novo funcionário
                    </div>
                    <div className="w-full max-w-md bg-white rounded-lg p-6">
                    <form className="flex flex-col gap-4">
                        <TextField label="CPF" type="number" variant="outlined" 
                            onBlur={checkCPF} 
                            error={errorCPF}
                            helperText={helperText}
                            fullWidth required />
                        <TextField label="Nome" type="text" variant="outlined" fullWidth required />
                        <TextField label="Email" type="email" variant="outlined" fullWidth required />
                        <TextField label="Telefone" type="phone" variant="outlined" fullWidth required />

                       <Button 
                            variant="contained" 
                            className="bg-[#FF3D00] hover:bg-[#D63000]" 
                            type="submit" 
                            fullWidth>
                            Registrar
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default StaffRegister