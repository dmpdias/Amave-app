import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  speedX: number;
  speedY: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  color: string;
}

const COLORS = [
  'rgba(200, 170, 120,', // warm gold
  'rgba(220, 195, 150,', // honey
  'rgba(185, 155, 105,', // amber
  'rgba(230, 210, 175,', // soft cream-gold
  'rgba(170, 140,  90,', // bronze
];

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let W = window.innerWidth;
    let H = window.innerHeight;

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    // Build particle pool
    const COUNT = 320;
    const particles: Particle[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      radius: Math.random() * 2.2 + 0.5,
      opacity: Math.random() * 0.55 + 0.25,
      speedX: (Math.random() - 0.5) * 0.15,
      speedY: -(Math.random() * 0.18 + 0.04), // drift upward
      twinkleSpeed: Math.random() * 0.014 + 0.005,
      twinkleOffset: Math.random() * Math.PI * 2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));

    let tick = 0;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      tick += 1;

      for (const p of particles) {
        // Twinkle: sine wave modulates opacity
        const twinkle = Math.sin(tick * p.twinkleSpeed + p.twinkleOffset);
        const alpha = p.opacity * (0.6 + 0.4 * twinkle);

        // Soft glow via shadow
        ctx.shadowBlur = p.radius * 8;
        ctx.shadowColor = `${p.color}${(alpha * 0.9).toFixed(2)})`;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${alpha.toFixed(2)})`;
        ctx.fill();

        // Drift
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around edges
        if (p.y < -10) {
          p.y = H + 10;
          p.x = Math.random() * W;
        }
        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
      }

      ctx.shadowBlur = 0;
      animFrameRef.current = requestAnimationFrame(draw);
    };

    animFrameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 1 }}
    />
  );
}
