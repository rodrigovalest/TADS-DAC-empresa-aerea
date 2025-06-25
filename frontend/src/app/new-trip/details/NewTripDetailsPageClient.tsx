"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import HeaderBanner from '@/components/HeaderBanner';
import useFindVooByCodigo from '@/hooks/useFindVooByCodigo';
import useRealizarReserva from '@/hooks/useRealizarReserva';
import { toast } from 'react-toastify';
import { getClienteId } from '@/utils/auth-utils';
import clienteService from '@/services/cliente-service';

const NewTripDetailsPageClient = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const codigoParam = searchParams.get('codigo');
  const codigo = Number(codigoParam);
  const codigoCliente = getClienteId();
  const [saldoMilhas, setSaldoMilhas] = useState<number>(0);
  const [milhasParaUsar, setMilhasParaUsar] = useState<number>(0);
  
  const [quantidadePoltronas, setQuantidadePoltronas] = useState(1);
  const reservarMutation = useRealizarReserva();
  const { data: voo, isLoading, isError } = useFindVooByCodigo(codigo);

  const poltronasDisponiveis = voo ? voo.quantidade_poltronas_total - voo.quantidade_poltronas_ocupadas : 0;
  const valorTotal = voo ? voo.valor * quantidadePoltronas : 0;
  const milhasTotais = voo ? voo.valor * quantidadePoltronas * 5 : 0;

  useEffect(() => {
    if (!codigoCliente) return;
    clienteService.findClienteById(codigoCliente)
      .then(cliente => setSaldoMilhas(cliente.saldo_milhas || 0));
  }, [codigoCliente]);

  const maxMilhasUsar = Math.ceil(Math.min(saldoMilhas, milhasTotais));

  const handleReservar = () => {
    reservarMutation.mutate({
      valor: valorTotal,
      milhas_utilizadas: milhasParaUsar,
      quantidade_poltronas: quantidadePoltronas,
      codigo_cliente: String(codigoCliente),
      codigo_voo: codigo,
    });

    router.replace("/new-trip");
  };


  if (isLoading) {
    return <div className="p-5 text-center">Carregando detalhes da viagem...</div>;
  }

  if (isError || !voo || !codigoCliente) {
    toast.error("Erro ao buscar dados do voo. Tente novamente.");
    router.replace("/new-trip");
    return <div className="p-5 text-center text-red-600">Erro ao carregar dados do voo.</div>;
  }


  return (
    <div className="mb-10">
      <Header />
      <HeaderBanner htmlContent="Confira os <span class='text-[#FF3D00] font-bold'>detalhes</span> da sua viagem!" />
      <div className="p-5 rounded-3xl border-2 w-[85vw] border-black mx-auto mt-12 bg-white">
        <h1 className="text-xl font-bold mb-4">Detalhes da Viagem</h1>
        <ul className="space-y-2 mb-6">
          <li><strong>Data:</strong> {new Date(voo.data).toLocaleString("pt-BR")}</li>
          <li><strong>Origem:</strong> {voo.aeroporto_origem.nome} ({voo.aeroporto_origem.cidade} - {voo.aeroporto_origem.uf})</li>
          <li><strong>Destino:</strong> {voo.aeroporto_destino.nome} ({voo.aeroporto_destino.cidade} - {voo.aeroporto_destino.uf})</li>
          <li><strong>Valor Unitário:</strong> R$ {voo.valor_passagem}</li>
          <li><strong>Status:</strong> {voo.estado}</li>
        </ul>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Quantidade de Poltronas (disponíveis: {poltronasDisponiveis})</label>
          <input
            type="number"
            min={1}
            max={poltronasDisponiveis}
            value={quantidadePoltronas}
            onChange={(e) => {
              const qtd = Number(e.target.value);
              if (qtd >= 1 && qtd <= poltronasDisponiveis) setQuantidadePoltronas(qtd);
            }}
            className="border rounded px-3 py-2 w-32"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">
            Quantas milhas deseja usar? (Saldo disponível: {saldoMilhas})
          </label>
          <input
            type="number"
            min={0}
            max={maxMilhasUsar}
            step={1}
            value={milhasParaUsar}
            onChange={e => {
              let value = Math.ceil(Number(e.target.value));
              if (isNaN(value) || value < 0) value = 0;
              if (value > maxMilhasUsar) value = maxMilhasUsar;
              setMilhasParaUsar(value);
            }}
            className="border rounded px-3 py-2 w-32"
          />
          <div className="text-sm text-gray-500">
            Máximo permitido para esta reserva: {maxMilhasUsar}
          </div>
        </div>

        <div className="text-lg space-y-1 mb-6">
          <div><strong>Total (R$):</strong> R$ {valorTotal.toFixed(2)}</div>
          <div><strong>Total (Milhas):</strong> {milhasTotais.toFixed(0)} milhas</div>
        </div>

        <button
          onClick={handleReservar}
          disabled={reservarMutation.isPending}
          className="bg-[#FF3D00] text-white font-semibold px-6 py-2 rounded hover:bg-red-600 transition disabled:opacity-50"
        >
          {reservarMutation.isPending ? "Reservando..." : "Reservar agora"}
        </button>
      </div>
    </div>
  );
};

export default NewTripDetailsPageClient;
