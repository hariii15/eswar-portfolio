import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook to manage the cinematic top-right flyin -> center snap -> navbar morph intro sequence.
 */
export function useIntroAnimation() {
  const [isSkipped, setIsSkipped] = useState(false);
  // Sequence steps: 'init' | 'flyin' | 'settle' | 'open' | 'clap' | 'morph' | 'handoff' | 'done'
  const [step, setStep] = useState('init');
  const [isComplete, setIsComplete] = useState(false);
  const [showFlash, setShowFlash] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [showLogoText, setShowLogoText] = useState(false);

  // Play Web Audio API synthetic clapper sound
  const playClapSound = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      const bufferSize = ctx.sampleRate * 0.08;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.15));
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.value = 850;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.95, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
    } catch {
      // Audio context fallback
    }
  }, []);

  useEffect(() => {
    // Sequence Timings (Total duration ~ 2.8s)
    const t1 = setTimeout(() => setStep('flyin'), 50);          // Step 1: Fly in from top-right
    const t2 = setTimeout(() => setStep('settle'), 750);       // Step 2: Settling bounce in center
    const t3 = setTimeout(() => setStep('open'), 1150);       // Step 3: Slate opens
    
    // Step 4: Snap shut clap at 1400ms
    const t4 = setTimeout(() => {
      setStep('clap');
      setShowFlash(true);
      setShowParticles(true);
      playClapSound();
    }, 1400);

    // Hide flash after 120ms
    const t5 = setTimeout(() => {
      setShowFlash(false);
    }, 1520);

    // Step 5: Morph & travel to navbar logo at 1750ms
    const t6 = setTimeout(() => {
      setStep('morph');
    }, 1750);

    // Step 6: Logo Handoff & reveal ESWAR logo text at 2450ms
    const t7 = setTimeout(() => {
      setStep('handoff');
      setShowLogoText(true);
    }, 2450);

    // Step 7: Complete intro sequence at 2750ms
    const t8 = setTimeout(() => {
      setStep('done');
      setIsComplete(true);
    }, 2750);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
      clearTimeout(t7);
      clearTimeout(t8);
    };
  }, [playClapSound]);

  return {
    isSkipped,
    step,
    isComplete,
    showFlash,
    showParticles,
    showLogoText
  };
}
