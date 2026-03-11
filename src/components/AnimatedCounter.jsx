import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import styled from 'styled-components';

const CounterWrapper = styled.span`
  display: inline-block;
  font-variant-numeric: tabular-nums;
`;

const AnimatedCounter = ({
  end,
  duration = 2000,
  suffix = '',
  prefix = '',
  decimals = 0,
  separator = '',
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      let startTime;
      const startValue = 0;
      const endValue = parseFloat(end);

      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);

        // Easing function (ease-out cubic)
        const easeProgress = 1 - Math.pow(1 - progress, 3);

        const currentCount = startValue + (endValue - startValue) * easeProgress;
        setCount(currentCount);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(endValue);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, end, duration, hasAnimated]);

  const formatNumber = (num) => {
    const fixed = num.toFixed(decimals);
    if (separator) {
      return fixed.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    }
    return fixed;
  };

  return (
    <CounterWrapper ref={ref}>
      {prefix}{formatNumber(count)}{suffix}
    </CounterWrapper>
  );
};

export default AnimatedCounter;
