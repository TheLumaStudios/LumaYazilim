import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import React from 'react';
import { FadeReveal } from './TextReveal';
import Timeline from './Timeline';
import { FiZap, FiTarget, FiTool, FiTrendingUp } from 'react-icons/fi';

const AboutSection = styled.section`
  padding: 7rem 2rem;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 4.5rem 2rem;
  }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8rem;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
`;

const TextContent = styled.div``;

const SectionLabel = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textLight};
  text-transform: uppercase;
  letter-spacing: 0.2em;
  margin-bottom: 1.5rem;
  font-weight: 500;
`;

const SectionTitle = styled.h2`
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.1;
  letter-spacing: -0.03em;
  margin-bottom: 1.5rem;
  font-family: ${({ theme }) => theme.fonts.heading};
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.7;
  margin-bottom: 1.25rem;
  font-size: 0.95rem;
`;

const StatsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
  margin-top: 4rem;
  padding-top: 4rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: 2rem;
    margin-top: 3rem;
    padding-top: 3rem;
  }
`;

const StatItem = styled(motion.div)`
  text-align: left;
`;

const StatNumber = styled.div`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.heading};
  margin-bottom: 0.4rem;
  line-height: 1;
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textLight};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 500;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled(motion.div)`
  padding: 2rem;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  position: relative;
  transition: all ${({ theme }) => theme.transitions.normal};

  &:hover {
    transform: translateY(-5px);
    border-color: ${({ theme }) => theme.colors.text};
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: ${({ theme }) => theme.colors.text};
    transition: width ${({ theme }) => theme.transitions.normal};
  }

  &:hover::before {
    width: 100%;
  }
`;

const FeatureIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
  line-height: 1;
`;

const FeatureTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.65rem;
  font-family: ${({ theme }) => theme.fonts.heading};
  letter-spacing: -0.01em;
`;

const FeatureText = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.6;
`;

const stats = [
  { number: '150+', label: 'Başarılı Proje' },
  { number: '80+', label: 'Kurumsal Müşteri' },
  { number: '6+', label: 'Yıllık Tecrübe' },
  { number: '25+', label: 'Uzman Ekip' },
];

const features = [
  {
    icon: FiZap,
    title: 'Agile & Hızlı',
    text: '2 haftalık sprint\'lerle hızlı teslimat, sürekli geri bildirim',
  },
  {
    icon: FiTarget,
    title: 'İş Odaklı',
    text: 'KPI ve ROI odaklı çözümler, ölçülebilir başarı metrikleri',
  },
  {
    icon: FiTool,
    title: 'SLA Garantili',
    text: '7/24 destek, %99.9 uptime garantisi, proaktif izleme',
  },
  {
    icon: FiTrendingUp,
    title: 'Sürekli İyileştirme',
    text: 'CI/CD, otomatik testler, kod kalitesi ve performans takibi',
  },
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <AboutSection id="hakkimizda" ref={ref} data-scroll-section>
      <Container>
        <ContentWrapper>
          <TextContent>
            <FadeReveal direction="up" delay={0.1}>
              <SectionLabel>Hakkımızda</SectionLabel>
            </FadeReveal>
            <FadeReveal direction="up" delay={0.2}>
              <SectionTitle>Teknoloji ve İnovasyon ile Fark Yaratıyoruz</SectionTitle>
            </FadeReveal>
            <FadeReveal direction="up" delay={0.3}>
              <Description>
                2019'dan bu yana Türkiye'nin önde gelen şirketleri için dijital dönüşüm
                projeleri gerçekleştiriyoruz. Fintech'ten e-ticarete, sağlık teknolojilerinden
                kurumsal yazılımlara kadar geniş bir yelpazede, ölçeklenebilir ve sürdürülebilir
                çözümler üretiyoruz.
              </Description>
            </FadeReveal>
            <FadeReveal direction="up" delay={0.4}>
              <Description>
                Agile metodoloji, DevOps kültürü ve sürekli iyileştirme prensipleriyle çalışan
                ekibimiz, AWS ve Google Cloud sertifikalı mühendislerden oluşuyor. Her projede
                kod kalitesi, güvenlik ve performansı en üst düzeyde tutmak için test güdümlü
                geliştirme (TDD) ve kod incelemesi süreçlerini titizlikle uyguluyoruz.
              </Description>
            </FadeReveal>
            <StatsWrapper>
              {stats.map((stat, index) => (
                <StatItem
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.5 + index * 0.1,
                    ease: [0.6, 0.05, 0.01, 0.9],
                  }}
                >
                  <StatNumber>{stat.number}</StatNumber>
                  <StatLabel>{stat.label}</StatLabel>
                </StatItem>
              ))}
            </StatsWrapper>
          </TextContent>

          <FeaturesGrid>
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{
                  duration: 0.5,
                  delay: 0.6 + index * 0.1,
                  ease: [0.6, 0.05, 0.01, 0.9],
                }}
              >
                <FeatureIcon>
                  {React.createElement(feature.icon)}
                </FeatureIcon>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureText>{feature.text}</FeatureText>
              </FeatureCard>
            ))}
          </FeaturesGrid>
        </ContentWrapper>

        <Timeline />
      </Container>
    </AboutSection>
  );
};

export default About;
