# 🚀 Luma Yazılım - Modern & Interactive Portfolio

## ✨ Features

### 🎨 Visual Effects
- **Glassmorphism & Neumorphism** - Modern glass and neumorphic card designs
- **Gradient Animations** - Dynamic animated gradient backgrounds
- **Particle System** - Interactive particle background with tsParticles
- **3D Effects** - Three.js powered 3D background with animated spheres and sparkles
- **Custom Cursor** - Magnetic cursor with smooth animations
- **Mouse Trail** - Enhanced mouse trail effects
- **Scroll Progress** - Visual scroll progress indicator

### ⚡ Animations
- **GSAP ScrollTrigger** - Scroll-triggered reveal animations
- **Framer Motion** - Smooth page transitions and micro-interactions
- **Counter Animations** - Animated number counters with easing
- **Text Reveal** - Word-by-word and split text reveal animations
- **Parallax Effects** - Multi-layer parallax scrolling
- **Tilt Effects** - 3D tilt on hover using vanilla-tilt

### 🎯 Interactive Components
- **Advanced Buttons** - Ripple effect, magnetic hover, and shine animations
- **Animated Forms** - Floating labels, character count, validation animations
- **3D Card Carousel** - Swiper.js powered coverflow carousel
- **Flip Cards** - Service cards with 3D flip on hover
- **Magnetic Elements** - Elements that follow mouse movement

### 🌓 Theme & Customization
- **Dark/Light Mode** - Smooth theme switching with localStorage persistence
- **Dynamic Themes** - Customizable color schemes
- **Responsive Design** - Mobile-first approach with breakpoint system

### 🔊 Sound & Haptics
- **Sound Effects** - Web Audio API powered UI sounds
- **Sound Toggle** - Enable/disable sound effects
- **Hover/Click Feedback** - Audio feedback for interactions

### 📱 Mobile Features
- **Touch Gestures** - Swipe, long-press, and pinch-zoom support
- **Mobile Optimized** - Touch-friendly UI and gestures
- **Haptic Feedback** - Vibration API support

### 🎮 Easter Eggs
- **Konami Code** - Classic cheat code with confetti celebration
- **Secret Clicks** - Hidden easter egg on logo (click 7 times)
- **Confetti Effects** - Canvas-confetti celebrations

### ⚙️ Performance
- **Lazy Loading** - Code splitting and lazy component loading
- **Intersection Observer** - Viewport-based loading and animations
- **Optimized Rendering** - React.memo and performance hooks
- **Smooth Scrolling** - Locomotive Scroll for buttery smooth scrolling

## 🛠️ Tech Stack

- **React 19** - Latest React with concurrent features
- **Vite** - Lightning-fast build tool
- **Styled Components** - CSS-in-JS styling
- **Framer Motion** - Animation library
- **GSAP** - Professional-grade animations
- **Three.js** - 3D graphics
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for react-three-fiber
- **tsParticles** - Lightweight particles library
- **Swiper** - Modern mobile touch slider
- **Locomotive Scroll** - Smooth scrolling library
- **Canvas Confetti** - Confetti animations

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/lumayazilim/luma-yazilim.git

# Navigate to project directory
cd luma-yazilim

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎯 Project Structure

```
src/
├── components/
│   ├── AdvancedButton.jsx        # Ripple button with effects
│   ├── AnimatedCounter.jsx       # Counting animations
│   ├── AnimatedForm.jsx          # Form inputs with animations
│   ├── AnimatedIcons.jsx         # SVG icon animations
│   ├── CardCarousel.jsx          # 3D card carousel
│   ├── CustomCursor.jsx          # Custom cursor component
│   ├── EasterEggs.jsx            # Hidden easter eggs
│   ├── EnhancedMouseTrail.jsx    # Mouse trail effect
│   ├── FlipCard.jsx              # 3D flip card
│   ├── GlassCard.jsx             # Glassmorphism components
│   ├── InteractiveBackground.jsx # Animated grid background
│   ├── MagneticButton.jsx        # Magnetic hover button
│   ├── PageLoader.jsx            # Loading screen
│   ├── PageTransition.jsx        # Page transition effects
│   ├── ParallaxSection.jsx       # Parallax scrolling
│   ├── ParticleBackground.jsx    # Particle system
│   ├── ScrollProgress.jsx        # Scroll indicator
│   ├── ScrollReveal.jsx          # GSAP scroll animations
│   ├── SmoothScroll.jsx          # Locomotive scroll wrapper
│   ├── SoundToggle.jsx           # Sound on/off toggle
│   ├── TextReveal.jsx            # Text reveal animations
│   ├── ThemeToggle.jsx           # Dark/light mode toggle
│   ├── ThreeBackground.jsx       # Three.js 3D background
│   ├── TiltEffect.jsx            # 3D tilt on hover
│   └── Timeline.jsx              # Animated timeline
├── hooks/
│   ├── useGestures.js            # Touch gesture hooks
│   ├── useIntersectionObserver.js # Viewport detection
│   └── useSoundEffects.js        # Sound effects hook
├── styles/
│   ├── GlobalStyles.js           # Global CSS styles
│   └── theme.js                  # Theme configuration
└── App.jsx                       # Main app component
```

## 🎨 Customization

### Theme Colors
Edit `src/styles/theme.js` to customize colors:

```javascript
export const lightTheme = {
  colors: {
    accent: '#0066FF',
    background: '#ffffff',
    text: '#000000',
    // ... more colors
  }
};
```

### Animations
Adjust animation timings in component files or create custom animations using Framer Motion:

```javascript
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

## 🎮 Easter Eggs

Try these hidden features:
- **Konami Code**: ↑ ↑ ↓ ↓ ← → ← → B A
- **Logo Secret**: Click the main title 7 times quickly
- **Sound Effects**: Toggle sound effects with the sound button

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Luma Yazılım**
- Website: [lumayazilim.com](https://lumayazilim.com)
- Email: info@lumayazilim.com

---

Made with ❤️ and lots of ☕ by Luma Yazılım
