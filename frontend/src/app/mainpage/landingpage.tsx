"use client";

import React, { useState } from "react";
import HomeHeader from "./homeheader";
import "../../../public/styles/landingpage.css";

const LandingPage = () => {
  return (
    <div>
      <HomeHeader />
      <section className="section1 h-[95vh]  object-top pt-20">
        <div className="flex h-full w-1/2 items-center justify-center">
          <div className="flex flex-col gap-4 bg-[#D63000] py-5 px-10 shadow-lg w-fit">
            <div className="maintext">
              Economize até 70% em passagens aéreas
            </div>
            <a className="call w-fit" href="/login">
              Compre agora
            </a>
          </div>
        </div>
      </section>
      <section className="section2 h-screen w-full">
        <div className="mx-10 z-i">
          <div className="my-10">
            <div className="title text-2xl">Quem somos?</div>
            <h3 className="mx-20">
              Somos uma empresa especializada na compra de milhas aéreas, com o
              compromisso de oferecer aos nossos clientes um serviço ágil,
              transparente e seguro. Atuamos no mercado com o objetivo de
              transformar suas milhas em dinheiro de forma prática e sem
              complicações. Trabalhamos com as principais companhias aéreas do
              Brasil, garantindo as melhores avaliações e cotações para seus
              pontos. Prezamos por um atendimento humanizado, clareza em cada
              etapa e total confidencialidade em todas as transações. Se você
              tem milhas acumuladas, nós temos a solução ideal para
              valorizá-las.
            </h3>
          </div>

          <div className="flex h-[40vh] gap-5">
            <div className="card">
              <div className="title text-2xl">
                Transforme Milhas em Dinheiro
              </div>
              <h3 className="m-auto">
                Não deixe suas milhas expirarem! Com a gente, você vende seus
                pontos de forma rápida e segura, e recebe o valor direto na sua
                conta.
              </h3>
            </div>
            <div className="card">
              <div className="title text-2xl">
                Processo Rápido e Sem Burocracia
              </div>
              <h3 className="m-auto">
                Solicite uma cotação em poucos cliques. Nossa equipe faz a
                avaliação e finaliza a compra com agilidade e transparência.
              </h3>
            </div>
            <div className="card">
              <div className="title text-2xl">Segurança e Confiabilidade</div>
              <h3 className="m-auto">
                Trabalhamos com total sigilo e proteção dos seus dados. Já
                ajudamos milhares de clientes a lucrar com suas milhas, com
                total confiança.
              </h3>
            </div>
          </div>
        </div>
      </section>
      <section className="section4 h-full p-10 bg-white text-[#D63000] flex flex-col border-t-4 border-orange-500 ">
      <div className="title text-2xl">Empresas parceiras</div>
        <div className="flex justify-around items-center gap-4">
          <img src="images/latam.png" className="max-w-[300px] h-auto object-contain" />
          <img src="images/azul.png" className="max-w-[300px] h-auto object-contain" />
          <img src="images/gol.png" className="max-w-[300px] h-auto object-contain" />
          <img src="images/airfrance.png" className="max-w-[300px] h-auto object-contain" />
        </div>

      </section>
      <section className="section4 h-full p-10 bg-black flex justify-between">
        <img width="250px" src="images/ufpr.png" />
        <div className="text-white">
            <h1>Desenvolvido por:</h1>
            <h3>Matheus Grego do Amaral</h3>
            <h3>Matheus Nunes Santana</h3>
            <h3>Paulo Eduardo Bayer Kresko</h3>
            <h3>Janaina Nogueira</h3>
            <h3>Rodrigo do Vale Stankowicz</h3>
        </div>        
      </section>
    </div>
  );
};

export default LandingPage;
