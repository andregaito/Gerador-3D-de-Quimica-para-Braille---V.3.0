import React, { useState } from 'react';
import ARScanner from '../../components/ARScanner'; // Ajuste a quantidade de '../' conforme a profundidade da pasta

const EscudoDeChumbo = () => {
  const [cameraAtiva, setCameraAtiva] = useState(false);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc', padding: '24px 16px' }}>
      
      {/* Exibição condicional: se a câmera estiver ativa, renderiza a tela cheia do WebAR */}
      {cameraAtiva ? (
        <ARScanner 
          cartaId="escudo-de-chumbo" 
          aoFechar={() => setCameraAtiva(false)} 
        />
      ) : (
        <main style={{ maxWidth: '768px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Botão de retorno para a listagem do QuimiCards */}
          <nav>
            <button 
              onClick={() => window.history.back()}
              style={{
                background: 'transparent',
                color: '#94a3b8',
                border: '1px solid #334155',
                padding: '8px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              ← Voltar ao QuimiCards
            </button>
          </nav>

          {/* Cabeçalho da Carta */}
          <header style={{ borderBottom: '1px solid #334155', paddingBottom: '16px' }}>
            <span style={{ color: '#38bdf8', fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase' }}>
              Carta de Habilidade / Defesa
            </span>
            <h1 style={{ fontSize: '28px', color: '#f1f5f9', marginTop: '4px' }}>
              Escudo de Chumbo
            </h1>
          </header>

          {/* Ação Principal: Ativar AR */}
          <section style={{ textAlign: 'center', background: '#1e293b', padding: '20px', borderRadius: '12px', border: '1px solid #334155' }}>
            <p style={{ marginBottom: '16px', color: '#cbd5e1', fontSize: '15px' }}>
              Aponte a câmera para a carta física para visualizar a estrutura tridimensional e a simulação de atenuação de radiação.
            </p>
            <button
              onClick={() => setCameraAtiva(true)}
              style={{
                backgroundColor: '#0284c7',
                color: '#ffffff',
                border: 'none',
                padding: '14px 28px',
                fontSize: '16px',
                fontWeight: 'bold',
                borderRadius: '8px',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(2, 132, 199, 0.4)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              📷 Abrir Câmera em Realidade Aumentada
            </button>
          </section>

          {/* Conteúdo Científico da Carta */}
          <article style={{ display: 'flex', flexDirection: 'column', gap: '16px', lineHeight: '1.6' }}>
            <h2 style={{ fontSize: '20px', color: '#38bdf8' }}>Princípio Químico e Físico</h2>
            <p style={{ color: '#94a3b8' }}>
              O chumbo (<strong style={{ color: '#f8fafc' }}>Pb</strong>, número atômico Z = 82) possui alta densidade (11,34 g/cm³) e elevada seção de choque para absorção de radiação ionizante, como raios gama e raios X.
            </p>
            
            <h2 style={{ fontSize: '20px', color: '#38bdf8' }}>Mecanismo de Atenuação</h2>
            <p style={{ color: '#94a3b8' }}>
              Devido ao seu alto número atômico, a interação da radiação com os elétrons das camadas internas do átomo de chumbo ocorre predominantemente por <strong style={{ color: '#f8fafc' }}>Efeito Fotoelétrico</strong> e <strong style={{ color: '#f8fafc' }}>Espalhamento Compton</strong>, reduzindo a intensidade do feixe incidente.
            </p>

            <div style={{ backgroundColor: '#0f172a', borderLeft: '4px solid #0284c7', padding: '12px 16px', marginTop: '8px' }}>
              <h3 style={{ fontSize: '16px', color: '#f1f5f9', margin: 0 }}>Efeito no Jogo:</h3>
              <p style={{ color: '#cbd5e1', margin: '4px 0 0 0', fontSize: '14px' }}>
                Anula o dano de ataques baseados em decaimento radioativo (alfa, beta ou gama) desferidos contra o jogador nesta rodada.
              </p>
            </div>
          </article>

        </main>
      )}
    </div>
  );
};

export default EscudoDeChumbo;
