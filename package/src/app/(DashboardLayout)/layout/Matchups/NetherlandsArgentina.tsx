'use client';

import React from 'react';
import { Container } from '@mui/material';
import TeamMatchupBanner from '@/app/(DashboardLayout)/components/comparison/TeamMatchupBanner'; // Corrected import for TeamMatchupBanner
import PossessionBar from '@/app/(DashboardLayout)/components/comparison/PossessionBar'; // Corrected import for PossessionBar
import Heatmap from '@/app/(DashboardLayout)/components/comparison/vis/HeatMap'; // Corrected import for PossessionBar
import PolarChartComponent from '@/app/(DashboardLayout)/components/comparison/vis/PolarChart';
import MatchStats from '@/app/(DashboardLayout)/components/comparison/MatchStats';
import Goalscorers from '@/app/(DashboardLayout)/components/comparison/GoalScorers';

const MatchupNetherlandsArgentina = () => {
  // Possession data (corrected structure for PossessionBar)

  const team1 = {
    name: 'Argentina',
    code: 'AR',
  };

  const team2 = {
    name: 'Netherlands',
    code: 'NL',
  };

  const possessionData = {
    team1: {
      name: 'Argentina',
      possession: 44,
      code: 'AR', // Use country code directly or derive from mapping
    },
    team2: {
      name: 'Netherlands',
      possession: 45,
      code: 'HR',
    },
    contested: 11, // Contested area percentage
  };

  const players = {
    team1: [
      { firstName: 'Nahuel', lastName: 'Molina', goals: 1, team: 'Argentina' },
      { firstName: 'Lionel', lastName: 'Messi', goals: 1, team: 'Argentina' },
    ],
    team2: [
      { firstName: 'Wout', lastName: 'Weghorst', goals: 2, team: 'Netherlands' },
    ],
  };

  const matchData = {
    team1: {
      name: 'Argentina',
      goals: 2,
      shotAttempts: 5,
      shotAccuracy: '40%',
    },
    team2: {
      name: 'Netherlands',
      goals: 2,
      shotAttempts: 15,
      shotAccuracy: '13.33%',
    },
  };

  const heatmapData = {
    team1Name: 'Argentina', // Name for Team 1
    team2Name: 'Netherlands',
    leftChannel: { team1: 13, team2: 18 },
    centralChannel: { team1: 14, team2: 9 },
    rightChannel: { team1: 23, team2: 45 },
  };

  const PolarData = {
    Argentina: {
      metrics: [
        { name: 'Possession%', value: 44 },
        { name: 'Goals vs Attempts%', value: 13.33 },
        { name: 'Passes vs Attempts%', value: 84.74 },
        { name: 'Attacks Right%', value: 46 },
        { name: 'Attacks Center%', value: 26 },
        { name: 'Attacks Left%', value: 28 },
        { name: 'On Target Attempts%', value: 40 },
        { name: 'Goals Inside Pen%', value: 100 },
      ],
    },
    Netherlands: {
      metrics: [
        { name: 'Possession', value: 45 },
        { name: 'Goals vs Attempts', value: 40 },
        { name: 'Passes vs Attempts', value: 85.56 },
        { name: 'Attacks Right%', value: 40 },
        { name: 'Attacks Center%', value: 20 },
        { name: 'Attacks Left%', value: 40 },
        { name: 'On Target Attempts', value: 40 },
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

      {/* HeatMap */}
      <Heatmap data={heatmapData} />

      {/* Goal Scorers */}
      <Goalscorers players={players} />
    </Container>
  );
};

export default MatchupNetherlandsArgentina;

