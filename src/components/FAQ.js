import React from 'react';
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DynamicCheckerboardBackground from './DynamicCheckerboardBackground';

const faqData = [
    {
        question: "What is Elysian Times?",
        answer: "Elysian Times is an independent fashion magazine dedicated to exploring the intersections of fashion, culture, art, and identity."
    },
    {
        question: "Who can contribute?",
        answer: "Submissions are always free and open to everyone, regardless of background or experience. We value voices from all walks of life."
    },
    {
        question: "How often do you publish?",
        answer: "Our platform publishes articles, essays, and research papers that bring fresh perspectives to the world of fashion on a rolling basis."
    },
    {
        question: "How do I submit my work?",
        answer: "Please navigate to our 'Submit to Our Blog' page for guidelines and access to our submission forms."
    }
];

// UPDATED: Accepting the backgroundEnabled prop
const FAQ = ({ animationsEnabled, backgroundEnabled }) => {
  return (
    <Box sx={{ position: 'relative', overflow: 'hidden', py: 8 }}>
        {/* UPDATED: Conditionally rendering the background */}
        {backgroundEnabled && <DynamicCheckerboardBackground animationsEnabled={animationsEnabled} />}
        <Container maxWidth="md">
            <Typography variant="h2" component="h1" gutterBottom textAlign="center" sx={{ fontFamily: '"Hello Paris", sans-serif', mb: 6 }}>
                Frequently Asked Questions
            </Typography>
            {faqData.map((item, index) => (
                <Accordion key={index} sx={{
                  // Added a subtle background color to distinguish from the page background
                  backgroundColor: 'action.hover'
                }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="h6">{item.question}</Typography></AccordionSummary>
                    <AccordionDetails><Typography>{item.answer}</Typography></AccordionDetails>
                </Accordion>
            ))}
        </Container>
    </Box>
  );
};

export default FAQ;