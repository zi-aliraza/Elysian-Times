import React from 'react';
import { Box, Button } from '@mui/material';
import { motion } from 'framer-motion';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard'; // New gift icon

const BlogSubmission = ({ animationsEnabled }) => {
  const buttonAnimation = animationsEnabled ? {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    transition: { type: 'spring', stiffness: 400, damping: 17 }
  } : {};
  
  return (
    // Top padding removed (my -> mb)
    <Box sx={{ textAlign: 'center', mb: 6 }}>
      <motion.div {...buttonAnimation}>
        <Button
          variant="contained"
          size="large"
          href="https://forms.gle/x6nQWvev1jSCHET56" // Updated Link
          target="_blank"
          rel="noopener noreferrer"
          startIcon={<CardGiftcardIcon />} // Updated Icon
          sx={{
            borderRadius: '50px',
            padding: '12px 32px',
            fontWeight: 'bold',
            textTransform: 'none',
            fontSize: '1.1rem'
          }}
        >
          Submit to Our Blog
        </Button>
      </motion.div>
    </Box>
  );
};

export default BlogSubmission;