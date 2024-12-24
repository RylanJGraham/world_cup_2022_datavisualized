'use client'; // Ensures this is a client-side component

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import { Tabs, Tab } from '@mui/material';
import Papa from 'papaparse';
import Image from 'next/image';
import CountryFlag from '@/app/(DashboardLayout)/components/flags/FlagIcon'; // Import your custom flag component

const Teams = () => {
  interface Team {
    name: string;
  }

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

  const capitalizeFirstLetter = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  const normalizeTeamName = (name: string) => {
    return capitalizeFirstLetter(name.trim());
  };

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

          switch (category) {
            case 'Group A':
            case 'Group B':
            case 'Group C':
            case 'Group D':
            case 'Group E':
            case 'Group F':
            case 'Group G':
            case 'Group H':
              parsedTeams.all.push({ name: team1 });
              parsedTeams.all.push({ name: team2 });
              break;
            case 'Quarter-final':
              parsedTeams.quarters.push({ name: team1 });
              parsedTeams.quarters.push({ name: team2 });
              break;
            case 'Semi-final':
              parsedTeams.semis.push({ name: team1 });
              parsedTeams.semis.push({ name: team2 });
              break;
            case 'Final':
              parsedTeams.finals.push({ name: team1 });
              parsedTeams.finals.push({ name: team2 });
              break;
            default:
              break;
          }
        });

        // Deduplicate teams within each round
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
  }

  const TeamCard: React.FC<TeamCardProps> = ({ name }) => {
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
        <CountryFlag country={name} size={60} /> {/* Pass team name directly to CountryFlag */}
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
              <TeamCard name={team.name} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Teams;
