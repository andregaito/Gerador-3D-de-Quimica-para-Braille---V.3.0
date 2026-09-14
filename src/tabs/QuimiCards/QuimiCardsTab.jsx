import React, { useState } from 'react';
import ARScanner from '../../components/ARScanner';

const QuimiCardsTab = ({ 
  carta = { 
    titulo: "Carta de Habilidade: Ligação Covalente", 
    descricao: "Princípio químico: Compartilhamento de pares de elétrons entre átomos..." 
  } 
}) => {
  const [cameraAtiva, setCameraAtiva] = useState(false);

  return (
    <main className="p-5 max-w-3xl mx-auto">
      {cameraAtiva ? (
        <ARScanner aoFechar={() => setCameraAtiva(false)} />
      ) : (
        <div className="flex flex-col items-start gap-4">
          <h1 className="text-2xl font-bold text-gray-900">{carta.titulo}</h1>
          <p className="text-gray-700 leading-relaxed">{carta.descricao}</p>

          <button
            type="button"
            onClick={() => setCameraAtiva(true)}
            aria-label="Ativar scanner de Realidade Aumentada"
            className="mt-4 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg shadow transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <span aria-hidden="true">📱</span>
            Ativar Realidade Aumentada (AR)
          </button>
        </div>
      )}
    </main>
  );
};

export default QuimiCardsTab;
