import { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const CarouselContainer = styled.div`
  width: 100%;
  padding: 3rem 0;
  position: relative;

  .swiper {
    width: 100%;
    padding: 50px 0;
  }

  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 300px;
    height: 400px;
  }

  .swiper-pagination-bullet {
    background: ${({ theme }) => theme.colors.accent};
  }

  .swiper-button-next,
  .swiper-button-prev {
    color: ${({ theme }) => theme.colors.accent};
    background: ${({ theme }) => theme.colors.backgroundGlass};
    backdrop-filter: blur(10px);
    width: 50px;
    height: 50px;
    border-radius: 50%;

    &::after {
      font-size: 20px;
    }
  }
`;

const Card = styled(motion.div)`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.backgroundGlass};
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid ${({ theme }) => `${theme.colors.border}40`};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all ${({ theme }) => theme.transitions.normal};

  &:hover {
    transform: translateY(-10px);
    box-shadow: ${({ theme }) => theme.shadows.xl};
  }
`;

const CardCarousel = ({ items }) => {
  return (
    <CarouselContainer>
      <Swiper
        effect="coverflow"
        grabCursor
        centeredSlides
        slidesPerView="auto"
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <Card
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              {item}
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </CarouselContainer>
  );
};

export default CardCarousel;

// Simple 3D Card Stack Component
const StackContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  height: 500px;
  margin: 0 auto;
  perspective: 1000px;
`;

const StackCard = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.backgroundGlass};
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid ${({ theme }) => `${theme.colors.border}40`};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  cursor: pointer;
`;

const CardStack = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleCardClick = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  return (
    <StackContainer>
      <AnimatePresence mode="wait">
        {cards.map((card, index) => {
          const offset = index - currentIndex;
          const isVisible = Math.abs(offset) <= 2;

          if (!isVisible) return null;

          return (
            <StackCard
              key={index}
              onClick={handleCardClick}
              initial={{
                rotateY: offset * 10,
                scale: 1 - Math.abs(offset) * 0.1,
                z: -Math.abs(offset) * 100,
                opacity: 1 - Math.abs(offset) * 0.3,
              }}
              animate={{
                rotateY: offset * 10,
                scale: 1 - Math.abs(offset) * 0.1,
                z: -Math.abs(offset) * 100,
                opacity: 1 - Math.abs(offset) * 0.3,
              }}
              exit={{
                rotateY: -30,
                scale: 0.8,
                opacity: 0,
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
              }}
              style={{
                zIndex: cards.length - Math.abs(offset),
              }}
            >
              {card}
            </StackCard>
          );
        })}
      </AnimatePresence>
    </StackContainer>
  );
};

export { CardStack };
