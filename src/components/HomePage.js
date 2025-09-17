import React from 'react';
import { Container, Typography, Box, useTheme, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import DynamicCheckerboardBackground from './DynamicCheckerboardBackground';
import ArticleIcon from '@mui/icons-material/Article';

import logoImage from '../assets/logo.png';
import logoDarkImage from '../assets/logodark.png';

const HomePage = ({ animationsEnabled, backgroundEnabled }) => {
  const theme = useTheme();
  
  const currentLogo = theme.palette.mode === 'dark' ? logoImage : logoDarkImage;
  
  const heroVariant = { /* ... your variants ... */ };
  const contentVariant = { /* ... your variants ... */ };
  const itemVariant = { /* ... your variants ... */ };

  return (
    <Box>
      {/* SECTION 1: The Hero Box with the background */}
      <Box sx={{ 
        minHeight: '80vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        position: 'relative', // This is crucial for containing the background
        overflow: 'hidden',
        px: 2,
      }}>
        {/* CORRECTED: The background is now placed INSIDE the hero section */}
        {backgroundEnabled && (
          <DynamicCheckerboardBackground animationsEnabled={animationsEnabled} />
        )}

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

      {/* SECTION 2: The Content Container on the default solid background */}
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={contentVariant}
        >
          <motion.div variants={itemVariant}>
            <Typography variant="body1" align="justify" paragraph>
              Elysian Times is an independent fashion magazine dedicated to exploring the intersections of fashion, culture, art, and identity. We believe fashion is more than just clothing. It’s a language, a reflection of society, and a form of self-expression.
            </Typography>
          </motion.div>
          <motion.div variants={itemVariant}>
            <Typography variant="body1" align="justify" paragraph>
              Our platform publishes articles, essays, and research papers that bring fresh perspectives and thoughtful dialogue to analysing the world of fashion. Whether you’re analyzing trends, uncovering cultural influences, or examining fashion’s role in shaping identity, we’re here for the ideas that push boundaries and start conversations.
            </Typography>
          </motion.div>
          <motion.div variants={itemVariant}>
            <Typography variant="body1" align="justify" paragraph>
              Submissions are always free and open to everyone, regardless of background or experience. We value voices from all walks of life and encourage writers, researchers, and creatives to join us in redefining what fashion writing can be.
            </Typography>
          </motion.div>
          
          <motion.div variants={itemVariant}>
            <Typography variant="h5" align="center" sx={{ mt: 6, mb: 3, fontStyle: 'italic', fontWeight: 'medium' }}>
              Stay for a while— we saved you a page.
            </Typography>
          </motion.div>
          <motion.div variants={itemVariant}>
            <Button
              variant="contained"
              size="large"
              startIcon={<ArticleIcon />}
              component={RouterLink}
              to="/submit"
              sx={{
                borderRadius: '50px',
                textTransform: 'none',
                fontWeight: 'bold',
                fontSize: '1rem',
                px: 4,
                py: 1.5,
                backgroundColor: '#d8b4fe',
                color: '#3e2c52',
                '&:hover': {
                  backgroundColor: '#c084fc',
                }
              }}
            >
              Submit to Our Blog
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default HomePage;