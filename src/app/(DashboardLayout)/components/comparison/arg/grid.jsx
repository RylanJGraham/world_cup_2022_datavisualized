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
import Image from 'next/image';

export default function ArgentinaGrid() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: '300px',
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 2
              }}
            >
              <Image
                src="/images/overview/overview_impact.jpeg"
                alt="image"
                layout="fill"
                objectFit="cover"
                priority
                style={{ borderRadius: '20px' }}
              />
            </Box>
              <Typography variant="body1" sx={{textAlign: 'center', fontWeight: 'bold', marginTop: '0px', marginBottom: '20px'}}>
              Welcome to the ultimate overview of Argentinas 2022 FIFA World Cup journey. This dashboard provides a comprehensive look at the teams overall performance, showcasing key statistics. With detailed insights into their every move on the field, you can track how Argentina performed across various metrics throughout the tournament. Dive into the data to get a clear picture of their World Cup campaign and how they stacked up on the global stage.
              </Typography>
              <Box sx={{ width: '100%', height: '2px', backgroundColor: 'primary.main', marginBottom: '10px' }} />
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
    </Box>
  );
}
