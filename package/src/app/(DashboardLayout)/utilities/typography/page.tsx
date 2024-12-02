'use client';

import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import { Bracket, IRoundProps, Seed, SeedItem, SeedTeam, IRenderSeedProps } from 'react-brackets';
import Flag from 'react-world-flags';
import { useTheme } from '@mui/material/styles';
import { Grid, Box, Card, Typography, Tabs, Tab, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Collapse, useMediaQuery, } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';


// Mock Data for Team Points (You can update this with real data)
const groupPoints = {
  'Group A': [
    { name: 'Netherlands', points: 7, qualified: true },
    { name: 'Senegal', points: 6, qualified: true },
    { name: 'Ecuador', points: 4, qualified: false },
    { name: 'Qatar', points: 0, qualified: false },
  ],
  'Group B': [
    { name: 'England', points: 7, qualified: true },
    { name: 'USA', points: 5, qualified: true },
    { name: 'Iran', points: 3, qualified: false },
    { name: 'Wales', points: 1, qualified: false },
  ],
  'Group C': [
    { name: 'Argentina', points: 6, qualified: true },
    { name: 'Poland', points: 4, qualified: true },
    { name: 'Mexico', points: 4, qualified: false },
    { name: 'Saudi Arabia', points: 3, qualified: false },
  ],
  'Group D': [
    { name: 'France', points: 6, qualified: true },
    { name: 'Australia', points: 6, qualified: true },
    { name: 'Tunisia', points: 4, qualified: false },
    { name: 'Denmark', points: 1, qualified: false },
  ],
  'Group E': [
    { name: 'Japan', points: 6, qualified: true },
    { name: 'Spain', points: 4, qualified: true },
    { name: 'Germany', points: 4, qualified: false },
    { name: 'Costa Rica', points: 3, qualified: false },
  ],
  'Group F': [
    { name: 'Morocco', points: 7, qualified: true },
    { name: 'Croatia', points: 5, qualified: true },
    { name: 'Belgium', points: 4, qualified: false },
    { name: 'Canada', points: 0, qualified: false },
  ],
  'Group G': [
    { name: 'Brazil', points: 6, qualified: true },
    { name: 'Switzerland', points: 6, qualified: true },
    { name: 'Cameroon', points: 4, qualified: false },
    { name: 'Serbia', points: 1, qualified: false },
  ],
  'Group H': [
    { name: 'Portugal', points: 6, qualified: true },
    { name: 'Korea', points: 4, qualified: true },
    { name: 'Uruguay', points: 4, qualified: false },
    { name: 'Ghana', points: 3, qualified: false },
  ],
  // Add remaining groups similarly...
};

// Expand icon styled with rotation when open
const ExpandMore = styled(IconButton)(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const MatchColumn = ({ rounds, onShowTimetable }: { rounds: IRoundProps[]; onShowTimetable: (matchId: number) => void }) => {
  const [openRound, setOpenRound] = useState<string | null>('Round of 16'); // Default open

  return (
    <Box sx={{ width: '100%', paddingLeft: 3 }}>
      {rounds.map((round) => (
        <Box key={round.title} sx={{ mb: 3 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer',
              p: 1,
              backgroundColor: '#e3e3e3',
              borderRadius: 1,
              '&:hover': { backgroundColor: '#d6d6d6' },
            }}
            onClick={() => setOpenRound(openRound === round.title ? null : round.title)}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                color: openRound === round.title ? 'primary.main' : 'text.primary',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {round.title}
            </Typography>
            <ExpandMore expand={openRound === round.title}>
              <ExpandMoreIcon />
            </ExpandMore>
          </Box>
          <Collapse in={openRound === round.title} timeout="auto" unmountOnExit>
            {round.seeds.map((seed) => (
              <Box
                key={seed.id}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  p: 1,
                  backgroundColor: '#f5f5f5',
                  borderRadius: 1,
                  mb: 1,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Flag code={seed.teams[0]?.countryCode || ''} style={{ width: 30, height: 20, marginRight: 8 }} />
                  <Typography variant="body1">{seed.teams[0]?.name || 'NO TEAM'}</Typography>
                  <Typography variant="body1" sx={{ mx: 1, fontWeight: 'bold' }}>
                    vs
                  </Typography>
                  <Flag code={seed.teams[1]?.countryCode || ''} style={{ width: 30, height: 20, marginRight: 8 }} />
                  <Typography variant="body1">{seed.teams[1]?.name || 'NO TEAM'}</Typography>
                </Box>
                <Button variant="contained" size="small" onClick={() => onShowTimetable(seed.id)}>
                  View
                </Button>
              </Box>
            ))}
          </Collapse>
        </Box>
      ))}
    </Box>
  );
};



const CustomSeed = ({ seed, onShowTimetable }: IRenderSeedProps & { onShowTimetable: () => void }) => (
  <Seed style={{ fontSize: 22 }}>
    <SeedItem
      sx={{
        cursor: 'pointer',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': { transform: 'scale(1.05)' },
      }}
      onClick={onShowTimetable}
    >
      <div>
        <SeedTeam>
          <Flag code={seed.teams[0]?.countryCode || ''} style={{ marginRight: 10, width: 30, height: 20 }} />
          {seed.teams[0]?.name || 'NO TEAM'}
        </SeedTeam>
        <SeedTeam>
          <Flag code={seed.teams[1]?.countryCode || ''} style={{ marginRight: 10, width: 30, height: 20 }} />
          {seed.teams[1]?.name || 'NO TEAM'}
        </SeedTeam>
      </div>
    </SeedItem>
  </Seed>
);

// Bracket Data for Qatar World Cup 2022
const rounds: IRoundProps[] = [
  {
    title: 'Round of 16',
    seeds: [
      { id: 1, date: '2022-12-09', teams: [{ name: 'Japan', countryCode: 'JP' }, { name: 'Croatia', countryCode: 'HR' }] },
      { id: 2, date: '2022-12-09', teams: [{ name: 'Brazil', countryCode: 'BR' }, { name: 'Korea', countryCode: 'KR' }] },
      { id: 3, date: '2022-12-09', teams: [{ name: 'Netherlands', countryCode: 'NL' }, { name: 'USA', countryCode: 'US' }] },
      { id: 4, date: '2022-12-09', teams: [{ name: 'Argentina', countryCode: 'AR' }, { name: 'Australia', countryCode: 'AU' }] },
      { id: 5, date: '2022-12-09', teams: [{ name: 'Morocco', countryCode: 'MA' }, { name: 'Spain', countryCode: 'ES' }] },
      { id: 6, date: '2022-12-09', teams: [{ name: 'Portugal', countryCode: 'PT' }, { name: 'Switzerland', countryCode: 'CH' }] },
      { id: 7, date: '2022-12-09', teams: [{ name: 'France', countryCode: 'NL' }, { name: 'Poland', countryCode: 'PL' }] },
      { id: 8, date: '2022-12-09', teams: [{ name: 'England', countryCode: 'AR' }, { name: 'Senegal', countryCode: 'SN' }] },
    ],
  },
  {
    title: 'Quarters',
    seeds: [
      { id: 1, date: '2022-12-09', teams: [{ name: 'Croatia', countryCode: 'HR' }, { name: 'Brazil', countryCode: 'BR' }] },
      { id: 2, date: '2022-12-09', teams: [{ name: 'Netherlands', countryCode: 'NL' }, { name: 'Argentina', countryCode: 'AR' }] },
      { id: 3, date: '2022-12-10', teams: [{ name: 'Morocco', countryCode: 'MA' }, { name: 'Portugal', countryCode: 'PT' }] },
      { id: 4, date: '2022-12-10', teams: [{ name: 'England', countryCode: 'GB' }, { name: 'France', countryCode: 'FR' }] },
    ],
  },
  {
    title: 'Semis',
    seeds: [
      { id: 5, date: '2022-12-13', teams: [{ name: 'Argentina', countryCode: 'AR' }, { name: 'Croatia', countryCode: 'HR' }] },
      { id: 6, date: '2022-12-14', teams: [{ name: 'France', countryCode: 'FR' }, { name: 'Morocco', countryCode: 'MA' }] },
    ],
  },
  {
    title: 'Final',
    seeds: [
      { id: 7, date: '2022-12-18', teams: [{ name: 'Argentina', countryCode: 'AR' }, { name: 'France', countryCode: 'FR' }] },
    ],
  },
];

const GroupCard = ({ groupName, teams, onShowTimetable, index }: { groupName: string; teams: any[]; onShowTimetable: (groupId: number) => void; index: number }) => (
  <Card sx={{ p: 2, mb: 2, backgroundColor: '#f5f5f5' }}>
    <Typography variant="h6" sx={{ textAlign: 'center', mb: 1, fontWeight: 'bold' }}>
      {groupName}
    </Typography>
    {teams.map((team) => (
      <Box key={team.name} sx={{ display: 'flex', justifyContent: 'space-between', p: 1, backgroundColor: team.qualified ? '#d4edda' : '#f8d7da', mb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Flag code={countryCodeMapping[team.name] || '??'} style={{ width: 30, height: 20, marginRight: 8 }} />
          <Typography>{team.name}</Typography>
        </Box>
        <Typography sx={{ fontWeight: 'bold' }}>{team.points} pts</Typography>
      </Box>
    ))}
    <Button variant="contained" color="primary" fullWidth onClick={() => onShowTimetable(index)}>
      Show Match Timetable
    </Button>
  </Card>
);

const countryCodeMapping: { [key: string]: string } = {
  Qatar: 'QA',
  Ecuador: 'EC',
  England: 'GB',
  Iran: 'IR',
  Senegal: 'SN',
  Netherlands: 'NL',
  'USA': 'US',
  Wales: 'GB',
  Argentina: 'AR',
  'Saudi Arabia': 'SA',
  Denmark: 'DK',
  Tunisia: 'TN',
  Mexico: 'MX',
  Poland: 'PL',
  France: 'FR',
  Australia: 'AU',
  Morocco: 'MA',
  Croatia: 'HR',
  Germany: 'DE',
  Japan: 'JP',
  Spain: 'ES',
  'Costa Rica': 'CR',
  Belgium: 'BE',
  Canada: 'CA',
  Switzerland: 'CH',
  Cameroon: 'CM',
  Uruguay: 'UY',
  'Korea Republic': 'KR',
  Portugal: 'PT',
  Ghana: 'GH',
  Brazil: 'BR',
  Serbia: 'RS',
};


const TypographyPage = () => {
  const theme = useTheme();
  const isLg = useMediaQuery(theme.breakpoints.up('lg'));
  const [tabIndex, setTabIndex] = useState(0);
  const [selectedMatchId, setSelectedMatchId] = useState<number | null>(null);

  return (
    <PageContainer title="Typography" description="2022 FIFA World Cup Bracket">
      <Tabs
        value={tabIndex}
        onChange={(e, newIndex) => setTabIndex(newIndex)}
        centered
        textColor="primary"
        indicatorColor="primary"
        sx={{ mb: 3 }}
      >
        <Tab label="Bracket" />
        <Tab label="Groups" />
      </Tabs>

      <Grid container spacing={3}>
        {/* Bracket Tab */}
        {tabIndex === 0 && isLg && (
          <>
            <Grid item xs={12} md={8}>
              <Box sx={{ transform: 'scale(0.8)', transformOrigin: 'top left', mb: 5 }}>
                <Bracket rounds={rounds} renderSeedComponent={CustomSeed} />
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <MatchColumn rounds={rounds} onShowTimetable={setSelectedMatchId} />
            </Grid>
          </>
        )}

        {/* Show only Collapsible Match List when not large screen */}
        {tabIndex === 0 && !isLg && (
          <Grid item xs={12}>
            <MatchColumn rounds={rounds} onShowTimetable={setSelectedMatchId} />
          </Grid>
        )}

        {/* Group Tab */}
        {tabIndex === 1 &&
          Object.entries(groupPoints).map(([groupName, teams], groupId) => (
            <Grid item xs={12} sm={6} md={3} key={groupName}>
              <GroupCard groupName={groupName} teams={teams} onShowTimetable={setSelectedMatchId} index={groupId} />
            </Grid>
          ))}
      </Grid>

      {selectedMatchId !== null && (
        <Box sx={{ mt: 4, p: 3, backgroundColor: '#e0e0e0', borderRadius: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Timetable for Match ID: {selectedMatchId}
          </Typography>
        </Box>
      )}
    </PageContainer>
  );
};

export default TypographyPage;