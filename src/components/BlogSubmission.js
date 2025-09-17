import React from 'react';
import { Box, Typography, Button, Paper, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom'; // Import the link component
import SendIcon from '@mui/icons-material/Send';

const BlogSubmission = ({ animationsEnabled }) => {
    const theme = useTheme();

    const containerVariant = animationsEnabled ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.3 } }
    } : {};

    const itemVariant = animationsEnabled ? {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    } : {};

    return (
        <Box sx={{ py: 8, backgroundColor: 'action.hover' }}>
            <Paper
                component={motion.div}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={containerVariant}
                elevation={0}
                sx={{
                    p: 4,
                    maxWidth: 'md',
                    margin: '0 auto',
                    textAlign: 'center',
                    backgroundColor: 'transparent'
                }}
            >
                <motion.div variants={itemVariant}>
                    <Typography variant="h4" component="h2" sx={{ fontFamily: "'Hello Paris', cursive", mb: 2 }}>
                        Stay for a while— we saved you a page.
                    </Typography>
                </motion.div>
                <motion.div variants={itemVariant}>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                        We are always looking for passionate writers, artists, and creators. If you have an idea that fits our vision, we would love to hear from you.
                    </Typography>
                </motion.div>
                <motion.div variants={itemVariant}>
                    {/* CORRECTED: This button now uses RouterLink to navigate */}
                    <Button
                        variant="contained"
                        size="large"
                        endIcon={<SendIcon />}
                        component={RouterLink}
                        to="/submit"
                    >
                        Submit to Our Blog
                    </Button>
                </motion.div>
            </Paper>
        </Box>
    );
};

export default BlogSubmission;