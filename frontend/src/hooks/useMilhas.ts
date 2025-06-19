import { useState, useEffect } from 'react';
import clienteService from '@/services/cliente-service';
import { getClienteId } from '@/utils/auth-utils';

export const useMilhas = () => {
  const [saldoMilhas, setSaldoMilhas] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Função para carregar o saldo de milhas
  const carregarSaldoMilhas = async () => {
    const clienteId = getClienteId();
    
    if (!clienteId) {
      setError('Usuário não logado');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const cliente = await clienteService.findClienteById(clienteId);
      setSaldoMilhas(cliente.saldo_milhas || 0);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar saldo de milhas');
    } finally {
      setLoading(false);
    }
  };

  // Função para comprar milhas
  const comprarMilhas = async (quantidade: number): Promise<boolean> => {
    const clienteId = getClienteId();
    if (!clienteId) {
      setError('Usuário não logado');
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await clienteService.comprarMilhas(clienteId, quantidade);
      setSaldoMilhas(response.saldo_milhas);
      return true;
    } catch (err: any) {
      setError(err.message || 'Erro ao comprar milhas');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Carregar saldo inicial
  useEffect(() => {
    carregarSaldoMilhas();
  }, []);

  return {
    saldoMilhas,
    loading,
    error,
    comprarMilhas,
    recarregarSaldo: carregarSaldoMilhas,
  };
};
