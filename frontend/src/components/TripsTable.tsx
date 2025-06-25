"use client";

import React, { useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableSortLabel,
} from "@mui/material";
import IVooResponse from "@/models/response/voo-response";

type Order = "asc" | "desc";

interface TripsTableProps {
  trips: IVooResponse[];
  onRowClick?: (trip: IVooResponse) => void;
}

type SortableField = "data" | "valor_passagem";

const TripsTable: React.FC<TripsTableProps> = ({ trips, onRowClick }) => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<SortableField>("data");

  const handleSort = (property: SortableField) => {
    const isAscending = orderBy === property && order === "asc";
    setOrder(isAscending ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedTrips = [...trips].sort((a, b) => {
    if (orderBy === "data") {
      return order === "asc"
        ? new Date(a.data).getTime() - new Date(b.data).getTime()
        : new Date(b.data).getTime() - new Date(a.data).getTime();
    }

    if (orderBy === "valor_passagem") {
      const valA = parseFloat(a.valor_passagem);
      const valB = parseFloat(b.valor_passagem);
      return order === "asc" ? valA - valB : valB - valA;
    }

    return 0;
  });

  return (
    <TableContainer component="div">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={orderBy === "data"}
                direction={orderBy === "data" ? order : "asc"}
                onClick={() => handleSort("data")}
              >
                <span className="font-bold text-[16px]">Data</span>
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <span className="font-bold text-[16px]">Origem</span>
            </TableCell>
            <TableCell>
              <span className="font-bold text-[16px]">Destino</span>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "valor_passagem"}
                direction={orderBy === "valor_passagem" ? order : "asc"}
                onClick={() => handleSort("valor_passagem")}
              >
                <span className="font-bold text-[16px]">Valor</span>
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <span className="font-bold text-[16px]">Status</span>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedTrips.map((trip, index) => (
            <TableRow
              key={index}
              className="cursor-pointer hover:bg-gray-100"
              onClick={() => onRowClick?.(trip)}
              style={{ transition: "background-color 0.3s ease" }}
            >
              <TableCell>
                {new Date(trip.data).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </TableCell>
              <TableCell>{trip.aeroporto_origem?.nome}</TableCell>
              <TableCell>{trip.aeroporto_destino?.nome}</TableCell>
              <TableCell>
                R${parseFloat(trip.valor_passagem).toFixed(2)}
              </TableCell>
              <TableCell>{trip.estado}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TripsTable;
