'use client';

import React from 'react';
import { Container } from '@mui/material';
import TeamMatchupBanner from '@/app/(DashboardLayout)/components/comparison/TeamMatchupBanner'; // Corrected import for TeamMatchupBanner
import PossessionBar from '@/app/(DashboardLayout)/components/comparison/PossessionBar'; // Corrected import for PossessionBar
import Heatmap from '@/app/(DashboardLayout)/components/comparison/vis/HeatMap'; // Corrected import for PossessionBar
import PolarChartComponent from '@/app/(DashboardLayout)/components/comparison/vis/PolarChart';
import MatchStats from '@/app/(DashboardLayout)/components/comparison/MatchStats';
import Goalscorers from '@/app/(DashboardLayout)/components/comparison/GoalScorers';

const MatchupPolandArgentina = () => {
  // Possession data (corrected structure for PossessionBar)

  const team1 = {
    name: 'Argentina',
    code: 'AR',
  };

  const team2 = {
    name: 'Poland',
    code: 'PL',
  };

  const possessionData = {
    team1: {
      name: 'Argentina',
      possession: 67,
      code: 'AR', // Use country code directly or derive from mapping
    },
    team2: {
      name: 'Poland',
      possession: 24,
      code: 'PL',
    },
    contested: 9, // Contested area percentage
  };

  const players = {
    team1: [
      { firstName: 'Julián', lastName: 'Álvarez', goals: 1, team: 'Argentina' },
      { firstName: 'Alexis Mac', lastName: 'Allister', goals: 1, team: 'Argentina' },
    ],
    team2: [
    ],
  };

  const matchData = {
    team1: {
      name: 'Argentina',
      goals: 2,
      shotAttempts: 25,
      shotAccuracy: '8%',
    },
    team2: {
      name: 'Poland',
      goals: 0,
      shotAttempts: 4,
      shotAccuracy: '0%',
    },
  };

  const heatmapData = {
    team1Name: 'Argentina', // Name for Team 1
    team2Name: 'Poland',
    leftChannel: { team1: 33, team2: 8 },
    centralChannel: { team1: 7, team2: 1 },
    rightChannel: { team1: 36, team2: 5 },
  };

  const PolarData = {
    Argentina: {
      metrics: [
        { name: 'Possession', value: 67 },
        { name: 'Goals vs Attempts', value: 8 },
        { name: 'Passes vs Attempts', value: 94.43 },
        { name: 'Attacks Right', value: 47.37 },
        { name: 'Attacks Center', value: 9.21 },
        { name: 'Attacks Left', value: 43.42 },
        { name: 'On Target Attempts', value: 52 },
        { name: 'Goals Inside Penalty', value: 100 },
      ],
    },
    Poland: {
      metrics: [
        { name: 'Possession', value: 24 },
        { name: 'Goals vs Attempts', value: 0 },
        { name: 'Passes vs Attempts', value: 81.31 },
        { name: 'Attacks Right', value: 35.71 },
        { name: 'Attacks Center', value: 7.14 },
        { name: 'Attacks Left', value: 57.14 },
        { name: 'On Target Attempts', value: 0 },
        { name: 'Goals Inside Penalty', value: 0 },
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

      {/* HeatMap */}
      <Heatmap data={heatmapData} />

      {/* Goal Scorers */}
      <Goalscorers players={players} />
    </Container>
  );
};

export default MatchupPolandArgentina;

