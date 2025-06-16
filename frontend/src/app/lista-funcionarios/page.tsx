"use client";

import React, { useEffect, useState } from "react";
import "../../app/globals.css";
import HeaderBanner from "@/components/HeaderBanner";
import EmployeeTable from "@/components/EmployeeTable";
import AddIcon from "@mui/icons-material/Add";
import { Button, Dialog } from "@mui/material";
import StaffRegister from "@/components/StaffRegister";
import MenuFuncionario from "@/components/MenuFuncionario";
import funcionarioService from "@/services/funcionario-service";
import IFuncionarioResponse from "@/models/response/funcionario-response";
import IInserirFuncionarioRequest from "@/models/requests/inserir-funcionario-request";
import IAtualizarFuncionarioRequest from "@/models/requests/atualizar-funcionario-request";

const EmployeePage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [editEmployee, setEditEmployee] = useState<IFuncionarioResponse | null>(null);
  const [employees, setEmployees] = useState<IFuncionarioResponse[]>([]);

  // Buscar todos os funcionários ao carregar a página
  const fetchEmployees = async () => {
    try {
      const data = await funcionarioService.findAllFuncionarios();
      setEmployees(data);
    } catch (error) {
      console.error("Erro ao buscar funcionários:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const addEmployee = () => {
    setEditEmployee(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditEmployee(null);
  };

  // Depois de criar funcionário, buscar lista atualizada inteira
  const handleAddEmployee = async (employee: IInserirFuncionarioRequest) => {
    try {
      await funcionarioService.inserirFuncionario(employee);
      await fetchEmployees();  // ATUALIZA LISTA COMPLETA
      handleClose();
    } catch (error) {
      console.error("Erro ao adicionar funcionário:", error);
    }
  };

  // Atualizar funcionário na lista local após edição
  const handleEditEmployee = async (employee: IAtualizarFuncionarioRequest) => {
    if (!employee.codigo) {
      console.error("Código do funcionário não disponível para edição");
      return;
    }

    try {
      const updated = await funcionarioService.atualizarFuncionario(
        employee.codigo,
        employee
      );

      setEmployees((prev) =>
        prev.map((emp) => (emp.codigo === updated.codigo ? updated : emp))
      );
      handleClose();
    } catch (error) {
      console.error("Erro ao editar funcionário:", error);
    }
  };

  const handleEdit = (employee: IFuncionarioResponse) => {
    setEditEmployee(employee);
    setOpen(true);
  };

  const handleDelete = async (codigo: number) => {
    try {
      await funcionarioService.removerFuncionario(codigo);
      setEmployees((prev) => prev.filter((emp) => emp.codigo !== codigo));
    } catch (error) {
      console.error("Erro ao deletar funcionário:", error);
    }
  };

  return (
    <div>
      <MenuFuncionario />
      <HeaderBanner text="Lista de Funcionários" />
      <div className="w-[85vw] mx-auto flex justify-end -mt-18">
        <Button
          variant="contained"
          color="primary"
          onClick={addEmployee}
          style={{
            backgroundColor: "#FF3D00",
            color: "#FFFFFF",
            marginBottom: "12px",
          }}
        >
          <AddIcon />
        </Button>
      </div>
      <div className="p-5 rounded-3xl border-3 w-[85vw] border-black mx-auto bg-white">
        <EmployeeTable
          employees={employees}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <StaffRegister
          onAddEmployee={handleAddEmployee}
          onEditEmployee={handleEditEmployee}
          initialData={editEmployee}
        />
      </Dialog>
    </div>
  );
};

export default EmployeePage;
