import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Box, Typography } from '@mui/material';

export default function AttackChannelsBarChart() {
  // Data for the bar chart
  const attackData = [
    { label: 'Left Channel', value: 136 },
    { label: 'Center', value: 53 },
    { label: 'Right Channel', value: 143 },
  ];

  // Extract labels and values
  const labels = attackData.map((data) => data.label);
  const values = attackData.map((data) => data.value);

  return (
    <Box
      sx={{
        border: '2px solid',        // Apply border
        borderColor: 'primary.main', // Use the primary color for the border
        borderRadius: '12px',        // Rounded corners for the border
        backgroundColor: 'white',    // White background for the chart
        padding: 2,                  // Padding around the chart
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.6)', // Drop shadow
        width: '35%',               // Full width
        maxWidth: '600px',           // Optional: limit maximum width
        margin: '0 auto',            // Center the chart horizontally
      }}
    >
      <Typography variant="h6" gutterBottom textAlign="center" sx={{color: 'primary.main'}}>
        Attacks by Channel
      </Typography>
      <Box
        sx={{
          width: '100%',
          height: '2px',
          backgroundColor: 'primary.main',
          marginBottom: '0px',
        }}
      />
      <BarChart
        width={400}
        height={325}
        xAxis={[{ scaleType: 'band', data: labels }]} // Labels for the X-axis
        series={[
          {
            data: values, // Values for the bars
            label: 'Attempts',
          },
        ]}
        sx={{
          '& .MuiSvgIcon-root': {
            fontSize: '48px', // Optional: Adjust icon size if needed
          },
        }}
      />
    </Box>
  );
}
