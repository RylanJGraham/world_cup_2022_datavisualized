'use client';

import React from 'react';
import { Box, Typography, Icon, useTheme } from '@mui/material';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const MatchStats = ({ matchData }) => {
  const theme = useTheme();

  // Destructure the matchData object
  const { team1, team2 } = matchData;

  // Determine which team won
  const winner = team1.goals > team2.goals ? 'team1' : team1.goals < team2.goals ? 'team2' : null;
  
  // Determine the direction of the arrow
  const arrowDirection = winner === 'team1' ? <ArrowBackIcon sx={{ color: theme.palette.primary.main, fontSize:40 }} /> : winner === 'team2' ? <ArrowForwardIcon sx={{ color: theme.palette.primary.main }} /> : null;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '40px', marginTop: '20px', marginBottom: '20px' }}>
      {/* Team 1 Column */}
      <Box sx={{ textAlign: 'left' }}>
        <Box sx={{alignItems: 'center', display: 'flex', direction: 'row'}}>
            <SportsSoccerIcon sx={{ fontSize: 80, color: theme.palette.primary.main }} />
            <Typography variant="h1" sx={{ fontWeight: 'bold', fontSize: 80, }}>
            {team1.goals}
            </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'left', gap: '4px', marginTop: '8px' }}>
          <Typography variant="h4">Shot Attempts:</Typography>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            {team1.shotAttempts}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'left', gap: '4px', marginTop: '4px' }}>
          <Typography variant="h5" sx={{ color: 'primary.main' }}>Accuracy:</Typography>
          <Typography variant="h5" sx={{ color: 'primary.main' }}>
            {team1.shotAccuracy}
          </Typography>
        </Box>
      </Box>

      {/* Trophy Icon with Arrow */}
      <Box sx={{ textAlign: 'center' }}>
        <EmojiEventsIcon sx={{ fontSize: 60, color: theme.palette.primary.main }} />
        <Box sx={{ marginTop: '8px' }}>
          {arrowDirection}
        </Box>
      </Box>

      {/* Team 2 Column */}
      <Box sx={{ textAlign: 'right' }}>
        <Box sx={{alignItems: 'center', display: 'flex', direction: 'row' }}>
            <Typography variant="h1" sx={{ fontWeight: 'bold', fontSize: 80, }}>
            {team2.goals}
            </Typography>
            <SportsSoccerIcon sx={{ fontSize: 80, color: theme.palette.primary.main }} />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'right', gap: '4px', marginTop: '8px' }}>
          <Typography variant="h4">Shot Attempts:</Typography>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            {team2.shotAttempts}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'right', gap: '4px', marginTop: '4px' }}>
          <Typography variant="h5" sx={{ color: 'primary.main' }}>Accuracy:</Typography>
          <Typography variant="h5" sx={{ color: 'primary.main' }}>
            {team2.shotAccuracy}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default MatchStats;
