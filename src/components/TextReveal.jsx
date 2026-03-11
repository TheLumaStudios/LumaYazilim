import { useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';

const RevealWrapper = styled.div`
  overflow: hidden;
  display: inline-block;
`;

const RevealText = styled(motion.span)`
  display: inline-block;
`;

// Word by word reveal
export const WordReveal = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const words = children.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: delay },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.span
      ref={ref}
      style={{ display: 'inline-block' }}
      variants={container}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {words.map((word, index) => (
        <RevealWrapper key={index}>
          <RevealText variants={child}>
            {word}
            {index !== words.length - 1 ? '\u00A0' : ''}
          </RevealText>
        </RevealWrapper>
      ))}
    </motion.span>
  );
};

// Line by line reveal
export const LineReveal = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <RevealWrapper ref={ref}>
      <RevealText
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{
          duration: 0.8,
          delay: delay,
          ease: [0.6, 0.05, 0.01, 0.9],
        }}
      >
        {children}
      </RevealText>
    </RevealWrapper>
  );
};

// Fade in reveal
export const FadeReveal = ({ children, delay = 0, direction = 'up' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const directionOffset = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: 40 },
    right: { y: 0, x: -40 },
  };

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        ...directionOffset[direction],
      }}
      animate={
        isInView
          ? { opacity: 1, y: 0, x: 0 }
          : { opacity: 0, ...directionOffset[direction] }
      }
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.6, 0.05, 0.01, 0.9],
      }}
    >
      {children}
    </motion.div>
  );
};

// Scale reveal
export const ScaleReveal = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{
        duration: 0.6,
        delay: delay,
        ease: [0.6, 0.05, 0.01, 0.9],
      }}
    >
      {children}
    </motion.div>
  );
};

export default WordReveal;
