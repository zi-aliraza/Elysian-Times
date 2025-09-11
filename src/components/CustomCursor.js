import React, { useEffect } from 'react';
import { Box, useTheme } from '@mui/material';
import { motion, useSpring, useTransform, useVelocity } from 'framer-motion';
import EditIcon from '@mui/icons-material/Edit';

const CustomCursor = ({ cursorEnabled }) => {
  const theme = useTheme();

  const springConfig = { stiffness: 400, damping: 30, mass: 0.5 };
  const cursorX = useSpring(-100, springConfig);
  const cursorY = useSpring(-100, springConfig);

  const velocityX = useVelocity(cursorX);
  const rotate = useTransform(
    velocityX,
    [-1000, 1000],
    [-45, -15]
  );

  useEffect(() => {
    document.body.style.cursor = cursorEnabled ? 'none' : 'auto';

    if (!cursorEnabled) return;

    const onMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.body.style.cursor = 'auto';
    };
  }, [cursorEnabled, cursorX, cursorY]);

  if (!cursorEnabled) return null;

  return (
    // The `sx` prop with the problematic display logic has been removed from this Box
    <Box sx={{
      pointerEvents: 'none',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 9999,
    }}>
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          rotate,
          position: 'absolute',
          left: -12,
          top: -12,
        }}
      >
        <EditIcon sx={{ color: theme.palette.primary.main, fontSize: '2.5rem' }} />
      </motion.div>
    </Box>
  );
};

export default CustomCursor;