"use client";

import React from "react";
import StaffRegister from "@/components/StaffRegister";
import Employee from "@/types/interfaces";

export default function StaffRegisterPage() {
  const handleAddEmployee = (employee: Employee) => {
    console.log("Funcionário registrado:", employee);
  };

  return <StaffRegister onAddEmployee={handleAddEmployee} />;
}
