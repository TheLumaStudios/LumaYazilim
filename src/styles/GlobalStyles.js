import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: auto; /* Smooth scroll will be handled by Locomotive Scroll */
    overflow-x: hidden;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.main};
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.background};
    line-height: 1.6;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    cursor: none; /* Hide default cursor for custom cursor */

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
      cursor: auto; /* Show default cursor on mobile/tablet */
    }
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: -0.02em;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    cursor: none; /* Custom cursor */
    border: none;
    outline: none;
    font-family: inherit;

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
      cursor: pointer;
    }
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* Custom Scrollbar - Minimalist */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.background};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.text};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.accent};
  }

  /* Selection - Professional */
  ::selection {
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.white};
  }

  ::-moz-selection {
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.white};
  }

  /* Smooth transitions for all interactive elements */
  a, button, input, textarea {
    transition: ${({ theme }) => theme.transitions.normal};
  }
`;
