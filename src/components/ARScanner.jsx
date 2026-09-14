import React, { useEffect, useState, useRef } from 'react';

// Dicionário mapeando o índice numérico do MindAR para o arquivo .glb correspondente
const modelosCartas = {
  0: '/Modelos-3D-Cartas/ligacao-covalente.glb',
  1: '/Modelos-3D-Cartas/escudo-de-chumbo.glb',
  // Adicione novas cartas aqui seguindo a ordem em que foram compiladas no baralho.mind
};

const ARScanner = ({ aoFechar }) => {
  const [alvoAtivo, setAlvoAtivo] = useState(null);
  const cenaRef = useRef(null);

  useEffect(() => {
    const cenaEl = cenaRef.current;
    if (!cenaEl) return;

    const handleArReady = () => {
      console.log("MindAR pronto e câmera ativa.");
    };

    cenaEl.addEventListener('arReady', handleArReady);

    const targets = cenaEl.querySelectorAll('[mindar-image-target]');
    
    targets.forEach((target, index) => {
      target.addEventListener('targetFound', () => {
        console.log(`Carta índice ${index} detectada!`);
        setAlvoAtivo(index);
      });

      target.addEventListener('targetLost', () => {
        console.log(`Carta índice ${index} perdida.`);
        setAlvoAtivo((prev) => (prev === index ? null : prev));
      });
    });

    // Função de limpeza executada ao fechar o componente
    return () => {
      cenaEl.removeEventListener('arReady', handleArReady);

      // 1. Interrompe o sistema de AR do MindAR
      if (cenaEl.systems && cenaEl.systems['mindar-image-system']) {
        cenaEl.systems['mindar-image-system'].stop();
      }

      // 2. Encerra a transmissão do stream da câmera no navegador
      const videoEl = document.querySelector('video');
      if (videoEl && videoEl.srcObject) {
        const tracks = videoEl.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
        videoEl.remove();
      }
    };
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 9999, overflow: 'hidden' }}>
      
      {/* Botão de Fechar com atributos de acessibilidade */}
      <button 
        type="button"
        onClick={aoFechar}
        aria-label="Fechar Câmera de Realidade Aumentada"
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          zIndex: 10000,
          background: '#ef4444',
          color: 'white',
          border: 'none',
          padding: '10px 18px',
          borderRadius: '8px',
          fontWeight: 'bold',
          cursor: 'pointer',
          boxShadow: '0 4px 6px rgba(0,0,0,0.2)'
        }}
      >
        ✕ Fechar Câmera AR
      </button>

      {/* Cena principal do A-Frame integrada ao MindAR */}
      <a-scene
        ref={cenaRef}
        mindar-image="imageTargetSrc: /marcadores/baralho.mind; autoStart: true; uiLoading: yes; uiError: yes;"
        color-space="sRGB"
        renderer="colorManagement: true, physicallyCorrectLights"
        vr-mode-ui="enabled: false"
        device-orientation-permission-ui="enabled: false"
      >
        <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

        {/* Correção no mapeamento das chaves do objeto */}
        {Object.keys(modelosCartas).map((key) => {
          const index = parseInt(key, 10);
          const estaVisivel = alvoAtivo === index;

          return (
            <a-entity key={index} mindar-image-target={`targetIndex: ${index}`}>
              {/* Renderização condicional para carregamento sob demanda do modelo */}
              {estaVisivel && (
                <a-gltf-model
                  src={modelosCartas[index]}
                  position="0 0 0"
                  scale="0.6 0.6 0.6"
                  rotation="0 0 0"
                  animation="property: rotation; to: 0 360 0; loop: true; dur: 6000"
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
