'use client';

import React from 'react';
import { Container } from '@mui/material';
import TeamMatchupBanner from '@/app/(DashboardLayout)/components/comparison/TeamMatchupBanner'; // Corrected import for TeamMatchupBanner
import PossessionBar from '@/app/(DashboardLayout)/components/comparison/PossessionBar'; // Corrected import for PossessionBar
import Heatmap from '@/app/(DashboardLayout)/components/comparison/vis/HeatMap'; // Corrected import for PossessionBar
import PolarChartComponent from '@/app/(DashboardLayout)/components/comparison/vis/PolarChart';
import MatchStats from '@/app/(DashboardLayout)/components/comparison/MatchStats';
import Goalscorers from '@/app/(DashboardLayout)/components/comparison/GoalScorers';

const MatchupCroatiaArgentina = () => {
  // Possession data (corrected structure for PossessionBar)

  const team1 = {
    name: 'Argentina',
    code: 'AR',
  };

  const team2 = {
    name: 'Croatia',
    code: 'HR',
  };

  const possessionData = {
    team1: {
      name: 'Argentina',
      possession: 34,
      code: 'AR', // Use country code directly or derive from mapping
    },
    team2: {
      name: 'Croatia',
      possession: 54,
      code: 'HR',
    },
    contested: 12, // Contested area percentage
  };

  const players = {
    team1: [
      { firstName: 'Lionel', lastName: 'Messi', goals: 1, team: 'Argentina' },
      { firstName: 'Julián', lastName: 'Álvarez', goals: 2, team: 'Argentina' },
    ],
    team2: [],
  };

  const matchData = {
    team1: {
      name: 'Argentina',
      goals: 3,
      shotAttempts: 10,
      shotAccuracy: '30%',
    },
    team2: {
      name: 'Croatia',
      goals: 0,
      shotAttempts: 12,
      shotAccuracy: '0%',
    },
  };

  const heatmapData = {
    team1Name: 'Argentina', // Name for Team 1
    team2Name: 'Croatia',
    leftChannel: { team1: 17, team2: 24 },
    centralChannel: { team1: 7, team2: 7 },
    rightChannel: { team1: 5, team2: 12 },
  };

  const PolarData = {
    Argentina: {
      metrics: [
        { name: 'Possession', value: 34 },
        { name: 'Goals vs Attempts', value: 30 },
        { name: 'Passes vs Attempts', value: 84.31 },
        { name: 'Attacks Right', value: 17.24 },
        { name: 'Attacks Center', value: 24.14 },
        { name: 'Attacks Left', value: 58.62 },
        { name: 'On Target Attempts', value: 70 },
        { name: 'Goals Inside Penalty', value: 100 },
      ],
    },
    Croatia: {
      metrics: [
        { name: 'Possession', value: 54 },
        { name: 'Goals vs Attempts', value: 0 },
        { name: 'Passes vs Attempts', value: 88.30 },
        { name: 'Attacks Right', value: 27.91 },
        { name: 'Attacks Center', value: 16.28 },
        { name: 'Attacks Left', value: 55.81 },
        { name: 'On Target Attempts', value: 25 },
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

export default MatchupCroatiaArgentina;

