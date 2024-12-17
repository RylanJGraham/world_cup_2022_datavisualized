'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Box, Typography, Container, List, ListItemIcon, ListItemText, ListItemButton } from '@mui/material';
import { FlagIcon } from 'react-flag-kit';
import SportsEsports from '@mui/icons-material/SportsEsports';
import { SportsSoccer, Flag as FlagIconMUI } from '@mui/icons-material';

import PolarChartArgentina from "@/app/(DashboardLayout)/components/comparison/vis/PolarChartArgentina.jsx";
import BarChartArgentina from "@/app/(DashboardLayout)/components/comparison/vis/BarChartArgentina";
import ScatterChartArgentina from "@/app/(DashboardLayout)/components/comparison/vis/ScatterChartArgentina";

// Define the type for team details
interface TeamDetails {
  name: string;
  description: string;
  countryCode: string;
}

// Mapping team names to country codes (ISO 3166-1 alpha-2)
const countryCodeMapping: Record<string, string> = {
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
  const [teamDetails, setTeamDetails] = useState<TeamDetails | null>(null); // Explicitly define the state type
  const [selectedGraph, setSelectedGraph] = useState('passes');

  const graphOptions = [
    { name: 'passes', label: 'Pass Total vs Completions', icon: <SportsSoccer sx={{ fontSize: '2rem' }} /> },
    { name: 'possession', label: 'Game Possession Statistics', icon: <FlagIconMUI sx={{ fontSize: '2rem' }} /> },
    { name: 'radar', label: 'Team Comparison (Radar)', icon: <SportsEsports sx={{ fontSize: '2rem' }} /> },
  ];

  const handleListItemClick = (graphType: string) => {
    setSelectedGraph(graphType);
  };

  useEffect(() => {
    const decodedTeamName = 'Argentina';
    const countryCode = countryCodeMapping[decodedTeamName];

    setTeamDetails({
      name: decodedTeamName,
      description: `Information about ${decodedTeamName}.`,
      countryCode: countryCode || '??',
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
        <FlagIcon
          code={teamDetails.countryCode}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
          }}
        />
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
      <Typography variant="h2" sx={{ marginTop: '20px', textAlign: 'center', color: 'primary.main' }}>
        Argentina vs Them All
      </Typography>
      <Typography variant="h5" sx={{ marginTop: '10px', textAlign: 'center' }}>
        View how Argentina stacked up against the competition below! With data visualizations of passing, possession, and more!
      </Typography>

      {/* Main Content */}
      <Box sx={{ display: 'flex', paddingTop: '20px' }}>
        {/* Left Panel with List */}
        <Box
          sx={{
            width: '400px',
            paddingRight: '20px',
            display: 'flex',
            flexDirection: 'column',
            marginTop: '20px',
          }}
        >
          <Typography variant="h5" align="left" sx={{ marginBottom: '20px' }}>
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
          {selectedGraph === 'passes' && <ScatterChartArgentina />}
          {selectedGraph === 'possession' && <BarChartArgentina />}
          {selectedGraph === 'radar' && <PolarChartArgentina />}
        </Box>
      </Box>
    </Box>
  );
};

export default Argentina;
