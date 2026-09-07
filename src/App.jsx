import { useState } from 'react';

// === ADIÇÕES DO VERCEL ANALYTICS ===
import { Analytics } from '@vercel/analytics/react';
import { track } from '@vercel/analytics';
// ===================================

import { getTheme } from './data/theme';
import { useBrailleGerador } from './hooks/useBrailleGerador';
import { useBlocoIonico } from './hooks/useBlocoIonico';

import Header from './components/layout/Header';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';

// === IMPORTAÇÕES DAS ABAS CENTRAIS ===
import GeradorBrailleTab from './tabs/GeradorBrailleTab';
import BlocosIonicosTab from './tabs/BlocosIonicosTab';
import SobreProjetoTab from './tabs/SobreProjetoTab';
import InstrucoesTab from './tabs/InstrucoesTab';
import SaibaMaisTab from './tabs/SaibaMaisTab';
import ParceriasTab from './tabs/ParceriasTab';
import EquipeTab from './tabs/EquipeTab';
import BugTab from './tabs/BugTab';

// === IMPORTAÇÕES DAS SUB ABS DE MATERIAIS DIDÁTICOS ===
import DadosRadioativosTab from './tabs/Materiais Didaticos/DadosRadioativosTab';
import GiroscopiosTab from './tabs/Materiais Didaticos/GiroscopiosTab';
import DadosIonicosTab from './tabs/Materiais Didaticos/DadosIonicosTab';
import ReguasQuimicasTab from './tabs/Materiais Didaticos/ReguasQuimicasTab';
import GeometriaMolecularTab from './tabs/Materiais Didaticos/GeometriaMolecularTab';
import CarimbosAtomicosTab from './tabs/Materiais Didaticos/CarimbosAtomicosTab';
import SpinnerElementarTab from './tabs/Materiais Didaticos/SpinnerElementarTab';





// ============================================================================
// APP.JSX — Orquestrador principal do site
//
// Este arquivo NAO contem a logica nem o layout de cada aba: ele apenas 
//gerencia qual aba esta ativa, o tema de cores (compartilhado por todas as abas)
// e delega o conteudo para o componente correspondente em `src/tabs/`.
// Para mexer em uma aba especifica, edite o arquivo dela em `src/tabs/`:
//   Gerador Braille  -> src/tabs/GeradorBrailleTab.jsx  (+ src/hooks/useBrailleGerador.js)
//   Blocos Ionicos   -> src/tabs/BlocosIonicosTab.jsx   (+ src/hooks/useBlocoIonico.js)
//   Sobre o Projeto  -> src/tabs/SobreProjetoTab.jsx
//   Instrucoes       -> src/tabs/InstrucoesTab.jsx
//   Saiba Mais       -> src/tabs/SaibaMaisTab.jsx
//   Parcerias        -> src/tabs/ParceriasTab.jsx
//   Equipe           -> src/tabs/EquipeTab.jsx
//   Achou um Bug?    -> src/tabs/BugTab.jsx
//
// Para adicionar/remover/reordenar uma aba no menu, edite `src/data/tabs.js`
// e adicione o `case` correspondente no `switch` abaixo.
// ============================================================================

export default function App() {
  const [activeTab, setActiveTab] = useState('gerador');
  const [corPrincipal, setCorPrincipal] = useState('#511576');
  const theme = getTheme(corPrincipal);

  // Rotacao automatica do visualizador 3D: estado unico compartilhado entre
  // as abas "Gerador Braille" e "Blocos Ionicos" (preserva o comportamento
  // original do site, em que ligar a rotacao numa aba mantem o estado ao
  // trocar de aba).
  const [autoRotate, setAutoRotate] = useState(false);

  // Todo o estado/logica de cada aba geradora vive em seu respectivo hook.
  const gerador = useBrailleGerador();
  const ionico = useBlocoIonico(corPrincipal);

  // === NOVA FUNÇÃO PARA RASTREAR A TROCA DE ABAS ===
  const handleTrocarAba = (novaAba) => {
    setActiveTab(novaAba); // Muda a aba visualmente
    track('Acesso_Aba', { nome_da_aba: novaAba }); // Envia o dado silenciosamente para a Vercel
  };
  // =================================================

const renderConteudoAba = () => {
    switch (activeTab) {
      case 'gerador':
        return ( <GeradorBrailleTab theme={theme} corPrincipal={corPrincipal} setCorPrincipal={setCorPrincipal} autoRotate={autoRotate} setAutoRotate={setAutoRotate} gerador={gerador} /> );
        
      case 'ionicos':
        return ( <BlocosIonicosTab theme={theme} corPrincipal={corPrincipal} setCorPrincipal={setCorPrincipal} autoRotate={autoRotate} setAutoRotate={setAutoRotate} ionico={ionico} /> );

      // === SUB-ABAS DE MATERIAIS DIDÁTICOS ===
      case 'dados-radioativos':
        return <EmDesenvolvimentoTab theme={theme} nomeMaterial="Dados Radioativos" />;
        
      case 'giroscopios':
        return <EmDesenvolvimentoTab theme={theme} nomeMaterial="Giroscópios Atômicos" />;
        
      case 'dados-ionicos':
        return <EmDesenvolvimentoTab theme={theme} nomeMaterial="Dados Iônicos" />;
        
      case 'reguas':
        return <EmDesenvolvimentoTab theme={theme} nomeMaterial="Réguas Químicas" />;
        
      case 'geometria':
        return <EmDesenvolvimentoTab theme={theme} nomeMaterial="Kit Geometria Molecular" />;
        
      case 'carimbos':
        return <EmDesenvolvimentoTab theme={theme} nomeMaterial="Carimbos Atômicos" />;
        
      case 'spinner':
        return <EmDesenvolvimentoTab theme={theme} nomeMaterial="Spinner Elementar" />;
        
      case 'sobre':
        return ( <SobreProjetoTab theme={theme} corPrincipal={corPrincipal} setCorPrincipal={setCorPrincipal} /> );
        
      case 'instrucoes':
        return ( <InstrucoesTab theme={theme} corPrincipal={corPrincipal} setCorPrincipal={setCorPrincipal} /> );
        
      case 'saiba-mais':
        return ( <SaibaMaisTab theme={theme} corPrincipal={corPrincipal} setCorPrincipal={setCorPrincipal} /> );
        
      case 'parcerias':
        return ( <ParceriasTab theme={theme} corPrincipal={corPrincipal} setCorPrincipal={setCorPrincipal} /> );
        
      case 'equipe':
        return ( <EquipeTab theme={theme} corPrincipal={corPrincipal} setCorPrincipal={setCorPrincipal} /> );
        
      case 'bug':
        return ( <BugTab theme={theme} corPrincipal={corPrincipal} setCorPrincipal={setCorPrincipal} /> );
        
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans text-slate-800 transition-colors duration-500" style={{ backgroundColor: theme.fundoPrincipal }}>
      <Header theme={theme} />
      
      {/* Aqui substituímos setActiveTab por handleTrocarAba */}
      <Navigation activeTab={activeTab} setActiveTab={handleTrocarAba} theme={theme} />

      <main className="flex-grow p-4 sm:p-6 w-full max-w-5xl mx-auto">
        {renderConteudoAba()}
      </main>

      <Footer theme={theme} />
      
      {/* === ADIÇÃO DO COMPONENTE ANALYTICS DO VERCEL === */}
      <Analytics />
    </div>
  );
}
