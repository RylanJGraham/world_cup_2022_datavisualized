'use client';

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import { Tabs, Tab } from '@mui/material';
import Papa from 'papaparse'; // Ensure you have papaparse installed
import { FlagIcon } from 'react-flag-kit'; // Using react-flag-kit for flags

// Mapping team names to country codes (ISO 3166-1 alpha-2)
const countryCodeMapping = {
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

// Main Component
const Shadow = () => {
  const [selectedTab, setSelectedTab] = useState(0); // State for handling the selected tab
  const [teams, setTeams] = useState({
    all: [] as { name: string; countryCode: string }[],
    quarters: [] as { name: string; countryCode: string }[],
    semis: [] as { name: string; countryCode: string }[],
    finals: [] as { name: string; countryCode: string }[],
  });

  // Function to parse the CSV data
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
          const team1 = row['team1'];
          const team2 = row['team2'];
          const category = row['category'];

          // Map teams to their country codes
          const team1CountryCode = countryCodeMapping[team1] || 'US'; // Default to 'US' if not found
          const team2CountryCode = countryCodeMapping[team2] || 'US'; // Default to 'US' if not found

          console.log(`Mapping ${team1} to ${team1CountryCode}`);
          console.log(`Mapping ${team2} to ${team2CountryCode}`);

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
              parsedTeams.all.push({ name: team1, countryCode: team1CountryCode });
              parsedTeams.all.push({ name: team2, countryCode: team2CountryCode });
              break;
            case 'Quarter-final':
              parsedTeams.quarters.push({ name: team1, countryCode: team1CountryCode });
              parsedTeams.quarters.push({ name: team2, countryCode: team2CountryCode });
              break;
            case 'Semi-final':
              parsedTeams.semis.push({ name: team1, countryCode: team1CountryCode });
              parsedTeams.semis.push({ name: team2, countryCode: team2CountryCode });
              break;
            case 'Final':
              parsedTeams.finals.push({ name: team1, countryCode: team1CountryCode });
              parsedTeams.finals.push({ name: team2, countryCode: team2CountryCode });
              break;
            default:
              break;
          }
        });

        // Remove duplicates by team name
        Object.keys(parsedTeams).forEach((round) => {
          parsedTeams[round] = Array.from(
            new Map(parsedTeams[round].map((team: { name: string; countryCode: string }) => [team.name, team])).values()
          );
        });

        setTeams(parsedTeams); // Update state with the parsed teams
      },
    });
  };

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  useEffect(() => {
    // Fetch and parse the CSV data when the component mounts
    parseCSVData('/data/Fifa_world_cup_matches.csv'); // Adjust the path if necessary
  }, []);

  // Team card component for rendering each team with flag and name
  const TeamCard = ({ name, countryCode }: { name: string; countryCode: string }) => (
    <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
      {/* Debugging: Check the country code */}
      <div>{countryCode}</div>

      {/* Flag rendering with react-flag-kit */}
      <FlagIcon code={countryCode} style={{ width: '100px', height: 'auto', marginBottom: '10px' }} />
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography component="div" variant="h6">
          {name}
        </Typography>
      </CardContent>
      <Button variant="contained" color="primary">
        More Info
      </Button>
    </Card>
  );

  return (
    <PageContainer title="Shadow" description="Country Teams with Flags">
      <Box sx={{ p: 3 }}>
        {/* Tab System */}
        <Tabs value={selectedTab} onChange={handleTabChange} aria-label="rounds tab" centered>
          <Tab label="All" />
          <Tab label="Quarters" />
          <Tab label="Semis" />
          <Tab label="Finals" />
        </Tabs>

        {/* Display Teams Based on Selected Tab */}
        <Grid container spacing={3}>
          {teams[Object.keys(teams)[selectedTab]].map((team) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={team.countryCode}>
              <TeamCard name={team.name} countryCode={team.countryCode} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Shadow;
