import React from 'react';
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { motion } from 'framer-motion';

const faqs = [
    { 
      q: 'Do you accept simultaneous submissions?', 
      a: 'Yes, but please let us know if your piece gets accepted elsewhere.' 
    },
    { 
      q: 'Will I be notified if my work is accepted or rejected?', 
      a: 'For magazine issues, we’ll notify selected contributors directly. For Substack/blog posts, we don’t send acceptance or rejection emails. Published pieces go live at the beginning or end of each month.' 
    },
    { 
      q: 'Do contributors get paid?', 
      a: 'Currently, we’re an independent magazine run by a small team, so contributions are unpaid. However, we always credit and promote our contributors.' 
    },
    { 
      q: 'Can I pitch ideas before writing a full piece?', 
      a: 'Absolutely! If you’d like feedback on your idea before drafting, send us a pitch via email or Instagram DM.' 
    },
    { 
      q: 'How often does Elysian Times publish?', 
      a: 'Our magazine issues are released a few times a year, while our Substack/blog features rolling posts throughout the month.' 
    },
    { 
      q: 'Can I be part of the Elysian Times team?', 
      a: 'From time to time, we open applications for writers, editors, and creatives. Keep an eye on our Instagram for announcements.' 
    },
];

const FAQ = ({ animationsEnabled }) => {
    const pageVariants = animationsEnabled ? {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.1 } }
    } : {};
    
    const itemVariants = animationsEnabled ? {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 }
    } : {};

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate">
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Typography variant="h2" component="h1" align="center" gutterBottom>
          Frequently Asked Questions
        </Typography>
        {faqs.map((faq, index) => (
          <motion.div variants={itemVariants} key={index}>
            {/* THIS IS THE CORRECTED ACCORDION COMPONENT */}
            <Accordion 
              elevation={0} // Start with no shadow
              disableGutters // Remove default margins
              sx={{
                // General styling for both collapsed and expanded states
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: '12px',
                transition: 'margin 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:not(:last-child)': {
                  mb: 2, // Add margin-bottom to all but the last accordion
                },
                '&:before': {
                  display: 'none', // Remove the default top border line
                },
                // Styles applied ONLY when the Accordion is expanded
                '&.Mui-expanded': {
                  my: 2, // Add vertical margin to separate it from neighbors
                  boxShadow: (theme) => theme.shadows[8], // Apply a noticeable shadow to "lift" it
                },
              }}
            >
              <AccordionSummary 
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  '& .MuiAccordionSummary-content': {
                    // Make the question a bit bolder when expanded
                    '&.Mui-expanded': {
                      fontWeight: 'bold',
                    }
                  }
                }}
              >
                <Typography variant="h6">{faq.q}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography color="text.secondary">{faq.a}</Typography>
              </AccordionDetails>
            </Accordion>
          </motion.div>
        ))}
      </Container>
    </motion.div>
  );
};

export default FAQ;