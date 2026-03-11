import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useSpring } from 'framer-motion';

const ProgressBarWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: ${({ theme }) => theme.colors.border};
  z-index: ${({ theme }) => theme.zIndex.sticky + 1};
  overflow: hidden;
`;

const ProgressBar = styled(motion.div)`
  height: 100%;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.accent} 0%,
    ${({ theme }) => theme.colors.text} 100%
  );
  transform-origin: 0%;
`;

const ScrollPercentage = styled(motion.div)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.text};
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  font-family: ${({ theme }) => theme.fonts.heading};
  z-index: ${({ theme }) => theme.zIndex.sticky};
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 40px;
    height: 40px;
    font-size: 0.7rem;
    bottom: 1.5rem;
    right: 1.5rem;
  }
`;

const CircleProgress = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
`;

const CircleTrack = styled.circle`
  fill: none;
  stroke: rgba(255, 255, 255, 0.2);
  stroke-width: 2;
`;

const CircleFill = styled(motion.circle)`
  fill: none;
  stroke: ${({ theme }) => theme.colors.accent};
  stroke-width: 2;
  stroke-linecap: round;
`;

const ScrollProgress = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      setScrollPercentage(Math.round(latest * 100));
    });
  }, [scrollYProgress]);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (scrollPercentage / 100) * circumference;

  return (
    <>
      {/* Top progress bar */}
      <ProgressBarWrapper>
        <ProgressBar style={{ scaleX }} />
      </ProgressBarWrapper>

      {/* Circular scroll percentage indicator */}
      {scrollPercentage > 5 && (
        <ScrollPercentage
          onClick={handleScrollToTop}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <CircleProgress width="50" height="50" viewBox="0 0 50 50">
            <CircleTrack cx="25" cy="25" r={radius} />
            <CircleFill
              cx="25"
              cy="25"
              r={radius}
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: offset,
              }}
              transition={{
                strokeDashoffset: { duration: 0.5 },
              }}
            />
          </CircleProgress>
          {scrollPercentage}%
        </ScrollPercentage>
      )}
    </>
  );
};

export default ScrollProgress;
