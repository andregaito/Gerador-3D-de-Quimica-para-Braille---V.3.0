import { useState } from 'react';
import { TABS } from '../../data/tabs';

export default function Navigation({ activeTab, setActiveTab, theme }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav aria-label="Navegação Principal do Projeto" className="shadow-md sticky top-0 z-40 transition-colors duration-500" style={{ backgroundColor: theme.abaNormal }}>
      <div role="tablist" className="max-w-5xl mx-auto flex flex-wrap justify-start w-full px-2 sm:px-0 relative">
        {TABS.map((tab) => {
          const isSubActive = tab.subItems && tab.subItems.some(sub => sub.id === activeTab);
          const isActive = activeTab === tab.id || isSubActive;

          if (tab.subItems) {
            return (
              <div 
                key={tab.id}  className="relative group" onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}
              >
                <button
                  role="tab" aria-expanded={dropdownOpen} className="whitespace-nowrap px-3 sm:px-5 py-3 sm:py-4 text-[12px] sm:text-[14px] font-semibold transition-all duration-300 border-b-4 h-full flex items-center gap-1"
                  style={{ backgroundColor: isActive ? theme.abaAtiva : 'transparent', color: isActive ? theme.textoAba : theme.textoAbaNormal, borderColor: isActive ? theme.textoAba : 'transparent' }}
                >
                  {tab.label} ▾
                </button>

                {/* Novo Menu Suspenso, no estilo Dropdown */}
                <div 
                  className={`absolute left-0 top-full w-64 shadow-xl transition-all duration-200 z-50 flex flex-col rounded-b-lg overflow-hidden border ${dropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                  style={{ backgroundColor: theme.abaAtiva, borderColor: theme.corPrincipal }}
                >
                  {tab.subItems.map((subTab) => (
                    <button  key={subTab.id}  onClick={() => {    setActiveTab(subTab.id);    setDropdownOpen(false);  }}
                      className="text-left px-5 py-3 text-sm font-semibold transition-colors hover:bg-white/20"
                      style={{ color: activeTab === subTab.id ? '#ffffff' : 'rgba(255,255,255,0.85)', backgroundColor: activeTab === subTab.id ? 'rgba(255,255,255,0.15)' : 'transparent'  }}
                    >
                      {subTab.label}
                    </button>
                  ))}
                </div>
              </div>
            );
          }

          return (
            <button
              key={tab.id} role="tab" aria-selected={isActive} onClick={() => setActiveTab(tab.id)}
              className="whitespace-nowrap px-3 sm:px-5 py-3 sm:py-4 text-[12px] sm:text-[14px] font-semibold transition-all duration-300 border-b-4 h-full flex items-center"
              style={{  backgroundColor: isActive ? theme.abaAtiva : 'transparent',  color: isActive ? theme.textoAba : theme.textoAbaNormal,  borderColor: isActive ? theme.textoAba : 'transparent'}}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
