'use client';

import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import { Bracket, IRoundProps, Seed, SeedItem, SeedTeam, IRenderSeedProps } from 'react-brackets';
import Flag from 'react-world-flags';
import { Grid, Box, Card, Typography } from '@mui/material';

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
    { name: 'United States', points: 5, qualified: true },
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

// Custom Seed Component with Flags
const CustomSeed = ({ seed, breakpoint }: IRenderSeedProps) => {
  return (
    <Seed mobileBreakpoint={breakpoint} style={{ fontSize: 22 }}>
      <SeedItem>
        <div>
          <SeedTeam style={{ color: 'cyan' }}>
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
};

// Bracket Data for Qatar World Cup 2022
const rounds: IRoundProps[] = [
  {
    title: 'Round of 16',
    seeds: [
      { id: 1, date: '2022-12-09', teams: [{ name: 'Japan', countryCode: 'JP' }, { name: 'Croatia', countryCode: 'HR' }] },
      { id: 2, date: '2022-12-09', teams: [{ name: 'Brazil', countryCode: 'BR' }, { name: 'Korea', countryCode: 'KR' }] },
      { id: 3, date: '2022-12-09', teams: [{ name: 'Netherlands', countryCode: 'NL' }, { name: 'United States', countryCode: 'US' }] },
      { id: 4, date: '2022-12-09', teams: [{ name: 'Argentina', countryCode: 'AR' }, { name: 'Australia', countryCode: 'AU' }] },
      { id: 5, date: '2022-12-09', teams: [{ name: 'Japan', countryCode: 'JP' }, { name: 'Croatia', countryCode: 'HR' }] },
      { id: 6, date: '2022-12-09', teams: [{ name: 'Brazil', countryCode: 'BR' }, { name: 'Korea', countryCode: 'KR' }] },
      { id: 7, date: '2022-12-09', teams: [{ name: 'Netherlands', countryCode: 'NL' }, { name: 'United States', countryCode: 'US' }] },
      { id: 8, date: '2022-12-09', teams: [{ name: 'Argentina', countryCode: 'AR' }, { name: 'Australia', countryCode: 'AU' }] },
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

// GroupCard Component to Render Group Information with Points
const GroupCard = ({ groupName, teams }: { groupName: string; teams: { name: string; points: number; qualified: boolean }[] }) => (
  <Card sx={{ p: 2, mb: 2, backgroundColor: '#f5f5f5' }}>
    <Typography variant="h6" sx={{ textAlign: 'center', mb: 1, fontWeight: 'bold' }}>
      {groupName}
    </Typography>
    {teams.map((team) => (
      <Box
        key={team.name}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: team.qualified ? '#d4edda' : '#f8d7da', // Green for qualified, red for not
          borderRadius: 1,
          p: 1,
          mb: 1,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Flag code={countryCodeMapping[team.name] || '??'} style={{ width: 30, height: 20, marginRight: 8 }} />
          <Typography>{team.name}</Typography>
        </Box>
        <Typography sx={{ fontWeight: 'bold' }}>{team.points} pts</Typography>
      </Box>
    ))}
  </Card>
);

const countryCodeMapping: { [key: string]: string } = {
  Qatar: 'QA',
  Ecuador: 'EC',
  England: 'GB',
  Iran: 'IR',
  Senegal: 'SN',
  Netherlands: 'NL',
  'United States': 'US',
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
  return (
    <PageContainer title="Typography" description="2022 FIFA World Cup Bracket">
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
        {/* Group Section */}
        <Box sx={{ width: { xs: '100%', md: '35%' } }}>
          {Object.entries(groupPoints).map(([groupName, teams]) => (
            <GroupCard key={groupName} groupName={groupName} teams={teams} />
          ))}
        </Box>

        {/* Bracket Section */}
        <Box sx={{ width: { xs: '100%', md: '65%' }, overflowX: 'auto' }}>
          <Bracket rounds={rounds} renderSeedComponent={CustomSeed} mobileBreakpoint={768} />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default TypographyPage;
