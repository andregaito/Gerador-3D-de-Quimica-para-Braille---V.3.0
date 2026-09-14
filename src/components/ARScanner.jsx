import React, { useEffect, useState, useRef } from 'react';

// Mapeia o índice do arquivo .mind para o caminho do respectivo .glb na pasta /public
const modelosMapeados = {
  0: '/modelos/sodio.glb',
  1: '/modelos/oxigenio.glb',
  // Continue o mapeamento conforme o número de cartas geradas no compilador MindAR
};

const ARScanner = () => {
  // Guarda o índice da carta atualmente visível na câmera
  const [alvoAtivo, setAlvoAtivo] = useState(null);
  const cenaRef = useRef(null);

  useEffect(() => {
    const elementoCena = cenaRef.current;
    if (!elementoCena) return;

    // Seleciona todas as entidades que funcionam como alvos no A-Frame
    const alvos = elementoCena.querySelectorAll('[mindar-image-target]');

    alvos.forEach((alvo, index) => {
      // Evento disparado pelo MindAR quando a carta entra no campo de visão
      alvo.addEventListener('targetFound', () => {
        console.log(`Carta índice ${index} encontrada.`);
        setAlvoAtivo(index);
      });

      // Evento disparado quando a carta sai do campo de visão
      alvo.addEventListener('targetLost', () => {
        console.log(`Carta índice ${index} perdida.`);
        setAlvoAtivo((estadoAnterior) => (estadoAnterior === index ? null : estadoAnterior));
      });
    });

    // Cleanup: remove os listeners quando o componente for desmontado
    return () => {
      alvos.forEach((alvo) => {
        alvo.removeEventListener('targetFound');
        alvo.removeEventListener('targetLost');
      });
    };
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative' }}>
      
      {/* Botão de retorno, útil se acessado via tag NFC */}
      <button 
        onClick={() => window.history.back()} 
        style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 999 }}
      >
        Voltar para a Carta
      </button>

      {/* Configuração da Cena do MindAR com A-Frame */}
      <a-scene
        ref={cenaRef}
        mindar-image="imageTargetSrc: /marcadores/baralho.mind; autoStart: true; uiLoading: no; uiError: no;"
        color-space="sRGB"
        renderer="colorManagement: true, physicallyCorrectLights"
        vr-mode-ui="enabled: false"
        device-orientation-permission-ui="enabled: false"
      >
        <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

        {/* Mapeia e renderiza as entidades de alvo (targets) */}
        {Object.keys(modelosMapeados).map((chave) => {
          const index = parseInt(chave, 10);
          const estaAtivo = alvoAtivo === index;

          return (
            <a-entity key={index} mindar-image-target={`targetIndex: ${index}`}>
              
              {/* Renderização Condicional: O <a-gltf-model> só é inserido na DOM se 'estaAtivo' for true.
                  Isso evita sobrecarga de memória carregando múltiplos arquivos .glb simultaneamente. */}
              {estaAtivo && (
                <a-gltf-model
                  src={modelosMapeados[index]}
                  position="0 0 0.1" // Eleva levemente o modelo acima da carta
                  scale="0.5 0.5 0.5" // Ajuste conforme a exportação do modelo
                  rotation="0 0 0"
                  // Adiciona uma animação de rotação básica nativa do A-Frame
                  animation="property: rotation; to: 0 360 0; loop: true; dur: 5000"
                ></a-gltf-model>
              )}

            </a-entity>
          );
        })}
      </a-scene>
    </div>
  );
};

export default ARScanner;
