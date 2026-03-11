import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import useSoundEffects from '../hooks/useSoundEffects';

const ToggleButton = styled(motion.button)`
  position: fixed;
  top: 8rem;
  right: 2rem;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.backgroundGlass};
  backdrop-filter: blur(10px);
  border: 1px solid ${({ theme }) => `${theme.colors.border}40`};
  box-shadow: ${({ theme }) => theme.shadows.md};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: ${({ theme }) => theme.zIndex.fixed};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    top: 5rem;
    right: 1rem;
    width: 50px;
    height: 50px;
  }
`;

const IconWrapper = styled(motion.div)`
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SoundToggle = () => {
  const { enabled, toggleSound, playClick } = useSoundEffects();

  const handleToggle = () => {
    if (enabled) {
      playClick();
    }
    toggleSound();
  };

  return (
    <ToggleButton
      onClick={handleToggle}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      title={enabled ? 'Sesleri Kapat' : 'Sesleri Aç'}
    >
      <IconWrapper
        initial={false}
        animate={{
          scale: enabled ? 1 : 0.8,
          opacity: enabled ? 1 : 0.5,
        }}
        transition={{ duration: 0.2 }}
      >
        {enabled ? '🔊' : '🔇'}
      </IconWrapper>
    </ToggleButton>
  );
};

export default SoundToggle;
