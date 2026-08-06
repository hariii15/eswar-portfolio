import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './intro.module.css';

/**
 * Realistic Cinematic Clapperboard Component.
 * Flies from top-right -> lands & settles in center -> claps -> morphs & travels to navbar logo.
 */
export default function ClapperBoard({ step, isClapping }) {
  // Target coordinates for navbar logo icon handoff
  const [targetPos, setTargetPos] = useState(() => ({
    x: typeof window !== 'undefined' ? -window.innerWidth / 2 + 80 : -400,
    y: typeof window !== 'undefined' ? -window.innerHeight / 2 + 36 : -300
  }));

  useEffect(() => {
    const updateTarget = () => {
      const logoEl = document.getElementById('navbar-logo-icon');
      if (logoEl) {
        const rect = logoEl.getBoundingClientRect();
        const targetX = rect.left + rect.width / 2 - window.innerWidth / 2;
        const targetY = rect.top + rect.height / 2 - window.innerHeight / 2;
        setTargetPos({ x: targetX, y: targetY });
      }
    };

    updateTarget();
    window.addEventListener('resize', updateTarget);
    return () => window.removeEventListener('resize', updateTarget);
  }, []);

  // Top slate rotation
  const getSlateRotation = () => {
    if (step === 'open') return -32;
    return 0;
  };

  const getSlateTransition = () => {
    if (step === 'open') return { duration: 0.25, ease: "easeOut" };
    if (step === 'clap') return { duration: 0.18, ease: "easeOut" };
    return { duration: 0.2 };
  };

  // Variants for curved trajectory flight, center landing, and morph handoff
  const containerVariants = {
    init: {
      x: 450,
      y: -300,
      rotate: 40,
      scale: 0.75,
      opacity: 0
    },
    flyin: {
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 110,
        damping: 13,
        mass: 1.1,
        duration: 0.7
      }
    },
    settle: {
      x: 0,
      y: 0,
      rotate: 0,
      scale: [1, 1.02, 1],
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    },
    open: {
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      opacity: 1
    },
    clap: {
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      opacity: 1
    },
    morph: {
      x: targetPos.x,
      y: targetPos.y,
      rotate: 0,
      scale: 0.18,
      opacity: 1,
      transition: {
        duration: 0.75,
        ease: [0.65, 0, 0.35, 1]
      }
    },
    handoff: {
      x: targetPos.x,
      y: targetPos.y,
      rotate: 0,
      scale: 0.14,
      opacity: 0,
      transition: {
        duration: 0.25,
        ease: "easeOut"
      }
    },
    done: {
      opacity: 0
    }
  };

  return (
    <motion.div
      className={styles.clapperboardContainer}
      variants={containerVariants}
      initial="init"
      animate={step in containerVariants ? step : "flyin"}
    >
      {/* Dynamic Purple Glow */}
      <div className={`${styles.boardGlow} ${isClapping ? styles.boardGlowActive : ''}`} />

      {/* Top Hinged Slate */}
      <motion.div
        className={styles.topSlateWrapper}
        animate={{ rotate: getSlateRotation() }}
        transition={getSlateTransition()}
      >
        <div className={styles.topSlate}>
          <div className={styles.hingePin} />
        </div>
      </motion.div>

      {/* Fixed Bottom Stick */}
      <div className={styles.bottomStick} />

      {/* Main Clapperboard Body */}
      <div className={styles.boardBody}>
        {/* Top Production Grid */}
        <div className={styles.boardGrid}>
          <div className={styles.cell}>
            <span className={styles.label}>SCENE</span>
            <span className={styles.value}>01</span>
          </div>
          <div className={styles.cell}>
            <span className={styles.label}>TAKE</span>
            <span className={styles.value}>2026</span>
          </div>
          <div className={styles.cell}>
            <span className={styles.label}>ROLL</span>
            <span className={styles.value}>A1</span>
          </div>
        </div>

        {/* Director & Details Row */}
        <div className={styles.directorRow}>
          <div className={styles.cell} style={{ flex: 1, marginRight: 8 }}>
            <span className={styles.label}>PROD.</span>
            <span className={styles.value} style={{ fontSize: '0.78rem' }}>ESWAR ANAND</span>
          </div>
          <div className={styles.cell} style={{ flex: 1 }}>
            <span className={styles.label}>CAMERA</span>
            <span className={styles.value} style={{ fontSize: '0.78rem' }}>AI NATIVE</span>
          </div>
        </div>

        {/* Action Title Tag */}
        <div className={styles.actionTag}>
          ACTION !
        </div>
      </div>
    </motion.div>
  );
}
