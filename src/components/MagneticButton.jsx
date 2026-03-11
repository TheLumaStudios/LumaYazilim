import { useRef, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useMouse } from 'react-use';

const ButtonWrapper = styled(motion.div)`
  display: inline-block;
  position: relative;
`;

const StyledButton = styled(motion.button)`
  padding: ${({ $size }) =>
    $size === 'large' ? '1.2rem 3rem' : $size === 'medium' ? '1rem 2.5rem' : '0.8rem 2rem'};
  font-size: ${({ $size }) =>
    $size === 'large' ? '1.1rem' : $size === 'medium' ? '1rem' : '0.9rem'};
  font-weight: 600;
  background: ${({ $variant, theme }) =>
    $variant === 'primary' ? theme.colors.text : theme.colors.background};
  color: ${({ $variant, theme }) =>
    $variant === 'primary' ? theme.colors.white : theme.colors.text};
  border: 2px solid ${({ theme }) => theme.colors.text};
  border-radius: 0;
  position: relative;
  overflow: hidden;
  transition: ${({ theme }) => theme.transitions.normal};
  letter-spacing: 0.05em;
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.fonts.heading};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({ $variant, theme }) =>
      $variant === 'primary' ? theme.colors.accent : theme.colors.text};
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: -1;
  }

  &:hover::before {
    transform: scaleX(1);
    transform-origin: left;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.white};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ $size }) =>
      $size === 'large' ? '1rem 2.5rem' : $size === 'medium' ? '0.9rem 2rem' : '0.7rem 1.5rem'};
  }
`;

const MagneticButton = ({
  children,
  onClick,
  size = 'medium',
  variant = 'primary',
  strength = 0.3,
  ...props
}) => {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <ButtonWrapper
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={{
        type: 'spring',
        stiffness: 150,
        damping: 15,
        mass: 0.1,
      }}
    >
      <StyledButton
        onClick={onClick}
        $size={size}
        $variant={variant}
        whileTap={{ scale: 0.95 }}
        {...props}
      >
        {children}
      </StyledButton>
    </ButtonWrapper>
  );
};

export default MagneticButton;
