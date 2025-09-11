import React from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// The array of words for the animation. "Elysian" is added back as the final word.
const words = [
  { text: "Phenomenal", font: "'Playfair Display', serif", color: '#ff8a00' },
  { text: "Chic", font: "'Poppins', sans-serif", color: '#4facfe' },
  { text: "Stylish", font: "'Hello Paris', cursive", color: '#f093fb' }
];

const DURATION_PER_WORD = 900;
const FADE_OUT_DURATION = 600;

const LoadingAnimation = ({ onFinished }) => {
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    // This timer cycles through the words
    const timer = setTimeout(() => {
      // If we still have words to show, cycle to the next one
      if (index < words.length - 1) {
        setIndex(prev => prev + 1);
      } else {
        // If we've shown the last word, start the fade out sequence
        setShow(false);
      }
    }, DURATION_PER_WORD);

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            backgroundColor: '#1a1a1a', display: 'flex', alignItems: 'center',
            justifyContent: 'center', zIndex: 9999, overflow: 'hidden'
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: FADE_OUT_DURATION / 1000, ease: 'easeOut' }}
          onAnimationComplete={onFinished}
        >
          {/* We no longer need the conditional logic for the logo, just the text animation */}
          <AnimatePresence mode="wait">
            <motion.span
              key={words[index].text}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ ease: 'easeInOut', duration: 0.5 }}
              style={{
                display: 'inline-block',
                fontFamily: words[index].font,
                color: words[index].color,
                fontWeight: 'bold',
                fontSize: 'clamp(3rem, 15vw, 6rem)',
              }}
            >
              {words[index].text}
            </motion.span>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingAnimation;