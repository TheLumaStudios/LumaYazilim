import styled from 'styled-components';
import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FadeReveal } from './TextReveal';
import MagneticButton from './MagneticButton';
import { AnimatedInput, AnimatedTextArea } from './AnimatedForm';

const ContactSection = styled.section`
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

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 8rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
`;

const ContactInfo = styled.div``;

const InfoItem = styled(motion.div)`
  margin-bottom: 3rem;
  padding-bottom: 3rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

const InfoLabel = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textLight};
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin-bottom: 0.75rem;
  font-weight: 500;
`;

const InfoValue = styled.div`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
  font-family: ${({ theme }) => theme.fonts.heading};
`;

const Form = styled(motion.form)`
  background: ${({ theme }) => theme.colors.backgroundAlt};
  padding: 3rem;
  border: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 1.75rem;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 2.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.75rem;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem 0;
  border: none;
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
  font-size: 1rem;
  transition: border-color ${({ theme }) => theme.transitions.normal};
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.main};

  &:focus {
    outline: none;
    border-bottom-color: ${({ theme }) => theme.colors.text};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textLight};
    opacity: 0.5;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem 0;
  border: none;
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  font-family: ${({ theme }) => theme.fonts.main};
  transition: border-color ${({ theme }) => theme.transitions.normal};
  background: transparent;
  color: ${({ theme }) => theme.colors.text};

  &:focus {
    outline: none;
    border-bottom-color: ${({ theme }) => theme.colors.text};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textLight};
    opacity: 0.5;
  }
`;

const ButtonWrapper = styled.div`
  margin-top: 3rem;
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Mesajınız için teşekkürler! En kısa sürede size dönüş yapacağız.');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <ContactSection id="iletisim" ref={ref} data-scroll-section>
      <Container>
        <Header>
          <FadeReveal direction="up" delay={0.1}>
            <SectionLabel>İletişim</SectionLabel>
          </FadeReveal>
          <FadeReveal direction="up" delay={0.2}>
            <SectionTitle>Dijital Dönüşüm Yolculuğunuza Başlayın</SectionTitle>
          </FadeReveal>
          <FadeReveal direction="up" delay={0.3}>
            <SectionDescription>
              Projeniz için ücretsiz danışmanlık ve teknik analiz sunuyoruz. İletişim
              formunu doldurun, 24 saat içinde uzman ekibimizden geri dönüş alın.
              Gizlilik ve veri güvenliği garantisiyle çalışıyoruz.
            </SectionDescription>
          </FadeReveal>
        </Header>

        <ContentWrapper>
          <ContactInfo>
            <InfoItem
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.4, ease: [0.6, 0.05, 0.01, 0.9] }}
            >
              <InfoLabel>Email</InfoLabel>
              <InfoValue>info@lumayazilim.com</InfoValue>
            </InfoItem>
            <InfoItem
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.5, ease: [0.6, 0.05, 0.01, 0.9] }}
            >
              <InfoLabel>Telefon</InfoLabel>
              <InfoValue>+90 (212) 555 00 00</InfoValue>
            </InfoItem>
            <InfoItem
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.6, ease: [0.6, 0.05, 0.01, 0.9] }}
            >
              <InfoLabel>Adres</InfoLabel>
              <InfoValue>Maslak, Sarıyer / İstanbul</InfoValue>
            </InfoItem>
          </ContactInfo>

          <Form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.6, 0.05, 0.01, 0.9] }}
          >
            <AnimatedInput
              label="Adınız"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              maxLength={50}
            />
            <AnimatedInput
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              maxLength={100}
            />
            <AnimatedTextArea
              label="Mesajınız"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              maxLength={500}
            />
            <ButtonWrapper>
              <MagneticButton type="submit" size="large" variant="primary">
                Mesaj Gönder
              </MagneticButton>
            </ButtonWrapper>
          </Form>
        </ContentWrapper>
      </Container>
    </ContactSection>
  );
};

export default Contact;
