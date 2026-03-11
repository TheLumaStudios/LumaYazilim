import styled from 'styled-components';
import { motion } from 'framer-motion';

export const GlassCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.backgroundGlass};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: ${({ $radius }) => $radius || '20px'};
  border: 1px solid ${({ theme }) => `${theme.colors.border}40`};
  padding: ${({ $padding }) => $padding || '2rem'};
  box-shadow: ${({ theme }) => theme.shadows.glass};
  transition: all ${({ theme }) => theme.transitions.normal};

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
    border-color: ${({ theme }) => `${theme.colors.accent}40`};
  }
`;

export const NeumorphicCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ $radius }) => $radius || '20px'};
  padding: ${({ $padding }) => $padding || '2rem'};
  box-shadow: ${({ theme, $inset }) =>
    $inset ? theme.shadows.neumorphicInset : theme.shadows.neumorphic};
  transition: all ${({ theme }) => theme.transitions.normal};

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

export const GradientCard = styled(motion.div)`
  background: ${({ $gradient, theme }) => $gradient || theme.colors.gradient1};
  border-radius: ${({ $radius }) => $radius || '20px'};
  padding: ${({ $padding }) => $padding || '2rem'};
  color: white;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  transition: all ${({ theme }) => theme.transitions.normal};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      45deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
    transform: translateX(-100%);
    transition: transform 0.6s;
  }

  &:hover::before {
    transform: translateX(100%);
  }

  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: ${({ theme }) => theme.shadows.xl};
  }
`;

export const AnimatedGradientBorder = styled(motion.div)`
  position: relative;
  padding: 3px;
  border-radius: ${({ $radius }) => $radius || '20px'};
  background: linear-gradient(
    60deg,
    #f79533,
    #f37055,
    #ef4e7b,
    #a166ab,
    #5073b8,
    #1098ad,
    #07b39b,
    #6fba82
  );
  background-size: 300% 300%;
  animation: gradient-animation 4s ease infinite;

  @keyframes gradient-animation {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  > div {
    background: ${({ theme }) => theme.colors.background};
    border-radius: ${({ $radius }) => $radius || '18px'};
    padding: ${({ $padding }) => $padding || '2rem'};
  }
`;
