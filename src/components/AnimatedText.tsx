
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedTextProps {
  text: string;
  className?: string;
  once?: boolean;
  delay?: number;
  speed?: number;
  redBorder?: boolean;
  typingEffect?: boolean;
}

export function AnimatedText({ 
  text, 
  className, 
  once = true, 
  delay = 0,
  speed = 0.05,
  redBorder = false,
  typingEffect = false
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (once && hasAnimatedRef.current) return;
    
    const container = containerRef.current;
    if (!container) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            hasAnimatedRef.current = true;
            observer.disconnect();
            
            // If typing effect is enabled, apply different animation
            if (typingEffect) {
              container.classList.add('text-writing');
            } else {
              // Original letter-by-letter animation
              const letters = Array.from(container.children);
              letters.forEach((letter, i) => {
                setTimeout(() => {
                  letter.classList.add('opacity-100');
                  letter.classList.remove('opacity-0', 'translate-y-3');
                }, delay + i * (speed * 1000));
              });
            }
          }
        });
      },
      {
        threshold: 0.2,
      }
    );
    
    observer.observe(container);
    
    return () => {
      observer.disconnect();
    };
  }, [text, once, delay, speed, typingEffect]);
  
  return (
    <div 
      ref={containerRef} 
      className={cn(
        typingEffect ? "inline-block overflow-hidden whitespace-nowrap" : "inline-flex",
        redBorder && "border-red-500 border-2 p-2",
        className
      )}
    >
      {typingEffect ? (
        text
      ) : (
        text.split('').map((letter, index) => (
          <span
            key={index}
            className="opacity-0 translate-y-3 inline-block transition-all duration-300 ease-out"
            style={{ transitionDelay: `${delay + index * speed}s` }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </span>
        ))
      )}
    </div>
  );
}

export default AnimatedText;
