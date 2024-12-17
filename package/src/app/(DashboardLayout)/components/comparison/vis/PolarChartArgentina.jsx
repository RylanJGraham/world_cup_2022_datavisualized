'use client';

import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab } from '@mui/material';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import CountryFlag from '@/app/(DashboardLayout)/components/flags/FlagIcon';

// Define all team metrics
const PolarMexico = {
  metrics: [
    { name: 'Possession%', value: 50 },
        { name: 'Goals vs Attempts%', value: 40 },
        { name: 'Passes vs Attempts%', value: 87.5 },
        { name: 'Attacks Right%', value: 47.06 },
        { name: 'Attacks Center%', value: 5.88 },
        { name: 'Attacks Left%', value: 47.06 },
        { name: 'On Target Attempts%', value: 40 },
        { name: 'Goals Inside Pen%', value: 50 },
  ],
};

const PolarNetherlands = {
  metrics: [
    { name: 'Possession%', value: 44 },
    { name: 'Goals vs Attempts%', value: 13.33 },
    { name: 'Passes vs Attempts%', value: 84.74 },
    { name: 'Attacks Right%', value: 46 },
    { name: 'Attacks Center%', value: 26 },
    { name: 'Attacks Left%', value: 28 },
    { name: 'On Target Attempts%', value: 40 },
    { name: 'Goals Inside Pen%', value: 100 },
  ],
};

const PolarPoland = {
  metrics: [
    { name: 'Possession%', value: 67 },
    { name: 'Goals vs Attempts%', value: 8 },
    { name: 'Passes vs Attempts%', value: 94.43 },
    { name: 'Attacks Right%', value: 47.37 },
    { name: 'Attacks Center%', value: 9.21 },
    { name: 'Attacks Left%', value: 43.42 },
    { name: 'On Target Attempts%', value: 52 },
    { name: 'Goals Inside Pen%', value: 100 },
  ],
};

const PolarFrance = {
  metrics: [
    { name: 'Possession', value: 46 },
    { name: 'Goals v Attempts', value: 14.29 },
    { name: 'Passes v Attempts', value: 83.95 },
    { name: 'Pct of Attacks Right', value: 40 },
    { name: 'Pct of Attacks Center', value: 17.78 },
    { name: 'Pct of Attacks Left', value: 42.22 },
    { name: 'On Target Attempts', value: 42.86 },
    { name: 'Goals Inside Pen', value: 14.29 },
  ],
};

const PolarAustralia = {
  metrics: [
    { name: 'Possession%', value: 53 },
    { name: 'Goals vs Attempts%', value: 14.29 },
    { name: 'Passes vs Attempts%', value: 89.31 },
    { name: 'Attacks Right%', value: 37.25 },
    { name: 'Attacks Center%', value: 21.57 },
    { name: 'Attacks Left%', value: 41.18 },
    { name: 'On Target Attempts%', value: 35.71 },
    { name: 'Goals Inside Pen%', value: 100 },
  ],
};

const PolarCroatia = {
  metrics: [
    { name: 'Possession%', value: 34 },
    { name: 'Goals vs Attempts%', value: 30 },
    { name: 'Passes vs Attempts%', value: 84.31 },
    { name: 'Attacks Right%', value: 17.24 },
    { name: 'Attacks Center%', value: 24.14 },
    { name: 'Attacks Left%', value: 58.62 },
    { name: 'On Target Attempts%', value: 70 },
    { name: 'Goals Inside Pen%', value: 100 },
  ],
};

const PolarSaudiArabia = {
  metrics: [
    { name: 'Possession%', value: 64 },
    { name: 'Goals vs Attempts%', value: 7.14 },
    { name: 'Passes vs Attempts%', value: 86.72 },
    { name: 'Attacks Right%', value: 55.32 },
    { name: 'Attacks Center%', value: 10.64 },
    { name: 'Attacks Left%', value: 34.04 },
    { name: 'On Target Attempts%', value: 42.86 },
    { name: 'Goals Inside Pen%', value: 100 },
  ],
};

// List of all matchups
const matchups = ['Mexico', 'Netherlands', 'SaudiArabia', 'France', 'Poland', 'Australia', 'Croatia'];

const PolarChartArgentina = () => {
  const [selectedTab, setSelectedTab] = useState(0); // Default to first matchup (Argentina vs first opponent)

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  // Function to render the radar chart
  const renderRadarChart = () => {
    // Get the selected opponent's data
    let selectedMatchup = {};
    switch (matchups[selectedTab]) {
      case 'Mexico':
        selectedMatchup = PolarMexico;
        break;
      case 'Netherlands':
        selectedMatchup = PolarNetherlands;
        break;
      case 'Poland':
        selectedMatchup = PolarPoland;
        break;
      case 'France':
        selectedMatchup = PolarFrance;
        break;
      case 'Croatia':
        selectedMatchup = PolarCroatia;
        break;
      case 'Australia':
        selectedMatchup = PolarAustralia;
        break;
      case 'SaudiArabia':
        selectedMatchup = PolarSaudiArabia;
        break;
      default:
        break;
    }

    const metrics = selectedMatchup.metrics.map((metric) => ({
      name: metric.name,
      opponentValue: metric.value, // Only use opponent's value
    }));

    return (
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={metrics}>
        <PolarGrid />
        <PolarAngleAxis dataKey="name" />
        <PolarRadiusAxis angle={30} domain={[0, 100]} />
        <Radar
          name={matchups[selectedTab]}
          dataKey="opponentValue"
          stroke="#82ca9d"
          fill="#82ca9d"
          fillOpacity={0.4}
        />
        <Tooltip content={<CustomTooltip />} />
      </RadarChart>
    );
  };

  // Custom Tooltip for the radar chart (display opponent data)
  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || payload.length === 0) {
      return null;
    }

    const opponentData = payload.find((entry) => entry.name === matchups[selectedTab]);

    return (
      <Box
        sx={{
          background: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '8px',
          padding: '8px',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Typography variant="body1" sx={{ fontWeight: 'bold', marginBottom: '4px' }}>
          {label}
        </Typography>
        {/* Display opponent data */}
        {opponentData && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CountryFlag country={matchups[selectedTab]} size={16} />
            <Typography variant="body2">
              {matchups[selectedTab]}: {opponentData.value.toFixed(2)}%
            </Typography>
          </Box>
        )}
      </Box>
    );
  };

  return (
    <Box sx={{ width: '100%', marginTop: '40px' }}>
      <Typography variant="h4" sx={{ marginBottom: '8px', textAlign: 'left' }}>
        Argentina vs Opponents - Polar Chart
      </Typography>
      <Box sx={{ width: '100%', height: '2px', backgroundColor: 'primary.main', marginBottom: '10px' }} />

      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        sx={{ marginBottom: '16px' }}
        variant="fullWidth"
        centered
      >
        {matchups.map((matchup, index) => (
          <Tab
            key={index}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CountryFlag country={matchup} size={24} />
                <Typography variant="body1">{matchup}</Typography>
              </Box>
            }
          />
        ))}
      </Tabs>

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
          {renderRadarChart()}
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default PolarChartArgentina;
