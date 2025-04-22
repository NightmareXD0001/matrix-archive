
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface GlitchTextProps {
  text: string;
  className?: string;
  speed?: number; // ms per character
  delay?: number; // ms before start
  glitchIntensity?: number; // 0-10, higher means more glitches
}

const GlitchText: React.FC<GlitchTextProps> = ({
  text,
  className,
  speed = 80,
  delay = 500,
  glitchIntensity = 5,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [glitching, setGlitching] = useState(false);
  
  // Typing effect
  useEffect(() => {
    if (displayedText === text) return;
    
    const timer = setTimeout(() => {
      setIsTyping(true);
      
      const typingInterval = setInterval(() => {
        setDisplayedText(prev => {
          if (prev.length < text.length) {
            return text.slice(0, prev.length + 1);
          } else {
            clearInterval(typingInterval);
            setIsTyping(false);
            return prev;
          }
        });
      }, speed);
      
      return () => clearInterval(typingInterval);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [text, speed, delay]);
  
  // Random glitch effect
  useEffect(() => {
    if (!displayedText || displayedText.length < 3) return;
    
    const glitchTimer = setInterval(() => {
      // Only glitch occasionally based on intensity
      if (Math.random() * 10 > glitchIntensity) return;
      
      setGlitching(true);
      
      setTimeout(() => {
        setGlitching(false);
      }, 150); // Glitch duration
      
    }, 2000); // Check for potential glitch every 2 seconds
    
    return () => clearInterval(glitchTimer);
  }, [displayedText, glitchIntensity]);
  
  return (
    <span 
      className={cn(
        'inline-block font-matrix tracking-wider relative',
        glitching && 'animate-text-glitch',
        isTyping && 'after:content-["_"] after:animate-text-flicker',
        className
      )}
    >
      {displayedText}
    </span>
  );
};

export default GlitchText;
