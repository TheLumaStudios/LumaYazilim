import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import confetti from 'canvas-confetti';

const EasterEggMessage = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${({ theme }) => theme.colors.backgroundGlass};
  backdrop-filter: blur(20px);
  padding: 3rem;
  border-radius: 20px;
  border: 2px solid ${({ theme }) => theme.colors.accent};
  box-shadow: ${({ theme }) => theme.shadows.xl};
  z-index: ${({ theme }) => theme.zIndex.modal};
  text-align: center;
  max-width: 500px;
`;

const EasterEggTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  background: ${({ theme }) => theme.colors.accentGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const EasterEggText = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.6;
`;

const CloseButton = styled(motion.button)`
  margin-top: 2rem;
  padding: 0.8rem 2rem;
  background: ${({ theme }) => theme.colors.accent};
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
`;

// Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A
const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

export const useKonamiCode = (callback) => {
  const [keys, setKeys] = useState([]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      setKeys((prevKeys) => {
        const newKeys = [...prevKeys, e.key].slice(-10);

        if (newKeys.join(',') === KONAMI_CODE.join(',')) {
          callback();
          return [];
        }

        return newKeys;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [callback]);
};

// Secret Click Pattern
export const useSecretClick = (callback, pattern = [3, 2, 3]) => {
  const [clicks, setClicks] = useState([]);
  const [patternIndex, setPatternIndex] = useState(0);

  const handleClick = useCallback(() => {
    setClicks((prev) => [...prev, Date.now()]);

    setTimeout(() => {
      setClicks((prev) => {
        const recent = prev.filter((time) => Date.now() - time < 2000);

        if (recent.length === pattern[patternIndex]) {
          if (patternIndex === pattern.length - 1) {
            callback();
            setPatternIndex(0);
            return [];
          } else {
            setPatternIndex((i) => i + 1);
            return [];
          }
        }

        return recent;
      });
    }, 2000);
  }, [callback, pattern, patternIndex]);

  return handleClick;
};

// Main Easter Egg Component
const EasterEggs = () => {
  const [showKonamiMessage, setShowKonamiMessage] = useState(false);
  const [showSecretMessage, setShowSecretMessage] = useState(false);

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 10000 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  useKonamiCode(() => {
    setShowKonamiMessage(true);
    triggerConfetti();
  });

  // Secret double-click on logo
  useEffect(() => {
    let clickCount = 0;
    let timer;

    const handleLogoClick = () => {
      clickCount++;

      if (clickCount === 7) {
        setShowSecretMessage(true);
        triggerConfetti();
        clickCount = 0;
      }

      clearTimeout(timer);
      timer = setTimeout(() => {
        clickCount = 0;
      }, 2000);
    };

    // Find logo or title element
    const logo = document.querySelector('h1');
    if (logo) {
      logo.addEventListener('click', handleLogoClick);
    }

    return () => {
      if (logo) {
        logo.removeEventListener('click', handleLogoClick);
      }
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {showKonamiMessage && (
          <EasterEggMessage
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotate: 10 }}
            transition={{ type: 'spring', damping: 15 }}
          >
            <EasterEggTitle>🎮 Konami Code Activated!</EasterEggTitle>
            <EasterEggText>
              You've discovered the legendary cheat code!
              <br />
              As a reward, here's some confetti and our eternal respect.
              <br />
              <br />
              <strong>Achievement Unlocked: True Gamer</strong>
            </EasterEggText>
            <CloseButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowKonamiMessage(false)}
            >
              Awesome!
            </CloseButton>
          </EasterEggMessage>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSecretMessage && (
          <EasterEggMessage
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            <EasterEggTitle>🔍 Secret Discovered!</EasterEggTitle>
            <EasterEggText>
              You found the hidden easter egg by clicking the logo 7 times!
              <br />
              <br />
              Fun fact: This website was built with ❤️ by Luma Yazılım
              using React, Framer Motion, Three.js, and a lot of coffee ☕
            </EasterEggText>
            <CloseButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowSecretMessage(false)}
            >
              Cool!
            </CloseButton>
          </EasterEggMessage>
        )}
      </AnimatePresence>
    </>
  );
};

export default EasterEggs;
