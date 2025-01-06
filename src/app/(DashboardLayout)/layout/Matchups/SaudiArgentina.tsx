'use client';

import React from 'react';
import { Container, Box,
  Typography, } from '@mui/material';
import TeamMatchupBanner from '@/app/(DashboardLayout)/components/comparison/TeamMatchupBanner'; // Corrected import for TeamMatchupBanner
import PossessionBar from '@/app/(DashboardLayout)/components/comparison/PossessionBar'; // Corrected import for PossessionBar
import Heatmap from '@/app/(DashboardLayout)/components/comparison/vis/HeatMap'; // Corrected import for PossessionBar
import PolarChartComponent from '@/app/(DashboardLayout)/components/comparison/vis/PolarChart';
import MatchStats from '@/app/(DashboardLayout)/components/comparison/MatchStats';
import Goalscorers from '@/app/(DashboardLayout)/components/comparison/GoalScorers';

const MatchupSaudiArgentina = () => {
  // Possession data (corrected structure for PossessionBar)

  const team1 = {
    name: 'Argentina',
    code: 'AR',
  };

  const team2 = {
    name: 'Saudi Arabia',
    code: 'SA',
  };

  const possessionData = {
    team1: {
      name: 'Argentina',
      possession: 64,
      code: 'AR', // Use country code directly or derive from mapping
    },
    team2: {
      name: 'Saudi Arabia',
      possession: 24,
      code: 'SA',
    },
    contested: 12, // Contested area percentage
  };

  const players = {
    team1: [
      { firstName: 'Lionel', lastName: 'Messi', goals: 1, team: 'Argentina' },
    ],
    team2: [
      { firstName: 'Saleh', lastName: 'Al-Shehri', goals: 1, team: 'Saudi Arabia' },
      { firstName: 'Salem', lastName: 'Al-Dawsari', goals: 1, team: 'Saudi Arabia' },
    ],
  };

  const matchData = {
    team1: {
      name: 'Argentina',
      goals: 1,
      shotAttempts: 14,
      shotAccuracy: '7.14%',
    },
    team2: {
      name: 'Australia',
      goals: 2,
      shotAttempts: 3,
      shotAccuracy: '66.67%',
    },
  };

  const heatmapData = {
    team1Name: 'Argentina', // Name for Team 1
    team2Name: 'Saudi Arabia',
    leftChannel: { team1: 16, team2: 5 },
    centralChannel: { team1: 5, team2: 3 },
    rightChannel: { team1: 26, team2: 11 },
  };

  const PolarData = {
    Argentina: {
      metrics: [
        { name: 'Possession', value: 64 },
        { name: 'Goals vs Attempts', value: 7.14 },
        { name: 'Passes vs Attempts', value: 86.72 },
        { name: 'Attacks Right', value: 55.32 },
        { name: 'Attacks Center', value: 10.64 },
        { name: 'Attacks Left', value: 34.04 },
        { name: 'On Target Attempts', value: 42.86 },
        { name: 'Goals Inside Pen', value: 100 },
      ],
    },
    SaudiArabia: {
      metrics: [
        { name: 'Possession', value: 24 },
        { name: 'Goals vs Attempts', value: 66.67 },
        { name: 'Passes vs Attempts', value: 71.16 },
        { name: 'Attacks Right', value: 57.89 },
        { name: 'Attacks Center', value: 15.79 },
        { name: 'Attacks Left', value: 26.32 },
        { name: 'On Target Attempts', value: 66.67 },
        { name: 'Goals Inside Pen', value: 100 },
      ],
    },
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: '40px' }}>
      {/* Banner */}
      <TeamMatchupBanner team1={team1} team2={team2}/>

      {/* Scores */}
      <MatchStats matchData={matchData} />
      
      {/* Possession Bar */}
      <PossessionBar possessionData={possessionData} />

      {/* Polar Chart */}
      <PolarChartComponent data={PolarData} />
      <Box sx={{justifyContent: 'middle', alignItems: 'middle', marginBottom: '20px'}}>
      <Typography variant='h6' sx={{color: 'primary.main', textAlign: 'center'}}>
        Values are in Percentages
      </Typography>
      </Box>

      {/* HeatMap */}
      <Heatmap data={heatmapData} />

      {/* Goal Scorers */}
      <Goalscorers players={players} />
    </Container>
  );
};

export default MatchupSaudiArgentina;

