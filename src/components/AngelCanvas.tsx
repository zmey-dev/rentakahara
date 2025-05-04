
import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  color: string;
}

interface Feather {
  x: number;
  y: number;
  size: number;
  angle: number;
  rotation: number;
  rotationSpeed: number;
  fallSpeed: number;
  waveMagnitude: number;
  waveFrequency: number;
  opacity: number;
  offsetTime: number;
}

const AngelCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const starsRef = useRef<Star[]>([]);
  const feathersRef = useRef<Feather[]>([]);
  const timeRef = useRef<number>(0);

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
        initElements();
      }
    };

    // Initialize stars and feathers
    const initElements = () => {
      // Create stars
      const stars: Star[] = [];
      const starCount = Math.min(50, Math.floor(canvas.width * canvas.height / 15000));
      
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speed: Math.random() * 0.3 + 0.1,
          opacity: Math.random() * 0.5 + 0.3,
          color: getRandomColor(true)
        });
      }
      starsRef.current = stars;

      // Create feathers
      const feathers: Feather[] = [];
      const featherCount = Math.min(12, Math.floor(canvas.width / 100));
      
      for (let i = 0; i < featherCount; i++) {
        feathers.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 15 + 10,
          angle: Math.random() * Math.PI * 2,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.01,
          fallSpeed: Math.random() * 0.5 + 0.2,
          waveMagnitude: Math.random() * 1 + 0.5,
          waveFrequency: Math.random() * 0.02 + 0.01,
          opacity: Math.random() * 0.4 + 0.2,
          offsetTime: Math.random() * 1000
        });
      }
      feathersRef.current = feathers;
    };

    function getRandomColor(isGlowing: boolean = false) {
      if (isGlowing) {
        const colors = [
          '#FFFFFF', // White
          '#F8F8FF', // Ghost White
          '#FFFAF0', // Floral White
          '#F0F8FF', // Alice Blue
          '#F5F5F5', // White Smoke
        ];
        return colors[Math.floor(Math.random() * colors.length)];
      } else {
        const colors = [
          '#FFFFFF', // White
          '#F0F0F0', // Light White
        ];
        return colors[Math.floor(Math.random() * colors.length)];
      }
    }

    // Animation loop
    const animate = (timestamp: number) => {
      timeRef.current = timestamp * 0.001; // Convert to seconds
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw subtle glow in the center
      drawCenterGlow(ctx, canvas.width, canvas.height);
      
      // Draw stars
      updateAndDrawStars(ctx);
      
      // Draw feathers
      updateAndDrawFeathers(ctx);
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    const drawCenterGlow = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) * 0.4;
      
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.03)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();
    };
    
    const updateAndDrawStars = (ctx: CanvasRenderingContext2D) => {
      starsRef.current.forEach(star => {
        // Pulsating opacity based on time
        const pulseSpeed = 0.5;
        const flickerAmount = 0.2;
        const calculatedOpacity = star.opacity + Math.sin(timeRef.current * pulseSpeed) * flickerAmount * star.opacity;
        
        // Draw star with glow effect
        ctx.globalAlpha = calculatedOpacity;
        ctx.fillStyle = star.color;
        ctx.shadowColor = star.color;
        ctx.shadowBlur = star.size * 2;
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Reset shadow for better performance
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
        
        // Update star position - subtle upward movement
        star.y -= star.speed;
        
        // Wrap around screen
        if (star.y < -star.size * 2) {
          star.y = canvas.height + star.size;
          star.x = Math.random() * canvas.width;
        }
      });
    };
    
    const updateAndDrawFeathers = (ctx: CanvasRenderingContext2D) => {
      feathersRef.current.forEach(feather => {
        // Calculate wave movement
        const time = timeRef.current + feather.offsetTime;
        const waveX = Math.sin(time * feather.waveFrequency) * feather.waveMagnitude;
        
        // Update position
        feather.rotation += feather.rotationSpeed;
        feather.y += feather.fallSpeed;
        feather.x += waveX * 0.1;
        
        // Draw feather
        ctx.save();
        ctx.translate(feather.x, feather.y);
        ctx.rotate(feather.rotation);
        
        // Feather with glow
        ctx.globalAlpha = feather.opacity;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
        ctx.shadowBlur = 5;
        ctx.fillStyle = '#FFFFFF';
        
        // Draw a simplified feather shape
        drawFeather(ctx, feather.size);
        
        ctx.restore();
        
        // Reset if feather goes off screen
        if (feather.y > canvas.height + feather.size * 2) {
          feather.y = -feather.size;
          feather.x = Math.random() * canvas.width;
        }
      });
    };
    
    const drawFeather = (ctx: CanvasRenderingContext2D, size: number) => {
      // Draw a simplified feather shape
      ctx.beginPath();
      
      // Shaft
      ctx.moveTo(0, -size);
      ctx.lineTo(0, size);
      ctx.lineWidth = size / 10;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.stroke();
      
      // Barbs on both sides
      const barbCount = 10;
      const barbLength = size / 2;
      
      for (let i = 0; i < barbCount; i++) {
        const y = -size + (size * 2 * i / barbCount);
        const barbAngle = Math.PI / 3;
        
        // Left barb
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(-barbLength * Math.cos(barbAngle), y + barbLength * Math.sin(barbAngle));
        
        // Right barb
        ctx.moveTo(0, y);
        ctx.lineTo(barbLength * Math.cos(barbAngle), y + barbLength * Math.sin(barbAngle));
        
        ctx.lineWidth = size / 20;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.stroke();
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full z-0"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default AngelCanvas;
