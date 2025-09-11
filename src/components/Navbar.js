import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, Button, IconButton, Box, Drawer, List, ListItem,
  Divider, Switch, ListItemIcon, ListItemText, ListItemButton
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import { 
  Settings, Menu as MenuIcon, WbSunny, NightsStay, 
  Close as CloseIcon, AutoAwesome as AutoAwesomeIcon,
  Brush as BrushIcon, GridView as GridViewIcon,
  CardGiftcard as CardGiftcardIcon // Import the gift icon
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const navLinks = [
  { title: 'Home', path: '/' },
  { title: 'The Team', path: '/team' },
  { title: 'Volumes', path: '/volumes' },
  { title: 'FAQs', path: '/faq' },
];

const jumpySpring = { type: 'spring', stiffness: 400, damping: 15 };

const Navbar = (props) => {
  const { 
    mode, setMode, animationsEnabled, setAnimationsEnabled,
    cursorEnabled, setCursorEnabled, backgroundEnabled, setBackgroundEnabled
  } = props;
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleSettingsToggle = () => setSettingsOpen(!settingsOpen);

  const drawerContent = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', mt: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h6" sx={{ my: 2 }}>Elysian Times</Typography>
        <Divider />
        <List>
          {navLinks.map((link) => (
            <ListItem key={link.title} disablePadding>
              <ListItemButton component={NavLink} to={link.path} sx={{ textAlign: 'center' }}>
                <ListItemText primary={link.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      
      {/* ADDED BLOG SUBMISSION BUTTON AT THE BOTTOM OF THE DRAWER */}
      <Box sx={{ p: 2 }}>
        <Divider sx={{ mb: 2 }}/>
        <Button
          variant="contained"
          fullWidth
          href="https://forms.gle/x6nQWvev1jSCHET56"
          target="_blank"
          rel="noopener noreferrer"
          startIcon={<CardGiftcardIcon />}
        >
          Submit to Blog
        </Button>
      </Box>
    </Box>
  );

  const settingsListVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const settingsItemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: jumpySpring }
  };

  const settingsContent = (
    <Box sx={{ width: 280 }} role="presentation">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1 }}>
        <Typography variant="h6" sx={{ pl: 1 }}>Settings</Typography>
        <IconButton onClick={() => setSettingsOpen(false)}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <List component={motion.div} variants={settingsListVariants} initial="hidden" animate="visible">
        <ListItem component={motion.div} variants={settingsItemVariants}>
          <ListItemIcon>{mode === 'dark' ? <NightsStay /> : <WbSunny />}</ListItemIcon>
          <ListItemText primary="Theme" />
          <Switch edge="end" onChange={() => setMode(p => p === 'light' ? 'dark' : 'light')} checked={mode === 'dark'} />
        </ListItem>
        <ListItem component={motion.div} variants={settingsItemVariants}>
          <ListItemIcon><AutoAwesomeIcon /></ListItemIcon>
          <ListItemText primary="Animations" />
          <Switch edge="end" onChange={() => setAnimationsEnabled(p => !p)} checked={animationsEnabled} />
        </ListItem>
        <ListItem component={motion.div} variants={settingsItemVariants}>
          <ListItemIcon><BrushIcon /></ListItemIcon>
          <ListItemText primary="Pen Cursor" />
          <Switch edge="end" onChange={() => setCursorEnabled(p => !p)} checked={cursorEnabled} />
        </ListItem>
        <ListItem component={motion.div} variants={settingsItemVariants}>
          <ListItemIcon><GridViewIcon /></ListItemIcon>
          <ListItemText primary="Pattern" />
          <Switch edge="end" onChange={() => setBackgroundEnabled(p => !p)} checked={backgroundEnabled} />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: 'transparent',
          backdropFilter: 'saturate(180%) blur(10px)',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'baseline' }}>
            <Typography variant="h6" component="div" sx={{ fontFamily: "'Hello Paris', cursive", fontSize: '1.8rem' }}>
              Elysian
            </Typography>
            <Typography variant="h6" component="div" sx={{ fontFamily: "'Selima', cursive", fontSize: '1.6rem', ml: 0.5 }}>
              Times
            </Typography>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            {navLinks.map((link) => (
              <Button
                key={link.title}
                component={NavLink}
                to={link.path}
                sx={{ 
                  color: 'text.primary',
                  '&.active': { 
                    color: 'primary.main',
                    fontWeight: 'bold'
                  } 
                }}
              >
                {link.title}
              </Button>
            ))}
          </Box>
          <IconButton color="inherit" onClick={handleSettingsToggle} sx={{ ml: 1 }}>
            <Settings />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        component={motion.div}
        transition={jumpySpring}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawerContent}
      </Drawer>

      <Drawer
        component={motion.div}
        transition={jumpySpring}
        anchor="right"
        open={settingsOpen}
        onClose={handleSettingsToggle}
      >
        {settingsContent}
      </Drawer>
    </>
  );
};

export default Navbar;