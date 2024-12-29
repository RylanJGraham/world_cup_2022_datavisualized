import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { desktopOS, valueFormatter } from './webUsageStats';

export default function FoulCardPieChart() {
  // Sample data for fouls, red cards, and yellow cards
  const data = [
    { id: 0, label: 'Red Cards', value: 0 },
    { id: 1, label: 'Fouls Commited', value: 100 },
    { id: 2, label: 'Yellow Cards', value: 16 },
  ];

  return (
    <Box
      sx={{
        border: '2px solid',        // Apply border
        borderColor: 'primary.main', // Use the primary color for the border
        borderRadius: '12px',        // Rounded corners for the border
        display: 'flex',             // Flexbox layout
        flexDirection: 'column',     // Align content vertically
        alignItems: 'center',        // Center content horizontally
        justifyContent: 'center',    // Center content vertically
        backgroundColor: 'white',    // White background for the chart
        padding: 2,                  // Padding around the chart
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.6)', // Drop shadow
        width: '100%',                // Make chart take up 60% of the width
        height: '200px',             // Fixed height for the chart
        margin: '0 auto',            // Center the chart horizontally
      }}
    >
      <Typography variant="h6" gutterBottom>
        Fouls, Red & Yellow Cards
      </Typography>
      
      {/* PieChart */}
      <PieChart
        series={[
          {
            data: data,
            highlightScope: { fade: 'global', highlight: 'item' },
            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
            valueFormatter,
          },
        ]}
        height={120}
        width={300}
      />
    </Box>
    );
  }
