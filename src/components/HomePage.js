import React from 'react';
import { Container, Typography, Box, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import BlogSubmission from './BlogSubmission';
import DynamicCheckerboardBackground from './DynamicCheckerboardBackground';

import logoImage from '../assets/logo.png';
import logoDarkImage from '../assets/logodark.png';

const HomePage = ({ animationsEnabled, backgroundEnabled }) => {
  const theme = useTheme();
  
  const currentLogo = theme.palette.mode === 'dark' ? logoImage : logoDarkImage;
  
  const heroVariant = animationsEnabled ? {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } },
  } : {};

  const contentVariant = animationsEnabled ? {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  } : {};

  return (
    <Box>
      <Box sx={{ 
        minHeight: '80vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        position: 'relative',
        overflow: 'hidden',
        px: 2,
      }}>
        {backgroundEnabled && <DynamicCheckerboardBackground animationsEnabled={animationsEnabled} />}

        <motion.div
          initial="hidden"
          animate="visible"
          variants={heroVariant}
        >
          <Box
            component="img"
            src={currentLogo}
            alt="Elysian Times Logo"
            sx={{
              width: '100%',
              maxWidth: { xs: '350px', sm: '500px', md: '600px' },
              height: 'auto',
            }}
          />
        </motion.div>
      </Box>

      <Container maxWidth="md" sx={{ py: 8 }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={contentVariant}
        >
          <Typography variant="body1" align="justify" paragraph>
            Elysian Times is an independent fashion magazine dedicated to exploring the intersections of fashion, culture, art, and identity. We believe fashion is more than just clothing. It’s a language, a reflection of society, and a form of self-expression.
          </Typography>
          <Typography variant="body1" align="justify" paragraph>
            Our platform publishes articles, essays, and research papers that bring fresh perspectives and thoughtful dialogue to analysing the world of fashion. Whether you’re analyzing trends, uncovering cultural influences, or examining fashion’s role in shaping identity, we’re here for the ideas that push boundaries and start conversations.
          </Typography>
          <Typography variant="body1" align="justify" paragraph>
            Submissions are always free and open to everyone, regardless of background or experience. We value voices from all walks of life and encourage writers, researchers, and creatives to join us in redefining what fashion writing can be.
          </Typography>
          <Typography variant="h5" align="center" sx={{ mt: 4, fontStyle: 'italic', fontWeight: 'medium' }}>
            Stay for a while— we saved you a page.
          </Typography>
        </motion.div>
      </Container>
      
      <BlogSubmission animationsEnabled={animationsEnabled} />
    </Box>
  );
};

export default HomePage;