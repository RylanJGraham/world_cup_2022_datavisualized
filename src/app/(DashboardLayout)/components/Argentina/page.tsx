'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, Tabs, Tab, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { SportsSoccer, Flag as FlagIconMUI, SportsEsports } from '@mui/icons-material';
import PolarChartArgentina from "@/app/(DashboardLayout)/components/comparison/vis/PolarChartArgentina.jsx";
import BarChartArgentina from "@/app/(DashboardLayout)/components/comparison/vis/BarChartArgentina";
import ScatterChartArgentina from "@/app/(DashboardLayout)/components/comparison/vis/ScatterChartArgentina";
import ArgentinaGrid from "@/app/(DashboardLayout)/components/comparison/arg/grid";
import ArgentinaGoalLocations from "@/app/(DashboardLayout)/components/comparison/vis/ArgentinaGoalLocations";
import PageContainer from '../container/PageContainer';

// Mapping team names to country codes (ISO 3166-1 alpha-2)
const countryCodeMapping: Record<string, string> = {
  Argentina: 'AR',
  // Add other countries here if needed
};

const Argentina = () => {
  const [teamDetails, setTeamDetails] = useState<{ name: string; description: string; countryCode: string } | null>(null);
  const [selectedGraph, setSelectedGraph] = useState('passes');
  const [activeTab, setActiveTab] = useState(0);

  const graphOptions = [
    { name: 'passes', label: 'Passing', icon: <SportsSoccer sx={{ fontSize: '2rem' }} /> },
    { name: 'possession', label: 'Possession', icon: <FlagIconMUI sx={{ fontSize: '2rem' }} /> },
    { name: 'radar', label: 'Wholistic', icon: <SportsEsports sx={{ fontSize: '2rem' }} /> },
    { name: 'locations', label: 'Goals', icon: <SportsEsports sx={{ fontSize: '2rem' }} /> },
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

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
  }, []);

  if (!teamDetails) {
    return <div>Loading...</div>;
  }

  return (
    <PageContainer title="Argentina" description="2022 FIFA World Cup Argentina">
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center', color: 'primary.main' }}>
          A Breakdown of Argentinas Team
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, textAlign: 'center' }}>
          Step inside the heart of Argentinas squad. Explore their strengths, how they lined up against opponents,
          and their strategies. Featuring Messis magic, this section provides an in-depth data analysis 
          of the team that captured the hearts of millions and lifted the trophy for Argentina.
        </Typography>
        <Box sx={{ width: '100%', height: '2px', backgroundColor: 'primary.main', marginBottom: '30px' }} />

        {/* Tabs Section */}
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          centered
          textColor="primary"
          indicatorColor="primary"
          sx={{ marginBottom: '20px' }}
        >
          <Tab label="An Inside Look" />
          <Tab label="How Argentina Competed" />
          
        </Tabs>

        {/* Tab Content */}
        <Box sx={{ mt: 3 }}>
          {activeTab === 1 && (
            <Box sx={{ display: 'flex' }}>
              {/* Left Panel with List of Graphs */}
              <Box sx={{ width: '300px', paddingRight: '20px' }}>
                <Typography variant="h6" sx={{ mb: 2 }}>Select Graph</Typography>
                <List>
                  {graphOptions.map((graph) => (
                    <ListItemButton
                      key={graph.name}
                      onClick={() => handleListItemClick(graph.name)}
                      sx={{
                        margin: '10px 0',
                        borderRadius: '15px',
                        padding: '10px',
                        backgroundColor: selectedGraph === graph.name ? 'primary.main' : 'white',
                        '&:hover': { backgroundColor: selectedGraph === graph.name ? 'primary.dark' : '#f5f5f5' },
                        color: selectedGraph === graph.name ? 'white' : 'black',
                      }}
                    >
                      <ListItemIcon>{graph.icon}</ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography
                            variant="body1"
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
                {selectedGraph === 'locations' && <ArgentinaGoalLocations />}
              </Box>
            </Box>
          )}

          {activeTab === 0 && (
            <ArgentinaGrid />
          )}
        </Box>
      </Box>
    </PageContainer>
  );
};

export default Argentina;
