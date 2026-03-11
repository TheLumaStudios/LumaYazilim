import { useRef } from 'react';
import styled from 'styled-components';
import { motion, useTransform, useScroll } from 'framer-motion';
import { useMouse } from 'react-use';

const SectionWrapper = styled.section`
  position: relative;
  overflow: hidden;
  min-height: ${({ $minHeight }) => $minHeight || '100vh'};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ParallaxLayer = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  will-change: transform;
`;

const Content = styled.div`
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.base};
  width: 100%;
`;

// Hook for mouse parallax effect
const useMouseParallax = (strength = 20) => {
  const ref = useRef(null);
  const mouse = useMouse(ref);

  const moveX = mouse.elX ? (mouse.elX / mouse.elW - 0.5) * strength : 0;
  const moveY = mouse.elY ? (mouse.elY / mouse.elH - 0.5) * strength : 0;

  return { ref, moveX, moveY };
};

// Parallax section with mouse movement
export const MouseParallaxSection = ({
  children,
  strength = 20,
  minHeight,
  background,
  ...props
}) => {
  const { ref, moveX, moveY } = useMouseParallax(strength);

  return (
    <SectionWrapper ref={ref} $minHeight={minHeight} style={{ background }} {...props}>
      <ParallaxLayer
        animate={{
          x: moveX,
          y: moveY,
        }}
        transition={{
          type: 'spring',
          stiffness: 50,
          damping: 20,
          mass: 0.5,
        }}
      >
        <Content>{children}</Content>
      </ParallaxLayer>
    </SectionWrapper>
  );
};

// Parallax section with scroll movement
export const ScrollParallaxSection = ({
  children,
  speed = 0.5,
  minHeight,
  background,
  ...props
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`]);

  return (
    <SectionWrapper ref={ref} $minHeight={minHeight} style={{ background }} {...props}>
      <ParallaxLayer style={{ y }}>
        <Content>{children}</Content>
      </ParallaxLayer>
    </SectionWrapper>
  );
};

// Multi-layer parallax with different speeds
export const MultiLayerParallax = ({ layers = [], minHeight, background, ...props }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  return (
    <SectionWrapper ref={ref} $minHeight={minHeight} style={{ background }} {...props}>
      {layers.map((layer, index) => {
        const y = useTransform(scrollYProgress, [0, 1], ['0%', `${layer.speed * 100}%`]);

        return (
          <ParallaxLayer
            key={index}
            style={{
              y,
              zIndex: layer.zIndex || index,
            }}
          >
            {layer.content}
          </ParallaxLayer>
        );
      })}
    </SectionWrapper>
  );
};

export default MouseParallaxSection;
