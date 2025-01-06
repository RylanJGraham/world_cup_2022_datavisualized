import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { Box, Typography } from '@mui/material';

export default function FoulCardPieChart() {
  // Sample data for fouls, red cards, yellow cards, and offsides
  const data = [
    { id: 0, label: 'Red Cards', value: 0, color: '#7F1431' }, // Deep Maroon
    { id: 1, label: 'Fouls Commited', value: 100, color: '#008080' }, // Gold
    { id: 2, label: 'Yellow Cards', value: 16, color: '#49BEFF' }, // Bright Yellow
    { id: 3, label: 'Offsides', value: 14, color: '#FA896B' }, // Forest Green
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
        width: '60%',                // Make chart take up 60% of the width
        height: '400px',             // Fixed height for the chart
        margin: '0 auto',            // Center the chart horizontally
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
        Fouls, Red & Yellow Cards
      </Typography>
      <Box
        sx={{
          width: '100%',
          height: '2px',
          backgroundColor: 'primary.main',
          marginBottom: '0px',
        }}
      />

      {/* PieChart */}
      <PieChart
        series={[
          {
            data: data,
            highlightScope: { fade: 'global', highlight: 'item' },
            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
          },
        ]}
        height={300}
        width={700}
      />
    </Box>
  );
}
