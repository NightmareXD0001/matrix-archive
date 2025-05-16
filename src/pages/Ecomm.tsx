
import React, { useEffect, useState } from 'react';
import EcommCodeRain from '@/components/EcommCodeRain';
import EcommBatchCard from '@/components/EcommBatchCard';
import { batchDataEcomm } from '@/data/batchDataEcomm';
import { BarChart, DollarSign, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import GlitchText from '@/components/GlitchText';
import DarkModeToggle from '@/components/DarkModeToggle';
import { useDarkMode } from '@/hooks/useDarkMode';

const Ecomm = () => {
  const { isDarkMode } = useDarkMode();
  const [isLoaded, setIsLoaded] = useState(false);
  const [terminalText, setTerminalText] = useState<string[]>([]);
  const [isTerminalComplete, setIsTerminalComplete] = useState(false);
  const terminalMessages = [
    '> Connecting to financial database...',
    '> Access granted',
    '> Loading business records...',
    '> Records compiled',
    '> Displaying fiscal years - [2022-2025]_'
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
    
    const typeTerminalText = async () => {
      for (let i = 0; i < terminalMessages.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 800));
        setTerminalText(prev => [...prev, terminalMessages[i]]);
        if (i === terminalMessages.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 500));
          setIsTerminalComplete(true);
        }
      }
    };

    if (isLoaded) {
      typeTerminalText();
    }
    
    return () => {
      clearTimeout(timer);
    };
  }, [isLoaded]);

  return (
    <div className={`min-h-screen ${isDarkMode 
      ? 'bg-gradient-to-b from-blue-900 to-slate-900 text-white' 
      : 'bg-gradient-to-b from-sky-50 to-blue-50 text-slate-800'} 
      font-sans relative overflow-x-hidden transition-colors duration-300`}>
      <EcommCodeRain />
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-transparent pointer-events-none"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className={`flex items-center justify-between mb-2 border-b ${isDarkMode ? 'border-blue-700' : 'border-blue-200'} pb-2`}>
          <div className="flex items-center gap-2">
            <BarChart className={`h-5 w-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            <span className={`${isDarkMode ? 'text-blue-400/80' : 'text-blue-600/80'} text-sm`}>business_analytics_platform</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/" className={`${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-500 hover:text-blue-700'} text-sm flex items-center gap-1 transition`}>
              <span>Matrix Theme</span>
            </Link>
            <Link to="/psynapse" className={`${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-500 hover:text-blue-700'} text-sm flex items-center gap-1 transition`}>
              <span>Psynapse Theme</span>
            </Link>
            <DarkModeToggle />
          </div>
        </div>
        
        <header className="py-16 md:py-24 text-center relative overflow-hidden">
          {isLoaded ? (
            <>
              <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-700'} font-sans`}>
                <GlitchText text="The Financial Archives" className={isDarkMode ? 'text-blue-400' : 'text-blue-700'} />
              </h1>
              <div className="flex items-center justify-center space-x-4 mb-6">
                <DollarSign className={`h-8 w-8 ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`} />
                <TrendingUp className={`h-8 w-8 ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`} />
                <BarChart className={`h-8 w-8 ${isDarkMode ? 'text-blue-200' : 'text-blue-700'}`} />
              </div>
              <p className={`text-lg md:text-xl ${isDarkMode ? 'text-blue-300/80' : 'text-blue-600/80'} max-w-2xl mx-auto`}>
                Market Leadership & Business Analytics Dashboard
              </p>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <div className={`h-6 w-6 border-2 ${isDarkMode ? 'border-blue-400' : 'border-blue-500'} border-t-transparent rounded-full animate-spin mb-4`}></div>
              <p className={`${isDarkMode ? 'text-blue-400' : 'text-blue-500'} animate-pulse`}>Loading Financial Data...</p>
            </div>
          )}
        </header>
        
        {isLoaded && (
          <div className={`mb-12 text-sm ${isDarkMode ? 'text-blue-300/70 bg-blue-900/50' : 'text-blue-600/70 bg-blue-50'} font-mono p-4 rounded-md shadow-inner`}>
            {terminalText.map((text, index) => (
              <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                {text}
              </div>
            ))}
          </div>
        )}
        
        {isLoaded && isTerminalComplete && (
          <section className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 animate-fade-in">
            {batchDataEcomm.map((batch, index) => (
              <EcommBatchCard 
                key={batch.year} 
                batch={batch} 
                isActive={index === 0}
                className="opacity-0 animate-fade-in"
                style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'forwards' }}
              />
            ))}
          </section>
        )}
        
        {isLoaded && (
          <footer className={`mt-16 py-4 text-center ${isDarkMode ? 'text-blue-400/60 border-blue-800' : 'text-blue-500/60 border-blue-200'} text-sm border-t`}>
            <p>&gt; Business Analytics Platform - All systems operational</p>
            <p className={`mt-4 text-xs ${isDarkMode ? 'text-blue-500/60' : 'text-blue-400/60'}`}>
              &copy; All Rights Reserved 2025-2026
            </p>
          </footer>
        )}
      </div>
    </div>
  );
};

export default Ecomm;
