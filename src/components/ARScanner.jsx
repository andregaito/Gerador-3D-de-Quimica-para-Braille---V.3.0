import React, { useEffect, useState, useRef } from 'react';
import './ARScanner.css'; 

const modelosCartas = {
  0: '/Modelos-3D-Cartas/ligacao-covalente.glb',
  1: '/Modelos-3D-Cartas/escudo-de-chumbo.glb',
};

const ARScanner = ({ aoFechar }) => {
  const [alvoAtivo, setAlvoAtivo] = useState(null);
  const cenaRef = useRef(null);

  useEffect(() => {
    // Bloqueia a rolagem da interface web original
    document.body.classList.add('ar-active');

    const cenaEl = cenaRef.current;
    if (!cenaEl) return;

    const handleArReady = () => console.log("MindAR pronto e câmera ativa.");
    cenaEl.addEventListener('arReady', handleArReady);

    const targets = cenaEl.querySelectorAll('[mindar-image-target]');
    
    targets.forEach((target, index) => {
      target.addEventListener('targetFound', () => setAlvoAtivo(index));
      target.addEventListener('targetLost', () => setAlvoAtivo((prev) => (prev === index ? null : prev)));
    });

    return () => {
      document.body.classList.remove('ar-active');
      cenaEl.removeEventListener('arReady', handleArReady);

      if (cenaEl.systems && cenaEl.systems['mindar-image-system']) {
        cenaEl.systems['mindar-image-system'].stop();
      }

      const videoEl = document.querySelector('video');
      if (videoEl && videoEl.srcObject) {
        const tracks = videoEl.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
        videoEl.remove();
      }
    };
  }, []);

  return (
    <div className="ar-scanner-container">
      <button 
        type="button"
        onClick={aoFechar}
        aria-label="Fechar Câmera de Realidade Aumentada"
        className="ar-close-button"
      >
        ✕ Fechar Câmera AR
      </button>

      <a-scene
        ref={cenaRef}
        mindar-image="imageTargetSrc: /marcadores/baralho.mind; autoStart: true; uiLoading: yes; uiError: yes;"
        color-space="sRGB"
        renderer="colorManagement: true, physicallyCorrectLights"
        vr-mode-ui="enabled: false"
        device-orientation-permission-ui="enabled: false"
      >
        <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

        {Object.keys(modelosCartas).map((key) => {
          const index = parseInt(key, 10);
          const estaVisivel = alvoAtivo === index;

          return (
            <a-entity key={index} mindar-image-target={`targetIndex: ${index}`}>
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
