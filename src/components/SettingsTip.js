import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import SettingsIcon from '@mui/icons-material/Settings';

const SettingsTip = () => {
  return (
    <Box sx={{
      position: 'fixed',
      bottom: 24,
      left: 24,
      zIndex: 9998,
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        <Paper
          elevation={6}
          sx={{
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            borderRadius: '12px',
            backgroundColor: 'background.paper',
          }}
        >
          <SettingsIcon color="primary" sx={{ mr: 1.5 }} />
          <Typography variant="body2">
            You can customize your experience in the settings!
          </Typography>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default SettingsTip;