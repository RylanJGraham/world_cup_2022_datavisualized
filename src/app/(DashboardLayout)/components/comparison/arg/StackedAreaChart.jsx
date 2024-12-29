import * as React from 'react';
import { LineChart, lineElementClasses } from '@mui/x-charts/LineChart';
import { Box, Typography, Grid } from '@mui/material';

// Sample data for goals scored and conceded
const goalData = [
  { match: 'Saudi Arabia', scored: 1, conceded: 2 },
  { match: 'Mexico', scored: 2, conceded: 0 },
  { match: 'Poland', scored: 2, conceded: 0 },
  { match: 'Australia', scored: 2, conceded: 1 },
  { match: 'Netherlands', scored: 2, conceded: 2 },
  { match: 'Croatia', scored: 3, conceded: 0 },
  { match: 'France', scored: 3, conceded: 3 }
];

// Compute cumulative total goals
const cumulativeGoals = goalData.reduce((acc, { scored }, index) => {
  const cumulative = index === 0 ? scored : acc[index - 1].totalGoals + scored;
  acc.push({ match: goalData[index].match, totalGoals: cumulative, scored, conceded: goalData[index].conceded });
  return acc;
}, []);

// Data for plotting the chart
const xLabels = cumulativeGoals.map(item => item.match);
const totalGoals = cumulativeGoals.map(item => item.totalGoals);
const scoredGoals = cumulativeGoals.map(item => item.scored);
const concededGoals = cumulativeGoals.map(item => item.conceded);

export default function StackedAreaChart() {
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
        width: '90%',                // Make chart take up 60% of the width
        height: '400px',             // Fixed height for the chart
        margin: '0 auto',            // Center the chart horizontally
      }}
    >
      <LineChart
        width={700}
        height={400}
        series={[
          { data: concededGoals, label: 'Goals Conceded', area: true, baseline: 'min', stack: true },
          { data: scoredGoals, label: 'Goals Scored', area: true, baseline: 'min', stack: true },
          { data: totalGoals, label: 'Cumulative Goals', area: true, stack: true },
        ]}
        xAxis={[{ scaleType: 'point', data: xLabels }]}
        sx={{
          [`& .${lineElementClasses.root}`]: {
            display: 'none', // Hide marks on the line chart
          },
        }}
      />
    </Box>
  );
}