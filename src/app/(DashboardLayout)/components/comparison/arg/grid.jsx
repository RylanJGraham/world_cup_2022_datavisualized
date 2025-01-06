// ArgentinaGrid.js
import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import StackedAreaChart from '@/app/(DashboardLayout)/components/comparison/arg/StackedAreaChart';
import FoulCardPieChart from '@/app/(DashboardLayout)/components/comparison/arg/FoulCardPieChart';
import AttackChannelsBarChart from '@/app/(DashboardLayout)/components/comparison/arg/AttackChannelsBar';
import PassesProgressBar from '@/app/(DashboardLayout)/components/comparison/arg/PassesProgressBar';
import ShootingProgressBar from '@/app/(DashboardLayout)/components/comparison/arg/ShootingProgressBar';
import MultiPartProgressBar from '@/app/(DashboardLayout)/components/comparison/arg/MultiPartProgressBar';
import ArgentinaGoalScorers from  '@/app/(DashboardLayout)/components/comparison/arg/ArgentinaGoalScorers';  // Correct Import

export default function ArgentinaGrid() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, flexWrap: 'wrap', marginTop: '20px' }}>
      <StackedAreaChart />
      <AttackChannelsBarChart />
      <FoulCardPieChart />
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '35%', padding: 2, margin: '0 auto' }}>
        <Typography variant="h5" textAlign="center" sx={{ color: 'primary.main' }}>
          Offensive Breakdown 
        </Typography>
        <Box sx={{ width: '100%', height: '2px', backgroundColor: 'primary.main', marginBottom: '0px' }} />
        <Typography variant="h6" textAlign="left" sx={{ color: 'black', marginTop: '8px' }}>
          Passing Accuracy
        </Typography>
        <PassesProgressBar />
        <Typography variant="h6" textAlign="left" sx={{ color: 'black', marginTop: '12px' }}>
          Shooting Accuracy
        </Typography>
        <ShootingProgressBar />
        <Typography variant="h6" textAlign="left" sx={{ color: 'black', marginTop: '12px' }}>
          Set Pieces Breakdown
        </Typography>
        <MultiPartProgressBar />
      </Box>
      <ArgentinaGoalScorers />  {/* Correct Usage */}
    </Box>
  );
}
