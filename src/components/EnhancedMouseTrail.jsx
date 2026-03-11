import { useEffect, useRef } from 'react';
import styled from 'styled-components';

const CanvasWrapper = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: ${({ theme }) => theme.zIndex.cursor - 1};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const EnhancedMouseTrail = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 100;
    let mouseX = 0;
    let mouseY = 0;
    let lastMouseX = 0;
    let lastMouseY = 0;

    class Particle {
      constructor(x, y, vx, vy) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.life = 1;
        this.size = Math.random() * 3 + 1;
        this.color = `rgba(0, 102, 255, ${Math.random() * 0.5 + 0.3})`;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= 0.015;
        this.vx *= 0.98;
        this.vy *= 0.98;
        this.vy += 0.1; // gravity
      }

      draw() {
        ctx.globalAlpha = this.life;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    const handleMouseMove = (e) => {
      lastMouseX = mouseX;
      lastMouseY = mouseY;
      mouseX = e.clientX;
      mouseY = e.clientY;

      const dx = mouseX - lastMouseX;
      const dy = mouseY - lastMouseY;
      const speed = Math.sqrt(dx * dx + dy * dy);

      // Create particles based on mouse speed
      if (speed > 1) {
        for (let i = 0; i < Math.min(speed / 5, 5); i++) {
          const angle = Math.random() * Math.PI * 2;
          const velocity = Math.random() * 2 + 1;
          particles.push(
            new Particle(
              mouseX,
              mouseY,
              Math.cos(angle) * velocity,
              Math.sin(angle) * velocity
            )
          );
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw();

        if (p.life <= 0) {
          particles.splice(i, 1);
        }
      }

      // Keep particle count under control
      if (particles.length > particleCount) {
        particles.splice(0, particles.length - particleCount);
      }

      requestAnimationFrame(animate);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <CanvasWrapper ref={canvasRef} />;
};

export default EnhancedMouseTrail;
