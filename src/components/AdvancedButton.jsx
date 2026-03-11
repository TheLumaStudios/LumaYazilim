import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const StyledButton = styled(motion.button)`
  position: relative;
  padding: ${({ $size }) =>
    $size === 'large' ? '1rem 2.5rem' : $size === 'small' ? '0.6rem 1.5rem' : '0.8rem 2rem'};
  font-size: ${({ $size }) =>
    $size === 'large' ? '1.1rem' : $size === 'small' ? '0.9rem' : '1rem'};
  font-weight: 600;
  border-radius: 50px;
  background: ${({ $variant, theme }) =>
    $variant === 'primary'
      ? theme.colors.accent
      : $variant === 'gradient'
      ? theme.colors.gradient1
      : 'transparent'};
  color: ${({ $variant, theme }) =>
    $variant === 'secondary' ? theme.colors.text : theme.colors.white};
  border: ${({ $variant, theme }) =>
    $variant === 'secondary' ? `2px solid ${theme.colors.border}` : 'none'};
  overflow: hidden;
  cursor: none;
  z-index: 1;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    cursor: pointer;
  }
`;

const Ripple = styled(motion.span)`
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
  transform: scale(0);
  pointer-events: none;
`;

const ShineEffect = styled(motion.div)`
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  pointer-events: none;
`;

const AdvancedButton = ({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  ...props
}) => {
  const [ripples, setRipples] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const newRipple = {
      x,
      y,
      size,
      id: Date.now(),
    };

    setRipples([...ripples, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
    }, 600);

    if (onClick) onClick(e);
  };

  return (
    <StyledButton
      $variant={variant}
      $size={size}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      {...props}
    >
      {ripples.map((ripple) => (
        <Ripple
          key={ripple.id}
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.6 }}
        />
      ))}
      <ShineEffect
        animate={isHovered ? { left: '100%' } : { left: '-100%' }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      />
      {children}
    </StyledButton>
  );
};

export default AdvancedButton;
