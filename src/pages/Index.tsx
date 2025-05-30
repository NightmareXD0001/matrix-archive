
import React, { useEffect, useState } from 'react';
import CodeRain from '@/components/CodeRain';
import GlitchText from '@/components/GlitchText';
import BatchCard from '@/components/BatchCard';
import { batchData } from '@/data/batchData';
import { Terminal, Code } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [terminalText, setTerminalText] = useState<string[]>([]);
  const [isTerminalComplete, setIsTerminalComplete] = useState(false);
  const terminalMessages = [
    '> Connecting to Matrix mainframe...',
    '> Access granted',
    '> Loading clan leadership archives...',
    '> Archives decoded',
    '> Displaying records - [2010-2025]_'
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
    
    const scrollTimer = setTimeout(() => {
      setShowScrollIndicator(false);
    }, 5000);
    
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollIndicator(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(scrollTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLoaded]);

  return (
    <div className="min-h-screen bg-matrix-black text-white font-matrix relative overflow-x-hidden">
      <CodeRain />
      
      <div className="absolute inset-0 bg-gradient-to-b from-matrix-black via-matrix-black/95 to-matrix-black/90 pointer-events-none"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-2 border-b border-matrix/30 pb-2">
          <div className="flex items-center gap-2">
            <Terminal className="h-5 w-5 text-matrix" />
            <span className="text-matrix/80 text-sm">matrix_clan_database_v2.5</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/ecomm" className="text-matrix/80 hover:text-matrix text-sm flex items-center gap-1 transition">
              <span>Ecomm Buzz</span>
            </Link>
            <Link to="/psynapse" className="text-matrix/80 hover:text-matrix text-sm flex items-center gap-1 transition">
              <span>Psynapse</span>
            </Link>
            <Code className="h-4 w-4 text-matrix/60" />
          </div>
        </div>
        
        <header className="py-16 md:py-24 text-center relative overflow-hidden">
          {isLoaded ? (
            <>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <GlitchText text="The Matrix Clan" className="text-matrix font-glitch" />
              </h1>
              <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
                <GlitchText 
                  text="Digital Legacy Archive - Leadership Records" 
                  delay={1500}
                  speed={30}
                />
              </p>
              
              {showScrollIndicator && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
                  <span className="text-matrix/80 text-sm mb-1">Scroll Down</span>
                  <span className="block w-5 h-5 border-b-2 border-r-2 border-matrix rotate-45"></span>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <div className="h-6 w-6 border-2 border-matrix border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-matrix animate-pulse">System Loading...</p>
            </div>
          )}
        </header>
        
        {isLoaded && (
          <div className="mb-12 text-sm text-matrix/70 font-mono">
            {terminalText.map((text, index) => (
              <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                {text}
              </div>
            ))}
          </div>
        )}
        
        {isLoaded && isTerminalComplete && (
          <section className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 animate-fade-in">
            {batchData.map((batch, index) => (
              <BatchCard 
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
          <footer className="mt-16 py-4 text-center text-matrix/60 text-sm border-t border-matrix/20">
            <p>&gt; The Matrix Clan Legacy Archive - All systems operational</p>
            <p className="mt-4 text-xs text-matrix/40">
              &copy; All Rights Reserved 2025-2026
            </p>
          </footer>
        )}
      </div>
    </div>
  );
};

export default Index;
