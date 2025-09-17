import React from 'react';
import { Box, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

const DynamicCheckerboardBackground = ({ animationsEnabled }) => {
  const theme = useTheme();

  const darkColor1 = 'rgba(255, 255, 255, 0.04)';
  const darkColor2 = 'rgba(255, 255, 255, 0.05)';
  const lightColor1 = 'rgba(0, 0, 0, 0.05)';
  const lightColor2 = 'rgba(0, 0, 0, 0.06)';

  const color1 = theme.palette.mode === 'dark' ? darkColor1 : lightColor1;
  const color2 = theme.palette.mode === 'dark' ? darkColor2 : lightColor2;

  const bgVariant = animationsEnabled ? {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 1.5 } }
  } : {};

  return (
    <Box
      component={motion.div}
      initial="hidden"
      animate="visible"
      variants={bgVariant}
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        background: `repeating-conic-gradient(${color1} 0% 25%, ${color2} 25% 50%) 50% 50% / 50px 50px`,
        // UPDATED: The gradient now starts its fade much lower down the page.
        // It is solid black (fully visible) until 85% of the way down,
        // then fades to transparent between the 85% and 100% marks.
        maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
      }}
    />
  );
};

export default DynamicCheckerboardBackground;