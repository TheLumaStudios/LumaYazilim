import { useEffect, useRef } from 'react';
import VanillaTilt from 'vanilla-tilt';

const TiltEffect = ({ children, options = {}, className, style }) => {
  const tiltRef = useRef(null);

  useEffect(() => {
    const node = tiltRef.current;
    if (!node) return;

    const defaultOptions = {
      max: 15,
      speed: 400,
      glare: true,
      'max-glare': 0.2,
      scale: 1.02,
      perspective: 1000,
      transition: true,
      easing: 'cubic-bezier(.03,.98,.52,.99)',
      ...options,
    };

    VanillaTilt.init(node, defaultOptions);

    return () => {
      if (node && node.vanillaTilt) {
        node.vanillaTilt.destroy();
      }
    };
  }, [options]);

  return (
    <div ref={tiltRef} className={className} style={style}>
      {children}
    </div>
  );
};

export default TiltEffect;
