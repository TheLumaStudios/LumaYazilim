import styled from 'styled-components';
import { MouseParallaxSection } from './ParallaxSection';
import { WordReveal } from './TextReveal';
import MagneticButton from './MagneticButton';
import AnimatedCounter from './AnimatedCounter';

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.background};
  position: relative;
  overflow: hidden;
  padding: 0 2rem;
  padding-top: 6rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding-top: 5rem;
  }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  text-align: center;
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.base};
`;

const TitleWrapper = styled.div`
  margin-bottom: 1.5rem;
  overflow: hidden;
`;

const Title = styled.h1`
  font-size: clamp(2.5rem, 8vw, 7rem);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  line-height: 0.9;
  letter-spacing: -0.04em;
  margin-bottom: 0;
  font-family: ${({ theme }) => theme.fonts.heading};
  text-transform: uppercase;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: clamp(2rem, 10vw, 4.5rem);
  }
`;

const Subtitle = styled.div`
  font-size: clamp(0.95rem, 1.8vw, 1.2rem);
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  font-weight: 400;
  line-height: 1.7;
  letter-spacing: 0.01em;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-bottom: 2.5rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.25rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 6rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin-bottom: 3rem;
  }
`;

const AccentLine = styled.div`
  width: 80px;
  height: 2px;
  background: ${({ theme }) => theme.colors.accent};
  margin: 0 auto 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 60px;
    margin-bottom: 1.5rem;
  }
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 2.5rem;
  max-width: 700px;
  margin: 0 auto 4rem;
  padding-top: 3rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: 1.75rem;
    margin-bottom: 3rem;
    padding-top: 2.5rem;
  }
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.heading};
  margin-bottom: 0.4rem;
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textLight};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 500;
`;

const Hero = () => {
  const handleScrollToContact = () => {
    document.getElementById('iletisim')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToServices = () => {
    document.getElementById('hizmetler')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <HeroSection id="anasayfa" data-scroll-section>
      <Container>
        <AccentLine />

        <TitleWrapper>
          <Title>
            <WordReveal delay={0.2}>Luma Yazılım</WordReveal>
          </Title>
        </TitleWrapper>

        <Subtitle>
          <WordReveal delay={0.6}>
            Dijital dönüşümde yanınızdayız. Web, mobil ve bulut teknolojileri ile
            işinizi geleceğe taşıyan, ölçeklenebilir yazılım çözümleri geliştiriyoruz.
          </WordReveal>
        </Subtitle>

        <ButtonGroup>
          <MagneticButton onClick={handleScrollToContact} size="large" variant="primary">
            Proje Başlat
          </MagneticButton>
          <MagneticButton onClick={handleScrollToServices} size="large" variant="secondary">
            Hizmetlerimiz
          </MagneticButton>
        </ButtonGroup>

        <Stats>
          <StatItem>
            <StatNumber>
              <AnimatedCounter end={150} suffix="+" duration={2500} />
            </StatNumber>
            <StatLabel>Tamamlanan Proje</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>
              <AnimatedCounter end={80} suffix="+" duration={2500} />
            </StatNumber>
            <StatLabel>Mutlu Müşteri</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>
              <AnimatedCounter end={98} suffix="%" duration={2500} />
            </StatNumber>
            <StatLabel>Müşteri Memnuniyeti</StatLabel>
          </StatItem>
        </Stats>
      </Container>
    </HeroSection>
  );
};

export default Hero;
