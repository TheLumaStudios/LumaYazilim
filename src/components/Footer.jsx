import styled from 'styled-components';
import { FaLinkedinIn, FaTwitter, FaGithub, FaInstagram } from 'react-icons/fa';

const FooterSection = styled.footer`
  background: ${({ theme }) => theme.colors.text};
  color: ${({ theme }) => theme.colors.white};
  padding: 3rem 2rem 2.5rem;
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 2.5rem 2rem 1.75rem;
  }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr 1fr;
    gap: 2.5rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 1.75rem;
  }
`;

const FooterColumn = styled.div``;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: 1.25rem;
  font-family: ${({ theme }) => theme.fonts.heading};
  text-transform: uppercase;
  letter-spacing: -0.02em;
`;

const Description = styled.p`
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.8;
  font-size: 0.95rem;
  max-width: 350px;
`;

const ColumnTitle = styled.h4`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-family: ${({ theme }) => theme.fonts.heading};
`;

const LinkList = styled.ul`
  list-style: none;
`;

const LinkItem = styled.li`
  margin-bottom: 0.75rem;
`;

const Link = styled.a`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.95rem;
  transition: color ${({ theme }) => theme.transitions.normal};

  &:hover {
    color: ${({ theme }) => theme.colors.white};
  }
`;

const BottomBar = styled.div`
  padding-top: 2.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: 0.85rem;
    text-align: center;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialLink = styled.a`
  width: 36px;
  height: 36px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  transition: all ${({ theme }) => theme.transitions.normal};

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: ${({ theme }) => theme.colors.white};
  }
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterSection data-scroll-section>
      <Container>
        <FooterContent>
          <FooterColumn>
            <Logo>Luma</Logo>
            <Description>
              2019'dan bu yana Türkiye'nin önde gelen şirketlerine kurumsal yazılım
              çözümleri sunuyoruz. Web, mobil, bulut ve güvenlik alanlarında uzmanız.
            </Description>
          </FooterColumn>

          <FooterColumn>
            <ColumnTitle>Şirket</ColumnTitle>
            <LinkList>
              <LinkItem>
                <Link href="#hakkimizda">Hakkımızda</Link>
              </LinkItem>
              <LinkItem>
                <Link href="#hizmetler">Hizmetler</Link>
              </LinkItem>
              <LinkItem>
                <Link href="#iletisim">İletişim</Link>
              </LinkItem>
            </LinkList>
          </FooterColumn>

          <FooterColumn>
            <ColumnTitle>Hizmetler</ColumnTitle>
            <LinkList>
              <LinkItem>
                <Link href="#hizmetler">Web Geliştirme</Link>
              </LinkItem>
              <LinkItem>
                <Link href="#hizmetler">Mobil Uygulama</Link>
              </LinkItem>
              <LinkItem>
                <Link href="#hizmetler">UI/UX Tasarım</Link>
              </LinkItem>
              <LinkItem>
                <Link href="#hizmetler">Bulut Çözümleri</Link>
              </LinkItem>
            </LinkList>
          </FooterColumn>

          <FooterColumn>
            <ColumnTitle>İletişim</ColumnTitle>
            <LinkList>
              <LinkItem>
                <Link href="mailto:info@lumayazilim.com">info@lumayazilim.com</Link>
              </LinkItem>
              <LinkItem>
                <Link href="tel:+902125550000">+90 (212) 555 00 00</Link>
              </LinkItem>
              <LinkItem>Maslak, Sarıyer / İstanbul</LinkItem>
            </LinkList>
          </FooterColumn>
        </FooterContent>

        <BottomBar>
          <div>© {currentYear} Luma Yazılım. Tüm hakları saklıdır.</div>
          <SocialLinks>
            <SocialLink href="#" aria-label="LinkedIn">
              <FaLinkedinIn />
            </SocialLink>
            <SocialLink href="#" aria-label="Twitter">
              <FaTwitter />
            </SocialLink>
            <SocialLink href="#" aria-label="GitHub">
              <FaGithub />
            </SocialLink>
            <SocialLink href="#" aria-label="Instagram">
              <FaInstagram />
            </SocialLink>
          </SocialLinks>
        </BottomBar>
      </Container>
    </FooterSection>
  );
};

export default Footer;
