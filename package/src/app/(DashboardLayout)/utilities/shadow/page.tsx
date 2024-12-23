'use client'

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
import { useRouter } from 'next/navigation';  // For client-side navigation
import Image from 'next/image';

const countryCodeMapping = {
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

const Teams = () => {
  interface Team {
    name: string;
    countryCode: string;
  }

  // Set `selectedTab` as a key of teams, allowing only valid keys ('all', 'quarters', 'semis', 'finals')
  const [selectedTab, setSelectedTab] = useState<keyof typeof teams>('all');
  const [teams, setTeams] = useState<{
    all: Team[];
    quarters: Team[];
    semis: Team[];
    finals: Team[];
  }>({
    all: [],
    quarters: [],
    semis: [],
    finals: [],
  });

  const normalizeTeamName = (name: string) => name.trim().toLowerCase();

  interface CSVRow {
    team1: string;
    team2: string;
    category: string;
  }

  const parseCSVData = async (csvPath: string) => {
    const response = await fetch(csvPath);
    const csvData = await response.text();

    const parsedTeams: {
      all: Team[];
      quarters: Team[];
      semis: Team[];
      finals: Team[];
    } = {
      all: [],
      quarters: [],
      semis: [],
      finals: [],
    };

    Papa.parse<CSVRow>(csvData, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        result.data.forEach((row) => {
          const team1 = normalizeTeamName(row.team1);
          const team2 = normalizeTeamName(row.team2);
          const category = row.category;

          const team1CountryCode = countryCodeMapping[
            Object.keys(countryCodeMapping).find((key) => normalizeTeamName(key) === team1) as keyof typeof countryCodeMapping
          ] || '??';
          const team2CountryCode = countryCodeMapping[
            Object.keys(countryCodeMapping).find((key) => normalizeTeamName(key) === team2) as keyof typeof countryCodeMapping
          ] || '??';

          switch (category) {
            case 'Group A':
            case 'Group B':
            case 'Group C':
            case 'Group D':
            case 'Group E':
            case 'Group F':
            case 'Group G':
            case 'Group H':
              parsedTeams.all.push({ name: row.team1, countryCode: team1CountryCode });
              parsedTeams.all.push({ name: row.team2, countryCode: team2CountryCode });
              break;
            case 'Quarter-final':
              parsedTeams.quarters.push({ name: row.team1, countryCode: team1CountryCode });
              parsedTeams.quarters.push({ name: row.team2, countryCode: team2CountryCode });
              break;
            case 'Semi-final':
              parsedTeams.semis.push({ name: row.team1, countryCode: team1CountryCode });
              parsedTeams.semis.push({ name: row.team2, countryCode: team2CountryCode });
              break;
            case 'Final':
              parsedTeams.finals.push({ name: row.team1, countryCode: team1CountryCode });
              parsedTeams.finals.push({ name: row.team2, countryCode: team2CountryCode });
              break;
            default:
              break;
          }
        });

        Object.keys(parsedTeams).forEach((round) => {
          parsedTeams[round as keyof typeof parsedTeams] = Array.from(
            new Map(parsedTeams[round as keyof typeof parsedTeams].map((team) => [team.name, team])).values()
          );
        });

        setTeams(parsedTeams);
      },
    });
  };

  useEffect(() => {
    parseCSVData('/data/Fifa_world_cup_matches.csv');
  }, []);

  const handleTabChange = (
    event: React.SyntheticEvent,
    newValue: keyof typeof teams
  ) => {
    setSelectedTab(newValue);
  };

  interface TeamCardProps {
    name: string;
    countryCode: string;
  }

  const TeamCard: React.FC<TeamCardProps> = ({ name, countryCode }) => {
    return (
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
      >
        <FlagIcon code={countryCode} style={{ width: '100px', height: 'auto', marginBottom: '10px' }} />
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography component="div" variant="h6">
            {name}
          </Typography>
        </CardContent>
      </Card>
    );
  };

  return (
    <PageContainer title="Shadow" description="Country Teams with Flags">
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '300px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 4
        }}
      >
        <Image
          src="/images/groups/banner_teams.jpg"
          alt="image"
          layout="fill"
          objectFit="cover"
          priority
          style={{ borderRadius: '20px' }}
        />
      </Box>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center', color: 'primary.main' }}>
        Meet the Teams
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, textAlign: 'center' }}>
        Discover the 32 teams that competed in Qatar, each with their unique stories, talents, and aspirations. From underdogs to powerhouses, this section showcases every squad that made the World Cup an unforgettable spectacle, with a special focus on the rivals Argentina faced on their journey to glory.
      </Typography>
      <Box sx={{ width: '100%', height: '2px', backgroundColor: 'primary.main', marginBottom: '10px' }} />
      <Box sx={{ p: 3 }}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          centered
          sx={{ paddingBottom: 3 }}
        >
          <Tab label="All" value="all" />
          <Tab label="Quarters" value="quarters" />
          <Tab label="Semis" value="semis" />
          <Tab label="Finals" value="finals" />
        </Tabs>
        <Grid container spacing={3}>
          {teams[selectedTab].map((team) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={team.name}>
              <TeamCard name={team.name} countryCode={team.countryCode} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Teams;
