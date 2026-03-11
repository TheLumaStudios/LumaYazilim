import { useEffect, useRef } from 'react';
import styled from 'styled-components';

const CanvasWrapper = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.3;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    opacity: 0.2;
  }
`;

const AnimatedMesh = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let mouseX = 0;
    let mouseY = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const gridSize = 30;
    const points = [];
    const cols = Math.ceil(canvas.width / gridSize) + 1;
    const rows = Math.ceil(canvas.height / gridSize) + 1;

    // Initialize grid points
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        points.push({
          baseX: x * gridSize,
          baseY: y * gridSize,
          x: x * gridSize,
          y: y * gridSize,
          vx: 0,
          vy: 0,
        });
      }
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    const animate = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update points
      points.forEach((point) => {
        const dx = mouseX - point.x;
        const dy = mouseY - point.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 200;

        if (dist < maxDist) {
          const force = (maxDist - dist) / maxDist;
          point.vx += (dx / dist) * force * 2;
          point.vy += (dy / dist) * force * 2;
        }

        // Return to base position
        point.vx += (point.baseX - point.x) * 0.05;
        point.vy += (point.baseY - point.y) * 0.05;

        // Apply friction
        point.vx *= 0.9;
        point.vy *= 0.9;

        point.x += point.vx;
        point.y += point.vy;
      });

      // Draw mesh
      ctx.strokeStyle = '#0066FF';
      ctx.lineWidth = 0.5;

      // Horizontal lines
      for (let y = 0; y < rows; y++) {
        ctx.beginPath();
        for (let x = 0; x < cols; x++) {
          const point = points[y * cols + x];
          if (x === 0) {
            ctx.moveTo(point.x, point.y);
          } else {
            ctx.lineTo(point.x, point.y);
          }
        }
        ctx.stroke();
      }

      // Vertical lines
      for (let x = 0; x < cols; x++) {
        ctx.beginPath();
        for (let y = 0; y < rows; y++) {
          const point = points[y * cols + x];
          if (y === 0) {
            ctx.moveTo(point.x, point.y);
          } else {
            ctx.lineTo(point.x, point.y);
          }
        }
        ctx.stroke();
      }

      // Draw points
      ctx.fillStyle = '#0066FF';
      points.forEach((point) => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <CanvasWrapper ref={canvasRef} />;
};

export default AnimatedMesh;
