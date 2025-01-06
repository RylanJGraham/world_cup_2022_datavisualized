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
import Image from 'next/image';

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
          <Tab label="An Inside Look" sx={{ fontSize: '1.0rem', fontWeight: 'bold' }} />
          <Tab label="How Argentina Competed" sx={{ fontSize: '1.0rem', fontWeight: 'bold' }} />
          
        </Tabs>

        {/* Tab Content */}
        <Box sx={{ mt: 3 }}>
          {activeTab === 1 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: '300px',
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 2
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
              <Typography variant="body1" sx={{textAlign: 'center', fontWeight: 'bold', marginTop: '0px', marginBottom: '20px'}}>
              Explore how Argentinas performance evolved throughout the FIFA World Cup as we compare their key metrics against selected teams. This page highlights Argentina's strengths and challenges, offering a close look at how their strategies and gameplay adapted in the tournament. Dive into the data to see how Argentina's journey unfolded across different matchups in their pursuit of World Cup glory.
              </Typography>
              <Box sx={{ width: '100%', height: '2px', backgroundColor: 'primary.main', marginBottom: '0px' }} />
              <Box width= '100%' sx={{display: 'flex', flexDirection: 'row'}}>
                <Box sx={{width: '300px', paddingRight: '10px', marginRight: '20px'}}>
                  <Typography variant="body1" sx={{textAlign: 'left', fontWeight: 'bold', color: 'primary.main', marginTop: '20px', marginBottom: '20px'}}>
                  Choose a topic below to begin!
                  </Typography>
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                  <Typography variant="body1" sx={{textAlign: 'center', fontWeight: 'bold', marginTop: '20px', marginBottom: '0px'}}>
                   Got a topic? Select the teams below the graphic to see how Argentinas performed against them in the selected category. Confused? Just click the Information Icon.
                  </Typography>
                  <Typography variant="body1" sx={{textAlign: 'center', fontWeight: 'bold', color: 'primary.main', marginTop: '0px', marginBottom: '20px'}}>
                    Toggle, Hover, & Explore how Argentinas performance varied against their opponents! 
                  </Typography>
                </Box>
              </Box>
            <Box sx={{ display: 'flex' }}>
              {/* Left Panel with List of Graphs */}
              <Box sx={{ width: '300px', paddingRight: '20px' }}>
                <Typography variant="h4" sx={{ mb: 2 }}>Visualization Categories</Typography>
                <Box sx={{ width: '100%', height: '2px', backgroundColor: 'primary.main', marginBottom: '-9px' }} />
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
                {selectedGraph === 'locations' && <ArgentinaGoalLocations />}
              </Box>
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
