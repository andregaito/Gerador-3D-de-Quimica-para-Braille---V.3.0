import React, { useState, useEffect } from 'react';
import ColorTester from '../../components/common/ColorTester';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DadosRadioativosTab = ({ theme, corPrincipal, setCorPrincipal }) => {
  const [quantidadeInicial, setQuantidadeInicial] = useState(() => {
    const salvo = sessionStorage.getItem('dados_rad_qtd_inicial');
    return salvo !== null ? Number(salvo) : 35;
  });

  const [facesRadioativas, setFacesRadioativas] = useState(() => {
    const salvo = sessionStorage.getItem('dados_rad_faces');
    return salvo !== null ? Number(salvo) : 1;
  });

  const [dadosExperimentais, setDadosExperimentais] = useState(() => {
    const salvo = sessionStorage.getItem('dados_rad_experimentais');
    if (salvo) {
      try {
        return JSON.parse(salvo);
      } catch (e) {
        // Fallback caso haja erro de parsing
      }
    }
    return Array.from({ length: 22 }, (_, i) => ({
      rodada: i,
      experimental: i === 0 ? 35 : '', 
    }));
  });

  useEffect(() => {
    sessionStorage.setItem('dados_rad_qtd_inicial', quantidadeInicial);
  }, [quantidadeInicial]);

  useEffect(() => {
    sessionStorage.setItem('dados_rad_faces', facesRadioativas);
  }, [facesRadioativas]);

  useEffect(() => {
    sessionStorage.setItem('dados_rad_experimentais', JSON.stringify(dadosExperimentais));
  }, [dadosExperimentais]);

  const handleInputChange = (index, value) => {
    const novosDados = [...dadosExperimentais];
    novosDados[index].experimental = value === '' ? '' : Number(value);
    setDadosExperimentais(novosDados);
  };

  const handleQuantidadeInicial = (e) => {
    const novoValor = Number(e.target.value);
    if (novoValor >= 0) {
      setQuantidadeInicial(novoValor);
      const novosDados = [...dadosExperimentais];
      novosDados[0].experimental = novoValor;
      setDadosExperimentais(novosDados);
    }
  };

  const handleJogarDados = () => {
    const indexVazio = dadosExperimentais.findIndex((d, idx) => idx > 0 && d.experimental === '');
    if (indexVazio === -1) return;

    const qtdAnterior = Number(dadosExperimentais[indexVazio - 1].experimental);
    if (isNaN(qtdAnterior) || qtdAnterior <= 0) return;

    const p = facesRadioativas / 6;
    let restantes = 0;
    
    for (let i = 0; i < qtdAnterior; i++) {
      if (Math.random() >= p) {
        restantes++;
      }
    }

    const novosDados = [...dadosExperimentais];
    novosDados[indexVazio].experimental = restantes;
    setDadosExperimentais(novosDados);
  };

  const handleReiniciarSimulacao = () => {
    const novosDados = Array.from({ length: 22 }, (_, i) => ({
      rodada: i,
      experimental: i === 0 ? quantidadeInicial : '',
    }));
    setDadosExperimentais(novosDados);
  };

  const obterCorComplementar = (cor) => {
    if (!cor) return '#10b981';
    const c = String(cor).toLowerCase();
    
    if (c.includes('purple') || c.includes('8b5cf6') || c.includes('a855f7') || c.includes('9333ea')) return '#22c55e';
    if (c.includes('green') || c.includes('22c55e') || c.includes('16a34a') || c.includes('15803d')) return '#8b5cf6';
    if (c.includes('blue') || c.includes('3b82f6') || c.includes('2563eb') || c.includes('1d4ed8')) return '#ef4444';
    if (c.includes('red') || c.includes('ef4444') || c.includes('dc2626') || c.includes('b91c1c')) return '#3b82f6';
    
    return '#f59e0b';
  };

  const corComplementar = obterCorComplementar(corPrincipal);

  const p = facesRadioativas / 6;
  const fracaoRestante = (6 - facesRadioativas) / 6;
  const lambda = facesRadioativas === 0 ? 0 : -Math.log(fracaoRestante);
  const meiaVida = facesRadioativas === 0 ? 'Infinita' : (Math.LN2 / lambda).toFixed(1);

  const dadosGrafico = dadosExperimentais.map((linha) => {
    const teorico = Number((quantidadeInicial * Math.exp(-lambda * linha.rodada)).toFixed(2));
    return {
      ...linha,
      teorico,
      experimentalDecaido: linha.experimental !== '' ? quantidadeInicial - linha.experimental : null
    };
  });

  let ultimaRodadaPreenchida = 0;
  for (let i = dadosGrafico.length - 1; i >= 0; i--) {
    if (dadosGrafico[i].experimental !== '') {
      ultimaRodadaPreenchida = i;
      break;
    }
  }
  const dadosFiltradosGrafico = dadosGrafico.slice(0, ultimaRodadaPreenchida + 1);

  const limiteYAxis = Math.ceil(quantidadeInicial * 1.15);
  const lambdaFormatado = lambda.toFixed(3).replace('.', ',');

  const proximoIndiceVazio = dadosExperimentais.findIndex((d, idx) => idx > 0 && d.experimental === '');
  const simulacaoConcluída = proximoIndiceVazio === -1 || (ultimaRodadaPreenchida > 0 && dadosGrafico[ultimaRodadaPreenchida].experimental === 0);

  let r2ValorCalculado = null;
  if (simulacaoConcluída && ultimaRodadaPreenchida > 0) {
    const pontosValidos = dadosFiltradosGrafico.filter(d => d.experimental !== '');
    const n = pontosValidos.length;
    if (n > 1) {
      const somaY = pontosValidos.reduce((acc, curr) => acc + curr.experimental, 0);
      const mediaY = somaY / n;

      let sqRes = 0;
      let sqTot = 0;

      pontosValidos.forEach(curr => {
        sqRes += Math.pow(curr.experimental - curr.teorico, 2);
        sqTot += Math.pow(curr.experimental - mediaY, 2);
      });

      if (sqTot > 0) {
        const r2 = 1 - (sqRes / sqTot);
        r2ValorCalculado = r2 >= 0 ? r2.toFixed(3).replace('.', ',') : '0,000';
      } else {
        r2ValorCalculado = '1,000';
      }
    }
  }

  return (
    <div id="painel-dados-radioativos" role="tabpanel" aria-label="Dados Radioativos" className="relative p-8 sm:p-12 rounded-xl shadow-sm transition-colors duration-500 text-slate-700 fade-in space-y-8 text-left" style={{ backgroundColor: theme.fundoCaixa, border: `2px solid ${theme.bordaGeral}` }}>
      
      <div className="border-b border-slate-200 pb-6">
        <div className="absolute top-6 right-6 sm:top-8 sm:right-8 z-10">
          <ColorTester corPrincipal={corPrincipal} setCorPrincipal={setCorPrincipal} />
        </div>
        <div className="pr-16 sm:pr-[140px]">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Dados Radioativos</h2>
          <p className="text-lg font-medium mt-2 transition-colors text-justify" style={{ color: theme.corPrincipal }}>
            Simulação estatística de tempo de meia-vida e decaimento nuclear.
          </p>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-800">O Experimento Estatístico</h3>
        <p className="leading-relaxed text-justify">
          O material didático "Dados Radioativos" é um experimento prático desenvolvido para ensinar os conceitos de decaimento radioativo e tempo de meia-vida através da estatística. Utilizando a probabilidade de rolagem de dados com faces customizadas, os estudantes conseguem visualizar e quantificar um fenômeno químico microscópico de forma tátil e totalmente interativa.
        </p>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-800">Mecânica do Jogo</h3>
        <p className="leading-relaxed text-justify">
          Para iniciar, o aluno pode utilizar dados físicos ou clicar no botão <strong>Jogar Dados</strong> para simular os lançamentos digitalmente. Todo dado que exibir o símbolo radioativo virado para cima representa um núcleo que sofreu decaimento e deve ser retirado. O processo é repetido a cada rodada até que todos os dados decaiam a zero.
        </p>
      </div>
      
      <div className="space-y-4 mb-8">
        <h3 className="text-xl font-bold text-slate-800">Análise Gráfica e Meia-Vida</h3>
        <p className="leading-relaxed text-justify">
          Com os resultados anotados após cada lançamento, o estudante constrói um gráfico relacionando o número de rodadas com os dados restantes para encontrar a meia-vida do conjunto. Ao término da simulação, o coeficiente de determinação (R²) é exibido para avaliar o nível de idealidade e aderência entre a curva experimental e o modelo teórico.
        </p>
      </div>

      <div className="pt-6 border-t border-slate-200">
        
        <div className="flex flex-col lg:flex-row items-center justify-between mb-8 bg-slate-50 p-5 rounded-lg border border-slate-200 shadow-sm gap-6">
          <h3 className="text-2xl font-bold text-slate-800">Configurações da Simulação</h3>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3">
              <label htmlFor="input-faces" className="font-semibold text-slate-700">Faces Radioativas:</label>
              <select
                id="input-faces"
                value={facesRadioativas}
                onChange={(e) => setFacesRadioativas(Number(e.target.value))}
                className="w-20 text-center border border-slate-300 rounded-md py-1.5 px-2 focus:outline-none focus:ring-2 transition-all font-bold bg-white"
                style={{ focusRingColor: corPrincipal }}
              >
                {[0, 1, 2, 3, 4, 5].map((val) => (
                  <option key={val} value={val}>{val}/6</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-3">
              <label htmlFor="input-qtd" className="font-semibold text-slate-700">Dados Iniciais (N):</label>
              <input
                id="input-qtd"
                type="number"
                min="1"
                value={quantidadeInicial}
                onChange={handleQuantidadeInicial}
                className="w-20 text-center border border-slate-300 rounded-md py-1.5 px-2 focus:outline-none focus:ring-2 transition-all font-bold"
                style={{ focusRingColor: corPrincipal }}
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleJogarDados}
                disabled={simulacaoConcluída}
                className={`flex items-center gap-2 px-4 py-2 rounded-md font-bold text-white shadow-sm transition-all ${simulacaoConcluída ? 'opacity-50 cursor-not-allowed bg-slate-400' : 'hover:opacity-90 active:scale-95'}`}
                style={{ backgroundColor: simulacaoConcluída ? undefined : corPrincipal }}
                title="Simular a próxima rodada de lançamento de dados"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                Jogar Dados
              </button>

              <button
                onClick={handleReiniciarSimulacao}
                className="px-3 py-2 rounded-md font-semibold text-slate-600 bg-white border border-slate-300 hover:bg-slate-100 transition-all text-sm"
                title="Reiniciar todos os dados da tabela"
              >
                Reiniciar
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          <div className="w-full lg:w-3/5 xl:w-2/3 flex flex-col gap-8">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 font-bold text-lg text-white" style={{ backgroundColor: corPrincipal }}>
                Conjunto de Dados: {facesRadioativas} Face{facesRadioativas !== 1 ? 's' : ''} Radioativa{facesRadioativas !== 1 ? 's' : ''}
              </div>
              <div className="divide-y divide-slate-200 text-sm sm:text-base">
                <div className="flex flex-col sm:flex-row justify-between px-6 py-4 hover:bg-slate-50 transition-colors">
                  <span className="font-semibold text-slate-700">Probabilidade de Decaimento (p)</span>
                  <span className="font-bold text-slate-900 mt-1 sm:mt-0">{facesRadioativas}/6 = {p.toFixed(4).replace('.', ',')}</span>
                </div>
                <div className="flex flex-col sm:flex-row justify-between px-6 py-4 hover:bg-slate-50 transition-colors">
                  <span className="font-semibold text-slate-700">Fração de Núcleos Restantes (1 - p)</span>
                  <span className="font-bold text-slate-900 mt-1 sm:mt-0">{6 - facesRadioativas}/6 = {fracaoRestante.toFixed(4).replace('.', ',')}</span>
                </div>
                <div className="flex flex-col sm:flex-row justify-between px-6 py-4 hover:bg-slate-50 transition-colors">
                  <span className="font-semibold text-slate-700">Constante de Decaimento (λ)</span>
                  <span className="font-bold text-slate-900 mt-1 sm:mt-0">λ = -ln({6 - facesRadioativas}/6) ≈ {lambdaFormatado}</span>
                </div>
                <div className="flex flex-col sm:flex-row justify-between px-6 py-4 hover:bg-slate-50 transition-colors">
                  <span className="font-semibold text-slate-700">Meia Vida (t<sub>1/2</sub>)</span>
                  <span className="font-bold text-slate-900 mt-1 sm:mt-0">
                    ln(2) / λ = {facesRadioativas === 0 ? 0 : 'ln(2) / ' + lambdaFormatado + ' = '}
                    {meiaVida} {facesRadioativas !== 0 && 'rodadas'}
                  </span>
                </div>
              </div>
            </div>

            <div className="h-[450px] bg-white p-4 rounded-lg shadow-inner border border-slate-200 relative">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dadosFiltradosGrafico} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="rodada" label={{ value: 'Nº de Rodadas', position: 'insideBottom', offset: -10 }} />
                  <YAxis 
                    label={{ 
                      value: 'Quantidade de Dados', 
                      angle: -90, 
                      position: 'insideLeft', 
                      style: { textAnchor: 'middle' } 
                    }} 
                    domain={[0, limiteYAxis]} 
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    labelFormatter={(label) => `Rodada: ${label}`}
                    formatter={(value, name) => [String(value).replace('.', ','), name]}
                  />
                  <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: '20px' }} />
                  
                  <Line 
                    type="monotone" 
                    name={`Eq. Teórica Meia Vida: N(t) = ${quantidadeInicial}e^{-${lambdaFormatado}t}`}
                    dataKey="teorico" 
                    stroke="#94a3b8" 
                    strokeWidth={2} 
                    strokeDasharray="5 5" 
                    dot={false} 
                    isAnimationActive={false}
                  />
                  <Line 
                    type="monotone" 
                    name="Quant. Dados" 
                    dataKey="experimental" 
                    stroke={corPrincipal} 
                    strokeWidth={3} 
                    activeDot={{ r: 6 }} 
                    connectNulls 
                  />
                  <Line 
                    type="monotone" 
                    name="Total de Decaimentos" 
                    dataKey="experimentalDecaido" 
                    stroke={corComplementar} 
                    strokeWidth={3} 
                    activeDot={{ r: 6 }} 
                    connectNulls 
                  />
                </LineChart>
              </ResponsiveContainer>

              {/* Indicador de R² centralizado no topo interno da área plotada e com a cor principal configurada */}
              {r2ValorCalculado && (
                <div 
                  className="absolute top-[68px] left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-sm text-white px-3.5 py-1.5 rounded-md shadow-md text-xs sm:text-sm font-bold border pointer-events-none flex items-center gap-1.5 z-10"
                  style={{ borderColor: corPrincipal }}
                >
                  <span className="text-slate-200">Idealidade R² =</span>
                  <span style={{ color: corPrincipal }}>{r2ValorCalculado}</span>
                </div>
              )}
            </div>
          </div>

          <div className="w-full lg:w-2/5 xl:w-1/3 bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">
            <div className="flex-1 max-h-[725px] overflow-y-auto">
              <table className="w-full text-sm text-left text-slate-600">
                <thead className="text-xs text-white uppercase sticky top-0 z-10 shadow-sm" style={{ backgroundColor: corPrincipal }}>
                  <tr>
                    <th scope="col" className="px-3 py-3 text-center">Rodada</th>
                    <th scope="col" className="px-3 py-3 text-center">Quant. Exp.</th>
                    <th scope="col" className="px-3 py-3 text-center">Valor Teórico</th>
                  </tr>
                </thead>
                <tbody>
                  {dadosGrafico.map((linha, index) => (
                    <tr key={linha.rodada} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="px-3 py-2 text-center font-semibold text-slate-700">
                        {linha.rodada}
                      </td>
                      <td className="px-3 py-2">
                        <input
                          type="number"
                          min="0"
                          max={quantidadeInicial}
                          value={linha.experimental}
                          onChange={(e) => handleInputChange(index, e.target.value)}
                          className="w-full text-center border border-slate-300 rounded-md py-1 px-1 focus:outline-none focus:ring-2 transition-all"
                          placeholder="-"
                        />
                      </td>
                      <td className="px-3 py-2 text-center font-medium text-slate-500">
                        {String(linha.teorico).replace('.', ',')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-3 bg-slate-50 text-xs text-slate-500 text-center border-t border-slate-200">
              Clique em <strong>Jogar Dados</strong> para simular rodadas ou digite manualmente.
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default DadosRadioativosTab;
