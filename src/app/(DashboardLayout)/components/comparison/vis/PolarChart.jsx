'use client';

import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab } from '@mui/material';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import CountryFlag from '@/app/(DashboardLayout)/components/flags/FlagIcon';

const PolarChartComponent = ({ data }) => {
  const [selectedTab, setSelectedTab] = useState(2); // Default to "Compare" tab (index 2)

  const teamNames = Object.keys(data);
  const teamData = Object.values(data);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  // Custom Tooltip for the "Compare" tab (both teams)
  const CustomTooltipCompare = ({ active, payload, label }) => {
    if (!active || !payload || payload.length === 0) {
      return null;
    }

    const team1Data = payload.find((entry) => entry.name === teamNames[0]);
    const team2Data = payload.find((entry) => entry.name === teamNames[1]);

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
        {/* Display Team 1 data */}
        {team1Data && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <CountryFlag country={team1Data.payload.flag1} size={16} />
            <Typography variant="body2">
              {teamNames[0]}: {team1Data.value.toFixed(2)}%
            </Typography>
          </Box>
        )}
        {/* Display Team 2 data */}
        {team2Data && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CountryFlag country={team2Data.payload.flag2} size={16} />
            <Typography variant="body2">
              {teamNames[1]}: {team2Data.value.toFixed(2)}%
            </Typography>
          </Box>
        )}
      </Box>
    );
  };

  // Custom Tooltip for the individual team tabs (one team)
  const CustomTooltipTeam = ({ active, payload, label }) => {
    if (!active || !payload || payload.length === 0) {
      return null;
    }

    const teamData = payload[0]; // Since we only have one team in the individual tab

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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CountryFlag country={teamData.payload.flag} size={16} />
          <Typography variant="body2">
            {teamNames[selectedTab]}: {teamData.value.toFixed(2)}%
          </Typography>
        </Box>
      </Box>
    );
  };

  const renderRadarChart = () => {
    const metrics = teamData[0]?.metrics.map((metric) => ({
      name: metric.name,
      team1Value: metric.value,
      team2Value: teamData[1]?.metrics.find((m) => m.name === metric.name)?.value || 0,
      flag1: teamNames[0], // Flag for team 1
      flag2: teamNames[1], // Flag for team 2
    })) || [];

    if (selectedTab === 2) {
      // "Compare" tab: Multi-radar chart with Team 1 and Team 2
      return (
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={metrics}>
          <PolarGrid />
          <PolarAngleAxis dataKey="name" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          <Radar
            name={teamNames[0]}
            dataKey="team1Value"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.4}
          />
          <Radar
            name={teamNames[1]}
            dataKey="team2Value"
            stroke="#82ca9d"
            fill="#82ca9d"
            fillOpacity={0.4}
          />
          <Tooltip content={<CustomTooltipCompare />} />
        </RadarChart>
      );
    }

    // Individual team tabs
    const teamIndex = selectedTab;
    const singleTeamMetrics = metrics.map((metric) => ({
      name: metric.name,
      value: metric[teamIndex === 0 ? 'team1Value' : 'team2Value'],
      flag: teamNames[teamIndex], // Flag for selected team
    }));

    const color = selectedTab === 0 ? '#8884d8' : '#82ca9d';
    return (
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={singleTeamMetrics}>
        <PolarGrid />
        <PolarAngleAxis dataKey="name" />
        <PolarRadiusAxis angle={30} domain={[0, 100]} />
        <Radar
          name={teamNames[teamIndex]}
          dataKey="value"
          stroke={color}
          fill={color}
          fillOpacity={0.4}
        />
        <Tooltip content={<CustomTooltipTeam />} />
      </RadarChart>
    );
  };

  return (
    <Box sx={{ width: '100%', marginTop: '40px' }}>
      <Typography variant="h4" sx={{ marginBottom: '8px', textAlign: 'left' }}>
        Team Comparison - Polar Chart
      </Typography>
      <Box sx={{ width: '100%', height: '2px', backgroundColor: 'primary.main', marginBottom: '10px' }} />

      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        sx={{ marginBottom: '16px' }}
        variant="fullWidth"
        centered
      >
        {teamNames.map((team, index) => (
          <Tab
            key={index}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CountryFlag country={team} size={24} />
                <Typography variant="body1">{team}</Typography>
              </Box>
            }
          />
        ))}
        <Tab
          label={
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              Compare
            </Typography>
          }
        />
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

export default PolarChartComponent;
