'use client';

import React from 'react';
import { Container } from '@mui/material';
import TeamMatchupBanner from '@/app/(DashboardLayout)/components/comparison/TeamMatchupBanner'; // Corrected import for TeamMatchupBanner
import PossessionBar from '@/app/(DashboardLayout)/components/comparison/PossessionBar'; // Corrected import for PossessionBar
import Heatmap from '@/app/(DashboardLayout)/components/comparison/vis/HeatMap'; // Corrected import for PossessionBar
import PolarChartComponent from '@/app/(DashboardLayout)/components/comparison/vis/PolarChart';
import MatchStats from '@/app/(DashboardLayout)/components/comparison/MatchStats';
import Goalscorers from '@/app/(DashboardLayout)/components/comparison/GoalScorers';

const MatchupAustraliaArgentina = () => {
  // Possession data (corrected structure for PossessionBar)

  const team1 = {
    name: 'Argentina',
    code: 'AR',
  };

  const team2 = {
    name: 'Australia',
    code: 'AU',
  };

  const possessionData = {
    team1: {
      name: 'Argentina',
      possession: 53,
      code: 'AR', // Use country code directly or derive from mapping
    },
    team2: {
      name: 'Netherlands',
      possession: 35,
      code: 'AU',
    },
    contested: 12, // Contested area percentage
  };

  const players = {
    team1: [
      { firstName: 'Julián', lastName: 'Álvarez', goals: 1, team: 'Argentina' },
      { firstName: 'Lionel', lastName: 'Messi', goals: 1, team: 'Argentina' },
    ],
    team2: [
      { firstName: 'Enzo', lastName: 'Fernandez', goals: 1, team: 'Netherlands', ownGoal: 'true', },
    ],
  };

  const matchData = {
    team1: {
      name: 'Argentina',
      goals: 2,
      shotAttempts: 14,
      shotAccuracy: '14.29%',
    },
    team2: {
      name: 'Australia',
      goals: 1,
      shotAttempts: 5,
      shotAccuracy: '20%',
    },
  };

  const heatmapData = {
    team1Name: 'Argentina', // Name for Team 1
    team2Name: 'Australia',
    leftChannel: { team1: 21, team2: 9 },
    centralChannel: { team1: 11, team2: 2 },
    rightChannel: { team1: 19, team2: 15 },
  };

  const PolarData = {
    Argentina: {
      metrics: [
        { name: 'Possession%', value: 53 },
        { name: 'Goals vs Attempts%', value: 14.29 },
        { name: 'Passes vs Attempts%', value: 89.31 },
        { name: 'Attacks Right%', value: 37.25 },
        { name: 'Attacks Center%', value: 21.57 },
        { name: 'Attacks Left%', value: 41.18 },
        { name: 'On Target Attempts%', value: 35.71 },
        { name: 'Goals Inside Pen%', value: 100 },
      ],
    },
    Australia: {
      metrics: [
        { name: 'Possession', value: 35 },
        { name: 'Goals vs Attempts', value: 20 },
        { name: 'Passes vs Attempts', value: 84.67 },
        { name: 'Attacks Right%', value: 57.69 },
        { name: 'Attacks Center%', value: 7.69 },
        { name: 'Attacks Left%', value: 34.62 },
        { name: 'On Target Attempts', value: 20 },
        { name: 'Goals Inside Pen', value: 0 },
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

export default MatchupAustraliaArgentina;

