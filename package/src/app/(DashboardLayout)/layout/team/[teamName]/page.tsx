'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Box, Typography, Container, Tab, Tabs, List, ListItem, ListItemText, ListItemIcon, ListItemButton } from '@mui/material';
import { FlagIcon } from 'react-flag-kit';
import { SportsSoccer, Flag as FlagIconMUI } from '@mui/icons-material'; // Import Material-UI Icons
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
} from 'recharts';

// Mapping team names to country codes (ISO 3166-1 alpha-2)
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

// Sample data for passes and possession, with stages added
const argentinaPassesData = [
  { game: 'ARGENTINA vs SAUDI ARABIA', completed_passes: 529, total_passes: 610, stage: 'Group' },
  { game: 'ARGENTINA vs MEXICO', completed_passes: 464, total_passes: 533, stage: 'Group' },
  { game: 'POLAND vs ARGENTINA', completed_passes: 814, total_passes: 862, stage: 'Group' },
  { game: 'ARGENTINA vs AUSTRALIA', completed_passes: 635, total_passes: 711, stage: 'Round of 16' },
  { game: 'NETHERLANDS vs ARGENTINA', completed_passes: 511, total_passes: 603, stage: 'Quarter Final' },
];

const possessionData = [
  { game: 'ARGENTINA vs SAUDI ARABIA', argentina: 70, opponent: 30, opponentTeam: 'Saudi Arabia', stage: 'Group' },
  { game: 'ARGENTINA vs MEXICO', argentina: 65, opponent: 35, opponentTeam: 'Mexico', stage: 'Group' },
  { game: 'POLAND vs ARGENTINA', argentina: 74, opponent: 26, opponentTeam: 'Poland', stage: 'Group' },
  { game: 'ARGENTINA vs AUSTRALIA', argentina: 61, opponent: 39, opponentTeam: 'Australia', stage: 'Round of 16' },
  { game: 'NETHERLANDS vs ARGENTINA', argentina: 55, opponent: 45, opponentTeam: 'Netherlands', stage: 'Quarter Final' },
];

// Custom flag bar renderer for stacked bar chart
const FlagBarRenderer = ({ x, y, width, height, countryCode }: any) => {
  return (
    <foreignObject x={x} y={y} width={width} height={height}>
      <div
        style={{
          width: `${width}px`,
          height: `${height}px`,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f0f0f0',
        }}
      >
        <FlagIcon code={countryCode} style={{ width: '100%', height: '100%' }} />
      </div>
    </foreignObject>
  );
};

// Custom Tooltip for showing stats and flags
const CustomTooltip = ({ payload, label }: any) => {
  if (!payload || payload.length === 0) return null;

  const data = payload[0].payload;
  const opponentTeam = data.opponentTeam || '';
  const argentinaFlagCode = countryCodeMapping['Argentina'];
  const opponentFlagCode = countryCodeMapping[opponentTeam];

  return (
    <div style={{ backgroundColor: '#fff', border: '1px solid #ddd', padding: '10px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <FlagIcon code={argentinaFlagCode} style={{ width: '24px', height: '24px', marginRight: '5px' }} />
        <Typography variant="body2">VS</Typography>
        <FlagIcon code={opponentFlagCode} style={{ width: '24px', height: '24px', marginLeft: '5px' }} />
      </div>
      <Typography variant="body2">{label}</Typography>
      <Typography variant="body2">
        Argentina: {data.argentina}% Possession
      </Typography>
      <Typography variant="body2">
        {opponentTeam}: {data.opponent}% Possession
      </Typography>
    </div>
  );
};

const TeamPage = () => {
  const { teamName } = useParams();
  const [teamDetails, setTeamDetails] = useState(null);
  const [tabValue, setTabValue] = useState(0); // Track the selected tab value for each chart
  const [filteredPassesData, setFilteredPassesData] = useState(argentinaPassesData);
  const [filteredPossessionData, setFilteredPossessionData] = useState(possessionData);
  const [selectedGraph, setSelectedGraph] = useState('passes'); // Track the selected graph

  const stages = ['All', 'Group', 'Round of 16', 'Quarter Final'];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number, chartType: string) => {
    const stageFilter = stages[newValue];
    if (chartType === 'passes') {
      setTabValue(newValue);
      setFilteredPassesData(
        stageFilter === 'All'
          ? argentinaPassesData
          : argentinaPassesData.filter((item) => item.stage === stageFilter)
      );
    } else {
      setTabValue(newValue);
      setFilteredPossessionData(
        stageFilter === 'All'
          ? possessionData
          : possessionData.filter((item) => item.stage === stageFilter)
      );
    }
  };

  const handleListItemClick = (graphType: string) => {
    setSelectedGraph(graphType);
  };

  useEffect(() => {
    const normalize = (str: string) => str.trim().toLowerCase();
    const decodedTeamName = decodeURIComponent(teamName);
    const normalizedTeamName = normalize(decodedTeamName);

    const countryCode = Object.keys(countryCodeMapping).find(
      (key) => normalize(key) === normalizedTeamName
    );

    setTeamDetails({
      name: decodedTeamName,
      description: `Information about ${decodedTeamName}.`,
      countryCode: countryCode ? countryCodeMapping[countryCode] : '??',
    });
  }, [teamName]);

  if (!teamDetails) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', padding: '20px' }}>
      {/* Flag Banner at the top */}
      <Box
        sx={{
          width: '100%',
          height: '300px',
          backgroundColor: 'lightgray',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* FlagIcon from react-flag-kit */}
        <FlagIcon
          code={teamDetails.countryCode}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
          }}
        />
        {/* Country Name at Bottom-Left of the Flag */}
        <Typography
          variant="h1"
          sx={{
            color: 'white',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)',
            position: 'absolute',
            bottom: '20px',
            left: '20px',
          }}
        >
          {teamDetails.name}
        </Typography>
      </Box>

      {/* Main Content */}
      <Box sx={{ display: 'flex', paddingTop: '20px' }}>
        {/* Left Panel with List */}
        <Box
          sx={{
            width: '400px',
            paddingRight: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
          }}
        >
          <List>
            <ListItemButton
              onClick={() => handleListItemClick('passes')}
              sx={{
                backgroundColor: selectedGraph === 'passes' ? 'primary.main' : 'transparent',
                '&:hover': { backgroundColor: 'primary.main' },
                '&.Mui-selected': { backgroundColor: 'primary.main' },
                color: selectedGraph === 'passes' ? 'white' : 'black',
              }}
            >
              <ListItemIcon>
                <SportsSoccer sx={{ color: selectedGraph === 'passes' ? 'white' : 'black' }} />
              </ListItemIcon>
              <ListItemText 
                primary="Passes Scatter" 
                sx={{ 
                  color: selectedGraph === 'passes' ? 'white' : 'black', 
                  fontSize: '2.2rem'  // Increase the font size here
                }} 
              />
            </ListItemButton>
            <ListItemButton
              onClick={() => handleListItemClick('possession')}
              sx={{
                backgroundColor: selectedGraph === 'possession' ? 'primary.main' : 'transparent',
                '&:hover': { backgroundColor: 'primary.main' },
                '&.Mui-selected': { backgroundColor: 'primary.main' },
                color: selectedGraph === 'possession' ? 'white' : 'black',
              }}
            >
              <ListItemIcon>
                <FlagIconMUI sx={{ color: selectedGraph === 'possession' ? 'white' : 'black' }} />
              </ListItemIcon>
              <ListItemText 
                primary="Possession Stacked Bar" 
                sx={{ 
                  color: selectedGraph === 'possession' ? 'white' : 'black', 
                  fontSize: '1.2rem'  // Increase the font size here
                }} 
              />
            </ListItemButton>
          </List>
        </Box>

        {/* Right Panel with Graphs */}
        <Box sx={{ flex: 1 }}>
          {selectedGraph === 'passes' && (
            <Container sx={{ marginTop: '40px' }}>
              <Tabs value={tabValue} onChange={(e, newValue) => handleTabChange(e, newValue, 'passes')} centered>
                {stages.map((stage, index) => (
                  <Tab label={stage} key={index} sx={{ fontSize: '1.2rem' }} />  // Increase the font size here
                ))}
              </Tabs>
              <Typography variant="h2" align="center" gutterBottom>
                Passes Completed vs Total Passes
              </Typography>
              <ScatterChart width={800} height={400}>
                <CartesianGrid />
                <XAxis type="number" dataKey="total_passes" name="Total Passes" />
                <YAxis type="number" dataKey="completed_passes" name="Completed Passes" />
                <Tooltip content={<CustomTooltip />} />
                <Scatter name="Argentina" data={filteredPassesData} fill="#82ca9d" />
              </ScatterChart>
            </Container>
          )}

          {selectedGraph === 'possession' && (
            <Container sx={{ marginTop: '40px' }}>
              <Tabs value={tabValue} onChange={(e, newValue) => handleTabChange(e, newValue, 'possesion')} centered>
                {stages.map((stage, index) => (
                  <Tab label={stage} key={index} sx={{ fontSize: '1.2rem' }} />  // Increase the font size here
                ))}
              </Tabs>
              <Typography variant="h5" align="center" gutterBottom>
                Possession by Teams
              </Typography>
              <BarChart width={800} height={400} data={filteredPossessionData}>
                <CartesianGrid />
                <XAxis type="category" dataKey="game" name="Game"/>
                <YAxis type="number" />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="argentina"
                  stackId="a"
                  shape={(props) => <FlagBarRenderer {...props} countryCode={countryCodeMapping['Argentina']} />}
                />
                <Bar
                  dataKey="opponent"
                  stackId="a"
                  shape={(props) => (
                    <FlagBarRenderer {...props} countryCode={countryCodeMapping[props.payload.opponentTeam]} />
                  )}
                />
              </BarChart>
            </Container>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default TeamPage;
