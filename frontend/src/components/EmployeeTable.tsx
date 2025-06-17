"use client";

import React, { useState } from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableSortLabel,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IFuncionarioResponse from "@/models/response/funcionario-response";

type Order = "asc" | "desc";

interface EmployeeTableProps {
  employees: IFuncionarioResponse[];
  onEdit: (employee: IFuncionarioResponse) => void;
  onDelete: (id: number) => void;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({
  employees,
  onEdit,
  onDelete,
}) => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof IFuncionarioResponse>("nome");

  const handleSort = (property: keyof IFuncionarioResponse) => {
    const isAscending = orderBy === property && order === "asc";
    setOrder(isAscending ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedEmployees = [...employees].sort((a, b) => {
    const aValue = a[orderBy] ?? "";
    const bValue = b[orderBy] ?? "";

    if (aValue < bValue) return order === "asc" ? -1 : 1;
    if (aValue > bValue) return order === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {["nome", "cpf", "email", "telefone"].map((field) => (
              <TableCell key={field}>
                <TableSortLabel
                  active={orderBy === field}
                  direction={orderBy === field ? order : "asc"}
                  onClick={() => handleSort(field as keyof IFuncionarioResponse)}
                >
                  <span className="font-bold text-[20px]">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </span>
                </TableSortLabel>
              </TableCell>
            ))}
            <TableCell>
              <span className="font-bold text-[20px]">Ações</span>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedEmployees.map((employee) => (
            <TableRow key={employee.codigo}>
              <TableCell>{employee.nome}</TableCell>
              <TableCell>{employee.cpf}</TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>{employee.telefone}</TableCell>
              <TableCell>
                <IconButton
                  onClick={() => onEdit(employee)}
                  style={{
                    backgroundColor: "#FF3D00",
                    color: "#FFFFFF",
                    margin: "6px",
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => {
                    if (employee.codigo) {
                      onDelete(employee.codigo);
                    } else {
                      console.error("ID do funcionário ausente:", employee);
                    }
                  }}
                  style={{
                    backgroundColor: "#FF3D00",
                    color: "#FFFFFF",
                    margin: "6px",
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployeeTable;
