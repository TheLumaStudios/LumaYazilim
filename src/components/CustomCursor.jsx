import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useMouse } from 'react-use';

const CursorWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: ${({ theme }) => theme.zIndex.cursor};
  mix-blend-mode: difference;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const CursorDot = styled.div`
  position: absolute;
  width: 8px;
  height: 8px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.2s ease, height 0.2s ease;

  &.hovering {
    width: 40px;
    height: 40px;
  }
`;

const CursorOutline = styled.div`
  position: absolute;
  width: 32px;
  height: 32px;
  border: 2px solid ${({ theme }) => theme.colors.white};
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.3s ease, height 0.3s ease, opacity 0.3s ease;

  &.hovering {
    width: 60px;
    height: 60px;
    opacity: 0.5;
  }
`;

const CustomCursor = () => {
  const cursorDotRef = useRef(null);
  const cursorOutlineRef = useRef(null);
  const mouse = useMouse(document.body);

  useEffect(() => {
    const dot = cursorDotRef.current;
    const outline = cursorOutlineRef.current;

    if (!dot || !outline) return;

    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;

    const animate = () => {
      // Smooth follow effect for outline
      const speed = 0.15;
      outlineX += (mouseX - outlineX) * speed;
      outlineY += (mouseY - outlineY) * speed;

      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
      outline.style.left = `${outlineX}px`;
      outline.style.top = `${outlineY}px`;

      requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    animate();

    // Add hover effects
    const handleMouseEnter = () => {
      dot.classList.add('hovering');
      outline.classList.add('hovering');
    };

    const handleMouseLeave = () => {
      dot.classList.remove('hovering');
      outline.classList.remove('hovering');
    };

    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, select'
    );

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <CursorWrapper>
      <CursorDot ref={cursorDotRef} />
      <CursorOutline ref={cursorOutlineRef} />
    </CursorWrapper>
  );
};

export default CustomCursor;
