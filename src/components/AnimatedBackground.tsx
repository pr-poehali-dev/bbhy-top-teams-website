import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  pulse: number;
  pulseSpeed: number;
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let time = 0;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const initParticles = () => {
      const count = Math.min(Math.floor((width * height) / 14000), 60);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.015 + 0.005,
      }));
    };

    const drawGrid = () => {
      const spacing = 60;
      ctx.strokeStyle = "rgba(10,255,136,0.025)";
      ctx.lineWidth = 0.5;
      for (let x = 0; x < width; x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += spacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    };

    const drawWave = (offset: number, alpha: number, amplitude: number, freq: number) => {
      ctx.beginPath();
      ctx.strokeStyle = `rgba(10,255,136,${alpha})`;
      ctx.lineWidth = 1;
      for (let x = 0; x <= width; x += 4) {
        const y = height * 0.6 + Math.sin((x * freq) + time * 0.5 + offset) * amplitude
          + Math.sin((x * freq * 0.4) + time * 0.3 + offset * 1.5) * (amplitude * 0.4);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    };

    const drawConnections = () => {
      const maxDist = 120;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.06;
            ctx.strokeStyle = `rgba(10,255,136,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const tick = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.016;

      drawGrid();
      drawWave(0, 0.04, 35, 0.008);
      drawWave(2, 0.025, 22, 0.012);
      drawWave(4, 0.015, 50, 0.005);

      const topGradient = ctx.createRadialGradient(width / 2, 0, 0, width / 2, 0, width * 0.7);
      topGradient.addColorStop(0, "rgba(10,255,136,0.07)");
      topGradient.addColorStop(1, "transparent");
      ctx.fillStyle = topGradient;
      ctx.fillRect(0, 0, width, height * 0.5);

      drawConnections();

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += p.pulseSpeed;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const pulsed = p.opacity + Math.sin(p.pulse) * 0.12;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(10,255,136,${Math.max(0, Math.min(1, pulsed))})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(tick);
    };

    resize();
    initParticles();
    tick();

    const onResize = () => {
      resize();
      initParticles();
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
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
