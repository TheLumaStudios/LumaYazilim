import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const CardContainer = styled.div`
  perspective: 1000px;
  height: 100%;
  min-height: 400px;
`;

const CardInner = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  cursor: pointer;
`;

const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
  padding: 3rem;
  display: flex;
  flex-direction: column;
`;

const CardFront = styled(CardFace)``;

const CardBack = styled(CardFace)`
  transform: rotateY(180deg);
  background: ${({ theme }) => theme.colors.text};
  color: ${({ theme }) => theme.colors.white};
`;

const FlipCard = ({ front, back }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <CardContainer
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <CardInner
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{
          duration: 0.6,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        <CardFront>{front}</CardFront>
        <CardBack>{back}</CardBack>
      </CardInner>
    </CardContainer>
  );
};

export default FlipCard;
