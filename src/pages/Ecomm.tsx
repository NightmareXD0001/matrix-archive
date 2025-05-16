
import React, { useEffect, useState } from 'react';
import EcommCodeRain from '@/components/EcommCodeRain';
import GlitchText from '@/components/GlitchText';
import EcommBatchCard from '@/components/EcommBatchCard';
import { batchDataEcomm } from '@/data/batchDataEcomm';
import { BarChart, DollarSign, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Ecomm = () => {
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
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-blue-50 text-slate-800 font-sans relative overflow-x-hidden">
      <EcommCodeRain />
      
      <div className="absolute inset-0 bg-gradient-to-b from-matrix-black via-matrix-black/95 to-matrix-black/90 pointer-events-none"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-2 border-b border-blue-200 pb-2">
          <div className="flex items-center gap-2">
            <BarChart className="h-5 w-5 text-blue-600" />
            <span className="text-blue-600/80 text-sm">business_analytics_platform</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-blue-500 hover:text-blue-700 text-sm flex items-center gap-1 transition">
              <span>Matrix Clan</span>
            </Link>
            <Link to="/psynapse" className="text-blue-500 hover:text-blue-700 text-sm flex items-center gap-1 transition">
              <span>Psynapse</span>
            </Link>
          </div>
        </div>
        
        <header className="py-16 md:py-24 text-center relative overflow-hidden">
          {isLoaded ? (
            <>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <GlitchText text="The Ecomm Archives" className="text-blue-700 font-glitch" />
              </h1>
              <div className="flex items-center justify-center space-x-4 mb-6">
                <DollarSign className="h-8 w-8 text-blue-500" />
                <TrendingUp className="h-8 w-8 text-blue-600" />
                <BarChart className="h-8 w-8 text-blue-700" />
              </div>
              <p className="text-lg md:text-xl text-blue-600/80 max-w-2xl mx-auto">
                <GlitchText 
                  text="Digital Legacy Archive - Leadership Records" 
                  delay={1500}
                  speed={30}/>
              </p>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <div className="h-6 w-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-blue-500 animate-pulse">Loading Financial Data...</p>
            </div>
          )}
        </header>
        
        {isLoaded && (
          <div className="mb-12 text-sm text-blue-600/70 font-mono bg-blue-50 p-4 rounded-md shadow-inner">
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
          <footer className="mt-16 py-4 text-center text-blue-500/60 text-sm border-t border-blue-200">
            <p>&gt; Business Analytics Platform - All systems operational</p>
            <p className="mt-4 text-xs text-blue-400/60">
              &copy; All Rights Reserved 2025-2026
            </p>
          </footer>
        )}
      </div>
    </div>
  );
};

export default Ecomm;
