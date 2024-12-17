'use client';

import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab } from '@mui/material';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Label, ResponsiveContainer } from 'recharts';
import { FlagIcon } from 'react-flag-kit';

// Custom Tooltip for showing stats and flags
const CustomTooltip = ({ payload, label }: any) => {
    if (!payload || payload.length === 0) return null;
  
    const data = payload[0].payload;
    const opponentTeam = data.opponentTeam || '';
    const argentinaFlagCode: FlagIconCode = countryCodeMapping['Argentina'];
    const opponentFlagCode: FlagIconCode = countryCodeMapping[opponentTeam as keyof typeof countryCodeMapping];
  
  
    return (
      <div style={{ backgroundColor: '#fff', border: '1px solid #ddd', padding: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <FlagIcon code={argentinaFlagCode} style={{ width: '24px', height: '24px', marginRight: '5px' }} />
          <Typography variant="body2">VS</Typography>
          <FlagIcon code={opponentFlagCode} style={{ width: '24px', height: '24px', marginLeft: '5px' }} />
        </div>
        <Typography variant="body2">{label}</Typography>
        <Typography variant="body2">
          Argentina: {data.argentina}% Possession
        </Typography>
        <Typography variant="body2">
          {opponentTeam}: {data.opponent}% Possession
        </Typography>
      </div>
    );
  };

// Custom flag bar renderer for stacked bar chart
const FlagBarRenderer = ({ x, y, width, height, countryCode }: any) => {
    return (
      <foreignObject x={x} y={y} width={width} height={height}>
        <div
          style={{
            width: `${width}px`,
            height: `${height}px`,
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f0f0f0',
          }}
        >
          <FlagIcon code={countryCode} style={{ width: '100%', height: '100%' }} />
        </div>
      </foreignObject>
    );
  };

  
// Define country code mapping for flags (this is just an example, use actual mapping)
const countryCodeMapping = {
  'Argentina': 'AR',
  'Saudi Arabia': 'SA',
  'Mexico': 'MX',
  'Poland': 'PL',
  'Australia': 'AU',
  'Netherlands': 'NL',
  'Croatia': 'HR',
  'France': 'FR',
};

// The provided possession data
const possessionData = [
  { game: 'vs Saudi Arabia', argentina: 64, opponent: 24, opponentTeam: 'Saudi Arabia', stage: 'Group' },
  { game: 'vs Mexico', argentina: 50, opponent: 36, opponentTeam: 'Mexico', stage: 'Group' },
  { game: 'vs Poland', argentina: 67, opponent: 24, opponentTeam: 'Poland', stage: 'Group' },
  { game: 'vs Australia', argentina: 53, opponent: 35, opponentTeam: 'Australia', stage: 'Round of 16' },
  { game: 'vs Netherlands', argentina: 44, opponent: 45, opponentTeam: 'Netherlands', stage: 'Quarter Final' },
  { game: 'vs Croatia', argentina: 34, opponent: 54, opponentTeam: 'Croatia', stage: 'Semi Final' },
  { game: 'vs France', argentina: 46, opponent: 40, opponentTeam: 'France', stage: 'Final' },
];

const BarChartArgentina = () => {
  const [selectedStage, setSelectedStage] = useState('Group'); // Default to 'Group' stage

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setSelectedStage(newValue);
  };

  // Filter the data based on the selected stage
  const filteredPossessionData = possessionData.filter((data) => data.stage === selectedStage);

  return (
    <Box sx={{ width: '100%', marginTop: '40px' }}>
      <Typography variant="h4" sx={{ marginBottom: '8px', textAlign: 'left' }}>
        Argentina's Possession vs Opponents
      </Typography>
      <Box sx={{ width: '100%', height: '2px', backgroundColor: 'primary.main', marginBottom: '10px' }} />

      {/* Stage Tabs */}
      <Tabs
        value={selectedStage}
        onChange={handleTabChange}
        sx={{ marginBottom: '16px' }}
        variant="fullWidth"
        centered
      >
        <Tab label="Group" value="Group" />
        <Tab label="Round of 16" value="Round of 16" />
        <Tab label="Quarter Final" value="Quarter Final" />
        <Tab label="Semi Final" value="Semi Final" />
        <Tab label="Final" value="Final" />
      </Tabs>

      {/* Bar Chart */}
      <Box
        sx={{
          width: '100%',
          height: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart width={800} height={400} data={filteredPossessionData}>
            <CartesianGrid />
            <XAxis type="category" dataKey="game" name="Game">
              <Label
                value="Games"
                offset={0}
                position="insideBottom"
                style={{ fontSize: '1.0rem', fontWeight: 'bold', marginTop: '20px' }}
              />
            </XAxis>
            <YAxis type="number">
              <Label
                value="Possession (%)"
                angle={-90}
                position="insideLeft"
                style={{ fontSize: '1.0rem', fontWeight: 'bold' }}
              />
            </YAxis>
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="argentina"
              stackId="a"
              shape={(props) => <FlagBarRenderer {...props} countryCode={countryCodeMapping['Argentina']} />}
            />
            <Bar
              dataKey="opponent"
              stackId="a"
              shape={(props) => (
                <FlagBarRenderer {...props} countryCode={countryCodeMapping[props.payload.opponentTeam]} />
              )}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default BarChartArgentina;
