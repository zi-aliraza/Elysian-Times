import React, { useState, useMemo, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
import FAQ from './components/FAQ';
import SubmissionPage from './components/SubmissionPage';

const AppContent = () => {
    const location = useLocation();
    const [animationsEnabled, setAnimationsEnabled] = useState(true);
    const [mode, setMode] = useState('dark');
    const [userColor, setUserColor] = useState('#d1a7ff');
    const [cursorEnabled, setCursorEnabled] = useState(true);
    const [backgroundEnabled, setBackgroundEnabled] = useState(true);
    const [showTip, setShowTip] = useState(false);
    const isTouchDevice = useMemo(() => 'ontouchstart' in window || navigator.maxTouchPoints > 0, []);

    useEffect(() => {
        const appearTimer = setTimeout(() => { setShowTip(true); }, 3500);
        const disappearTimer = setTimeout(() => { setShowTip(false); }, 10000);
        return () => {
          clearTimeout(appearTimer);
          clearTimeout(disappearTimer);
        };
    }, []);

    const theme = useMemo(() => createTheme({
        palette: {
            mode,
            primary: { main: userColor },
            ...(mode === 'dark'
                ? { background: { default: '#1a1a1a', paper: '#2a2a2a' }, text: { primary: '#f5eefc', secondary: '#bca6d4' } }
                : { background: { default: '#f9f9f9', paper: '#fdfbff' }, text: { primary: '#3e2c52', secondary: '#6a4e8e' } }),
        },
        typography: { fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif' },
    }), [mode, userColor]);

    const pageVariants = animationsEnabled ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 }
    } : { initial: {opacity: 1}, animate: {opacity: 1}, exit: {opacity: 1} };

    const pageTransition = {
        duration: 0.4,
        ease: "easeInOut"
    };
    
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <CustomCursor cursorEnabled={cursorEnabled && animationsEnabled} />
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <Navbar 
                    mode={mode} setMode={setMode} 
                    animationsEnabled={animationsEnabled} setAnimationsEnabled={setAnimationsEnabled}
                    cursorEnabled={cursorEnabled} setCursorEnabled={setCursorEnabled}
                    backgroundEnabled={backgroundEnabled} setBackgroundEnabled={setBackgroundEnabled}
                />
                <Box component="main" sx={{ flexGrow: 1, position: 'relative' }}>
                    <AnimatePresence mode="wait">
                        <Routes location={location} key={location.pathname}>
                            {/* UPDATED: Passing backgroundEnabled prop to all relevant pages */}
                            <Route path="/" element={<motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} transition={pageTransition}><HomePage animationsEnabled={animationsEnabled} backgroundEnabled={backgroundEnabled} /></motion.div>} />
                            <Route path="/team" element={<motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} transition={pageTransition}><MeetTheTeam animationsEnabled={animationsEnabled} backgroundEnabled={backgroundEnabled} /></motion.div>} />
                            <Route path="/volumes" element={<motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} transition={pageTransition}><Volumes animationsEnabled={animationsEnabled} /></motion.div>} />
                            <Route path="/faq" element={<motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} transition={pageTransition}><FAQ animationsEnabled={animationsEnabled} backgroundEnabled={backgroundEnabled} /></motion.div>} />
                            <Route path="/submit" element={<motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} transition={pageTransition}><SubmissionPage animationsEnabled={animationsEnabled} backgroundEnabled={backgroundEnabled} /></motion.div>} />
                        </Routes>
                    </AnimatePresence>
                </Box>
                <Footer isTouchDevice={isTouchDevice} />
                <ScrollToTopButton />
                <AnimatePresence>
                    {showTip && <SettingsTip />}
                </AnimatePresence>
            </Box>
        </ThemeProvider>
    );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
        <svg style={{ position: 'absolute', width: 0, height: 0 }}><defs><filter id="goo"><feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" /><feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" /><feBlend in="SourceGraphic" in2="goo" /></filter></defs></svg>
        <AnimatePresence>
            {isLoading && <LoadingAnimation onFinished={() => setIsLoading(false)} key="loader" />}
        </AnimatePresence>
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: isLoading ? 0 : 1 }} 
            transition={{ duration: 0.8, delay: isLoading ? 0 : 0.2 }}
        >
            {!isLoading && (
                <Router>
                    <AppContent />
                </Router>
            )}
        </motion.div>
    </>
  );
}

export default App;