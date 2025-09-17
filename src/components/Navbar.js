import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, Divider, useMediaQuery, useTheme, Popover, FormControlLabel, Switch, ListSubheader, alpha } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';

const navItems = [
    { text: 'Home', path: '/' },
    { text: 'Meet The Team', path: '/team' },
    { text: 'Volumes', path: '/volumes' },
    { text: 'FAQ', path: '/faq' },
];

const Navbar = ({ mode, setMode, animationsEnabled, setAnimationsEnabled, cursorEnabled, setCursorEnabled, backgroundEnabled, setBackgroundEnabled }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [settingsAnchorEl, setSettingsAnchorEl] = useState(null);

    const handleSettingsClick = (event) => {
        setSettingsAnchorEl(event.currentTarget);
    };

    const handleSettingsClose = () => {
        setSettingsAnchorEl(null);
    };

    const isSettingsOpen = Boolean(settingsAnchorEl);

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const drawer = (
         <Box 
            onClick={handleDrawerToggle} 
            sx={{ 
                textAlign: 'center', 
                width: 250, 
                display: 'flex', 
                flexDirection: 'column', 
                height: '100%' 
            }}
         >
            <Box>
                <Typography variant="h6" sx={{ my: 2, fontFamily: "'Hello Paris', cursive" }}>
                    Elysian Times
                </Typography>
                <Divider />
                <List>
                    {navItems.map((item) => (
                        <ListItem key={item.text} disablePadding>
                            <ListItemButton component={RouterLink} to={item.path}>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ p: 2 }}>
                <Divider />
                <Button component={RouterLink} to="/submit" variant="contained" fullWidth sx={{ mt: 1 }}>
                    Submit to Blog
                </Button>
            </Box>
        </Box>
    );

    return (
        <>
            <AppBar 
                position="sticky" 
                elevation={0}
                sx={{ 
                    top: 0, 
                    // CORRECTED: The zIndex is now set to the standard AppBar level, which is lower than the Drawer.
                    zIndex: (theme) => theme.zIndex.appBar,
                    backgroundColor: alpha(theme.palette.background.default, 0.8),
                    backdropFilter: 'blur(8px)',
                    borderBottom: 1, 
                    borderColor: 'divider'
                }}
            >
                <Toolbar>
                    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                        <Typography variant="h6" component={RouterLink} to="/" sx={{ fontFamily: "'Hello Paris', cursive", textDecoration: 'none', color: 'inherit', fontSize: '1.8rem', mr: 3 }}>
                            Elysian Times
                        </Typography>
                        {!isMobile && navItems.map((item) => (
                            <Button key={item.text} component={RouterLink} to={item.path} color="inherit">
                                {item.text}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {!isMobile && (
                            <Button 
                                component={RouterLink} 
                                to="/submit" 
                                variant={mode === 'light' ? 'contained' : 'outlined'} 
                                sx={{ mr: 1 }}
                            >
                                Submit to Our Blog
                            </Button>
                        )}
                        <IconButton color="inherit" onClick={handleSettingsClick}>
                            <SettingsIcon />
                        </IconButton>
                        {isMobile && (
                            <IconButton color="inherit" edge="end" onClick={handleDrawerToggle}>
                                <MenuIcon />
                            </IconButton>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>

            <Popover
                open={isSettingsOpen}
                anchorEl={settingsAnchorEl}
                onClose={handleSettingsClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                 <List sx={{ minWidth: 240 }}>
                    <ListSubheader>Appearance</ListSubheader>
                    <ListItem>
                        <FormControlLabel control={<Switch checked={mode === 'dark'} onChange={() => setMode(mode === 'dark' ? 'light' : 'dark')} />} label="Dark Mode" />
                    </ListItem>
                     <ListItem>
                        <FormControlLabel control={<Switch checked={backgroundEnabled} onChange={() => setBackgroundEnabled(!backgroundEnabled)} />} label="Show Background" />
                    </ListItem>
                    <ListSubheader>Experience</ListSubheader>
                    <ListItem>
                        <FormControlLabel control={<Switch checked={animationsEnabled} onChange={() => setAnimationsEnabled(!animationsEnabled)} />} label="Animations" />
                    </ListItem>
                     <ListItem>
                        <FormControlLabel control={<Switch checked={cursorEnabled} onChange={() => setCursorEnabled(!cursorEnabled)} />} label="Custom Cursor" />
                    </ListItem>
                </List>
            </Popover>

            <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
                {drawer}
            </Drawer>
        </>
    );
};

export default Navbar;