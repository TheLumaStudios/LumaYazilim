import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styled from 'styled-components';

gsap.registerPlugin(ScrollTrigger);

const RevealWrapper = styled.div`
  opacity: 0;
`;

export const ScrollReveal = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 1,
  distance = 100,
  ...props
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const directionMap = {
      up: { y: distance, x: 0 },
      down: { y: -distance, x: 0 },
      left: { x: distance, y: 0 },
      right: { x: -distance, y: 0 },
    };

    const initialPosition = directionMap[direction] || directionMap.up;

    gsap.fromTo(
      element,
      {
        opacity: 0,
        ...initialPosition,
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [direction, delay, duration, distance]);

  return (
    <RevealWrapper ref={ref} {...props}>
      {children}
    </RevealWrapper>
  );
};

export const StaggerReveal = ({ children, staggerDelay = 0.1, ...props }) => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const childElements = element.children;

    gsap.fromTo(
      childElements,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: staggerDelay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [staggerDelay]);

  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  );
};

export const ParallaxElement = ({ children, speed = 0.5, ...props }) => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    gsap.to(element, {
      y: (i, target) => -ScrollTrigger.maxScroll(window) * speed,
      ease: 'none',
      scrollTrigger: {
        start: 0,
        end: 'max',
        invalidateOnRefresh: true,
        scrub: 0,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [speed]);

  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  );
};

export const SplitTextReveal = ({ children, ...props }) => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const text = element.textContent;
    const words = text.split(' ');

    element.innerHTML = words
      .map((word) => `<span style="display: inline-block; overflow: hidden;"><span style="display: inline-block;">${word}</span></span>`)
      .join(' ');

    const wordElements = element.querySelectorAll('span > span');

    gsap.fromTo(
      wordElements,
      {
        y: '100%',
        opacity: 0,
      },
      {
        y: '0%',
        opacity: 1,
        duration: 0.8,
        stagger: 0.05,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [children]);

  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  );
};
