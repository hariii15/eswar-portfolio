import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import styles from './intro.module.css';

/**
 * Glowing purple particle burst component triggered upon clapper snap.
 * Generates 20 random particles radiating outward from center.
 */
export default function ParticleBurst({ active }) {
  const particles = useMemo(() => {
    return Array.from({ length: 22 }).map((_, i) => {
      const angle = (i / 22) * (2 * Math.PI) + (Math.random() * 0.5 - 0.25);
      const distance = 90 + Math.random() * 160;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;
      const size = 6 + Math.random() * 8;

      return {
        id: i,
        targetX: x,
        targetY: y,
        size
      };
    });
  }, []);

  if (!active) return null;

  return (
    <div className={styles.particleContainer}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={styles.particle}
          style={{
            width: p.size,
            height: p.size,
            marginLeft: -p.size / 2,
            marginTop: -p.size / 2
          }}
          initial={{
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1
          }}
          animate={{
            x: p.targetX,
            y: p.targetY,
            opacity: 0,
            scale: 0.2
          }}
          transition={{
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1]
          }}
        />
      ))}
    </div>
  );
}
