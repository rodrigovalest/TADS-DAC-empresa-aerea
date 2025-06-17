"use client";

import React from "react";
import StaffRegister from "@/components/StaffRegister";
import funcionarioService from "@/services/funcionario-service";
import IFuncionarioResponse from "@/models/response/funcionario-response";
import IInserirFuncionarioRequest from "@/models/requests/inserir-funcionario-request";
import IAtualizarFuncionarioRequest from "@/models/requests/atualizar-funcionario-request";

type FormDataType = IInserirFuncionarioRequest & Partial<IAtualizarFuncionarioRequest>;

export default function StaffRegisterPage() {
  const initialData: IFuncionarioResponse | null = null;

  const handleAddEmployee = async (employee: IInserirFuncionarioRequest) => {
    try {
      await funcionarioService.inserirFuncionario(employee);
      console.log("Funcionário registrado:", employee);
    } catch (error) {
      console.error("Erro ao adicionar funcionário:", error);
    }
  };

  const handleEditEmployee = async (employee: IAtualizarFuncionarioRequest) => {
    try {
      await funcionarioService.atualizarFuncionario(employee.codigo, employee);
      console.log("Funcionário atualizado:", employee);
    } catch (error) {
      console.error("Erro ao editar funcionário:", error);
    }
  };

  return (
    <StaffRegister
      onAddEmployee={handleAddEmployee}
      onEditEmployee={handleEditEmployee}
      initialData={initialData}
    />
  );
}
