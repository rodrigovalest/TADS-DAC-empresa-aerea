import React, { useEffect } from "react";
import CustomOrangeDialog from "@/components/CustomOrangeDialog";

// Propriedades do componente `BuyMilesDialog`
// isOpen: Controla se o diálogo principal está aberto
// onClose: Função para fechar o diálogo principal
// onSubmit: Função chamada ao confirmar a compra
// É Aqui que se deve colocar a chamada para a API no Futuro
interface BuyMilesDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (amount: number) => void;
}

const BuyMilesDialog: React.FC<BuyMilesDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  // Estados para armazenar os valores de reais, milhas e mensagens de erro
  const [reais, setReais] = React.useState(0);
  const [miles, setMiles] = React.useState(0);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = React.useState(false);
  const [error, setError] = React.useState("");

  const MILES_RATE = 5;

  // Reseta os valores quando o diálogo principal é aberto
  useEffect(() => {
    if (isOpen) {
      setReais(0);
      setMiles(0);
      setError("");
    }
  }, [isOpen]); // Executa sempre que o estado `isOpen` mudar

  // Atualiza o valor em reais e calcula as milhas correspondentes
  const handleReaisChange = (value: number) => {
    setReais(value);
    setMiles(Math.floor(value / MILES_RATE)); // Calcula as milhas arredondando para baixo
    setError("");
  };

  // Atualiza o valor em milhas e calcula o valor em reais correspondente
  const handleMilesChange = (value: number) => {
    setMiles(value);
    setReais(value * MILES_RATE);
    setError("");
  };

  // Valida os valores e abre o diálogo de confirmação
  const handleSubmit = () => {
    if (miles <= 0) {
      setError("O valor de milhas deve ser maior que zero.");
      return;
    }

    // Ajusta o valor em reais para o múltiplo de 5 mais próximo para baixo
    const adjustedReais = Math.floor(reais / MILES_RATE) * MILES_RATE;
    setReais(adjustedReais);
    setIsConfirmDialogOpen(true);
  };

  // Confirma a compra e fecha os diálogos
  const handleConfirmPurchase = () => {
    onSubmit(miles); // Chama a função de callback para processar a compra
    setIsConfirmDialogOpen(false); // Fecha o diálogo de confirmação
    onClose(); // Fecha o diálogo principal
  };

  return (
    <>
      {/* Diálogo principal */}
      <CustomOrangeDialog
        isOpen={isOpen} // Controla se o diálogo está visível
        onClose={onClose} // Função para fechar o diálogo
        title="1 Milha = R$5,00"
        titleCentered
        body={
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
              {/* Campo para inserir o valor em reais */}
              <div className="flex flex-col items-center w-1/2">
                <p className="text-lg font-semibold text-center">
                  Valor em Reais
                </p>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                    <div className="shrink-0 text-base text-gray-500 select-none sm:text-lg/6">
                      R$
                    </div>
                    <input
                      type="number"
                      name="price"
                      id="price"
                      className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-lg/6"
                      placeholder="Digite o valor em reais"
                      value={reais || ""} // Exibe o valor em reais ou vazio
                      onChange={(e) =>
                        handleReaisChange(Number(e.target.value) || 0)
                      } // Atualiza o valor em reais
                    />
                  </div>
                </div>
              </div>

              {/* Campo para inserir a quantidade de milhas */}
              <div className="flex flex-col items-center w-1/2">
                <p className="text-lg font-semibold text-center">
                  Quantidade de Milhas
                </p>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                    <input
                      type="number"
                      name="price"
                      id="price"
                      className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-lg/6"
                      placeholder="Digite o valor de milhas"
                      value={miles || ""} // Exibe o valor em milhas ou vazio
                      onChange={(e) =>
                        handleMilesChange(Number(e.target.value) || 0)
                      } // Atualiza o valor em milhas
                    />
                    <div className="shrink-1 pr-2 text-lg text-gray-500 select-none sm:text-lg/6">
                      Pts
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Exibe a mensagem de erro, se houver */}
            {error && (
              <p className="text-red-500 text-center mt-1 bg-browned rounded-md p-2">
                {error}
              </p>
            )}
          </div>
        }
        buttons={[
          { label: "Cancelar", onClick: onClose, variant: "secondary" },
          { label: "Comprar", onClick: handleSubmit, variant: "primary" },
        ]}
      />

      {/* Diálogo de confirmação */}
      <CustomOrangeDialog
        isOpen={isConfirmDialogOpen} // Controla se o diálogo de confirmação está visível
        onClose={() => setIsConfirmDialogOpen(false)} // Fecha o diálogo de confirmação
        title="Confirmar Compra"
        titleCentered
        body={
          <p className="text-center">
            Você está prestes a comprar <strong>{miles}</strong> milhas por{" "}
            <strong>R${reais}</strong>. Deseja continuar?
          </p>
        }
        buttons={[
          {
            label: "Cancelar",
            onClick: () => setIsConfirmDialogOpen(false),
            variant: "secondary",
          },
          {
            label: "Confirmar",
            onClick: handleConfirmPurchase,
            variant: "primary",
          },
        ]}
      />
    </>
  );
};

export default BuyMilesDialog;
