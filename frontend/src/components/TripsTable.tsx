"use client";

import React, { useState } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableSortLabel,
} from '@mui/material';
import { Trip } from '@/app/interfaces/trip';

type Order = 'asc' | 'desc';

interface TripsTableProps {
  trips: Trip[];
  onRowClick?: (trip: Trip) => void;
}

const TripsTable: React.FC<TripsTableProps> = ({ trips, onRowClick }) => {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof Trip>('date');

  const handleSort = (property: keyof Trip) => {
    const isAscending = orderBy === property && order === 'asc';
    setOrder(isAscending ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedTrips = [...trips].sort((a, b) => {
    if (orderBy === 'date') {
      return order === 'asc'
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    if (a[orderBy] < b[orderBy]) return order === 'asc' ? -1 : 1;
    if (a[orderBy] > b[orderBy]) return order === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <TableContainer component="div">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'date'}
                direction={orderBy === 'date' ? order : 'asc'}
                onClick={() => handleSort('date')}
              >
                <span className="font-bold text-[16px]">Data</span>
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'time'}
                direction={orderBy === 'time' ? order : 'asc'}
                onClick={() => handleSort('time')}
              >
                <span className="font-bold text-[16px]">Horário</span>
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
                active={orderBy === 'value'}
                direction={orderBy === 'value' ? order : 'asc'}
                onClick={() => handleSort('value')}
              >
                <span className="font-bold text-[16px]">Valor</span>
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedTrips.map((trip, index) => (
            <TableRow 
              key={index}
              className="cursor-pointer hover:bg-gray-100"
              onClick={() => onRowClick?.(trip)}
              style={{ transition: 'background-color 0.3s ease' }}
            >
              <TableCell>
                {new Date(trip.date).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                })}
              </TableCell>
              <TableCell>{trip.time}</TableCell>
              <TableCell>{trip.origin}</TableCell>
              <TableCell>{trip.destination}</TableCell>
              <TableCell>R${trip.value.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TripsTable;