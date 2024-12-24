

import React, { useState } from 'react';
import { ScatterChart, Scatter, CartesianGrid, XAxis, YAxis, Tooltip, Label } from 'recharts';
import { Box, Tab, Tabs, Typography } from '@mui/material';


const ScatterChartArgentina = () => {
  // Sample data for passes and possession, with stages added
  const argentinaPassesData = [
    { game: 'ARGENTINA vs SAUDI ARABIA', completed_passes: 529, total_passes: 610, stage: 'Group', opponentTeam: 'Saudi Arabia' },
    { game: 'ARGENTINA vs MEXICO', completed_passes: 464, total_passes: 533, stage: 'Group', opponentTeam: 'Mexico' },
    { game: 'POLAND vs ARGENTINA', completed_passes: 814, total_passes: 862, stage: 'Group', opponentTeam: 'Poland' },
    { game: 'ARGENTINA vs AUSTRALIA', completed_passes: 635, total_passes: 711, stage: 'Round of 16', opponentTeam: 'Australia' },
    { game: 'NETHERLANDS vs ARGENTINA', completed_passes: 511, total_passes: 603, stage: 'Quarter Final', opponentTeam: 'Netherlands' },
    { game: 'CROATIA vs ARGENTINA', completed_passes: 344, total_passes: 551, stage: 'Semi Final', opponentTeam: 'Croatia' },
    { game: 'FRANCE vs ARGENTINA', completed_passes: 544, total_passes: 648, stage: 'Final', opponentTeam: 'France' },
  ];

  // Custom Tooltip for showing stats and flags
const CustomTooltipScatter = ({ payload, label }) => {
    if (!payload || payload.length === 0) return null;
  
    const data = payload[0].payload;
  
    return (
      <div className="custom-tooltip">
        <h4>{data.game}</h4>
        <p>Opponent: {data.opponentTeam}</p>
        <p>Stage: {data.stage}</p>
        <p>Completed Passes: {data.completed_passes}</p>
        <p>Total Passes: {data.total_passes}</p>
      </div>
    );
  };

  const stages = ['All', 'Group', 'Round of 16', 'Quarter Final', 'Semi Final', 'Final'];
  const [tabValue, setTabValue] = useState(0); // Tab value to filter by stage

  // Filter the passes data based on the selected stage
  const filteredData = tabValue === 0
    ? argentinaPassesData
    : argentinaPassesData.filter((item) => item.stage === stages[tabValue]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', marginTop: '40px' }}>
        <Typography variant="h4" sx={{ marginBottom: '8px', textAlign: 'left' }}>
        Argentina vs Opponents - Polar Chart
      </Typography>
      <Box sx={{ width: '100%', height: '2px', backgroundColor: 'primary.main', marginBottom: '10px' }} />
      {/* Tab bar to select the stage */}
      <Tabs value={tabValue} onChange={handleTabChange} centered>
        {stages.map((stage, index) => (
          <Tab key={index} label={stage} />
        ))}
      </Tabs>

      {/* Chart Title */}
      <Typography variant="h5" align="center" sx={{ marginTop: '20px' }}>
        Pass Total vs Completions
      </Typography>

      {/* Scatter Chart */}
      <ScatterChart width={800} height={400}>
        <CartesianGrid />
        <XAxis type="number" dataKey="total_passes" name="Total Passes">
          <Label value="Total Passes" offset={0} position="insideBottom" style={{ fontSize: '1rem', fontWeight: 'bold' }} />
        </XAxis>
        <YAxis type="number" dataKey="completed_passes" name="Completed Passes">
          <Label value="Completed Passes" angle={-90} position="insideLeft" style={{ fontSize: '1rem', fontWeight: 'bold' }} />
        </YAxis>
        <Tooltip content={<CustomTooltipScatter />} />
        <Scatter name="Argentina" data={filteredData} fill="#82ca9d" />
      </ScatterChart>
    </Box>
  );
};

export default ScatterChartArgentina;
