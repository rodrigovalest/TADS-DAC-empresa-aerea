'use client';

import React, { useState } from 'react';
import '../../app/globals.css';
import Header from "../../components/Header";
import HeaderBanner from '@/components/HeaderBanner';
import EmployeeTable from '@/components/EmployeeTable';
import AddIcon from '@mui/icons-material/Add';
import { Button, Dialog } from '@mui/material';
import StaffRegister from '../cadastrar-funcionario/page';
import Employee from '../interfaces/employee';

const EmployeePage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [editEmployee, setEditEmployee] = useState<Employee | null>(null);
  const [employees, setEmployees] = useState([
    { name: 'Paulo', cpf: '111.111.111-11', email: 'paulo@example.com', phone: '123456789', user: 'paulo', password: 'password' },
    { name: 'Ana', cpf: '222.222.222-22', email: 'ana@example.com', phone: '987654321', user: 'ana', password: 'password' },
    { name: 'Carlos', cpf: '333.333.333-33', email: 'carlos@example.com', phone: '456789123', user: 'carlos', password: 'password' },
    { name: 'Maria', cpf: '444.444.444-44', email: 'maria@example.com', phone: '789123456', user: 'maria', password: 'password' },
    { name: 'João', cpf: '555.555.555-55', email: 'joao@example.com', phone: '321654987', user: 'joao', password: 'password' },
    { name: 'Fernanda', cpf: '666.666.666-66', email: 'fernanda@example.com', phone: '654987321', user: 'fernanda', password: 'password' },
    { name: 'Lucas', cpf: '777.777.777-77', email: 'lucas@example.com', phone: '987321654', user: 'lucas', password: 'password' },
]);

  const addEmployee = () => {
    setEditEmployee(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddOrEditEmployee = (newEmployee: Employee) => {
    if (editEmployee) {
      setEmployees((prevEmployees) =>
        prevEmployees.map((emp) => (emp.cpf === newEmployee.cpf ? newEmployee : emp))
      );
    } else {
      setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
    }
    setOpen(false);
  };

  const handleEdit = (employee: Employee) => {
    setEditEmployee(employee);
    setOpen(true);
  };

  const handleDelete = (cpf: string) => {
    setEmployees((prevEmployees) => prevEmployees.filter((emp) => emp.cpf !== cpf));
  };

  return (
    <div>
      <Header />
      <HeaderBanner text="Lista de Funcionários" />
      <div className="w-[85vw] mx-auto flex justify-end -mt-18">
        <Button
          variant="contained"
          color="primary"
          onClick={addEmployee}
          style={{
            backgroundColor: '#FF3D00',
            color: '#FFFFFF',
            marginBottom: '12px',
          }}
        >
          <AddIcon />
        </Button>
      </div>
      <div className="p-5 rounded-3xl border-3 w-[85vw] border-black mx-auto bg-white">
        <EmployeeTable employees={employees} onEdit={handleEdit} onDelete={handleDelete} />
      </div>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <StaffRegister
          onAddEmployee={handleAddOrEditEmployee}
          initialData={editEmployee}
        />
      </Dialog>
    </div>
  );
};

export default EmployeePage;