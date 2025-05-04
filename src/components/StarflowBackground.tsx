import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
  brightness: number;
  color: string;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  duration: number;
  startTime: number;
}

const StarflowBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const shootingStarsRef = useRef<ShootingStar[]>([]);
  const animationRef = useRef<number>(0);
  const lastShootingStarTime = useRef<number>(0);
  const lastBrightStarTime = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas to full width/height of its container
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    // Star initialization
    const initStars = () => {
      const stars: Star[] = [];
      const starCount = Math.min(150, Math.floor(canvas.width * canvas.height / 8000));
      
      const starColors = [
        '#8BE9FD', // Cyan
        '#BD93F9', // Purple
        '#FF79C6', // Pink
        '#F1FA8C', // Yellow
        '#61DAFB', // React blue
        '#FFFFFF', // White
      ];

      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speed: Math.random() * 0.5 + 0.1,
          brightness: Math.random() * 0.5 + 0.5,
          color: starColors[Math.floor(Math.random() * starColors.length)]
        });
      }

      starsRef.current = stars;
    };

    // Create a new shooting star
    const createShootingStar = () => {
      const now = Date.now();
      
      // Ensure we don't create too many shooting stars at once
      if (now - lastShootingStarTime.current < 3000) {
        return;
      }
      
      lastShootingStarTime.current = now;
      
      // Create 1-3 shooting stars at different positions
      const numStars = Math.floor(Math.random() * 3) + 1;
      
      for (let i = 0; i < numStars; i++) {
        // Random angle that points downward (between 45 and 135 degrees, or PI/4 and 3*PI/4)
        // This ensures stars always flow toward bottom (either straight down, bottom-right or bottom-left)
        const angle = Math.PI / 4 + (Math.random() * Math.PI / 2);
        
        shootingStarsRef.current.push({
          x: Math.random() * canvas.width, // Start anywhere horizontally
          y: Math.random() * (canvas.height * 0.3), // Start near the top
          length: Math.random() * 80 + 100,
          speed: Math.random() * 300 + 200,
          angle: angle,
          opacity: 1,
          duration: Math.random() * 1000 + 1500,
          startTime: now
        });
      }
    };

    // Create a special bright shooting star from top-right to bottom-left
    const createBrightShootingStar = () => {
      const now = Date.now();
      
      // Only create a new bright star every 10 seconds
      if (now - lastBrightStarTime.current < 10000) {
        return;
      }
      
      lastBrightStarTime.current = now;
      
      // Set angle for top-right to bottom-left movement
      const angle = Math.PI * 0.75; // Approximately 135 degrees
      
      shootingStarsRef.current.push({
        x: canvas.width - (Math.random() * 150), // Start from right side
        y: Math.random() * (canvas.height * 0.3), // Near top
        length: Math.random() * 120 + 180, // Longer trail
        speed: Math.random() * 500 + 600, // Much faster
        angle: angle,
        opacity: 1.5, // Brighter
        duration: Math.random() * 800 + 1000, // Faster duration
        startTime: now
      });
    };

    // Animation loop
    const animate = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw stars
      starsRef.current.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.brightness;
        ctx.shadowBlur = star.size * 4;
        ctx.shadowColor = star.color;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
        
        // Update star position
        star.y += star.speed;
        
        // Wrap around screen
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
          star.speed = Math.random() * 0.5 + 0.1;
        }
      });
      
      // Randomly create regular shooting stars (approximately every 3 seconds)
      if (Math.random() < 0.008) {
        createShootingStar();
      }
      
      // Create bright shooting stars (approx every 10 seconds)
      if (Math.random() < 0.002) {
        createBrightShootingStar();
      }
      
      // Draw and update shooting stars
      drawShootingStars(ctx, timestamp);
      
      // Draw glowing trail effect
      drawGlowingTrails(ctx);
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    const drawShootingStars = (ctx: CanvasRenderingContext2D, timestamp: number) => {
      const now = Date.now();
      
      // Remove expired shooting stars
      shootingStarsRef.current = shootingStarsRef.current.filter(star => {
        const elapsed = now - star.startTime;
        return elapsed < star.duration;
      });
      
      // Draw each shooting star
      shootingStarsRef.current.forEach(star => {
        const elapsed = now - star.startTime;
        const progress = elapsed / star.duration;
        
        // Calculate current position
        const currentX = star.x + Math.cos(star.angle) * star.speed * progress;
        const currentY = star.y + Math.sin(star.angle) * star.speed * progress;
        
        // Fade out as it moves
        const opacity = Math.min(1.5, (1 - progress) * (star.opacity || 1));
        
        // Determine if this is a bright star (higher speed)
        const isBrightStar = star.speed > 500;
        const starSize = isBrightStar ? 3.5 : 2;
        const trailLength = isBrightStar ? star.length * 1.5 : star.length;
        const glow = isBrightStar ? 15 : 10;
        
        // Draw the shooting star
        ctx.beginPath();
        
        // Create a gradient trail
        const gradient = ctx.createLinearGradient(
          currentX, 
          currentY,
          currentX - Math.cos(star.angle) * trailLength * (1 - progress),
          currentY - Math.sin(star.angle) * trailLength * (1 - progress)
        );
        
        if (isBrightStar) {
          gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
          gradient.addColorStop(0.1, `rgba(200, 220, 255, ${opacity * 0.8})`);
          gradient.addColorStop(0.3, `rgba(120, 180, 255, ${opacity * 0.6})`);
          gradient.addColorStop(1, 'rgba(70, 130, 240, 0)');
        } else {
          gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
          gradient.addColorStop(0.3, `rgba(120, 180, 255, ${opacity * 0.6})`);
          gradient.addColorStop(1, 'rgba(70, 130, 240, 0)');
        }
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = isBrightStar ? 3 : 2;
        ctx.globalAlpha = opacity;
        
        ctx.moveTo(currentX, currentY);
        ctx.lineTo(
          currentX - Math.cos(star.angle) * trailLength * (1 - progress),
          currentY - Math.sin(star.angle) * trailLength * (1 - progress)
        );
        
        ctx.stroke();
        
        // Draw a brighter head
        ctx.beginPath();
        ctx.arc(currentX, currentY, starSize, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, ' + opacity + ')';
        ctx.shadowBlur = glow;
        ctx.shadowColor = isBrightStar ? '#FFFFFF' : '#61DAFB';
        ctx.fill();
        
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      });
    };
    
    const drawGlowingTrails = (ctx: CanvasRenderingContext2D) => {
      // Create a few flowing trails
      const time = Date.now() / 2000;
      
      for (let i = 0; i < 3; i++) {
        const yOffset = (i * canvas.height / 3) + (50 * Math.sin(time + i));
        
        ctx.beginPath();
        ctx.moveTo(0, yOffset);
        
        for (let x = 0; x < canvas.width; x += 20) {
          const y = yOffset + Math.sin((x / canvas.width) * Math.PI * 4 + time) * 50;
          ctx.lineTo(x, y);
        }
        
        ctx.strokeStyle = `rgba(123, 97, 255, ${0.05 - (i * 0.01)})`;
        ctx.lineWidth = 50;
        ctx.stroke();
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    animate(0);

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

export default StarflowBackground;
