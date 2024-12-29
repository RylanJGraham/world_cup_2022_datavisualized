'use client';

import React, { useState } from 'react';
import {
  ScatterChart,
  Scatter,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Box, Typography, Popover, IconButton } from '@mui/material';
import CountryFlag from '@/app/(DashboardLayout)/components/flags/FlagIcon'; // Ensure the flag component is correctly imported
import InfoIcon from '@mui/icons-material/Info'; // Import the Info icon

const teamData = {
  SaudiArabia: [
    { completed_passes: 529, total_passes: 610, stage: 'Group', opponentTeam: 'Saudi Arabia' },
  ],
  Mexico: [
    { completed_passes: 464, total_passes: 533, stage: 'Group', opponentTeam: 'Mexico' },
  ],
  Poland: [
    { completed_passes: 814, total_passes: 862, stage: 'Group', opponentTeam: 'Poland' },
  ],
  Australia: [
    { completed_passes: 635, total_passes: 711, stage: 'Round of 16', opponentTeam: 'Australia' },
  ],
  Netherlands: [
    { completed_passes: 511, total_passes: 603, stage: 'Quarter Final', opponentTeam: 'Netherlands' },
  ],
  Croatia: [
    { completed_passes: 344, total_passes: 551, stage: 'Semi Final', opponentTeam: 'Croatia' },
  ],
  France: [
    { completed_passes: 544, total_passes: 648, stage: 'Final', opponentTeam: 'France' },
  ],
};

// Define colors for each team
const teamColors = {
  SaudiArabia: '#75AE18',
  Mexico: '#56042C',
  Poland: '#5899D4',
  Australia: '#F5B49D',
  Netherlands: '#FFBA2F',
  Croatia: '#2C7759',
  France: '#217A70',
};

const ScatterChartArgentina = () => {
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

  // Combine data for selected teams or use all data if no team is selected
  const scatterData =
    selectedTeams.length > 0
      ? selectedTeams.flatMap((team) => teamData[team]?.map((data) => ({ ...data, team })) || [])
      : Object.keys(teamData).flatMap((team) =>
          teamData[team]?.map((data) => ({ ...data, team })) || []
        );

  // Custom Tooltip for showing stats and flags
  const CustomTooltipScatter = ({ payload }) => {
    if (!payload || payload.length === 0) return null;

    const data = payload[0].payload;

    return (
      <Box
        sx={{
          backgroundColor: 'primary.main',
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '10px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <CountryFlag country={data.opponentTeam} size={24} />
          <Typography variant="h6" sx={{ color: 'white', paddingLeft: '8px' }}>
            {data.opponentTeam}
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: 'white',
            height: '2px',
            width: '100%',
            marginTop: '4px',
          }}
        ></Box>
        <Typography variant="body2" sx={{ color: 'white' }}>
          Stage: {data.stage}
        </Typography>
        <Typography variant="body2" sx={{ color: 'white' }}>
          Completed Passes: {data.completed_passes}
        </Typography>
        <Typography variant="body2" sx={{ color: 'white' }}>
          Total Passes: {data.total_passes}
        </Typography>
      </Box>
    );
  };

  // Custom Dot Renderer with Flags
  const renderCustomDot = (props) => {
    const { cx, cy, payload } = props;
    if (!cx || !cy) return null;

    return (
      <foreignObject x={cx - 10} y={cy - 10} width="40" height="40">
        <Box sx={{ boxShadow: '0px 4px 12px rgba(0, 0, 0, 1.0)' }}>
          <CountryFlag country={payload.team} size={40} />
        </Box>
      </foreignObject>
    );
  };

  return (
    <Box sx={{ width: '100%', marginTop: '0px' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '0px' }}>
        <Typography variant="h4" sx={{ textAlign: 'left' }}>
          Argentina&apos;s Passing vs Opponents
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
            <Typography variant="body1" sx={{ color: 'white' }}>
              This chart shows how Argentina performed in their passing and completion against
              various teams in their tournament journey. Select teams to view Argentina's stats.
              Hover, Click, & Learn More!
            </Typography>
          </Box>
        </Popover>
      </Box>
      <Box
        sx={{
          width: '100%',
          height: '2px',
          backgroundColor: 'primary.main',
          marginBottom: '10px',
        }}
      />

      {/* Chart Container */}
      <Box
        sx={{
          width: '100%',
          height: '500px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            border: '2px solid',
            borderColor: 'primary.main',
            borderRadius: '12px',
            width: '100%',
            height: '100%',
            display: 'flex-col',
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 2,
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.6)',
          }}
        >
          <ResponsiveContainer width="100%" height={460}>
  <ScatterChart>
    <CartesianGrid />
    <XAxis
      type="number"
      dataKey="total_passes"
      name="Total Passes"
      tick={{ fontSize: 12 }}
      label={{
        value: 'Total Passes',
        position: 'insideBottom',
        offset: -4,
        style: { fontSize: '14px', fontWeight: 'bold' },
      }}
    />
    <YAxis
      type="number"
      dataKey="completed_passes"
      name="Completed Passes"
      tick={{ fontSize: 12 }}
      label={{
        value: 'Completed Passes',
        angle: -90,
        position: 'insideLeft',
        style: { fontSize: '14px', fontWeight: 'bold' },
      }}
    />
    <Tooltip content={<CustomTooltipScatter />} />
    {scatterData.length > 0 && (
      <Scatter
        name="Argentina"
        data={scatterData}
        fill="#8884d8"
        shape={renderCustomDot} // Custom dot renderer
      />
    )}
  </ScatterChart>
</ResponsiveContainer>
        </Box>
      </Box>

      {/* Team Selector */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          marginTop: '16px',
          justifyContent: 'center',
        }}
      >
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
                  : `${teamColors[team]}33`,
              },
            }}
          >
            <CountryFlag country={team} size={32} />
            <Typography variant="body1" sx={{ marginLeft: '8px', fontWeight: 'bold' }}>
              {team}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ScatterChartArgentina;
