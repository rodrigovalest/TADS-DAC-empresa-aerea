import React from "react";

// Interface para os botões do diálogo
// label: Texto do botão
// onClick: Função chamada ao clicar no botão
// variant: Variação de estilo do botão
interface DialogButton {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary"; // Permite variações de estilo
}

// Propriedades do componente `CustomDialog`
// isOpen: Controla se o diálogo está aberto
// onClose: Função para fechar o diálogo
// title: Título do diálogo
// body: Conteúdo do diálogo
// buttons: Botões do diálogo
// titleCentered: Define se o título deve ser centralizado
interface CustomDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  body?: React.ReactNode;
  buttons?: DialogButton[];
  titleCentered?: boolean;
}

const CustomOrangeDialog: React.FC<CustomDialogProps> = ({
  isOpen,
  title,
  body,
  buttons = [],
  titleCentered,
}) => {
  if (!isOpen) return null; // Evita renderização desnecessária

  return (
    // Diálogo principal (fundo escuro com opacidade)
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      {/* Caixa do diálogo */}
      <div className="bg-oranged text-white p-6 rounded-xl shadow-lg w-auto max-w-3xl">
        {/* Título do diálogo */}
        <h2
          className={`text-lg font-semibold ${
            titleCentered ? "text-center" : "" // Centraliza o título, se necessário
          }`}
        >
          {/* Exibe o título ou um padrão, se não for fornecido */}
          {title || "Título Padrão"}
        </h2>
        {/* Corpo do diálogo */}
        <div className="mt-4">{body}</div>
        {/* Botões do diálogo */}
        <div className="flex flex-col-reverse md:flex-row justify-around gap-2 mt-6">
          {buttons.map((btn, index) => (
            <button
              key={index} // Chave única para cada botão
              onClick={btn.onClick} // Função chamada ao clicar no botão
              className={`px-4 py-2 rounded-md transition ${
                btn.variant === "secondary"
                  ? "bg-browned hover:bg-yellow-600"
                  : "bg-browned hover:bg-green-600"
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomOrangeDialog;
