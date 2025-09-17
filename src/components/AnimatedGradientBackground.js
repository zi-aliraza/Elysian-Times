import React from 'react';
import { Box, keyframes, useTheme } from '@mui/system';

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const AnimatedGradientBackground = () => {
  const theme = useTheme();

  // Defined two new purple-themed gradients
  const darkGradient = 'linear-gradient(-45deg, #301934, #6a0dad, #9d50bb, #4b0082)';
  const lightGradient = 'linear-gradient(-45deg, #e0c3fc, #d6a4fc, #c77dff, #b39ddb)';
  
  const gradient = theme.palette.mode === 'dark' ? darkGradient : lightGradient;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        background: gradient,
        backgroundSize: '400% 400%',
        animation: `${gradientAnimation} 15s ease infinite`,
      }}
    />
  );
};

export default AnimatedGradientBackground;