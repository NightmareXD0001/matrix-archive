
import React, { useEffect, useRef } from 'react';

interface CodeRainProps {
  density?: number;
  speed?: number;
}

const CodeRain: React.FC<CodeRainProps> = ({
  density = 50,
  speed = 1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const context = canvas.getContext('2d');
    if (!context) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Matrix characters (only include relevant characters for that Matrix look)
    const matrixChars = '日ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ012345789:・.\"=*+-<>¦｜╌abcdefπ∏∑ΩΔθΨ';
    
    const columns = Math.floor(canvas.width / 20); // Each character takes ~20px width
    const drops: number[] = [];
    
    // Initialize drops at random y positions
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -canvas.height);
    }
    
    const draw = () => {
      // Semi-transparent black to create trail effect
      context.fillStyle = 'rgba(0, 0, 0, 0.05)';
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      // Green text
      context.fillStyle = '#00FF41';
      context.font = '15px Share Tech Mono';
      
      // Draw characters
      for (let i = 0; i < drops.length; i++) {
        // Random character
        const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        
        // x = i * 20, y = value of drops[i]
        context.fillText(text, i * 20, drops[i] * speed);
        
        // Randomly reset some drops back to top after they've reached a certain point
        if (drops[i] * speed > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        
        // Increment y coordinate
        drops[i]++;
      }
    };
    
    // Animation frame handler
    const interval = setInterval(draw, 33); // ~30fps
    
    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, [density, speed]);
  
  return (
    <canvas 
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.2 }}
    />
  );
};

export default CodeRain;
