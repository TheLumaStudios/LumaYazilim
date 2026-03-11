import { useState, lazy, Suspense } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/GlobalStyles';
import { lightTheme, darkTheme } from './styles/theme';
import { ThemeContextProvider, useThemeContext } from './components/ThemeToggle';

// Critical Components (loaded immediately)
import CustomCursor from './components/CustomCursor';
import PageLoader from './components/PageLoader';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ThemeToggle from './components/ThemeToggle';
import SoundToggle from './components/SoundToggle';

// Lazy-loaded Components (loaded when needed)
const SmoothScroll = lazy(() => import('./components/SmoothScroll'));
const AnimatedGrid = lazy(() => import('./components/InteractiveBackground').then(module => ({ default: module.AnimatedGrid })));
const EnhancedMouseTrail = lazy(() => import('./components/EnhancedMouseTrail'));
const ParticleBackground = lazy(() => import('./components/ParticleBackground'));
const ThreeBackground = lazy(() => import('./components/ThreeBackground'));
const EasterEggs = lazy(() => import('./components/EasterEggs'));
const Services = lazy(() => import('./components/Services'));
const About = lazy(() => import('./components/About'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

const AppContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { isDark, toggleTheme } = useThemeContext();
  const currentTheme = isDark ? darkTheme : lightTheme;

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyles />

      {isLoading && <PageLoader onLoadingComplete={handleLoadingComplete} />}

      {!isLoading && (
        <Suspense fallback={null}>
          <CustomCursor />
          <ScrollProgress />
          <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
          <SoundToggle />
          <Navbar />

          <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
            <EnhancedMouseTrail />
            <ParticleBackground />
            <ThreeBackground />
            <AnimatedGrid />
            <EasterEggs />

            <SmoothScroll>
              <Hero />
              <Suspense fallback={<div style={{ minHeight: '80vh' }} />}>
                <Services />
              </Suspense>
              <Suspense fallback={<div style={{ minHeight: '80vh' }} />}>
                <About />
              </Suspense>
              <Suspense fallback={<div style={{ minHeight: '60vh' }} />}>
                <Contact />
              </Suspense>
              <Suspense fallback={<div style={{ minHeight: '20vh' }} />}>
                <Footer />
              </Suspense>
            </SmoothScroll>
          </Suspense>
        </Suspense>
      )}
    </ThemeProvider>
  );
};

function App() {
  return (
    <ThemeContextProvider>
      <AppContent />
    </ThemeContextProvider>
  );
}

export default App;
