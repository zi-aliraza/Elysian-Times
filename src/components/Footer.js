import React, { useState } from 'react';
import { Box, Container, Typography, IconButton, Popover } from '@mui/material';
import { Instagram, Email, Article as ArticleIcon, ContentCopy, Check, Close as CloseIcon } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

// The component now accepts the isTouchDevice prop from App.js
const Footer = ({ isTouchDevice }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [copied, setCopied] = useState(false);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    // Reset copied state when closing to ensure it's fresh next time
    setCopied(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText('timeselysian@gmail.com');
    setCopied(true);
    // Close the popover after a delay to show the checkmark
    setTimeout(() => {
      handlePopoverClose();
    }, 1500);
  };

  const open = Boolean(anchorEl);

  // Define the event handlers for the email icon conditionally based on the device type
  const emailIconProps = isTouchDevice
    ? { onClick: handlePopoverOpen } // On mobile, the popover opens on click
    : { onMouseEnter: handlePopoverOpen }; // On desktop, it opens on hover

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)',
        borderTop: '1px solid',
        borderColor: 'divider',
        position: 'relative',
        zIndex: 10
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', mb: 1 }}>
          <Typography variant="h6" component="div" sx={{ fontFamily: "'Hello Paris', cursive", fontSize: '1.8rem' }}>
            Elysian
          </Typography>
          <Typography variant="h6" component="div" sx={{ fontFamily: "'Selima', cursive", fontSize: '1.6rem', ml: 0.5 }}>
            Times
          </Typography>
        </Box>

        <Typography variant="subtitle1" align="center" color="text.secondary" component="p" sx={{
          fontFamily: "'Hello Paris', sans-serif",
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          fontSize: '0.9rem'
        }}>
          A Fashion Magazine
        </Typography>

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          mt: 2,
          filter: 'url(#goo)',
        }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton aria-label="instagram" color="inherit" href="https://www.instagram.com/elysian_times?igsh=MXI2NzY4bDh0MmxrZQ==" target="_blank">
              <Instagram />
            </IconButton>
            
            {/* GMAIL ICON with conditional logic */}
            <IconButton 
              aria-label="email" 
              color="inherit"
              {...emailIconProps} // Spread the correct props (onClick or onMouseEnter)
            >
              <Email />
            </IconButton>

            <IconButton aria-label="substack" color="inherit" href="https://substack.com/@elysiantimes" target="_blank">
              <ArticleIcon />
            </IconButton>
          </Box>
        </Box>
        
        {/* POPOVER SHELF for Gmail */}
        <Popover
          id="email-popover"
          open={open}
          anchorEl={anchorEl}
          onClose={handlePopoverClose} // This handles clicking away on mobile
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          PaperProps={{
            // On desktop, the popover will also close when the mouse leaves it
            ...(!isTouchDevice && { onMouseLeave: handlePopoverClose }),
            sx: { 
              p: 1.5,
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
            }
          }}
        >
          <Typography variant="body2">timeselysian@gmail.com</Typography>
          <IconButton onClick={handleCopy} size="small" sx={{ ml: 1 }}>
            <AnimatePresence mode="wait">
              {!copied ? (
                <motion.div
                  key="copy"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                >
                  <ContentCopy fontSize="small" />
                </motion.div>
              ) : (
                <motion.div
                  key="check"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                >
                  <Check fontSize="small" color="success" />
                </motion.div>
              )}
            </AnimatePresence>
          </IconButton>
          {/* A close button that only appears on touch devices for explicit closing */}
          {isTouchDevice && (
            <IconButton onClick={handlePopoverClose} size="small" sx={{ ml: 0.5 }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          )}
        </Popover>
        
        <Typography variant="body2" color="text.secondary" align="center" sx={{ pt: 3 }}>
          {'© '}
          {new Date().getFullYear()}
          {' Elysian Times. All Rights Reserved.'}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;