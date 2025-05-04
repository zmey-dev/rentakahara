
import { useEffect, useRef } from 'react';

interface CosmicParticle {
  x: number;
  y: number;
  radius: number;
  color: string;
  vx: number;
  vy: number;
  alpha: number;
}

const CosmicBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas to full width/height of its container
    const handleResize = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Create particles
    const particles: CosmicParticle[] = [];
    const particleCount = Math.min(100, Math.floor(canvas.width * canvas.height / 10000));
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 0.5,
        color: getRandomColor(),
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        alpha: Math.random() * 0.5 + 0.2
      });
    }

    function getRandomColor() {
      const colors = [
        '#8BE9FD', // Cyan
        '#BD93F9', // Purple
        '#FF79C6', // Pink
        '#50FA7B', // Green
        '#F1FA8C', // Yellow
        '#61DAFB', // React blue
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw flowing wave patterns
      drawWaves(ctx, canvas.width, canvas.height);
      
      // Draw and update particles
      particles.forEach(particle => {
        // Draw particle
        ctx.globalAlpha = particle.alpha;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Wrap around canvas edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Draw wave pattern
    let waveOffset = 0;
    function drawWaves(ctx: CanvasRenderingContext2D, width: number, height: number) {
      waveOffset += 0.01;
      
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(0, height);
        
        const waveHeight = height * 0.05;
        const yBase = height - (height * 0.1 * i);
        
        for (let x = 0; x < width; x += 10) {
          const dx = x / width;
          const offset = Math.sin(dx * 10 + waveOffset + i) * waveHeight;
          ctx.lineTo(x, yBase + offset);
        }
        
        ctx.lineTo(width, height);
        ctx.closePath();
        
        const opacity = 0.05 - (i * 0.01);
        ctx.fillStyle = `rgba(123, 97, 255, ${opacity})`;
        ctx.fill();
      }
    }

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full z-0 opacity-30"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default CosmicBackground;
