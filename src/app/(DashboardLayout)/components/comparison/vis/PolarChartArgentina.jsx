'use client';

import React, { useState } from 'react';
import { Box, Typography, FormControlLabel, Checkbox, Popover,
  IconButton, } from '@mui/material';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import CountryFlag from '@/app/(DashboardLayout)/components/flags/FlagIcon';
import InfoIcon from '@mui/icons-material/Info'; // Import the Info icon

// Team data
const teamData = {
  Mexico: {
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
  },
  Netherlands: {
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
  },
  Poland: {
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
  },
  France: {
    metrics: [
      { name: 'Possession%', value: 46 },
      { name: 'Goals vs Attempts%', value: 14.29 },
      { name: 'Passes vs Attempts%', value: 83.95 },
      { name: 'Attacks Right%', value: 40 },
      { name: 'Attacks Center%', value: 17.78 },
      { name: 'Attacks Left%', value: 42.22 },
      { name: 'On Target Attempts%', value: 42.86 },
      { name: 'Goals Inside Pen%', value: 14.29 },
    ],
  },
  Australia: {
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
  },
  Croatia: {
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
  },
  SaudiArabia: {
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
  },
};

// Define colors for each team
const teamColors = {
  Mexico: '#56042C',
  Netherlands: '#FFBA2F',
  Poland: '#5899D4',
  France: '#217A70',
  Australia: '#F5B49D',
  Croatia: '#2C7759',
  SaudiArabia: '#75AE18',
};

const PolarChartArgentina = () => {
  const [selectedTeams, setSelectedTeams] = useState([]); // Track selected teams
  const [anchorEl, setAnchorEl] = useState(null); // State for the popover

  // Toggle team selection
  const toggleTeamSelection = (team) => {
    setSelectedTeams((prev) =>
      prev.includes(team) ? prev.filter((t) => t !== team) : [...prev, team]
    );
  };

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const isPopoverOpen = Boolean(anchorEl);

  // Custom Tooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          backgroundColor: 'white',
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '10px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: '8px' }}>
          {label} {/* Displays the metric name */}
        </Typography>
        {payload.map((entry) => (
          <Box
            key={entry.name}
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '4px',
            }}
          >
            <CountryFlag country={entry.name} size={16} /> {/* Flag */}
            <Typography
              variant="body2"
              sx={{
                marginLeft: '8px',
                color: teamColors[entry.name], // Team color
              }}
            >
              {entry.name}: {entry.value}%
            </Typography>
          </Box>
        ))}
      </Box>
    );
  }
  return null;
};

// Radar Chart Function
const renderRadarChart = () => {
  const radarData = [];
  const metricNames = teamData[Object.keys(teamData)[0]].metrics.map((m) => m.name);

  metricNames.forEach((metricName) => {
    const entry = { name: metricName };
    selectedTeams.forEach((team) => {
      const teamMetrics = teamData[team].metrics.find((m) => m.name === metricName);
      entry[team] = teamMetrics?.value || 0;
    });
    radarData.push(entry);
  });

  return (
    <Box
      sx={{
        border: '2px solid',        // Apply border
        borderColor: 'primary.main', // Use the primary color for the border
        borderRadius: '12px',        // Optional: rounded corners for the border
        width: '100%',               // Ensure the container takes up the full width
        height: '100%',              // Ensure the container takes up the full height
        display: 'flex-col', 
        backgroundColor: 'white', // Adjust opacity (0 to 1)         // Use flexbox to center the content
        justifyContent: 'center',    // Center the chart inside the box
        alignItems: 'center',
        padding: 2,
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.6)', // Drop shadow        // Center the chart vertically
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="name" />
          <PolarRadiusAxis 
            angle={30} 
            domain={[0, 100]} 
            tickFormatter={(value) => `${value}%`} // Add "%" to each tick
          />
          {selectedTeams.map((team) => (
            <Radar
              key={team}
              name={team}
              dataKey={team}
              stroke={teamColors[team]}
              fill={teamColors[team]}
              fillOpacity={0.4}
            />
          ))}
          <Tooltip content={<CustomTooltip />} /> {/* Use Custom Tooltip */}
        </RadarChart>
      </ResponsiveContainer>
    </Box>
  );
};

  return (
    <Box sx={{ width: '100%', marginTop: '0px' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '0px' }}>
        <Typography variant="h4" sx={{ textAlign: 'left' }}>
            Argentina&apos;s Possession vs Selected Teams
          </Typography>
          <IconButton
            onClick={handlePopoverOpen}
            sx={{ marginLeft: '8px', color: 'primary.main' }}
          >
            <InfoIcon />
          </IconButton>
            <Popover
              open={isPopoverOpen}
              anchorEl={anchorEl}
              onClose={handlePopoverClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
            
              <Box sx={{ padding: '16px', maxWidth: '300px', backgroundColor: 'primary.main' }}>
                <Typography variant="body1" sx={{color: 'white'}}>
                  This chart how Argentina performed against various teams in their tournament journey. Select teams to view Argentina's statistics against them. Hover, Click, & Learn More!
                </Typography>
              </Box>
            </Popover>
        </Box>
      <Box sx={{ width: '100%', height: '2px', backgroundColor: 'primary.main', marginBottom: '10px' }} />
      <Box
        sx={{
          width: '100%',
          height: '500px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          {renderRadarChart()}
        </ResponsiveContainer>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '16px', marginTop: '10px', alignItems: 'center',
              justifyContent: 'center', }}>
        {Object.keys(teamData).map((team) => (
          <Box
            key={team}
            onClick={() => toggleTeamSelection(team)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '10px 32px',
              borderRadius: '8px',
              cursor: 'pointer',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.6)',
              backgroundColor: selectedTeams.includes(team) ? teamColors[team] : '#FFFFFF',
              color: selectedTeams.includes(team) ? '#FFFFFF' : teamColors[team],
              border: `2px solid ${teamColors[team]}`,
              transition: 'background-color 0.3s, color 0.3s',
              '&:hover': {
                backgroundColor: selectedTeams.includes(team)
                  ? teamColors[team]
                  : `${teamColors[team]}33`, // Slight transparent hover effect
              },
            }}
          >
            <CountryFlag country={team} size={32} />
            <Typography variant="body1" sx={{ marginLeft: '8px', fontWeight: 'bold', dropShadow: 1 }}>
              {team}
            </Typography>
          </Box>
        ))}
      </Box>

      
    </Box>
  );
};

export default PolarChartArgentina;