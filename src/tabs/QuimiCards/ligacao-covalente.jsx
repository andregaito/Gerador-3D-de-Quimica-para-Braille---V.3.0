import React, { useState } from 'react';
import ARScanner from '../../components/ARScanner';
import ColorTester from '../../components/common/ColorTester';
import simboloAtaque from '../../assets/QuimiCards/Simbolo Cartas de Ataque.png';

const LigacaoCovalenteTab = ({ theme, corPrincipal, setCorPrincipal }) => {
  const [cameraAtiva, setCameraAtiva] = useState(false);

  if (cameraAtiva) {
    return <ARScanner aoFechar={() => setCameraAtiva(false)} />;
  }

  return (
    <div
      id="painel-ligacao-covalente"
      role="tabpanel"
      aria-label="Carta Ligação Covalente"
      className="relative p-8 sm:p-12 rounded-xl shadow-sm transition-colors duration-500 text-slate-700 fade-in space-y-8 text-left overflow-hidden"
      style={{ backgroundColor: theme.fundoCaixa, border: `2px solid ${theme.bordaGeral}` }}
    >
      
      {/* Faixa Vermelha */}
      <div className="-mx-8 sm:-mx-12 -mt-8 sm:-mt-12 px-8 sm:px-12 pt-8 sm:pt-12 pb-6 bg-[#c84327] relative border-b border-[#a8321b]">
        
        <div className="absolute top-6 right-6 sm:top-8 sm:right-8 z-10">
          <ColorTester corPrincipal={corPrincipal} setCorPrincipal={setCorPrincipal} />
        </div>

        <div className="pr-16 sm:pr-[140px] flex items-center gap-5 sm:gap-6">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center p-2.5 shrink-0 shadow-sm">
            <img
              src={simboloAtaque}
              alt="Símbolo de Carta de Ataque"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">Ligação Covalente</h2>
            <p className="text-lg font-medium mt-2 text-white/95 text-justify">
              Compartilhamento Forçado
            </p>
          </div>
        </div>
      </div>

      {/* Bloco comparativo */}
      <div className="border-l-4 border-[#c84327] bg-slate-50 p-5 rounded-r-xl space-y-3 shadow-inner">
        <p className="leading-relaxed text-justify text-slate-800">
          <strong className="font-bold text-[#c84327]">No QuimiCards:</strong> Você usou esta carta para obrigar um jogador adversário a somar os pontos dele com os seus para depois dividir, ou seja, houve um “compartilhamento de pontos”.
        </p>
        <p className="leading-relaxed text-justify text-slate-800">
          <strong className="font-bold text-[#c84327]">Na Química:</strong> Numa ligação covalente ocorre o mesmo processo, dois átomos dividem/compartilham seus elétrons para ficarem estáveis.
        </p>
      </div>

      {/* Seção: O que acontece? */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-[#c84327]">O que acontece?</h3>

        {/* Diagrama da Ligação Covalente Animado (O2) em SVG */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center overflow-hidden">
          <svg viewBox="0 0 500 420" className="w-full max-w-2xl h-auto" aria-label="Diagrama animado de ligação covalente entre dois átomos de oxigênio formando O2">
            <style>
              {`
                .orbit-slow { animation: spin 8s linear infinite; }
                .orbit-fast { animation: spin 4s linear infinite; }
                .orbit-reverse { animation: spin-reverse 8s linear infinite; }
                .orbit-fast-reverse { animation: spin-reverse 4s linear infinite; }
                
                @keyframes spin { 100% { transform: rotate(360deg); } }
                @keyframes spin-reverse { 100% { transform: rotate(-360deg); } }
                
                .left-center { transform-origin: 170px 200px; }
                .right-center { transform-origin: 330px 200px; }
              `}
            </style>

            {/* Órbitas - Oxigênio Esquerdo */}
            <circle cx="170" cy="200" r="60" fill="none" stroke="#a3a3a3" strokeWidth="2" />
            <circle cx="170" cy="200" r="140" fill="none" stroke="#a3a3a3" strokeWidth="2" />

            {/* Órbitas - Oxigênio Direito */}
            <circle cx="330" cy="200" r="60" fill="none" stroke="#a3a3a3" strokeWidth="2" />
            <circle cx="330" cy="200" r="140" fill="none" stroke="#a3a3a3" strokeWidth="2" />

            {/* Núcleo Esquerdo */}
            <circle cx="170" cy="200" r="45" fill="#cf6a52" stroke="#000" strokeWidth="1.5" />
            <text x="155" y="212" fontSize="36" fontFamily="Arial, sans-serif" textAnchor="middle" fill="#1a1a1a" fontWeight="bold">O</text>
            <text x="135" y="195" fontSize="14" fontFamily="Arial, sans-serif" textAnchor="middle" fill="#1a1a1a">16</text>
            <text x="135" y="215" fontSize="14" fontFamily="Arial, sans-serif" textAnchor="middle" fill="#1a1a1a">8</text>

            {/* Núcleo Direito */}
            <circle cx="330" cy="200" r="45" fill="#cf6a52" stroke="#000" strokeWidth="1.5" />
            <text x="345" y="212" fontSize="36" fontFamily="Arial, sans-serif" textAnchor="middle" fill="#1a1a1a" fontWeight="bold">O</text>
            <text x="365" y="195" fontSize="14" fontFamily="Arial, sans-serif" textAnchor="middle" fill="#1a1a1a">16</text>
            <text x="365" y="215" fontSize="14" fontFamily="Arial, sans-serif" textAnchor="middle" fill="#1a1a1a">8</text>

            {/* Elétrons Esquerdos (Amarelo) */}
            <g className="orbit-fast left-center">
              <circle cx="170" cy="140" r="8" fill="#ebd445" />
              <circle cx="170" cy="260" r="8" fill="#ebd445" />
            </g>
            <g className="orbit-slow left-center">
              <circle cx="170" cy="60" r="8" fill="#ebd445" />
              <circle cx="291.2" cy="130" r="8" fill="#ebd445" />
              <circle cx="291.2" cy="270" r="8" fill="#ebd445" />
              <circle cx="170" cy="340" r="8" fill="#ebd445" />
              <circle cx="48.8" cy="270" r="8" fill="#ebd445" />
              <circle cx="48.8" cy="130" r="8" fill="#ebd445" />
            </g>

            {/* Elétrons Direitos (Azul) */}
            <g className="orbit-fast-reverse right-center">
              <circle cx="330" cy="140" r="8" fill="#1d9ca9" />
              <circle cx="330" cy="260" r="8" fill="#1d9ca9" />
            </g>
            <g className="orbit-reverse right-center" style={{ animationDelay: '-1s' }}>
              <circle cx="330" cy="60" r="8" fill="#1d9ca9" />
              <circle cx="451.2" cy="130" r="8" fill="#1d9ca9" />
              <circle cx="451.2" cy="270" r="8" fill="#1d9ca9" />
              <circle cx="330" cy="340" r="8" fill="#1d9ca9" />
              <circle cx="208.8" cy="270" r="8" fill="#1d9ca9" />
              <circle cx="208.8" cy="130" r="8" fill="#1d9ca9" />
            </g>

            {/* Representação da Fómula Estrutural */}
            <text x="250" y="400" textAnchor="middle" fill="#0f172a" fontSize="36" fontWeight="900" letterSpacing="2">
              O=O
            </text>
          </svg>
        </div>
      </div>

      {/* Seção: Em resumo */}
      <div className="space-y-3 border-t border-slate-200 pt-6">
        <h3 className="text-xl font-bold text-[#c84327]">Em resumo:</h3>
        <p className="leading-relaxed text-justify text-slate-700">
          Na ligação covalente, os átomos compartilham pares de elétrons da sua camada de valência para atingirem a estabilidade eletrônica (completando a regra do octeto com 8 elétrons na camada externa).
        </p>
      </div>

      {/* Botão para Ativação da Câmera AR */}
      <div className="pt-2 flex justify-center sm:justify-start">
        <button
          type="button"
          onClick={() => setCameraAtiva(true)}
          className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:scale-[1.02] active:scale-[0.98]"
        >
          <span className="text-xl" aria-hidden="true">📱</span>
          Ativar Realidade Aumentada (AR)
        </button>
      </div>
    </div>
  );
};

export default LigacaoCovalenteTab;
