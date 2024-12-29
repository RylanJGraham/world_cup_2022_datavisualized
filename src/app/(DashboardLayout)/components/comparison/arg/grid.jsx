import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import StackedAreaChart from '@/app/(DashboardLayout)/components/comparison/arg/StackedAreaChart';
import FoulCardPieChart from '@/app/(DashboardLayout)/components/comparison/arg/FoulCardPieChart'; // Import the PieChart component

export default function ArgentinaGrid() {
  return (
    <Box sx={{ padding: 2, display: 'flex', flexDirection: 'row', gap: 1 }}>
      {/* StackedAreaChart takes 70% of the width */}
      <Box sx={{ flex: 7, display: 'flex', flexDirection: 'column' }}>
        <StackedAreaChart />
      </Box>

      {/* FoulCardPieChart container takes 30% of the width */}
      <Box sx={{ flex: 3, display: 'flex', flexDirection: 'column', gap: 1 }}>
        <FoulCardPieChart />
        <FoulCardPieChart />
      </Box>
    </Box>
  );
}
