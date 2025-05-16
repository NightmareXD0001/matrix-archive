
import React, { useEffect, useRef } from 'react';

const PsynapseCodeRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const context = canvas.getContext('2d');
    if (!context) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Psychology-related characters
    const psyChars = 'ψΨφΦωΩαβγδεζηθικλμνξοπρστυ0123456789♥♠♦♣';
    
    const columns = Math.floor(canvas.width / 20);
    const drops: number[] = [];
    
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -canvas.height);
    }
    
    const draw = () => {
      context.fillStyle = 'rgba(255, 255, 255, 0.05)';
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      context.fillStyle = '#9b87f5';
      context.font = '15px monospace';
      
      for (let i = 0; i < drops.length; i++) {
        const text = psyChars[Math.floor(Math.random() * psyChars.length)];
        context.fillText(text, i * 20, drops[i]);
        
        if (drops[i] > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        
        drops[i]++;
      }
    };
    
    const interval = setInterval(draw, 33);
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.2 }}
    />
  );
};

export default PsynapseCodeRain;
