import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Nav = styled(motion.nav)`
  position: fixed;
  top: 0;
  width: 100%;
  background: ${({ $scrolled, theme }) =>
    $scrolled
      ? theme.colors.background
      : 'transparent'};
  border-bottom: 1px solid
    ${({ $scrolled, theme }) =>
      $scrolled ? theme.colors.border : 'transparent'};
  transition: all ${({ theme }) => theme.transitions.normal};
  z-index: ${({ theme }) => theme.zIndex.sticky};
  padding: 1.5rem 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 1.25rem 0;
  }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(motion.div)`
  font-size: 1.3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: -0.02em;
  font-family: ${({ theme }) => theme.fonts.heading};
  text-transform: uppercase;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.15rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2.5rem;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const NavLink = styled(motion.a)`
  color: ${({ theme }) => theme.colors.textLight};
  font-weight: 500;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  position: relative;
  transition: color ${({ theme }) => theme.transitions.normal};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 0;
    height: 2px;
    background: ${({ theme }) => theme.colors.text};
    transition: width ${({ theme }) => theme.transitions.normal};
  }

  &:hover::after {
    width: 100%;
  }
`;

const CTAButton = styled(motion.div)`
  padding: 0.7rem 1.5rem;
  background: ${({ theme }) => theme.colors.text};
  color: ${({ theme }) => theme.colors.white};
  font-weight: 600;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border: 2px solid ${({ theme }) => theme.colors.text};
  transition: all ${({ theme }) => theme.transitions.normal};
  position: relative;
  overflow: hidden;
  font-family: ${({ theme }) => theme.fonts.heading};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.colors.background};
    transform: translateX(-100%);
    transition: transform ${({ theme }) => theme.transitions.normal};
    z-index: -1;
  }

  &:hover::before {
    transform: translateX(0);
  }

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }

  a {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  padding: 0.5rem;
  flex-direction: column;
  gap: 6px;
  z-index: ${({ theme }) => theme.zIndex.sticky + 1};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
  }
`;

const MenuLine = styled.div`
  width: 24px;
  height: 2px;
  background: ${({ theme }) => theme.colors.text};
  transition: all ${({ theme }) => theme.transitions.normal};

  &:nth-child(1) {
    transform: ${({ $isOpen }) => ($isOpen ? 'rotate(45deg) translateY(8px)' : 'none')};
  }

  &:nth-child(2) {
    opacity: ${({ $isOpen }) => ($isOpen ? '0' : '1')};
  }

  &:nth-child(3) {
    transform: ${({ $isOpen }) => ($isOpen ? 'rotate(-45deg) translateY(-8px)' : 'none')};
  }
`;

const MobileMenu = styled(motion.div)`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  z-index: ${({ theme }) => theme.zIndex.sticky};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
  }
`;

const MobileNavLink = styled.a`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
  font-size: 1.3rem;
  font-family: ${({ theme }) => theme.fonts.heading};
  letter-spacing: -0.02em;
  transition: color ${({ theme }) => theme.transitions.normal};

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMobileNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <Nav
        $scrolled={scrolled}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.6, 0.05, 0.01, 0.9] }}
      >
        <Container>
          <Logo whileHover={{ scale: 1.05 }}>Luma</Logo>

          <NavLinks>
            <NavLink href="#anasayfa" whileHover={{ y: -2 }}>
              Ana Sayfa
            </NavLink>
            <NavLink href="#hizmetler" whileHover={{ y: -2 }}>
              Hizmetler
            </NavLink>
            <NavLink href="#hakkimizda" whileHover={{ y: -2 }}>
              Hakkımızda
            </NavLink>
            <CTAButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <a href="#iletisim">İletişim</a>
            </CTAButton>
          </NavLinks>

          <MobileMenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <MenuLine $isOpen={mobileMenuOpen} />
            <MenuLine $isOpen={mobileMenuOpen} />
            <MenuLine $isOpen={mobileMenuOpen} />
          </MobileMenuButton>
        </Container>
      </Nav>

      {mobileMenuOpen && (
        <MobileMenu
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <MobileNavLink href="#anasayfa" onClick={handleMobileNavClick}>
            Ana Sayfa
          </MobileNavLink>
          <MobileNavLink href="#hizmetler" onClick={handleMobileNavClick}>
            Hizmetler
          </MobileNavLink>
          <MobileNavLink href="#hakkimizda" onClick={handleMobileNavClick}>
            Hakkımızda
          </MobileNavLink>
          <MobileNavLink href="#iletisim" onClick={handleMobileNavClick}>
            İletişim
          </MobileNavLink>
        </MobileMenu>
      )}
    </>
  );
};

export default Navbar;
