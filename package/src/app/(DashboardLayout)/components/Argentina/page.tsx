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
import Image from 'next/image';
import PageContainer from '../container/PageContainer';

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
    <PageContainer title="Argentina" description="2022 FIFA World Cup Argentina">
      {/* Flag Banner at the top */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '300px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 4,
        }}
      >
        <Image
          src="/images/groups/banner_arg.jpg"
          alt="image"
          layout="fill"
          objectFit="cover"
          priority
          style={{ borderRadius: '20px' }}
        />
      </Box>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center', color: 'primary.main' }}>
        A Breakdown of Argentinas Team
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, textAlign: 'center' }}>
      Step inside the heart of Argentinas squad. Explore their strengths, how they lined up against opponents,
      and their strategies. Featuring Messis magic, this section provides an in-depth data analysis 
      of the team that captured the hearts of millions and lifted the trophy for Argentina.
      </Typography>
      <Box sx={{ width: '100%', height: '2px', backgroundColor: 'primary.main', marginBottom: '30px' }} />

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
    </PageContainer>
  );
};

export default Argentina;
