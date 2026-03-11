import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

const TransitionOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: ${({ theme }) => theme.colors.accent};
  z-index: ${({ theme }) => theme.zIndex.modal + 1};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoadingText = styled(motion.div)`
  font-size: 2rem;
  color: white;
  font-weight: 700;
  font-family: ${({ theme }) => theme.fonts.heading};
`;

export const PageTransition = ({ isTransitioning }) => {
  return (
    <AnimatePresence>
      {isTransitioning && (
        <TransitionOverlay
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          exit={{ scaleY: 0 }}
          transition={{
            duration: 0.5,
            ease: [0.87, 0, 0.13, 1],
          }}
          style={{ originY: 0 }}
        >
          <LoadingText
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 0.2 }}
          >
            Loading...
          </LoadingText>
        </TransitionOverlay>
      )}
    </AnimatePresence>
  );
};

// Slide transition variant
export const SlideTransition = ({ isTransitioning, direction = 'right' }) => {
  const directionVariants = {
    right: { x: '100%' },
    left: { x: '-100%' },
    up: { y: '-100%' },
    down: { y: '100%' },
  };

  return (
    <AnimatePresence>
      {isTransitioning && (
        <TransitionOverlay
          initial={directionVariants[direction]}
          animate={{ x: 0, y: 0 }}
          exit={directionVariants[direction]}
          transition={{
            duration: 0.5,
            ease: [0.87, 0, 0.13, 1],
          }}
        />
      )}
    </AnimatePresence>
  );
};

// Circular expand transition
export const CircularTransition = ({ isTransitioning }) => {
  return (
    <AnimatePresence>
      {isTransitioning && (
        <TransitionOverlay
          initial={{ clipPath: 'circle(0% at 50% 50%)' }}
          animate={{ clipPath: 'circle(150% at 50% 50%)' }}
          exit={{ clipPath: 'circle(0% at 50% 50%)' }}
          transition={{
            duration: 0.8,
            ease: [0.87, 0, 0.13, 1],
          }}
        />
      )}
    </AnimatePresence>
  );
};

// Curtain transition
const CurtainLeft = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 50%;
  height: 100vh;
  background: ${({ theme }) => theme.colors.accent};
  z-index: ${({ theme }) => theme.zIndex.modal + 1};
`;

const CurtainRight = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 50%;
  height: 100vh;
  background: ${({ theme }) => theme.colors.accent};
  z-index: ${({ theme }) => theme.zIndex.modal + 1};
`;

export const CurtainTransition = ({ isTransitioning }) => {
  return (
    <AnimatePresence>
      {isTransitioning && (
        <>
          <CurtainLeft
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{
              duration: 0.6,
              ease: [0.87, 0, 0.13, 1],
            }}
          />
          <CurtainRight
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{
              duration: 0.6,
              ease: [0.87, 0, 0.13, 1],
            }}
          />
        </>
      )}
    </AnimatePresence>
  );
};
