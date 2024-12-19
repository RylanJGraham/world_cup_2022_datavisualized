'use client';

import React from 'react';
import { Container } from '@mui/material';
import TeamMatchupBanner from '@/app/(DashboardLayout)/components/comparison/TeamMatchupBanner'; // Corrected import for TeamMatchupBanner
import PossessionBar from '@/app/(DashboardLayout)/components/comparison/PossessionBar'; // Corrected import for PossessionBar
import Heatmap from '@/app/(DashboardLayout)/components/comparison/vis/HeatMap'; // Corrected import for PossessionBar
import PolarChartComponent from '@/app/(DashboardLayout)/components/comparison/vis/PolarChart';
import MatchStats from '@/app/(DashboardLayout)/components/comparison/MatchStats';
import Goalscorers from '@/app/(DashboardLayout)/components/comparison/GoalScorers';

const MatchupPage = () => {
  // Possession data
  const possessionData = {
    argentina: 60, // Argentina's possession percentage
    france: 30, // France's possession percentage
    contested: 10, // Contested area percentage
  };

  const players = {
    team1: [
      { firstName: 'Lionel', lastName: 'Messi', goals: 2, team: 'Argentina' },
      { firstName: 'Ángel', lastName: 'Di María', goals: 1, team: 'Argentina' },
    ],
    team2: [
      { firstName: 'Kylian', lastName: 'Mbappé', goals: 3, team: 'France' },
    ]
  };
  

  const matchData = {
    team1: {
      name: 'Argentina',
      goals: 3,
      shotAttempts: 10,
      shotAccuracy: '14%',
    },
    team2: {
      name: 'France',
      goals: 1,
      shotAttempts: 8,
      shotAccuracy: '33%',
    }
  };

  const heatmapData = {
    team1Name: 'Argentina', // Name for Team 1
    team2Name: 'France',
    leftChannel: { team1: 20, team2: 15 },
    centralChannel: { team1: 40, team2: 35 },
    rightChannel: { team1: 15, team2: 10 },
  };

  const PolarData = {
    Argentina: {
      metrics: [
        { name: 'Possession', value: 46 },
        { name: 'Goals v Attempts', value: 14.29 },
        { name: 'Passes v Attempts', value: 83.95 },
        { name: 'Pct of Attacks Right', value: 40 },
        { name: 'Pct of Attacks Center', value: 17.78 },
        { name: 'Pct of Attacks Left', value: 42.22 },
        { name: 'On Target Attempts', value: 42.86 },
        { name: 'Goals Inside Pen', value: 14.29 },
      ],
    },
    France: {
      metrics: [
        { name: 'Possession', value: 40 },
        { name: 'Goals v Attempts', value: 30 },
        { name: 'Passes v Attempts', value: 81.2 },
        { name: 'Pct of Attacks Right', value: 37.21 },
        { name: 'Pct of Attacks Center', value: 11.63 },
        { name: 'Pct of Attacks Left', value: 51.16 },
        { name: 'On Target Attempts', value: 50 },
        { name: 'Goals Inside Pen', value: 30 },
      ],
    },
  };


  return (
    <Container maxWidth="lg" sx={{ marginTop: '40px' }}>
      {/* Banner */}
      <TeamMatchupBanner team1={undefined} team2={undefined} />

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

export default MatchupPage;
