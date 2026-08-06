import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './intro.module.css';

/**
 * Fullscreen white flash overlay triggered at the exact moment the clapperboard snaps shut.
 */
export default function FlashOverlay({ show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={styles.flashOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.75 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.12, ease: "easeOut" }}
        />
      )}
    </AnimatePresence>
  );
}
