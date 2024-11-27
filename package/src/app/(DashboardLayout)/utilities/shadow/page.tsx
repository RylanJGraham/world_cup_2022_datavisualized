'use client';

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import { Tabs, Tab } from '@mui/material';
import Papa from 'papaparse';
import { FlagIcon } from 'react-flag-kit';

// Mapping team names to country codes (ISO 3166-1 alpha-2)
const countryCodeMapping: { [key: string]: string } = {
  Qatar: 'QA',
  Ecuador: 'EC',
  England: 'GB',
  Iran: 'IR',
  Senegal: 'SN',
  Netherlands: 'NL',
  'United States': 'US',
  Wales: 'GB-WLS',
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

const Shadow = () => {
  const [selectedTab, setSelectedTab] = useState(0); // State for handling the selected tab
  const [teams, setTeams] = useState({
    all: [] as { name: string; countryCode: string }[],
    quarters: [] as { name: string; countryCode: string }[],
    semis: [] as { name: string; countryCode: string }[],
    finals: [] as { name: string; countryCode: string }[],
  });

  const normalizeTeamName = (name: string) => name.trim().toLowerCase();

  const parseCSVData = async (csvPath: string) => {
    const response = await fetch(csvPath);
    const csvData = await response.text();

    const parsedTeams = {
      all: [] as { name: string; countryCode: string }[],
      quarters: [] as { name: string; countryCode: string }[],
      semis: [] as { name: string; countryCode: string }[],
      finals: [] as { name: string; countryCode: string }[],
    };

    Papa.parse(csvData, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        result.data.forEach((row: any) => {
          const team1 = normalizeTeamName(row['team1']);
          const team2 = normalizeTeamName(row['team2']);
          const category = row['category'];

          const team1CountryCode =
            countryCodeMapping[
              Object.keys(countryCodeMapping).find((key) => normalizeTeamName(key) === team1) || ''
            ] || '??';
          const team2CountryCode =
            countryCodeMapping[
              Object.keys(countryCodeMapping).find((key) => normalizeTeamName(key) === team2) || ''
            ] || '??';

          // Assign teams to their respective rounds
          switch (category) {
            case 'Group A':
            case 'Group B':
            case 'Group C':
            case 'Group D':
            case 'Group E':
            case 'Group F':
            case 'Group G':
            case 'Group H':
              parsedTeams.all.push({ name: row['team1'], countryCode: team1CountryCode });
              parsedTeams.all.push({ name: row['team2'], countryCode: team2CountryCode });
              break;
            case 'Quarter-final':
              parsedTeams.quarters.push({ name: row['team1'], countryCode: team1CountryCode });
              parsedTeams.quarters.push({ name: row['team2'], countryCode: team2CountryCode });
              break;
            case 'Semi-final':
              parsedTeams.semis.push({ name: row['team1'], countryCode: team1CountryCode });
              parsedTeams.semis.push({ name: row['team2'], countryCode: team2CountryCode });
              break;
            case 'Final':
              parsedTeams.finals.push({ name: row['team1'], countryCode: team1CountryCode });
              parsedTeams.finals.push({ name: row['team2'], countryCode: team2CountryCode });
              break;
            default:
              break;
          }
        });

        Object.keys(parsedTeams).forEach((round) => {
          parsedTeams[round] = Array.from(
            new Map(parsedTeams[round].map((team) => [team.name, team])).values()
          );
        });

        setTeams(parsedTeams);
      },
    });
  };

  useEffect(() => {
    parseCSVData('/data/Fifa_world_cup_matches.csv');
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const TeamCard = ({ name, countryCode }: { name: string; countryCode: string }) => (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 2,
        cursor: 'pointer',
        transition: 'transform 0.3s, background-color 0.3s',
        '&:hover': {
          transform: 'scale(1.05)',
          backgroundColor: 'primary.light',
        },
      }}
      onClick={() => alert(`More info about ${name}`)}
    >
      <FlagIcon code={countryCode} style={{ width: '100px', height: 'auto', marginBottom: '10px' }} />
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography component="div" variant="h6">
          {name}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <PageContainer title="Shadow" description="Country Teams with Flags">
      <Box sx={{ p: 3 }}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          centered
          sx={{ paddingBottom: 3 }} // Added padding at the bottom
        >
          <Tab label="All" />
          <Tab label="Quarters" />
          <Tab label="Semis" />
          <Tab label="Finals" />
        </Tabs>
        <Grid container spacing={3}>
          {teams[Object.keys(teams)[selectedTab]].map((team) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={team.name}>
              <TeamCard name={team.name} countryCode={team.countryCode} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Shadow;
