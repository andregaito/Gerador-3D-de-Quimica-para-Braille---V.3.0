import React, { useState } from 'react';
import ColorTester from '../../components/common/ColorTester';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DadosRadioativosTab = ({ theme, corPrincipal, setCorPrincipal }) => {
  // Valores teóricos baseados no decaimento de 35 dados (1 face radioativa)
  const valoresTeoricos = [
    35.00, 29.17, 24.31, 20.26, 16.88, 14.07, 11.72, 9.77, 8.14, 6.78, 
    5.65, 4.71, 3.93, 3.27, 2.73, 2.27, 1.89, 1.58, 1.31, 1.10, 0.91, 0.76
  ];

  // Estado inicial da tabela experimental (Rodadas de 0 a 21)
  const [dadosExperimentais, setDadosExperimentais] = useState(
    Array.from({ length: 28 }, (_, i) => ({
      rodada: i,
      experimental: i === 0 ? 42 : '', // Inicia com 35 dados na rodada 0
      teorico: valoresTeoricos[i]
    }))
  );

  // Atualiza os valores digitados pelo usuário na tabela de Dados Radioativos
  const handleInputChange = (index, value) => {
    const novosDados = [...dadosExperimentais];
    novosDados[index].experimental = value === '' ? '' : Number(value);
    setDadosExperimentais(novosDados);
  };

  return (
    <div id="painel-dados-radioativos" role="tabpanel" aria-label="Dados Radioativos" className="relative p-8 sm:p-12 rounded-xl shadow-sm transition-colors duration-500 text-slate-700 fade-in space-y-8 text-left" style={{ backgroundColor: theme.fundoCaixa, border: `2px solid ${theme.bordaGeral}` }}>
      
      {/* Cabeçalho */}
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
      
      {/* 3 Parágrafos Explicativos */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-800">O Experimento Estatístico</h3>
        <p className="leading-relaxed text-justify">
          O material didático "Dados Radioativos" é um experimento prático desenvolvido para ensinar os conceitos de decaimento radioativo e tempo de meia-vida através da estatística. Utilizando a probabilidade de rolagem de dados com faces customizadas, os estudantes conseguem visualizar e quantificar um fenômeno químico microscópico de forma tátil e totalmente interativa.
        </p>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-800">Mecânica do Jogo</h3>
        <p className="leading-relaxed text-justify">
          Para iniciar, o aluno deve jogar todos os seus dados disponíveis sobre uma superfície plana e observar o resultado[cite: 2]. Todo dado que exibir o símbolo radioativo virado para cima representa um núcleo que sofreu decaimento e, portanto, deve ser retirado do montante principal[cite: 2]. Após retirar esses dados, anota-se o novo valor total de dados restantes na tabela experimental, repetindo as rodadas de lançamentos até que todos os dados decaiam a zero[cite: 2].
        </p>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-800">Análise Gráfica e Meia-Vida</h3>
        <p className="leading-relaxed text-justify">
          Com os resultados anotados após cada lançamento, o estudante constrói um gráfico relacionando o número de rodadas com os dados restantes para encontrar a meia-vida do conjunto[cite: 2]. Por fim, é possível comparar a curva de decaimento experimental com a equação teórica — como $N(t)=35e^{-0,182t}$ para um conjunto inicial de 35 dados — permitindo avaliar a precisão matemática do experimento[cite: 1, 2].
        </p>
      </div>

      {/* Seção Interativa: Gráfico e Tabela */}
      <div className="pt-6 mt-8 border-t border-slate-200">
        <h3 className="text-2xl font-bold text-slate-800 mb-6">Gráfico de Decaimento Interativo</h3>
        
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Coluna do Gráfico (Esquerda) */}
          <div className="w-full lg:w-2/3 h-[400px] bg-white p-4 rounded-lg shadow-inner border border-slate-200">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dadosExperimentais} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="rodada" label={{ value: 'Nº de Rodadas', position: 'insideBottom', offset: -10 }} />
                <YAxis label={{ value: 'Quant. Dados', angle: -90, position: 'insideLeft' }} domain={[0, 40]} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  labelFormatter={(label) => `Rodada: ${label}`}
                />
                <Legend verticalAlign="top" height={36}/>
                <Line 
                  type="monotone" 
                  name="Curva Teórica" 
                  dataKey="teorico" 
                  stroke="#94a3b8" 
                  strokeWidth={2} 
                  strokeDasharray="5 5" 
                  dot={false} 
                />
                <Line 
                  type="monotone" 
                  name="Dados Experimentais" 
                  dataKey="experimental" 
                  stroke={corPrincipal} 
                  strokeWidth={3} 
                  activeDot={{ r: 6 }} 
                  connectNulls 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Coluna da Tabela (Direita) */}
          <div className="w-full lg:w-1/3 bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
            <div className="max-h-[400px] overflow-y-auto">
              <table className="w-full text-sm text-left text-slate-600">
                <thead className="text-xs text-white uppercase sticky top-0 z-10 shadow-sm" style={{ backgroundColor: corPrincipal }}>
                  <tr>
                    <th scope="col" className="px-4 py-3 text-center">Rodada</th>
                    <th scope="col" className="px-4 py-3 text-center">Quant. Experimental</th>
                  </tr>
                </thead>
                <tbody>
                  {dadosExperimentais.map((linha, index) => (
                    <tr key={linha.rodada} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-2 text-center font-semibold text-slate-700">
                        {linha.rodada}
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="number"
                          min="0"
                          max="40"
                          value={linha.experimental}
                          onChange={(e) => handleInputChange(index, e.target.value)}
                          className="w-full text-center border border-slate-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 transition-all"
                          style={{ focusRingColor: corPrincipal }}
                          placeholder="-"
                        />
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
