import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const IconWrapper = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const DrawIcon = ({ children, duration = 2, delay = 0 }) => {
  return (
    <IconWrapper
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
          pathLength: 1,
          opacity: 1,
          transition: {
            pathLength: { duration, delay, ease: 'easeInOut' },
            opacity: { duration: 0.3, delay },
          },
        },
      }}
    >
      {children}
    </IconWrapper>
  );
};

export const PulseIcon = ({ children, scale = 1.2, duration = 1 }) => {
  return (
    <IconWrapper
      animate={{
        scale: [1, scale, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </IconWrapper>
  );
};

export const RotateIcon = ({ children, degrees = 360, duration = 2 }) => {
  return (
    <IconWrapper
      animate={{
        rotate: degrees,
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      {children}
    </IconWrapper>
  );
};

export const BounceIcon = ({ children, distance = 10, duration = 0.5 }) => {
  return (
    <IconWrapper
      animate={{
        y: [-distance, distance, -distance],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </IconWrapper>
  );
};

export const ShakeIcon = ({ children, distance = 5, duration = 0.5 }) => {
  return (
    <IconWrapper
      animate={{
        x: [-distance, distance, -distance, distance, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        repeatDelay: 3,
      }}
    >
      {children}
    </IconWrapper>
  );
};

export const MorphIcon = ({ icon1, icon2, interval = 2000 }) => {
  const [currentIcon, setCurrentIcon] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIcon((prev) => (prev === 0 ? 1 : 0));
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

  return (
    <IconWrapper>
      <motion.div
        key={currentIcon}
        initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        exit={{ opacity: 0, scale: 0.5, rotate: 180 }}
        transition={{ duration: 0.5 }}
      >
        {currentIcon === 0 ? icon1 : icon2}
      </motion.div>
    </IconWrapper>
  );
};

// Animated SVG components
export const AnimatedCheckmark = ({ size = 50, color = '#00ff88' }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 52 52">
      <motion.circle
        cx="26"
        cy="26"
        r="25"
        fill="none"
        stroke={color}
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5 }}
      />
      <motion.path
        fill="none"
        stroke={color}
        strokeWidth="2"
        d="M14 27l8 8 16-16"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      />
    </svg>
  );
};

export const AnimatedCross = ({ size = 50, color = '#ff4444' }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 52 52">
      <motion.circle
        cx="26"
        cy="26"
        r="25"
        fill="none"
        stroke={color}
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5 }}
      />
      <motion.path
        fill="none"
        stroke={color}
        strokeWidth="2"
        d="M16 16l20 20M36 16l-20 20"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      />
    </svg>
  );
};

export const AnimatedLoader = ({ size = 50, color = '#0066FF' }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <motion.circle
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        initial={{ pathLength: 0, rotate: 0 }}
        animate={{
          pathLength: [0.2, 0.8, 0.2],
          rotate: 360,
        }}
        transition={{
          pathLength: {
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          },
          rotate: {
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          },
        }}
        style={{ transformOrigin: 'center' }}
      />
    </svg>
  );
};
