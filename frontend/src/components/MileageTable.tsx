"use client";

import React, { useState } from 'react';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableSortLabel,
} from '@mui/material';

interface Transaction {
  code: string;
  transaction: string;
  description: string;
  value: number;
  points: number;
  date: Date;
}

type Order = 'asc' | 'desc';

const MileageTable: React.FC<{ transactions: Transaction[] }> = ({ transactions }) => {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof Transaction>('date');

  const handleSort = (property: keyof Transaction) => {
    const isAscending = orderBy === property && order === 'asc';
    setOrder(isAscending ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedTransactions = [...transactions].sort((a, b) => {
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
    <TableContainer component={"div"}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'code'}
                direction={orderBy === 'code' ? order : 'asc'}
                onClick={() => handleSort('code')}
              >
                <span className="font-bold text-[20px]">
                    Código
                </span>
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'transaction'}
                direction={orderBy === 'transaction' ? order : 'asc'}
                onClick={() => handleSort('transaction')}
              >
                <span className="font-bold text-[20px]">
                    Transação
                </span>
              </TableSortLabel>
            </TableCell>
            <TableCell>
                <span className="font-bold text-[20px]">
                    Descrição
                </span>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'value'}
                direction={orderBy === 'value' ? order : 'asc'}
                onClick={() => handleSort('value')}
              >
                <span className="font-bold text-[20px]">
                    Valor
                </span>
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'points'}
                direction={orderBy === 'points' ? order : 'asc'}
                onClick={() => handleSort('points')}
              >
                <span className="font-bold text-[20px]">
                    Pontuação
                </span>
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'date'}
                direction={orderBy === 'date' ? order : 'asc'}
                onClick={() => handleSort('date')}
              >
                <span className="font-bold text-[20px]">
                    Data
                </span>
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedTransactions.map((transaction, index) => (
            <TableRow key={index}>
              <TableCell>{transaction.code}</TableCell>
              <TableCell>{transaction.transaction}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>R$ {transaction.value}</TableCell>
              <TableCell>{transaction.points} pontos</TableCell>
              <TableCell>
                {new Date(transaction.date).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MileageTable;