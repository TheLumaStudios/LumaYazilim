import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import React from 'react';
import { FadeReveal } from './TextReveal';
import FlipCard from './FlipCard';
import TiltEffect from './TiltEffect';
import { FiZap, FiSmartphone, FiPenTool, FiCloud, FiLock, FiSettings } from 'react-icons/fi';

const ServicesSection = styled.section`
  padding: 7rem 2rem;
  background: ${({ theme }) => theme.colors.background};
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 4.5rem 2rem;
  }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const Header = styled.div`
  max-width: 700px;
  margin-bottom: 5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-bottom: 3.5rem;
  }
`;

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

const SectionDescription = styled.p`
  font-size: clamp(0.95rem, 1.8vw, 1.1rem);
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.7;
  max-width: 550px;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.75rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const ServiceNumber = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textLight};
  font-weight: 600;
  margin-bottom: 2rem;
  font-family: ${({ theme }) => theme.fonts.heading};
  letter-spacing: 0.1em;
`;

const ServiceIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  line-height: 1;
`;

const ServiceTitle = styled.h3`
  font-size: clamp(1.25rem, 2.2vw, 1.65rem);
  margin-bottom: 0.85rem;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 700;
  font-family: ${({ theme }) => theme.fonts.heading};
  letter-spacing: -0.02em;
`;

const ServiceDescription = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.7;
  font-size: 0.95rem;
  flex: 1;
`;

const ServiceTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: auto;
  padding-top: 1.5rem;
`;

const Tag = styled.span`
  font-size: 0.75rem;
  padding: 0.4rem 0.8rem;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  color: ${({ theme }) => theme.colors.textLight};
  border: 1px solid ${({ theme }) => theme.colors.border};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 500;
`;

// Back of card styles
const BackServiceTitle = styled.h3`
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.white};
  font-weight: 700;
  font-family: ${({ theme }) => theme.fonts.heading};
  letter-spacing: -0.02em;
`;

const BackFeatureList = styled.ul`
  list-style: none;
  margin-bottom: auto;
`;

const BackFeatureItem = styled.li`
  color: rgba(255, 255, 255, 0.9);
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.95rem;

  &:before {
    content: '✓';
    color: ${({ theme }) => theme.colors.accent};
    font-weight: bold;
    margin-right: 0.75rem;
  }
`;

const BackCTA = styled.div`
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const services = [
  {
    number: '01',
    icon: FiZap,
    title: 'Web Geliştirme',
    description:
      'React, Vue ve Next.js ile kurumsal düzeyde, yüksek performanslı web uygulamaları geliştiriyoruz. SEO uyumlu, hızlı ve ölçeklenebilir çözümler.',
    tags: ['React', 'Vue', 'Next.js', 'TypeScript'],
    features: [
      'Modern framework\'lerle kurumsal uygulamalar',
      'Google PageSpeed 95+ performans skoru',
      'SEO ve erişilebilirlik optimizasyonu',
      'RESTful ve GraphQL API entegrasyonları',
      'Serverless ve JAMstack mimarileri',
    ],
  },
  {
    number: '02',
    icon: FiSmartphone,
    title: 'Mobil Uygulama',
    description:
      'React Native ve Flutter ile iOS ve Android için tek kod tabanından native performanslı uygulamalar. App Store ve Play Store süreçlerinde tam destek.',
    tags: ['React Native', 'Flutter', 'iOS', 'Android'],
    features: [
      'Tek kod tabanı ile iOS ve Android geliştirme',
      'Native modüller ile platform özellikleri',
      'Firebase ve AWS entegrasyonları',
      'Offline-first yaklaşım ve senkronizasyon',
      'CI/CD ile otomatik deployment ve test',
    ],
  },
  {
    number: '03',
    icon: FiPenTool,
    title: 'UI/UX Tasarım',
    description:
      'Kullanıcı merkezli tasarım yaklaşımı ile dönüşüm odaklı arayüzler. Figma ve Adobe XD ile profesyonel tasarım sistemleri ve prototipleme.',
    tags: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping'],
    features: [
      'Kullanıcı araştırması ve persona oluşturma',
      'Interaktif prototip ve kullanılabilirlik testi',
      'Atomic design ile ölçeklenebilir sistemler',
      'Erişilebilirlik (WCAG 2.1) standartları',
      'A/B test desteği ve analiz entegrasyonu',
    ],
  },
  {
    number: '04',
    icon: FiCloud,
    title: 'Bulut Çözümleri',
    description:
      'AWS, Azure ve Google Cloud platformlarında DevOps ve SRE prensiplerine uygun, otomatik ölçeklenen, yüksek erişilebilir altyapılar.',
    tags: ['AWS', 'Azure', 'GCP', 'DevOps'],
    features: [
      'Infrastructure as Code (Terraform, CloudFormation)',
      'Kubernetes ve Docker container orkestrasyon',
      'CI/CD pipeline\'ları (GitLab, GitHub Actions)',
      'Mikroservis mimarisi ve API Gateway',
      'Cost optimization ve performans izleme',
    ],
  },
  {
    number: '05',
    icon: FiLock,
    title: 'Güvenlik',
    description:
      'OWASP standartlarında güvenlik testleri, penetrasyon testleri ve kod denetimi. KVKK ve GDPR uyumluluğu için danışmanlık hizmeti.',
    tags: ['Security', 'Penetration', 'Audit', 'Compliance'],
    features: [
      'OWASP Top 10 güvenlik açıklarına karşı test',
      'Penetrasyon testi ve zafiyet analizi',
      'Güvenli kod incelemesi (SAST, DAST)',
      'KVKK ve GDPR uyumluluk danışmanlığı',
      'ISO 27001 ve SOC 2 hazırlık desteği',
    ],
  },
  {
    number: '06',
    icon: FiSettings,
    title: 'Bakım & Destek',
    description:
      'Proaktif izleme, otomatik yedekleme ve 7/24 teknik destek ile uygulamalarınızın kesintisiz çalışmasını sağlıyoruz. SLA garantili hizmet.',
    tags: ['Support', 'Maintenance', 'Updates', 'Monitoring'],
    features: [
      '7/24 teknik destek ve olay yönetimi',
      'Proaktif izleme ve uyarı sistemleri',
      'Otomatik yedekleme ve felaket kurtarma',
      'Düzenli güvenlik güncellemeleri',
      'SLA garantili yanıt süreleri',
    ],
  },
];

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <ServicesSection id="hizmetler" ref={ref} data-scroll-section>
      <Container>
        <Header>
          <FadeReveal direction="up" delay={0.1}>
            <SectionLabel>Hizmetlerimiz</SectionLabel>
          </FadeReveal>
          <FadeReveal direction="up" delay={0.2}>
            <SectionTitle>Dijital Başarınız İçin Kapsamlı Çözümler</SectionTitle>
          </FadeReveal>
          <FadeReveal direction="up" delay={0.3}>
            <SectionDescription>
              Kurumsal düzeyde web uygulamalarından mobil çözümlere, bulut altyapısından
              güvenlik testlerine kadar tüm ihtiyaçlarınız için yanınızdayız. Kartların
              üzerine gelerek detayları keşfedin.
            </SectionDescription>
          </FadeReveal>
        </Header>

        <ServicesGrid>
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.6, 0.05, 0.01, 0.9],
              }}
            >
              <TiltEffect options={{ max: 5, scale: 1.02, glare: true, 'max-glare': 0.1 }}>
                <FlipCard
                  front={
                    <>
                      <ServiceNumber>{service.number}</ServiceNumber>
                      <ServiceIcon>
                        {React.createElement(service.icon)}
                      </ServiceIcon>
                      <ServiceTitle>{service.title}</ServiceTitle>
                      <ServiceDescription>{service.description}</ServiceDescription>
                      <ServiceTags>
                        {service.tags.map((tag, idx) => (
                          <Tag key={idx}>{tag}</Tag>
                        ))}
                      </ServiceTags>
                    </>
                  }
                  back={
                    <>
                      <BackServiceTitle>{service.title}</BackServiceTitle>
                      <BackFeatureList>
                        {service.features.map((feature, idx) => (
                          <BackFeatureItem key={idx}>{feature}</BackFeatureItem>
                        ))}
                      </BackFeatureList>
                      <BackCTA>Hover to flip back</BackCTA>
                    </>
                  }
                />
              </TiltEffect>
            </motion.div>
          ))}
        </ServicesGrid>
      </Container>
    </ServicesSection>
  );
};

export default Services;
