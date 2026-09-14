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
      className="relative p-6 sm:p-10 rounded-xl shadow-sm transition-colors duration-500 text-slate-700 fade-in space-y-8 text-left max-w-4xl mx-auto"
      style={{ backgroundColor: theme.fundoCaixa, border: `2px solid ${theme.bordaGeral}` }}
    >
      {/* Ícone do seletor de cores com posicionamento padronizado */}
      <div className="absolute top-6 right-6 sm:top-8 sm:right-8 z-10">
        <ColorTester corPrincipal={corPrincipal} setCorPrincipal={setCorPrincipal} />
      </div>

      {/* Banner da Carta (Cabeçalho Estilizado) */}
      <div className="bg-[#c84327] rounded-2xl p-4 sm:p-6 text-white flex items-center gap-4 sm:gap-6 shadow-md border border-red-800/20 pr-16 sm:pr-36">
        <div className="w-14 h-14 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center p-2 sm:p-3 shrink-0 shadow-inner">
          <img
            src={simboloAtaque}
            alt="Símbolo de Carta de Ataque"
            className="w-full h-full object-contain"
          />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
            Ligação Covalente
          </h2>
          <p className="text-base sm:text-xl font-medium text-amber-100">
            Compartilhamento Forçado
          </p>
        </div>
      </div>

      {/* Bloco comparativo: Regra no QuimiCards vs Princípio na Química */}
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

        {/* Diagrama da Ligação Covalente (O2) em SVG */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center">
          <svg
            viewBox="0 0 500 240"
            className="w-full max-w-lg h-auto"
            aria-label="Diagrama de ligação covalente entre dois átomos de oxigênio formando O2"
          >
            {/* Camadas eletrônicas (Órbitas) Átomo 1 */}
            <circle cx="170" cy="110" r="45" fill="none" stroke="#cbd5e1" strokeWidth="1.5" />
            <circle cx="170" cy="110" r="80" fill="none" stroke="#94a3b8" strokeWidth="1.5" />

            {/* Camadas eletrônicas (Órbitas) Átomo 2 */}
            <circle cx="270" cy="110" r="45" fill="none" stroke="#cbd5e1" strokeWidth="1.5" />
            <circle cx="270" cy="110" r="80" fill="none" stroke="#94a3b8" strokeWidth="1.5" />

            {/* Núcleo Átomo 1 */}
            <circle cx="170" cy="110" r="24" fill="#c84327" />
            <text x="170" y="103" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">16</text>
            <text x="170" y="114" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">8</text>
            <text x="170" y="125" textAnchor="middle" fill="white" fontSize="18" fontWeight="extrabold">O</text>

            {/* Núcleo Átomo 2 */}
            <circle cx="270" cy="110" r="24" fill="#c84327" />
            <text x="270" y="103" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">16</text>
            <text x="270" y="114" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">8</text>
            <text x="270" y="125" textAnchor="middle" fill="white" fontSize="18" fontWeight="extrabold">O</text>

            {/* Elétrons não compartilhados Átomo 1 (Amarelos) */}
            <circle cx="170" cy="30" r="6" fill="#eab308" />
            <text x="170" y="22" textAnchor="middle" fontSize="10" fill="#64748b"></text>
            <circle cx="90" cy="110" r="6" fill="#eab308" />
            <circle cx="170" cy="190" r="6" fill="#eab308" />
            <circle cx="113" cy="53" r="6" fill="#eab308" />

            {/* Elétrons não compartilhados Átomo 2 (Azuis) */}
            <circle cx="270" cy="30" r="6" fill="#0284c7" />
            <circle cx="350" cy="110" r="6" fill="#0284c7" />
            <circle cx="270" cy="190" r="6" fill="#0284c7" />
            <circle cx="327" cy="167" r="6" fill="#0284c7" />

            {/* Elétrons Compartilhados na Intersecção */}
            <circle cx="220" cy="80" r="6" fill="#0284c7" />
            <circle cx="220" cy="100" r="6" fill="#eab308" />
            <circle cx="220" cy="120" r="6" fill="#0284c7" />
            <circle cx="220" cy="140" r="6" fill="#eab308" />

            {/* Representação da Fómula Estrutural */}
            <text x="220" y="225" textAnchor="middle" fill="#0f172a" fontSize="28" fontWeight="900" letterSpacing="2">
              O=O
            </text>

            {/* Distribuição Eletrônica / Diagrama */}
            <g transform="translate(380, 40)">
              <text x="0" y="20" fontSize="14" fontWeight="bold" fill="#334155">1K²</text>
              <line x1="30" y1="20" x2="60" y2="5" stroke="#000" strokeWidth="2.5" />
              <polygon points="58,2 65,5 58,10" fill="#000" />
              <text x="70" y="20" fontSize="12" fontWeight="bold" fill="#334155">s</text>

              <text x="0" y="55" fontSize="14" fontWeight="bold" fill="#334155">2L⁸</text>
              <line x1="30" y1="55" x2="60" y2="40" stroke="#000" strokeWidth="2.5" />
              <polygon points="58,37 65,40 58,45" fill="#000" />
              <text x="70" y="55" fontSize="12" fontWeight="bold" fill="#334155">s p</text>

              <line x1="30" y1="60" x2="55" y2="80" stroke="#000" strokeWidth="2.5" />
              <polygon points="53,83 58,85 57,77" fill="#000" />

              <text x="25" y="115" fontSize="14" fontWeight="bold" fill="#0f172a">1s² 2p⁴</text>
            </g>
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
