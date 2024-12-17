'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Box, Typography, Container, Tab, Tabs, List, ListItem, ListItemText, ListItemIcon, ListItemButton } from '@mui/material';
import { FlagIcon, FlagIconCode } from 'react-flag-kit';
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

import PolarChartArgentina from "@/app/(DashboardLayout)/components/comparison/vis/PolarChartArgentina.jsx"
import BarChartArgentina from "@/app/(DashboardLayout)/components/comparison/vis/BarChartArgentina"
import ScatterChartArgentina from "@/app/(DashboardLayout)/components/comparison/vis/ScatterChartArgentina"

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


const Argentina = () => {
  const { teamName } = useParams();
  const [teamDetails, setTeamDetails] = useState(null);
  const [tabValue, setTabValue] = useState(0); // Track the selected tab value for each chart
  const [selectedGraph, setSelectedGraph] = useState('passes'); // Track the selected graph

  const stages = ['All', 'Group', 'Round of 16', 'Quarter Final', 'Semi Final', 'Final'];

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
            Explore Data
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

                {graph.name === 'passes' && (
                  <ScatterChartArgentina></ScatterChartArgentina>
                )}

                {selectedGraph === 'radar' && (
                    <PolarChartArgentina></PolarChartArgentina>
                )}

                {graph.name === 'possession' && (
                  <BarChartArgentina></BarChartArgentina>
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
