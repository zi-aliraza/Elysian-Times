import React, { useState, useEffect, useCallback } from 'react';
import { Container, Typography, Box, IconButton, Button, useTheme, useMediaQuery, Skeleton } from '@mui/material'; // Added Skeleton
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowBackIosNew, ArrowForwardIos, Launch } from '@mui/icons-material';

// Import the volume images from your assets folder
import volume1Image from '../assets/volume1.png';
import volume2Image from '../assets/volume2.png';
import volume3Image from '../assets/volume3.png';

// The data structure now includes links for each volume
const volumes = [
  {
    title: "Volume I",
    image: volume1Image,
    link: "https://heyzine.com/flip-book/c304f7966d.html"
  },
  {
    title: "Volume II",
    image: volume2Image,
    link: "https://heyzine.com/flip-book/44de753400.html"
  },
  {
    title: "Volume III",
    image: volume3Image,
    link: "https://heyzine.com/flip-book/8b1d5483cc.html"
  }
];

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.8
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.8
  })
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

const Volumes = ({ animationsEnabled }) => {
  const [[page, direction], setPage] = useState([0, 0]);
  // --- NEW: State to track if the current image is loading ---
  const [isImageLoading, setIsImageLoading] = useState(true); 
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const imageIndex = page < 0 ? (volumes.length - (Math.abs(page) % volumes.length)) % volumes.length : page % volumes.length;

  const paginate = useCallback((newDirection) => {
    setPage(prevPage => [prevPage[0] + newDirection, newDirection]);
  }, []);

  // --- NEW: Effect to reset loading state whenever the slide changes ---
  useEffect(() => {
    setIsImageLoading(true);
  }, [imageIndex]);

  // Effect for Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        paginate(1);
      } else if (e.key === 'ArrowLeft') {
        paginate(-1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [paginate]);

  const handleDragEnd = (e, { offset, velocity }) => {
    if (!animationsEnabled) return;
    const swipe = swipePower(offset.x, velocity.x);
    if (swipe < -swipeConfidenceThreshold) {
      paginate(1);
    } else if (swipe > swipeConfidenceThreshold) {
      paginate(-1);
    }
  };

  return (
    <Container sx={{ 
      py: 8, 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      minHeight: '80vh',
    }}>
      <Typography variant="h2" component="h1" align="center" gutterBottom>
        Read Our Volumes
      </Typography>
      
      <Box sx={{
        position: 'relative',
        width: '100%',
        maxWidth: '500px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mt: 4,
      }}>
        
        <IconButton
          onClick={() => paginate(-1)}
          sx={{ 
            position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)',
            zIndex: 2, display: { xs: 'none', sm: 'inline-flex' }
          }}
        >
          <ArrowBackIosNew />
        </IconButton>

        <Box sx={{
          position: 'relative',
          width: '100%',
          maxWidth: '350px',
          aspectRatio: '3 / 4',
          overflow: 'hidden',
          borderRadius: '16px',
        }}>
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={animationsEnabled ? variants : {}}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.5}
              onDragEnd={handleDragEnd}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
              }}
            >
              {/* --- NEW: Skeleton is rendered here, on top of the image container --- */}
              <Skeleton
                  variant="rectangular"
                  sx={{
                      width: '100%',
                      height: '100%',
                      position: 'absolute',
                      opacity: isImageLoading ? 1 : 0, // Show only when loading
                      transition: 'opacity 0.3s ease-in-out',
                  }}
              />
              
              <Box
                component="img"
                src={volumes[imageIndex].image}
                alt={volumes[imageIndex].title}
                // --- NEW: onLoad event to set loading state to false ---
                onLoad={() => setIsImageLoading(false)}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  boxShadow: 6,
                  pointerEvents: 'none',
                  userSelect: 'none',
                  // --- NEW: The image is transparent until it loads ---
                  opacity: isImageLoading ? 0 : 1,
                  transition: 'opacity 0.3s ease-in-out',
                }}
              />
            </motion.div>
          </AnimatePresence>
        </Box>

        <IconButton
          onClick={() => paginate(1)}
          sx={{ 
            position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)',
            zIndex: 2, display: { xs: 'none', sm: 'inline-flex' }
          }}
        >
          <ArrowForwardIos />
        </IconButton>
      </Box>

      <Box sx={{ 
        mt: 4, 
        minHeight: '100px',
        textAlign: 'center'
      }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <Typography variant="h4" component="h3" sx={{ fontFamily: "'Hello Paris', cursive" }}>
              {volumes[imageIndex].title}
            </Typography>
            <Button 
              variant="contained" 
              href={volumes[imageIndex].link}
              target="_blank" // Added to open link in a new tab
              rel="noopener noreferrer" // Added for security
              endIcon={<Launch />}
              sx={{ mt: 1.5 }}
            >
              Read Now
            </Button>
          </motion.div>
        </AnimatePresence>
      </Box>

      <Typography variant="caption" sx={{ mt: 2, display: { xs: 'block', sm: 'none' } }}>
        Swipe to navigate
      </Typography>
      <Typography variant="caption" sx={{ mt: 2, display: { xs: 'none', sm: 'block' } }}>
        Use arrow keys to navigate
      </Typography>
    </Container>
  );
};

export default Volumes;