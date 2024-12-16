'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Box, Typography, Container, Tab, Tabs, List, ListItem, ListItemText, ListItemIcon, ListItemButton } from '@mui/material';
import { FlagIcon } from 'react-flag-kit';
import SportsEsports from '@mui/icons-material/SportsEsports';
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
  Label,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
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

const radarData = [
  {
    field: 'Crosses', Argentina: 10, Brazil: 12, France: 11,
  },
  {
    field: 'Switches', Argentina: 13, Brazil: 5, France: 7,
  },
  {
    field: 'Corners', Argentina: 7, Brazil: 8, France: 6,
  },
  {
    field: 'Free Kicks', Argentina: 22, Brazil: 15, France: 8,
  },
  {
    field: 'Penalties', Argentina: 3, Brazil: 2, France: 4,
  },
  {
    field: 'Goals Prevented', Argentina: 10, Brazil: 8, France: 4,
  },
  {
    field: 'Shots', Argentina: 14, Brazil: 8, France: 25,
  },
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

const Argentina = () => {
  const { teamName } = useParams();
  const [teamDetails, setTeamDetails] = useState(null);
  const [tabValue, setTabValue] = useState(0); // Track the selected tab value for each chart
  const [filteredPassesData, setFilteredPassesData] = useState(argentinaPassesData);
  const [filteredPossessionData, setFilteredPossessionData] = useState(possessionData);
  const [selectedGraph, setSelectedGraph] = useState('passes'); // Track the selected graph

  const stages = ['All', 'Group', 'Round of 16', 'Quarter Final'];

  const graphOptions = [
  { name: 'passes', label: 'Pass Total vs Completions', icon: <SportsSoccer sx={{fontSize: '2rem'}} /> },
  { name: 'possession', label: 'Game Possession Statistics', icon: <FlagIconMUI sx={{fontSize: '2rem'}} /> },
  { name: 'radar', label: 'Team Comparison (Radar)', icon: <SportsEsports sx={{fontSize: '2rem'}} /> }, // Radar chart option
  // Add new graph types here as needed
];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number, chartType: string) => {
    const stageFilter = stages[newValue];
  
    // Create a mapping of chart types to their respective data
    const dataMapping = {
      passes: argentinaPassesData,
      possession: possessionData,
      // Add new chart types here in the future
    };
  
    // Update state based on the chart type selected
    if (dataMapping[chartType]) {
      if (stageFilter === 'All') {
        setTabValue(newValue);
        if (chartType === 'passes') {
          setFilteredPassesData(dataMapping[chartType]);
        } else if (chartType === 'possession') {
          setFilteredPossessionData(dataMapping[chartType]);
        }
      } else {
        const filteredData = dataMapping[chartType].filter((item) => item.stage === stageFilter);
        setTabValue(newValue);
        if (chartType === 'passes') {
          setFilteredPassesData(filteredData);
        } else if (chartType === 'possession') {
          setFilteredPossessionData(filteredData);
        }
      }
    }
  };

  const handleListItemClick = (graphType: string) => {
    setSelectedGraph(graphType);
  };

  useEffect(() => {
    const normalize = (str: string) => str.trim().toLowerCase();
    const decodedTeamName = 'Argentina';
    const normalizedTeamName = normalize(decodedTeamName);

    const countryCode = Object.keys(countryCodeMapping).find(
      (key) => normalize(key) === normalizedTeamName
    );

    setTeamDetails({
      name: 'Argentina',
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
      <Typography
        variant="h2"
        sx={{
          marginTop: '20px', textAlign: 'center', color: 'primary.main'
        }}
      >
       Argentina vs Them All
      </Typography>
      <Typography
        variant="h5"
        sx={{
          marginTop: '10px', alignContent: 'center', textAlign: 'center' 
        }}
      >
       View how Argentina stacked up against the competition below! With data visualizations of passing, possession, and more!
      </Typography>

      {/* Main Content */}
      <Box sx={{ display: 'flex', paddingTop: '20px'}}>
        {/* Left Panel with List */}
        <Box
          sx={{
            width: '400px',
            paddingRight: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            marginTop: '20px'
          }}
        >
          <Typography
            variant="h5"
            align="left"
            sx={{ marginBottom: '0px', marginTop: '20px' }}
          >
            Explore Their Tournament
          </Typography>
          <List
            sx={{
              '& .MuiListItemButton:not(:last-child)': {
                borderBottom: '1px solid #ddd',
              },
              padding: '10px',
              borderRadius: '10px',
              backgroundColor: 'white',
              borderBottom: '2px solid rgba(0, 0, 0, 0.1)',
            }}
          >
              {graphOptions.map((graph) => (
                <ListItemButton
                  key={graph.name}
                  onClick={() => handleListItemClick(graph.name)}
                  sx={{
                    margin: '10px 0',
                    borderRadius: '15px',
                    padding: '15px 20px',
                    backgroundColor: selectedGraph === graph.name ? 'primary.main' : 'white',
                    '&:hover': { backgroundColor: selectedGraph === graph.name ? 'primary.dark' : '#f5f5f5' },
                    color: selectedGraph === graph.name ? 'white' : 'black',
                  }}
                >
                  <ListItemIcon>{graph.icon}</ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography
                        variant="h6"
                        sx={{
                          color: selectedGraph === graph.name ? 'white' : 'black',
                          fontWeight: 600,
                        }}
                      >
                        {graph.label}
                      </Typography>
                    }
                  />
                </ListItemButton>
              ))}
          </List>
        </Box>

        {/* Right Panel with Graphs */}
        <Box sx={{ flex: 1 }}>
          {graphOptions.map((graph) => (
            selectedGraph === graph.name && (
              <Container key={graph.name} sx={{ marginTop: '40px' }}>
                <Tabs
                  value={tabValue}
                  onChange={(e, newValue) => handleTabChange(e, newValue, graph.name)}
                  centered
                >
                  {stages.map((stage, index) => (
                    <Tab label={stage} key={index} sx={{ }} />
                  ))}
                </Tabs>

                <Typography variant="h3" align="center" gutterBottom sx={{ marginTop: '20px' }}>
                  {graph.label}
                </Typography>

                {graph.name === 'passes' && (
                  <ScatterChart width={800} height={400}>
                    <CartesianGrid />
                    <XAxis type="number" dataKey="total_passes" name="Total Passes">
                      <Label value="Total Passes" offset={0} position="insideBottom" style={{ fontSize: '1.0rem', fontWeight: 'bold' }} />
                    </XAxis>
                    <YAxis type="number" dataKey="completed_passes" name="Completed Passes">
                      <Label value="Completed Passes" angle={-90} position="insideLeft" style={{ fontSize: '1.0rem', fontWeight: 'bold' }} />
                    </YAxis>
                    <Tooltip content={<CustomTooltip />} />
                    <Scatter name="Argentina" data={filteredPassesData} fill="#82ca9d" />
                  </ScatterChart>
                )}

                {selectedGraph === 'radar' && (
                  <Container sx={{ marginTop: '40px' }}>
                    <Tabs value={tabValue} onChange={(e, newValue) => handleTabChange(e, newValue, 'radar')} centered>
                      {stages.map((stage, index) => (
                        <Tab label={stage} key={index} sx={{ fontSize: '1.2rem' }} />
                      ))}
                    </Tabs>
                    <Typography variant="h3" align="center" gutterBottom sx={{ marginTop: '20px' }}>
                      Team Comparison (Radar)
                    </Typography>
                    <RadarChart outerRadius={150} width={800} height={400} data={radarData}>
                      <PolarGrid />
                      
                      {/* Define 9 axes */}
                      <PolarAngleAxis dataKey="field" />
                      
                      {/* Define radius axis */}
                      <PolarRadiusAxis domain={[0, 12]} />
                      
                      {/* Radar for each team */}
                      <Radar name="Argentina" dataKey="Argentina" stroke="#ff0000" fill="#ff0000" fillOpacity={0.3} />
                      <Radar name="Brazil" dataKey="Brazil" stroke="#0000ff" fill="#0000ff" fillOpacity={0.3} />
                      <Radar name="France" dataKey="France" stroke="#00ff00" fill="#00ff00" fillOpacity={0.3} />
                    </RadarChart>
                  </Container>
                )}

                {graph.name === 'possession' && (
                  <BarChart width={800} height={400} data={filteredPossessionData}>
                    <CartesianGrid />
                    <XAxis type="category" dataKey="game" name="Game">
                      <Label value="Games" offset={0} position="insideBottom" style={{ fontSize: '1.0rem', fontWeight: 'bold' }} />
                    </XAxis>
                    <YAxis type="number">
                      <Label value="Possession (%)" angle={-90} position="insideLeft" style={{ fontSize: '1.0rem', fontWeight: 'bold' }} />
                    </YAxis>
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
                )}
              </Container>
            )
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Argentina;
