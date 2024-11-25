'use client';

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import { Tabs, Tab } from '@mui/material';
import Flag from 'react-world-flags';
import Papa from 'papaparse';

// Define a type for the team objects
type Team = {
  name: string;
  countryCode: string;
};

// Constants for Teams
const TeamCard = ({ name, countryCode }: { name: string; countryCode: string }) => (
  <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
    <CardMedia
      component="img"
      sx={{ width: '100%', height: 120, objectFit: 'contain', mb: 2 }}
      image={`https://flagcdn.com/w320/${countryCode.toLowerCase()}.png`}
      alt={`${name} flag`}
    />
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

const Shadow = () => {
  const [selectedTab, setSelectedTab] = useState(0); // State for handling the selected tab
  const [teams, setTeams] = useState<{ all: Team[]; quarters: Team[]; semis: Team[]; finals: Team[] }>({
    all: [],
    quarters: [],
    semis: [],
    finals: [],
  }); // State to store parsed team data from CSV

  // Function to parse CSV and structure the data
  const parseCSVData = (csvData: string) => {
    Papa.parse(csvData, {
      complete: (result) => {
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

        // Log the structure of result.data to debug
        console.log('Parsed CSV Data:', result.data); // This will help us understand the structure of the parsed CSV

        // Check if headers exist and are valid
        if (result.data && result.data.length > 0) {
          const headers = result.data[0]; // Get the first row for headers
          console.log('Headers:', headers); // Log headers to confirm they are correct

          let categoryIndex = -1;
          let team1Index = -1;
          let team2Index = -1;

          // Dynamically find the indexes for category, team1, and team2
          headers.forEach((header: string, index: number) => {
            if (header.toLowerCase().includes('category')) {
              categoryIndex = index;
            }
            if (header.toLowerCase().includes('team1')) {
              team1Index = index;
            }
            if (header.toLowerCase().includes('team2')) {
              team2Index = index;
            }
          });

          // Log to check if the correct columns were identified
          console.log(`Category Column Index: ${categoryIndex}`);
          console.log(`Team1 Column Index: ${team1Index}`);
          console.log(`Team2 Column Index: ${team2Index}`);

          // Now, loop through the data (skipping header row) and categorize teams
          result.data.slice(1).forEach((row: any, index: number) => {
            const team1 = row[team1Index]; // team1 (Column identified dynamically)
            const team2 = row[team2Index]; // team2 (Column identified dynamically)
            const category = row[categoryIndex]; // category (Column identified dynamically)

            if (category && team1 && team2) {
              const team1Obj = { name: team1, countryCode: team1.toLowerCase() };
              const team2Obj = { name: team2, countryCode: team2.toLowerCase() };

              // Assign teams based on category
              if (category.includes('Group')) {
                parsedTeams.all.push(team1Obj);
                parsedTeams.all.push(team2Obj);
              } else if (category.includes('Round of 16') || category.includes('16')) {
                parsedTeams.quarters.push(team1Obj);
                parsedTeams.quarters.push(team2Obj);
              } else if (category.includes('Quarter-final')) {
                parsedTeams.quarters.push(team1Obj);
                parsedTeams.quarters.push(team2Obj);
              } else if (category.includes('Semi-final')) {
                parsedTeams.semis.push(team1Obj);
                parsedTeams.semis.push(team2Obj);
              } else if (category.includes('Play-off for third place')) {
                parsedTeams.quarters.push(team1Obj);
                parsedTeams.quarters.push(team2Obj);
              } else if (category.includes('Final')) {
                parsedTeams.finals.push(team1Obj);
                parsedTeams.finals.push(team2Obj);
              }
            }
          });

          // Remove duplicates in the 'all' category (if any)
          parsedTeams.all = Array.from(new Set(parsedTeams.all.map(a => a.name)))
            .map(name => parsedTeams.all.find(a => a.name === name))
            .filter(Boolean) as Team[]; // Ensure only valid teams

          console.log('Parsed Teams:', parsedTeams); // Log the parsed teams to check the data
          setTeams(parsedTeams);
        } else {
          console.error('No valid data found in CSV.');
        }
      },
      header: true, // Ensure the first row is treated as headers
    });
  };

  // Fetch and parse the CSV data from the public/data folder
  useEffect(() => {
    fetch('/data/Fifa_world_cup_matches.csv')  // Path to the CSV file in the public folder
      .then((response) => response.text()) // Fetch the CSV file as text
      .then((csvText) => parseCSVData(csvText)) // Parse the CSV data
      .catch((error) => console.error('Error fetching CSV:', error));
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  // Ensure proper indexing by asserting the correct keys for the teams object
  const filteredTeams = selectedTab === 0 
    ? teams.all 
    : teams[Object.keys(teams)[selectedTab] as keyof typeof teams] || [];

  return (
    <PageContainer title="Shadow" description="Country Teams with Flags">
      <Box sx={{ p: 3 }}>
        {/* Tab System */}
        <Tabs value={selectedTab} onChange={handleTabChange} aria-label="rounds tab" centered sx={{ paddingBottom: 2 }}>
          <Tab label="All" />
          <Tab label="Quarters" />
          <Tab label="Semis" />
          <Tab label="Finals" />
        </Tabs>

        {/* Display Teams Based on Selected Tab */}
        <Grid container spacing={3}>
          {filteredTeams.length > 0 ? (
            filteredTeams.map((team: Team, index: number) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <TeamCard name={team.name} countryCode={team.countryCode} />
              </Grid>
            ))
          ) : (
            <Typography variant="h6">No teams available for the selected category.</Typography>
          )}
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Shadow;
