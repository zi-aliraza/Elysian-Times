import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Box } from '@mui/material';
import { motion } from 'framer-motion';
import DynamicCheckerboardBackground from './DynamicCheckerboardBackground';
import meherImage from '../assets/meher.png';
import benazirImage from '../assets/benazir.png';

const teamMembers = [
  { name: 'Mehernosh Ali', role: 'Founder & EIC', image: meherImage },
  { name: 'Benazir Momen', role: 'Founder', image: benazirImage },
];

// UPDATED: Accepting the backgroundEnabled prop
const MeetTheTeam = ({ animationsEnabled, backgroundEnabled }) => {
  const itemVariant = animationsEnabled ? {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        ease: 'easeOut'
      }
    })
  } : {
    hidden: { opacity: 1, y: 0 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <Box sx={{ position: 'relative', overflow: 'hidden', py: 8 }}>
      {/* UPDATED: Conditionally rendering the background */}
      {backgroundEnabled && <DynamicCheckerboardBackground animationsEnabled={animationsEnabled} />}
      <Container maxWidth="lg">
        <Typography variant="h2" component="h1" gutterBottom textAlign="center" sx={{ fontFamily: '"Hello Paris", sans-serif', mb: 6 }}>
          Meet The Team
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={itemVariant}
                style={{ height: '100%' }}
              >
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
    </Box>
  );
};

export default MeetTheTeam;