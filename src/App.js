import React, { useState, useMemo, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline, Box } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

// Import Gimmick Components
import CustomCursor from './components/CustomCursor';
import ScrollToTopButton from './components/ScrollToTopButton';
import SettingsTip from './components/SettingsTip';

// Import Core Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingAnimation from './components/LoadingAnimation';

// Import Pages
import HomePage from './components/HomePage';
import MeetTheTeam from './components/MeetTheTeam';
import Volumes from './components/Volumes';
// Collaborations is no longer imported
import FAQ from './components/FAQ';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [mode, setMode] = useState('dark');
  const [userColor, setUserColor] = useState('#d1a7ff');
  
  const [cursorEnabled, setCursorEnabled] = useState(true);
  const [backgroundEnabled, setBackgroundEnabled] = useState(true);
  const [showTip, setShowTip] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      const appearTimer = setTimeout(() => { setShowTip(true); }, 3500);
      const disappearTimer = setTimeout(() => { setShowTip(false); }, 10000);
      return () => {
        clearTimeout(appearTimer);
        clearTimeout(disappearTimer);
      };
    }
  }, [isLoading]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: userColor },
          ...(mode === 'dark'
            ? { background: { default: '#1a1a1a', paper: '#2a2a2a' }, text: { primary: '#f5eefc', secondary: '#bca6d4' } }
            : { background: { default: '#f9f9f9', paper: '#ffffff' }, text: { primary: '#3e2c52', secondary: '#6a4e8e' } }),
        },
        typography: { fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif' },
      }),
    [mode, userColor]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CustomCursor cursorEnabled={cursorEnabled && animationsEnabled} />
      
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      
      {isLoading && <LoadingAnimation onFinished={() => setIsLoading(false)} />}
      
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: isLoading ? 0 : 1 }} 
        transition={{ duration: 0.8 }}
      >
        {!isLoading && (
          <Router>
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <Navbar 
                mode={mode} setMode={setMode} 
                animationsEnabled={animationsEnabled} setAnimationsEnabled={setAnimationsEnabled}
                cursorEnabled={cursorEnabled} setCursorEnabled={setCursorEnabled}
                backgroundEnabled={backgroundEnabled} setBackgroundEnabled={setBackgroundEnabled}
              />
              <Box component="main" sx={{ flexGrow: 1, position: 'relative' }}>
                <Routes>
                  <Route path="/" element={<HomePage animationsEnabled={animationsEnabled} backgroundEnabled={backgroundEnabled} />} />
                  <Route path="/team" element={<MeetTheTeam animationsEnabled={animationsEnabled} />} />
                  <Route path="/volumes" element={<Volumes animationsEnabled={animationsEnabled} />} />
                  {/* The /collaborations route has been removed */}
                  <Route path="/faq" element={<FAQ animationsEnabled={animationsEnabled} />} />
                </Routes>
              </Box>
              <Footer />
              <ScrollToTopButton />
              
              <AnimatePresence>
                {showTip && <SettingsTip />}
              </AnimatePresence>
            </Box>
          </Router>
        )}
      </motion.div>
    </ThemeProvider>
  );
}

export default App;