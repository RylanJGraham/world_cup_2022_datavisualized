"use client"; // Ensures the code runs in a client-side environment in Next.js

import { Box, Tabs, Tab, Typography, Button, useTheme } from '@mui/material';
import { useState } from 'react';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import CountryFlag from '@/app/(DashboardLayout)/components/flags/FlagIcon';
import MatchupFranceArgentina from '@/app/(DashboardLayout)/layout/Matchups/FranceArgentina';
import MatchupCroatiaArgentina from '@/app/(DashboardLayout)/layout/Matchups/CroatiaArgentina';
import MatchupNetherlandsArgentina from '@/app/(DashboardLayout)/layout/Matchups/NetherlandsArgentina';
import MatchupAustraliaArgentina from '@/app/(DashboardLayout)/layout/Matchups/AustraliaArgentina';
import MatchupSaudiArgentina from '@/app/(DashboardLayout)/layout/Matchups/SaudiArgentina';
import MatchupMexicoArgentina from '@/app/(DashboardLayout)/layout/Matchups/MexicoArgentina';
import MatchupPolandArgentina from '@/app/(DashboardLayout)/layout/Matchups/PolandArgentina';
import Image from 'next/image';

// Define the types for the match data structure
interface Match {
  date: string;
  team1: string;
  team2: string;
  score: string;
}

// Match data for Argentina's 2022 World Cup games
const matchData: Record<string, Match[]> = {
  group: [
    { date: 'November 22, 2022', team1: 'Argentina', team2: 'SaudiArabia', score: '1 - 2' },
    { date: 'November 26, 2022', team1: 'Argentina', team2: 'Mexico', score: '2 - 0' },
    { date: 'November 30, 2022', team1: 'Poland', team2: 'Argentina', score: '0 - 2' },
  ],
  roundOf16: [
    { date: 'December 3, 2022', team1: 'Argentina', team2: 'Australia', score: '2 - 1' },
  ],
  quarterfinals: [
    { date: 'December 9, 2022', team1: 'Netherlands', team2: 'Argentina', score: '2 - 2 (3-4 on penalties)' },
  ],
  semifinals: [
    { date: 'December 13, 2022', team1: 'Argentina', team2: 'Croatia', score: '3 - 0' },
  ],
  final: [
    { date: 'December 18, 2022', team1: 'Argentina', team2: 'France', score: '3 - 3 (4-2 on penalties)' },
  ],
};

// Mapping of matches to their respective detailed components
const matchComponentMap: Record<string, any> = {
  'December 13, 2022-Argentina-Croatia': MatchupCroatiaArgentina,
  'December 18, 2022-Argentina-France': MatchupFranceArgentina,
  'December 9, 2022-Netherlands-Argentina': MatchupNetherlandsArgentina,
  'December 3, 2022-Argentina-Australia': MatchupAustraliaArgentina,
  'November 22, 2022-Argentina-SaudiArabia': MatchupSaudiArgentina,
  'November 26, 2022-Argentina-Mexico': MatchupMexicoArgentina,
  'November 30, 2022-Poland-Argentina': MatchupPolandArgentina,
};

const MatchCard = () => {
  const theme = useTheme();
  const [selectedTab, setSelectedTab] = useState(0); // For switching tabs
  const [expandedMatch, setExpandedMatch] = useState<string | null>(null);

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  // Handle match stats toggle
  const toggleMatchStats = (matchIdentifier: string) => {
    setExpandedMatch((prev) => (prev === matchIdentifier ? null : matchIdentifier));
  };

  const tabs = [
    { value: 0, label: 'Group Stage' },
    { value: 1, label: 'Round of 16' },
    { value: 2, label: 'Quarterfinals' },
    { value: 3, label: 'Semifinals' },
    { value: 4, label: 'Final' },
  ];

  return (
    <PageContainer title="Matches" description="2022 FIFA World Cup Matches">
      <Box>
        {/* Tabs Section */}
        <Box sx={{ width: '100%', mt: 4 }}>
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            centered
            textColor="primary"
            indicatorColor="primary"
          >
            {tabs.map((tab) => (
              <Tab key={tab.value} label={tab.label} />
            ))}
          </Tabs>

          {/* Tab Content */}
          <Box sx={{ mt: 3 }}>
            {matchData[Object.keys(matchData)[selectedTab]].map(({ date, team1, team2, score }, index) => {
              const matchIdentifier = `${date}-${team1}-${team2}`;
              const MatchComponent = matchComponentMap[matchIdentifier];

              return (
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
                    variant="h6"
                    sx={{
                      mb: 2,
                      fontWeight: 'bold',
                      color: theme.palette.text.secondary,
                      textAlign: 'center',
                    }}
                  >
                    {date}
                  </Typography>

                  {/* Teams and Score */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {/* Team 1 */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CountryFlag country={team1} size={40} />
                      <Typography variant="h4" sx={{ ml: 2, fontWeight: 'bold' }}>
                        {team1}
                      </Typography>
                    </Box>

                    {/* Match Score */}
                    <Typography
                      variant="h2"
                      sx={{
                        fontWeight: 'bold',
                        textAlign: 'center',
                        color: theme.palette.primary.main,
                      }}
                    >
                      {score}
                    </Typography>

                    {/* Team 2 */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="h4" sx={{ mr: 2, fontWeight: 'bold' }}>
                        {team2}
                      </Typography>
                      <CountryFlag country={team2} size={40} />
                    </Box>
                  </Box>

                  {/* View Stats Button */}
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2, width: '100%' }}
                    onClick={() => toggleMatchStats(matchIdentifier)}
                  >
                    {expandedMatch === matchIdentifier ? 'Hide Stats' : 'View Stats'}
                  </Button>

                  {/* Detailed Stats Component */}
                  {expandedMatch === matchIdentifier && MatchComponent && (
                    <Box sx={{ mt: 4 }}>
                      <MatchComponent />
                    </Box>
                  )}
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    </PageContainer>
  );
};

export default MatchCard;
