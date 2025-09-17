import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { motion } from 'framer-motion';
import meherImage from '../assets/meher.png';
import benazirImage from '../assets/benazir.png';

const teamMembers = [
  { name: 'Mehernosh Ali', role: 'Founder & EIC', image: meherImage },
  { name: 'Benazir Momen', role: 'Founder', image: benazirImage },
];

// CORRECTED: This component no longer needs the backgroundEnabled prop
const MeetTheTeam = ({ animationsEnabled }) => {
  const pageVariants = { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } };
  const pageTransition = { duration: 0.4, ease: "easeInOut" };

  return (
    // The broken style has been removed from this wrapper
    <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} transition={pageTransition}>
      {/* The background component is no longer rendered here */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h2" component="h1" gutterBottom textAlign="center" sx={{ fontFamily: '"Hello Paris", sans-serif', mb: 6 }}>
          Meet The Team
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div style={{ height: '100%' }}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia component="img" image={member.image} alt={member.name} sx={{ height: 350, objectFit: 'cover', objectPosition: 'top' }} />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="div">{member.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{member.role}</Typography>
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