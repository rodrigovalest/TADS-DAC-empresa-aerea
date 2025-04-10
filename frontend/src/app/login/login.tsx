import React from "react";
import '../../../public/styles/login.css';
const Login = () => {
    return(
        <div className="d-flex flex h-screen" >
            <section className="flex justify-center items-center w-full relative bg-white hidden sm:flex m:w-1/2">
                <div className="z-1  w-[70%] h-[50%] absolute flex justify-center items-center backdrop-blur-md shadow-xl rounded-md text-center px-2">
                    <div className="main-text">Sua <span>viagem</span> dos <span>sonhos</span> á um <span>clique</span> de distância</div>
                </div>
                <img className="object-cover w-full h-full" src="airplane.png"></img>
            </section>

            <section className="w-full bg-white sm:w-1/2 flex justify-center items-center flex-col relative pt-16">
                <header className="w-full flex justify-between items-center p-4 absolute top-0 left-0 bg-white">
                    <div className="logo font-bold text-lg">
                        1000Milhas
                    </div>
                    <div> 
                        <select name="country" id="country" className="border p-2 rounded">
                            <option value="br">🇧🇷 Português</option>
                            <option value="us">🇺🇸 Inglês</option>
                        </select>
                    </div>
                </header>

                <form className="flex justify-center items-center flex-col w-full" id="login-form">
                    <input type="email" className="bg-[#F1F1F1] input-field p-2 w-3/4 my-2" placeholder="Digite seu email" required />
                    <div></div>
                    <input type="password" className="bg-[#F1F1F1] input-field p-2 w-3/4 my-2" placeholder="Digite sua senha" required />
                    <div className="text-[#FF3D00]">É novo por aqui? <a href="#">Clique aqui</a></div>
                    <button className="login-btn bg-blue-500 text-white px-4 py-2 rounded mt-4" type="submit">Login</button>
                </form>
            </section>
        </div>
    )
}

export default Login;