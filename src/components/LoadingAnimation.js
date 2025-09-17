import React from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const words = [
  { text: "Phenomenal", font: "'Playfair Display', serif", color: '#ff8a00' },
  { text: "Chic", font: "'Poppins', sans-serif", color: '#4facfe' },
  { text: "Stylish", font: "'Hello Paris', cursive", color: '#f093fb' }
];

const DURATION_PER_WORD = 900;
const FADE_OUT_DURATION = 600;

const LoadingAnimation = ({ onFinished }) => {
  const [index, setIndex] = useState(0);
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (index < words.length - 1) {
        setIndex(prev => prev + 1);
      } else {
        setShowText(false); // Start fading out the text
        // Wait for the text to fade before calling onFinished
        setTimeout(onFinished, FADE_OUT_DURATION);
      }
    }, DURATION_PER_WORD);

    return () => clearTimeout(timer);
  }, [index, onFinished]);

  return (
    // This outer motion.div is now the root, allowing App.js to animate its exit
    <motion.div
      style={{
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
        backgroundColor: '#1a1a1a', display: 'flex', alignItems: 'center',
        justifyContent: 'center', zIndex: 9999, overflow: 'hidden'
      }}
      // This exit prop will be triggered by AnimatePresence in App.js
      exit={{ opacity: 0 }}
      transition={{ duration: FADE_OUT_DURATION / 1000, ease: 'easeOut' }}
    >
      <AnimatePresence mode="wait">
        {showText && (
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
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LoadingAnimation;