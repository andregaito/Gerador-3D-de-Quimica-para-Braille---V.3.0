import React, { useState } from 'react';
import ARScanner from '../../../components/ARScanner'; // ajuste o caminho relativo conforme sua árvore

const LigacaoCovalentePage = () => {
  const [cameraAtiva, setCameraAtiva] = useState(false);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      {cameraAtiva ? (
        <ARScanner aoFechar={() => setCameraAtiva(false)} />
      ) : (
        <div>
          <h1>Carta de Habilidade: Ligação Covalente</h1>
          <p>Princípio químico: Compartilhamento de pares de elétrons entre átomos...</p>
          
          <button 
            onClick={() => setCameraAtiva(true)}
            style={{
              background: '#2563eb',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '16px',
              cursor: 'pointer',
              marginTop: '20px'
            }}
          >
            📱 Ativar Realidade Aumentada (AR)
          </button>
        </div>
      )}
    </div>
  );
};

export default LigacaoCovalentePage;
