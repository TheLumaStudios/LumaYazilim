import { useRef } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const TimelineWrapper = styled.section`
  padding: 4rem 0;
  position: relative;
`;

const TimelineContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
`;

const TimelineLine = styled.div`
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: ${({ theme }) => theme.colors.border};
  transform: translateX(-50%);

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    left: 30px;
  }
`;

const TimelineProgress = styled(motion.div)`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  background: ${({ theme }) => theme.colors.accent};
  transform-origin: top;
`;

const TimelineItem = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-bottom: 4rem;
  position: relative;

  &:nth-child(even) {
    direction: rtl;

    > * {
      direction: ltr;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    margin-left: 60px;
    direction: ltr !important;
  }
`;

const TimelineContent = styled.div`
  position: relative;
`;

const TimelineDot = styled(motion.div)`
  position: absolute;
  left: 50%;
  top: 0;
  width: 20px;
  height: 20px;
  background: ${({ theme }) => theme.colors.background};
  border: 3px solid ${({ theme }) => theme.colors.accent};
  border-radius: 50%;
  transform: translateX(-50%);
  z-index: 2;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    left: -80px;
  }
`;

const TimelineYear = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.accent};
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-family: ${({ theme }) => theme.fonts.heading};
`;

const TimelineTitle = styled.h3`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.75rem;
  font-weight: 700;
  font-family: ${({ theme }) => theme.fonts.heading};
`;

const TimelineDescription = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.8;
`;

const timelineData = [
  {
    year: '2019',
    title: 'Kuruluş ve İlk Adımlar',
    description:
      'İstanbul\'da 5 kişilik uzman ekiple Luma Yazılım kuruldu. İlk kurumsal web projemizi başarıyla tamamladık ve React ekosisteminde uzmanlaşma yolculuğumuza başladık.',
  },
  {
    year: '2020',
    title: 'Fintech Projeleri',
    description:
      'Finansal teknoloji alanında 3 büyük projeye imza attık. Ödeme sistemleri ve mobil bankacılık uygulamaları geliştirdik. AWS sertifikasyonlarımızı tamamladık.',
  },
  {
    year: '2021',
    title: 'Ekip Genişlemesi',
    description:
      '15 kişilik ekibe ulaştık. E-ticaret ve lojistik sektörlerinde 25+ proje teslim ettik. DevOps ve mikroservis mimarisi konusunda uzmanlaştık.',
  },
  {
    year: '2022',
    title: 'Bulut Dönüşüm Lideri',
    description:
      'Google Cloud Partner olduk. 40+ kurumsal müşteriye bulut altyapı danışmanlığı verdik. Kubernetes ve containerization projelerinde öncü pozisyon kazandık.',
  },
  {
    year: '2023',
    title: 'AI ve ML Entegrasyonu',
    description:
      'Yapay zeka ve makine öğrenmesi çözümleri geliştirmeye başladık. 60+ başarılı proje, %98 müşteri memnuniyeti oranına ulaştık. Sağlık ve eğitim sektörlerinde yeni projeler.',
  },
  {
    year: '2024',
    title: 'Teknoloji Hub',
    description:
      '25+ kişilik multidisipliner ekip. Maslak\'ta yeni ofisimizi açtık. Blockchain ve Web3 teknolojilerine yatırım yaptık. ISO 27001 sertifikası aldık.',
  },
  {
    year: '2025',
    title: 'Sürekli İnovasyon',
    description:
      'Edge computing ve IoT çözümleri geliştiriyoruz. Avrupa pazarına açılma hedefiyle yol alıyoruz. Açık kaynak projelerimizle topluluğa katkı sağlıyoruz.',
  },
];

const Timeline = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start center', 'end center'],
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <TimelineWrapper ref={ref}>
      <TimelineContainer>
        <TimelineLine>
          <TimelineProgress style={{ scaleY }} />
        </TimelineLine>

        {timelineData.map((item, index) => (
          <TimelineItemComponent key={index} item={item} index={index} />
        ))}
      </TimelineContainer>
    </TimelineWrapper>
  );
};

const TimelineItemComponent = ({ item, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <TimelineItem
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.2, ease: [0.6, 0.05, 0.01, 0.9] }}
    >
      <TimelineContent>
        <TimelineYear>{item.year}</TimelineYear>
        <TimelineTitle>{item.title}</TimelineTitle>
        <TimelineDescription>{item.description}</TimelineDescription>
      </TimelineContent>
      <div>
        <TimelineDot
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
          whileHover={{ scale: 1.5 }}
        />
      </div>
    </TimelineItem>
  );
};

export default Timeline;
