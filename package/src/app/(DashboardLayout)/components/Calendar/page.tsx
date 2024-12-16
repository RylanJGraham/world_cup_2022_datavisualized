"use client";

import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab, useTheme } from '@mui/material';
import CountryFlag from '@/app/(DashboardLayout)/components/flags/FlagIcon'; // Adjust the import path if necessary

// Match data for Argentina's 2022 World Cup games
const matchData = {
  group: [
    {
      date: 'November 22, 2022',
      team1: 'Argentina',
      team2: 'Saudi Arabia',
      score: '1 - 2',
    },
    {
      date: 'November 26, 2022',
      team1: 'Argentina',
      team2: 'Mexico',
      score: '2 - 0',
    },
    {
      date: 'November 30, 2022',
      team1: 'Poland',
      team2: 'Argentina',
      score: '0 - 2',
    },
  ],
  roundOf16: [
    {
      date: 'December 3, 2022',
      team1: 'Argentina',
      team2: 'Australia',
      score: '2 - 1',
    },
  ],
  quarterfinals: [
    {
      date: 'December 9, 2022',
      team1: 'Netherlands',
      team2: 'Argentina',
      score: '2 - 2 (3-4 on penalties)',
    },
  ],
  semifinals: [
    {
      date: 'December 13, 2022',
      team1: 'Argentina',
      team2: 'Croatia',
      score: '3 - 0',
    },
  ],
  final: [
    {
      date: 'December 18, 2022',
      team1: 'Argentina',
      team2: 'France',
      score: '3 - 3 (4-2 on penalties)',
    },
  ],
};

const MatchCard: React.FC = () => {
  const theme = useTheme();
  const [selectedTab, setSelectedTab] = useState('group');

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={{ py: 4, px: 2, maxWidth: '800px', margin: '0 auto' }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4, textAlign: 'center' }}>
        Argentina's 2022 World Cup Matches
      </Typography>

      {/* Tabs for stages */}
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        centered
        indicatorColor="primary"
        textColor="primary"
        sx={{ mb: 4 }}
      >
        <Tab value="group" label="Group Stage" />
        <Tab value="roundOf16" label="Round of 16" />
        <Tab value="quarterfinals" label="Quarterfinals" />
        <Tab value="semifinals" label="Semifinals" />
        <Tab value="final" label="Final" />
      </Tabs>

      {/* Match Cards */}
      {matchData[selectedTab as keyof typeof matchData].map((match, index) => (
        <Box
          key={index}
          sx={{
            mb: 4,
            p: 2,
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: theme.shape.borderRadius,
            boxShadow: 1,
            backgroundColor: theme.palette.background.paper,
          }}
        >
          {/* Match Date */}
          <Typography
            variant="subtitle1"
            sx={{
              mb: 2,
              fontWeight: 'bold',
              color: theme.palette.text.secondary,
              textAlign: 'center',
            }}
          >
            {match.date}
          </Typography>

          {/* Teams and Score */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {/* Team 1 */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CountryFlag country={match.team1} size={40} />
              <Typography variant="body1" sx={{ ml: 2, fontWeight: 'bold' }}>
                {match.team1}
              </Typography>
            </Box>

            {/* Match Score */}
            <Typography
              variant="body1"
              sx={{
                fontWeight: 'bold',
                textAlign: 'center',
                color: theme.palette.primary.main,
              }}
            >
              {match.score}
            </Typography>

            {/* Team 2 */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body1" sx={{ mr: 2, fontWeight: 'bold' }}>
                {match.team2}
              </Typography>
              <CountryFlag country={match.team2} size={40} />
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default MatchCard;
