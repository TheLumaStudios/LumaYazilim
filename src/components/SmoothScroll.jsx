import { useEffect, useRef } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';

const SmoothScroll = ({ children }) => {
  const scrollRef = useRef(null);
  const locomotiveScrollRef = useRef(null);

  useEffect(() => {
    if (!scrollRef.current) return;

    // Initialize Locomotive Scroll
    locomotiveScrollRef.current = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      smoothMobile: false,
      resetNativeScroll: true,
      tablet: {
        smooth: false,
      },
      smartphone: {
        smooth: false,
      },
      lerp: 0.1, // Linear interpolation value (0-1), lower = smoother but slower
    });

    // Update scroll on window resize
    const handleResize = () => {
      if (locomotiveScrollRef.current) {
        locomotiveScrollRef.current.update();
      }
    };

    window.addEventListener('resize', handleResize);

    // Update scroll after images load
    const images = scrollRef.current.querySelectorAll('img');
    images.forEach((img) => {
      if (img.complete) {
        handleResize();
      } else {
        img.addEventListener('load', handleResize);
      }
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      if (locomotiveScrollRef.current) {
        locomotiveScrollRef.current.destroy();
      }
    };
  }, []);

  return (
    <div ref={scrollRef} data-scroll-container>
      {children}
    </div>
  );
};

export default SmoothScroll;
