import React, { useState } from 'react';
import ColorTester from '../../components/common/ColorTester';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DadosRadioativosTab = ({ theme, corPrincipal, setCorPrincipal }) => {
  const [quantidadeInicial, setQuantidadeInicial] = useState(35);

  const [dadosExperimentais, setDadosExperimentais] = useState(
    Array.from({ length: 28 }, (_, i) => ({
      rodada: i,
      experimental: i === 0 ? 42 : '', 
    }))
  );

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

  const dadosGrafico = dadosExperimentais.map((linha) => {
    const teorico = Number((quantidadeInicial * Math.exp(-0.182 * linha.rodada)).toFixed(2));
    return {
      ...linha,
      teorico,
      teoricoDecaido: Number((quantidadeInicial - teorico).toFixed(2)),
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
          Para iniciar, o aluno deve jogar todos os seus dados disponíveis sobre uma superfície plana e observar o resultado. Todo dado que exibir o símbolo radioativo virado para cima representa um núcleo que sofreu decaimento e, portanto, deve ser retirado do montante principal. Após retirar esses dados, anota-se o novo valor total de dados restantes na tabela experimental, repetindo as rodadas de lançamentos até que todos os dados decaiam a zero.
        </p>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-800">Análise Gráfica e Meia-Vida</h3>
        <p className="leading-relaxed text-justify">
          Com os resultados anotados após cada lançamento, o estudante constrói um gráfico relacionando o número de rodadas com os dados restantes para encontrar a meia-vida do conjunto. Por fim, é possível comparar a curva de decaimento experimental com a equação teórica — como {"N(t) = " + quantidadeInicial + "e^{-0,182t}"} para um conjunto inicial de {quantidadeInicial} dados — permitindo avaliar a precisão matemática do experimento.
        </p>
      </div>

      {/* Caixa de Explicações Matemáticas (Novidade) */}
      <div className="mt-8 bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 font-bold text-lg text-white" style={{ backgroundColor: corPrincipal }}>
          Conjunto de Dados: 1 Face Radioativa
        </div>
        <div className="divide-y divide-slate-200 text-sm sm:text-base">
          <div className="flex flex-col sm:flex-row justify-between px-6 py-4 hover:bg-slate-50 transition-colors">
            <span className="font-semibold text-slate-700">Probabilidade de Decaimento (p)</span>
            <span className="font-bold text-slate-900 mt-1 sm:mt-0">1/6 = 0,1666</span>
          </div>
          <div className="flex flex-col sm:flex-row justify-between px-6 py-4 hover:bg-slate-50 transition-colors">
            <span className="font-semibold text-slate-700">Fração de Núcleos Restantes (1 - p)</span>
            <span className="font-bold text-slate-900 mt-1 sm:mt-0">5/6 = 0,8333</span>
          </div>
          <div className="flex flex-col sm:flex-row justify-between px-6 py-4 hover:bg-slate-50 transition-colors">
            <span className="font-semibold text-slate-700">Constante de Decaimento (λ)</span>
            <span className="font-bold text-slate-900 mt-1 sm:mt-0">λ = -ln(5/6) ≈ 0,182</span>
          </div>
          <div className="flex flex-col sm:flex-row justify-between px-6 py-4 hover:bg-slate-50 transition-colors">
            <span className="font-semibold text-slate-700">Meia Vida (t<sub>1/2</sub>)</span>
            <span className="font-bold text-slate-900 mt-1 sm:mt-0">-ln(2) / λ = -ln(2) / 0,182 = 3,8 rodadas</span>
          </div>
        </div>
      </div>

      <div className="pt-6 mt-8 border-t border-slate-200">
        
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 bg-slate-50 p-4 rounded-lg border border-slate-200">
          <h3 className="text-2xl font-bold text-slate-800">Gráfico de Decaimento Interativo</h3>
          <div className="flex items-center gap-3 mt-4 sm:mt-0">
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
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          <div className="w-full lg:w-3/5 xl:w-2/3 h-[450px] bg-white p-4 rounded-lg shadow-inner border border-slate-200">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dadosFiltradosGrafico} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="rodada" label={{ value: 'Nº de Rodadas', position: 'insideBottom', offset: -10 }} />
                <YAxis label={{ value: 'Quantidade de Dados', angle: -90, position: 'insideLeft' }} domain={[0, limiteYAxis]} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  labelFormatter={(label) => `Rodada: ${label}`}
                  formatter={(value, name) => [String(value).replace('.', ','), name]}
                />
                <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: '20px' }} />
                
                <Line 
                  type="monotone" 
                  name="Curva Teórica (Restantes)" 
                  dataKey="teorico" 
                  stroke="#94a3b8" 
                  strokeWidth={2} 
                  strokeDasharray="5 5" 
                  dot={false} 
                  isAnimationActive={false}
                />
                <Line 
                  type="monotone" 
                  name="Dados Exp. (Restantes)" 
                  dataKey="experimental" 
                  stroke={corPrincipal} 
                  strokeWidth={3} 
                  activeDot={{ r: 6 }} 
                  connectNulls 
                />

                <Line 
                  type="monotone" 
                  name="Curva Teórica (Decaídos)" 
                  dataKey="teoricoDecaido" 
                  stroke="#cbd5e1" 
                  strokeWidth={2} 
                  strokeDasharray="5 5" 
                  dot={false} 
                  isAnimationActive={false}
                />
                <Line 
                  type="monotone" 
                  name="Dados Exp. (Decaídos)" 
                  dataKey="experimentalDecaido" 
                  stroke={corComplementar} 
                  strokeWidth={3} 
                  activeDot={{ r: 6 }} 
                  connectNulls 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="w-full lg:w-2/5 xl:w-1/3 bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
            <div className="max-h-[450px] overflow-y-auto">
              <table className="w-full text-sm text-left text-slate-600">
                <thead className="text-xs text-white uppercase sticky top-0 z-10 shadow-sm" style={{ backgroundColor: corPrincipal }}>
                  <tr>
                    <th scope="col" className="px-3 py-3 text-center">Rodada</th>
                    <th scope="col" className="px-3 py-3 text-center">Quant. Exp.</th>
                    {/* Nova coluna de Equação Teórica */}
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
                      {/* Célula populada com o valor da equação teórica */}
                      <td className="px-3 py-2 text-center font-medium text-slate-500">
                        {String(linha.teorico).replace('.', ',')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-3 bg-slate-50 text-xs text-slate-500 text-center border-t border-slate-200">
              Digite seus resultados para traçar o gráfico.
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default DadosRadioativosTab;
