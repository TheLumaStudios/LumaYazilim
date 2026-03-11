import { useCallback, useRef, useState } from 'react';

// Simple sound effects using Web Audio API
const useSoundEffects = () => {
  const [enabled, setEnabled] = useState(true);
  const audioContextRef = useRef(null);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const playTone = useCallback((frequency, duration, type = 'sine') => {
    if (!enabled) return;

    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  }, [enabled, getAudioContext]);

  const playClick = useCallback(() => {
    playTone(800, 0.05, 'sine');
  }, [playTone]);

  const playHover = useCallback(() => {
    playTone(600, 0.03, 'sine');
  }, [playTone]);

  const playSuccess = useCallback(() => {
    playTone(880, 0.1, 'sine');
    setTimeout(() => playTone(1320, 0.15, 'sine'), 100);
  }, [playTone]);

  const playError = useCallback(() => {
    playTone(300, 0.1, 'sawtooth');
    setTimeout(() => playTone(200, 0.15, 'sawtooth'), 100);
  }, [playTone]);

  const playNotification = useCallback(() => {
    playTone(1000, 0.1);
    setTimeout(() => playTone(1200, 0.1), 100);
    setTimeout(() => playTone(1400, 0.15), 200);
  }, [playTone]);

  const toggleSound = useCallback(() => {
    setEnabled(prev => !prev);
  }, []);

  return {
    playClick,
    playHover,
    playSuccess,
    playError,
    playNotification,
    toggleSound,
    enabled,
  };
};

export default useSoundEffects;
