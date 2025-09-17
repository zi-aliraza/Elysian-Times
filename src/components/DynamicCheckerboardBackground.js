import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTheme } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

const darkPalette = [
  'rgba(62, 44, 82, 0.2)', 'rgba(73, 47, 100, 0.2)', 'rgba(85, 52, 116, 0.2)', 'rgba(48, 36, 64, 0.2)'
];
const lightPalette = [
  'rgba(233, 216, 253, 0.4)', 'rgba(225, 204, 250, 0.4)', 'rgba(215, 192, 245, 0.4)'
];

const DynamicCheckerboardBackground = ({ animationsEnabled }) => {
  const theme = useTheme();
  const [colors, setColors] = useState({
    color1: 'rgba(0,0,0,0)',
    color2: 'rgba(0,0,0,0)',
  });
  const debounceTimer = useRef(null);
  
  const randomizeColors = useCallback(() => {
    const palette = theme.palette.mode === 'dark' ? darkPalette : lightPalette;
    const newColor1 = palette[Math.floor(Math.random() * palette.length)];
    let newColor2 = palette[Math.floor(Math.random() * palette.length)];
    while (newColor1 === newColor2) {
      newColor2 = palette[Math.floor(Math.random() * palette.length)];
    }
    setColors({ color1: newColor1, color2: newColor2 });
  }, [theme.palette.mode]);
  
  useEffect(() => {
    randomizeColors();
  }, [randomizeColors]);

  useEffect(() => {
    if (!animationsEnabled) return;
    
    const handleScroll = () => {
      clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(() => {
        randomizeColors();
      }, 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(debounceTimer.current);
    };
  }, [animationsEnabled, randomizeColors]);

  const key = colors.color1 + colors.color2;

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, overflow: 'hidden' }}>
      <AnimatePresence>
        <motion.div
          key={key}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundImage: `
              repeating-conic-gradient(
                from 0deg, 
                ${colors.color1} 0deg 90deg, 
                ${colors.color2} 90deg 180deg
              )
            `,
            backgroundSize: '150px 150px',
          }}
        />
      </AnimatePresence>
    </div>
  );
};

export default DynamicCheckerboardBackground;