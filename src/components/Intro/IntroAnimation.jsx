import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIntroAnimation } from '../../hooks/useIntroAnimation';
import ClapperBoard from './ClapperBoard';
import ParticleBurst from './ParticleBurst';
import FlashOverlay from './FlashOverlay';
import styles from './intro.module.css';

/**
 * Master Intro Animation Assembly Component.
 * Plays clapperboard flyin -> center snap -> navbar morph.
 */
export default function IntroAnimation({ onComplete, onHandoff }) {
  const { isSkipped, step, isComplete, showFlash, showParticles, showLogoText } = useIntroAnimation();

  // Notify parent component on handoff and completion
  React.useEffect(() => {
    if (showLogoText && onHandoff) {
      onHandoff();
    }
  }, [showLogoText, onHandoff]);

  React.useEffect(() => {
    if (isComplete && onComplete) {
      onComplete();
    }
  }, [isComplete, onComplete]);

  if (isSkipped || step === 'done') {
    return null;
  }

  const isMorphing = step === 'morph' || step === 'handoff';

  return (
    <AnimatePresence>
      <motion.div
        className={styles.introWrapper}
        style={{
          background: isMorphing
            ? 'transparent'
            : 'radial-gradient(circle at center, rgba(124, 58, 237, 0.2), transparent 65%), #050505',
          pointerEvents: isMorphing ? 'none' : 'all'
        }}
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      >
        {/* White Flash Overlay */}
        <FlashOverlay show={showFlash} />

        {/* Purple Particle Burst */}
        <ParticleBurst active={showParticles} />

        {/* Animated Clapperboard - Visible all the way during morph trajectory */}
        <ClapperBoard step={step} isClapping={showFlash} />
      </motion.div>
    </AnimatePresence>
  );
}
