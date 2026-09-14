import React, { useState } from 'react';
import ARScanner from '../../../components/ARScanner';

const BlindagemDeChumboPage = () => {
  const [cameraAtiva, setCameraAtiva] = useState(false);

  return (
    <div style={{ padding: '20px' }}>
      {cameraAtiva ? (
        <ARScanner cartaId="blindagem-de-chumbo" aoFechar={() => setCameraAtiva(false)} />
      ) : (
        <div>
          <h1>Carta: Escudo de Blindagem de Chumbo</h1>
          <p>Princípio químico: Alta densidade e atenuação de radiação ionizante...</p>
          <button onClick={() => setCameraAtiva(true)}>
            📱 Ativar Realidade Aumentada da Carta
          </button>
        </div>
      )}
    </div>
  );
};

export default BlindagemDeChumboPage;
