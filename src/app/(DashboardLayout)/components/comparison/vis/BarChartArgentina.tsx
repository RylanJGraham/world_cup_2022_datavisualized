import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab } from '@mui/material';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Label, ResponsiveContainer } from 'recharts';
import { FlagIcon } from 'react-flag-kit';

// Define country code mapping for flags
const countryCodeMapping = {
  Argentina: 'AR',
  'Saudi Arabia': 'SA',
  Mexico: 'MX',
  Poland: 'PL',
  Australia: 'AU',
  Netherlands: 'NL',
  Croatia: 'HR',
  France: 'FR',
} as const; // `as const` ensures that the object is treated as having literal types for keys and values

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
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedStage(newValue);
  };

  // Filter the data based on the selected stage
  const filteredPossessionData = possessionData.filter((data) => data.stage === selectedStage);

  return (
    <Box sx={{ width: '100%', marginTop: '40px' }}>
      <Typography variant="h4" sx={{ marginBottom: '8px', textAlign: 'left' }}>
        Argentina&apos;s Possession vs Opponents
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
            <Tooltip />
            
            {/* Argentina Bar */}
            <Bar
              dataKey="argentina"
              stackId="a"
              fill="#4CAF50" // Green color for Argentina
            >
              {
                filteredPossessionData.map((entry, index) => (
                  <Label
                    key={index}
                    position="top"
                    style={{ 
                      fontSize: '12px', 
                      fontWeight: 'bold', 
                      textAlign: 'center', 
                      color: 'white' 
                    }}
                  >
                    {entry.game}
                    <br />
                    <FlagIcon 
                      code={countryCodeMapping['Argentina']} 
                      style={{ width: '20px', height: '20px', margin: '5px 0' }} 
                    />
                    <div>{entry.argentina}%</div>
                  </Label>
                ))
              }
            </Bar>

            {/* Opponent Bar */}
            <Bar
              dataKey="opponent"
              stackId="a"
              fill="#FF5722" // Red color for opponents
            >
              {
                filteredPossessionData.map((entry, index) => (
                  <Label
                    key={index}
                    position="top"
                    style={{ 
                      fontSize: '12px', 
                      fontWeight: 'bold', 
                      textAlign: 'center', 
                      color: 'white' 
                    }}
                  >
                    {entry.game}
                    <br />
                    <FlagIcon 
                      // Type assertion: Ensure the `entry.opponentTeam` is a valid key in `countryCodeMapping`
                      code={countryCodeMapping[entry.opponentTeam as keyof typeof countryCodeMapping]} 
                      style={{ width: '20px', height: '20px', margin: '5px 0' }} 
                    />
                    <div>{entry.opponent}%</div>
                  </Label>
                ))
              }
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default BarChartArgentina;
