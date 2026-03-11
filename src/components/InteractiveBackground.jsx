import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const BackgroundWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
`;

const GridOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
      ${({ theme }) => theme.colors.border} 1px,
      transparent 1px
    ),
    linear-gradient(90deg, ${({ theme }) => theme.colors.border} 1px, transparent 1px);
  background-size: 50px 50px;
  opacity: 0.3;
  mask-image: radial-gradient(
    ellipse 80% 50% at 50% 50%,
    black 0%,
    transparent 100%
  );
`;

const FloatingDot = styled(motion.div)`
  position: absolute;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  background: ${({ theme }) => theme.colors.accent};
  border-radius: 50%;
  opacity: ${({ $opacity }) => $opacity};
  filter: blur(${({ $blur }) => $blur}px);
`;

const GradientOrb = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.15;
  pointer-events: none;
  background: ${({ $color }) => $color};
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
`;

export const AnimatedGrid = () => {
  return (
    <BackgroundWrapper>
      <GridOverlay />
    </BackgroundWrapper>
  );
};

export const FloatingDots = ({ count = 20 }) => {
  const dots = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    opacity: Math.random() * 0.5 + 0.1,
    blur: Math.random() * 2,
    duration: Math.random() * 10 + 20,
    delay: Math.random() * 5,
  }));

  return (
    <BackgroundWrapper>
      {dots.map((dot) => (
        <FloatingDot
          key={dot.id}
          $size={dot.size}
          $opacity={dot.opacity}
          $blur={dot.blur}
          initial={{ x: `${dot.x}vw`, y: `${dot.y}vh` }}
          animate={{
            x: [`${dot.x}vw`, `${(dot.x + 20) % 100}vw`, `${dot.x}vw`],
            y: [`${dot.y}vh`, `${(dot.y + 30) % 100}vh`, `${dot.y}vh`],
          }}
          transition={{
            duration: dot.duration,
            repeat: Infinity,
            ease: 'linear',
            delay: dot.delay,
          }}
        />
      ))}
    </BackgroundWrapper>
  );
};

export const GradientOrbs = () => {
  const orbs = [
    { color: '#0066FF', size: 600, x: '10%', y: '20%', duration: 25 },
    { color: '#000000', size: 500, x: '80%', y: '70%', duration: 30 },
    { color: '#0066FF', size: 400, x: '50%', y: '50%', duration: 35 },
  ];

  return (
    <BackgroundWrapper>
      {orbs.map((orb, index) => (
        <GradientOrb
          key={index}
          $color={orb.color}
          $size={orb.size}
          initial={{ x: orb.x, y: orb.y }}
          animate={{
            x: [orb.x, `${parseFloat(orb.x) + 10}%`, orb.x],
            y: [orb.y, `${parseFloat(orb.y) + 15}%`, orb.y],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </BackgroundWrapper>
  );
};

// Mouse trail effect
export const MouseTrail = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.life = 1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= 0.02;
        if (this.size > 0.1) this.size -= 0.05;
      }

      draw() {
        ctx.fillStyle = `rgba(0, 102, 255, ${this.life * 0.3})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const handleMouseMove = (e) => {
      particles.push(new Particle(e.clientX, e.clientY));
      if (particles.length > particleCount) {
        particles.shift();
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        particle.update();
        particle.draw();

        if (particle.life <= 0) {
          particles.splice(index, 1);
        }
      });

      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <BackgroundWrapper>
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          pointerEvents: 'none',
        }}
      />
    </BackgroundWrapper>
  );
};

export default AnimatedGrid;
