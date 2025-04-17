import React from "react";
import '../../../public/styles/login.css';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const Login = () => {
    return(
        <div className="flex h-screen">
            <div className="w-1/2 bg-black flex justify-center items-center">
                <img className="w-full h-full object-cover" src="loginImg.png" alt="Imagem de voo" />
            </div>

            <div className="w-1/2 flex justify-center items-center p-8 flex-col">
                    <div className="text-[#FF3D00] text-3xl font-semibold">
                        Entrar
                    </div>
                <div className="w-full max-w-md bg-white  rounded-lg p-6">
                    <form className="flex flex-col gap-4">
                        <TextField
                            label="Email"
                            type="email"
                            variant="outlined"
                            fullWidth
                            required
                            
                        />
                        <TextField
                            label="Senha"
                            type="password"
                            variant="outlined"
                            fullWidth
                            required
                            
                        />
                        <div>É novo por aqui? <a href="/autocadastro">clique aqui</a></div>
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
    )
}

export default Login;