
import React, { useEffect, useState } from 'react';
import PsynapseCodeRain from '@/components/PsynapseCodeRain';
import PsynapseBatchCard from '@/components/PsynapseBatchCard';
import { batchDataPsynapse } from '@/data/batchDataPsynapse';
import { Brain, Pause } from 'lucide-react';
import { Link } from 'react-router-dom';

const Psynapse = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [terminalText, setTerminalText] = useState<string[]>([]);
  const [isTerminalComplete, setIsTerminalComplete] = useState(false);
  const terminalMessages = [
    '> Accessing neural database...',
    '> Connection established',
    '> Loading psychological profiles...',
    '> Profiles analyzed',
    '> Displaying research cohorts - [2022-2025]_'
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
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-indigo-50 text-slate-800 font-sans relative overflow-x-hidden">
      <PsynapseCodeRain />
      
      <div className="absolute inset-0 bg-gradient-to-b from-purple-50/90 via-indigo-50/95 to-white/90 pointer-events-none"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-2 border-b border-purple-200 pb-2">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            <span className="text-purple-600/80 text-sm">neural_research_platform</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-purple-500 hover:text-purple-700 text-sm flex items-center gap-1 transition">
              <span>Matrix Theme</span>
            </Link>
            <Link to="/ecomm" className="text-purple-500 hover:text-purple-700 text-sm flex items-center gap-1 transition">
              <span>Ecomm Theme</span>
            </Link>
          </div>
        </div>
        
        <header className="py-16 md:py-24 text-center relative overflow-hidden">
          {isLoaded ? (
            <>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-purple-700 font-sans">
                The Psynapse Archives
              </h1>
              <div className="flex items-center justify-center space-x-4 mb-6">
                <Brain className="h-8 w-8 text-purple-500" />
                <Brain className="h-8 w-8 text-purple-600" />
                <Pause className="h-8 w-8 text-purple-700" />
              </div>
              <p className="text-lg md:text-xl text-purple-600/80 max-w-2xl mx-auto">
                Cognitive Research & Psychological Studies Database
              </p>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <div className="h-6 w-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-purple-500 animate-pulse">Processing Neural Data...</p>
            </div>
          )}
        </header>
        
        {isLoaded && (
          <div className="mb-12 text-sm text-purple-600/70 font-mono bg-purple-50 p-4 rounded-md shadow-inner">
            {terminalText.map((text, index) => (
              <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                {text}
              </div>
            ))}
          </div>
        )}
        
        {isLoaded && isTerminalComplete && (
          <section className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 animate-fade-in">
            {batchDataPsynapse.map((batch, index) => (
              <PsynapseBatchCard 
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
          <footer className="mt-16 py-4 text-center text-purple-500/60 text-sm border-t border-purple-200">
            <p>&gt; Neural Research Platform - All systems operational</p>
            <p className="mt-4 text-xs text-purple-400/60">
              &copy; All Rights Reserved 2025-2026
            </p>
          </footer>
        )}
      </div>
    </div>
  );
};

export default Psynapse;
