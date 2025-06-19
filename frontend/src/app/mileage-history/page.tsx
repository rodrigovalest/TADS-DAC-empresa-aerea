"use client";
import React, { useEffect, useState } from 'react';
import '../../app/globals.css';
import Header from "../../components/Header"
import HeaderBanner from '@/components/HeaderBanner';
import MileageTable from '@/components/MileageTable';
import clienteService from '@/services/cliente-service';
import IExtratoMilhasResponse, { ITransacaoMilhas } from '@/models/response/extrato-milhas-response';
import { getClienteId } from '@/utils/auth-utils';

const MileageHistoryPage: React.FC = () => {
    const [extratoData, setExtratoData] = useState<IExtratoMilhasResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const carregarExtrato = async () => {
            const clienteId = getClienteId();
            if (!clienteId) {
                setError('Usuário não logado');
                setLoading(false);
                return;
            }

            try {
                const dados = await clienteService.extratoMilhas(clienteId);
                setExtratoData(dados);
                
                const cliente = await clienteService.findClienteById(clienteId);
            } catch (err: any) {
                console.error('[MileageHistory] Erro ao carregar extrato:', err);
                setError(err.message || 'Erro ao carregar extrato');
            } finally {
                setLoading(false);
            }
        };

        carregarExtrato();
    }, []);

    const formatTransactions = (transacoes: ITransacaoMilhas[]) => {
        return transacoes.map((t, index) => ({
            code: t.codigo_reserva ? t.codigo_reserva.toString() : `TXN-${index + 1}`,
            transaction: t.tipo === 'ENTRADA' ? 'Entrada' : 'Saída',
            description: t.descricao || 'Transação',
            value: t.valor_reais || 0,
            points: t.quantidade_milhas || 0,
            date: t.data ? new Date(t.data) : new Date()
        }));
    };

    if (loading) {
        return (
            <div>
                <Header/>
                <HeaderBanner text="Carregando histórico de milhas..." />
                <div className="p-5 rounded-3xl border-3 w-[85vw] border-black mx-auto -mt-12 bg-white">
                    <p className="text-center">Carregando...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <Header/>
                <HeaderBanner text="Erro ao carregar histórico de milhas" />
                <div className="p-5 rounded-3xl border-3 w-[85vw] border-black mx-auto -mt-12 bg-white">
                    <p className="text-center text-red-500">{error}</p>
                </div>
            </div>
        );
    }

    const transactions = extratoData && extratoData.transacoes ? 
        formatTransactions(extratoData.transacoes) : [];

    return (
        <div>
            <Header/>
            <HeaderBanner text="Verifique seu histórico de milhas aqui" />
            <div className="p-5 rounded-3xl border-3 w-[85vw] border-black mx-auto -mt-12 bg-white">
                {extratoData && (
                    <div className="mb-4 p-4 bg-gray-100 rounded-lg">
                        <h3 className="text-lg font-semibold">Saldo Atual: {extratoData.saldo_milhas?.toLocaleString() || 0} milhas</h3>
                    </div>
                )}
                {transactions.length > 0 ? (
                    <MileageTable transactions={transactions} />
                ) : (
                    <p className="text-center">Nenhuma transação encontrada.</p>
                )}
            </div>
        </div>
    );
};

export default MileageHistoryPage;