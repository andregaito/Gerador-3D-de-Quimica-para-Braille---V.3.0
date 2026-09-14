import React from 'react';

const LigacaoCovalenteO2 = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-lg">
      <svg viewBox="0 0 500 420" className="w-full h-auto">
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
        <text x="155" y="212" fontSize="36" fontFamily="Arial, sans-serif" textAnchor="middle" fill="#1a1a1a">O</text>
        <text x="135" y="195" fontSize="14" fontFamily="Arial, sans-serif" textAnchor="middle" fill="#1a1a1a">16</text>
        <text x="135" y="215" fontSize="14" fontFamily="Arial, sans-serif" textAnchor="middle" fill="#1a1a1a">8</text>

        {/* Núcleo Direito */}
        <circle cx="330" cy="200" r="45" fill="#cf6a52" stroke="#000" strokeWidth="1.5" />
        <text x="345" y="212" fontSize="36" fontFamily="Arial, sans-serif" textAnchor="middle" fill="#1a1a1a">O</text>
        <text x="365" y="195" fontSize="14" fontFamily="Arial, sans-serif" textAnchor="middle" fill="#1a1a1a">16</text>
        <text x="365" y="215" fontSize="14" fontFamily="Arial, sans-serif" textAnchor="middle" fill="#1a1a1a">8</text>

        {/* Elétrons Esquerdos (Amarelo) */}
        {/* Camada 1s² - 2 elétrons */}
        <g className="orbit-fast left-center">
          <circle cx="170" cy="140" r="8" fill="#ebd445" />
          <circle cx="170" cy="260" r="8" fill="#ebd445" />
        </g>
        {/* Camada 2s² 2p⁴ - 6 elétrons */}
        <g className="orbit-slow left-center">
          <circle cx="170" cy="60" r="8" fill="#ebd445" />
          <circle cx="291.2" cy="130" r="8" fill="#ebd445" />
          <circle cx="291.2" cy="270" r="8" fill="#ebd445" />
          <circle cx="170" cy="340" r="8" fill="#ebd445" />
          <circle cx="48.8" cy="270" r="8" fill="#ebd445" />
          <circle cx="48.8" cy="130" r="8" fill="#ebd445" />
        </g>

        {/* Elétrons Direitos (Azul) */}
        {/* Camada 1s² - 2 elétrons */}
        <g className="orbit-fast-reverse right-center">
          <circle cx="330" cy="140" r="8" fill="#1d9ca9" />
          <circle cx="330" cy="260" r="8" fill="#1d9ca9" />
        </g>
        {/* Camada 2s² 2p⁴ - 6 elétrons */}
        {/* animationDelay evita colisão visual perfeita no centro da ligação */}
        <g className="orbit-reverse right-center" style={{ animationDelay: '-1s' }}>
          <circle cx="330" cy="60" r="8" fill="#1d9ca9" />
          <circle cx="451.2" cy="130" r="8" fill="#1d9ca9" />
          <circle cx="451.2" cy="270" r="8" fill="#1d9ca9" />
          <circle cx="330" cy="340" r="8" fill="#1d9ca9" />
          <circle cx="208.8" cy="270" r="8" fill="#1d9ca9" />
          <circle cx="208.8" cy="130" r="8" fill="#1d9ca9" />
        </g>
      </svg>

      <div className="text-5xl font-extrabold mt-6 text-gray-800 tracking-widest">
        O=O
      </div>
    </div>
  );
};

export default LigacaoCovalenteO2;
