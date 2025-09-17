import React from 'react';
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { motion } from 'framer-motion';

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

// CORRECTED: This component no longer needs the backgroundEnabled prop
const FAQ = ({ animationsEnabled }) => {
  const pageVariants = { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } };
  const pageTransition = { duration: 0.4, ease: "easeInOut" };

  return (
    // The broken style has been removed from this wrapper
    <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} transition={pageTransition}>
      {/* The background component is no longer rendered here */}
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Typography variant="h2" component="h1" gutterBottom textAlign="center" sx={{ fontFamily: '"Hello Paris", sans-serif', mb: 6 }}>
          Frequently Asked Questions
        </Typography>
        {faqData.map((item, index) => (
          <Accordion key={index} sx={{ backgroundColor: 'action.hover' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="h6">{item.question}</Typography></AccordionSummary>
            <AccordionDetails><Typography>{item.answer}</Typography></AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </motion.div>
  );
};

export default FAQ;