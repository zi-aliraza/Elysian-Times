import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Box } from '@mui/material';
import { motion } from 'framer-motion';
import PersonIcon from '@mui/icons-material/Person'; // Icon for the placeholder

// Import the local image asset
import meherImage from '../assets/meher.png';

// The new, updated team members array
const teamMembers = [
  { 
    name: 'Mehernosh Ali', 
    role: 'Founder & EIC', 
    image: meherImage // Use the imported image
  },
  { 
    name: 'Benazir Momen', 
    role: 'Founder', 
    image: 'placeholder' // Special key for the placeholder
  },
];

const MeetTheTeam = ({ animationsEnabled }) => {
  const cardVariants = animationsEnabled ? {
    offscreen: { y: 50, opacity: 0 },
    onscreen: {
      y: 0, opacity: 1,
      transition: { type: "spring", bounce: 0.4, duration: 0.8 }
    }
  } : {};

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Container sx={{ py: 8 }}>
        <Typography variant="h2" component="h1" align="center" gutterBottom>
          Meet The Team
        </Typography>
        <Grid container spacing={4} justifyContent="center" sx={{ mt: 4 }}>
          {teamMembers.map((member, index) => (
            <Grid item key={index} xs={12} sm={6} md={5}> {/* md=5 gives two cards nice spacing */}
              <motion.div
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.8 }}
                variants={cardVariants}
                style={{ height: '100%' }}
              >
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  {member.image === 'placeholder' ? (
                    // If image is 'placeholder', render a styled box with an icon
                    <Box sx={{
                      height: 350,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'action.hover',
                      borderBottom: '1px solid',
                      borderColor: 'divider',
                    }}>
                      <PersonIcon sx={{ fontSize: 80, color: 'text.disabled' }} />
                    </Box>
                  ) : (
                    // Otherwise, render the image as usual
                    <CardMedia 
                      component="img" 
                      sx={{ height: 350, objectFit: 'cover', objectPosition: 'top' }} 
                      image={member.image} 
                      alt={member.name} 
                    />
                  )}
                  <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                    <Typography gutterBottom variant="h5" component="div">
                      {member.name}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {member.role}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </motion.div>
  );
};

export default MeetTheTeam;