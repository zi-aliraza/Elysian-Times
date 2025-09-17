import React, { useState } from 'react';
import { Box, Paper, Typography, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Radio, Button, IconButton, Link as MuiLink, Tooltip, Collapse } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LaunchIcon from '@mui/icons-material/Launch';
import { useNavigate } from 'react-router-dom';
import AnimatedGradientBackground from './AnimatedGradientBackground';

const links = {
    General: "https://forms.gle/x6nQWvev1jSCHET56",
    Themed: "https://forms.gle/hr8GTUBWDFpV1AHR7"
};

// UPDATED: Accepting the backgroundEnabled prop
const SubmissionPage = ({ animationsEnabled, backgroundEnabled }) => {
    const [category, setCategory] = useState('');
    const [agreed, setAgreed] = useState(false);
    const [showLinkBox, setShowLinkBox] = useState(false);
    const [copied, setCopied] = useState(false);
    const navigate = useNavigate();

    const generatedLink = links[category] || '';
    const canSubmit = category && agreed;

    const handleGenerateLink = () => {
        if (canSubmit) {
            setShowLinkBox(true);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <>
            {/* UPDATED: Conditionally rendering the background */}
            {backgroundEnabled && <AnimatedGradientBackground />}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 128px)', p: 2 }}>
                <Paper 
                    elevation={12} 
                    sx={{ 
                        p: { xs: 2, md: 4 }, 
                        maxWidth: 600, 
                        width: '100%', 
                        position: 'relative',
                        transition: 'height 0.3s ease-in-out'
                    }}
                >
                    <IconButton onClick={() => navigate(-1)} sx={{ position: 'absolute', top: 8, left: 8 }}><ArrowBackIcon /></IconButton>
                    <Typography variant="h4" textAlign="center" gutterBottom sx={{ fontFamily: "'Hello Paris', cursive" }}>Submission Form</Typography>

                    <FormControl fullWidth margin="normal">
                        <InputLabel>Category</InputLabel>
                        <Select value={category} label="Category" onChange={(e) => setCategory(e.target.value)}>
                            <MenuItem value="General">General Submission</MenuItem>
                            <MenuItem value="Themed">Themed Issue Submission</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControlLabel
                        control={<Radio checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />}
                        label={
                            <Typography>
                                I have read and agree to follow the <MuiLink href="https://docs.google.com/document/d/1V8LnjvTwuL-7VaT-HuNKV1agWD3DcJw5XiO3SOWhKCA/edit?usp=sharing" target="_blank" rel="noopener noreferrer">guidelines*</MuiLink>
                            </Typography>
                        }
                        sx={{ mt: 1, display: 'flex', justifyContent: 'center' }}
                    />

                    <Box sx={{ textAlign: 'center', mt: 3 }}>
                        <Button variant="contained" disabled={!canSubmit} onClick={handleGenerateLink}>Get Your Link</Button>
                    </Box>

                    <Collapse in={showLinkBox} timeout="auto" unmountOnExit>
                        <Box
                            sx={{
                                mt: 4,
                                p: 2,
                                borderRadius: 1,
                                backgroundColor: 'black',
                                color: '#f472b6',
                                fontFamily: 'monospace',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Typography sx={{ wordBreak: 'break-all', mr: 1 }}>
                                {generatedLink}
                            </Typography>
                            <Box sx={{ display: 'flex' }}>
                                 <Tooltip title={copied ? "Copied!" : "Copy link"} placement="top">
                                    <IconButton onClick={handleCopy} size="small" sx={{ color: '#f472b6' }}>
                                        <ContentCopyIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Open link in new tab" placement="top">
                                    <IconButton 
                                        href={generatedLink} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        size="small" 
                                        sx={{ color: '#f472b6' }}
                                    >
                                        <LaunchIcon />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </Box>
                    </Collapse>
                </Paper>
            </Box>
        </>
    );
};

export default SubmissionPage;