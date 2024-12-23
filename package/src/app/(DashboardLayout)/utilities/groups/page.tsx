"use client"; // Ensures the code runs in a client-side environment in Next.js

import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import { Grid, Box, Tabs, Tab, Typography } from '@mui/material';
import { useState } from 'react';
import BracketComponent from '@/app/(DashboardLayout)/components/Bracket/BracketComponent';
import MatchColumn from '@/app/(DashboardLayout)/components/Bracket/MatchColumn';
import GroupCard from '@/app/(DashboardLayout)/components/Bracket/GroupCard';
import { groupPoints, rounds } from '@/app/(DashboardLayout)/components/Bracket/data';
import Image from 'next/image';

const Groups = () => {
  const [tabIndex, setTabIndex] = useState(0); // State for managing the active tab

  const handleTabChange = (_e: React.SyntheticEvent, newIndex: number) => {
    setTabIndex(newIndex);
  };

  return (
    <PageContainer title="Typography" description="2022 FIFA World Cup Bracket">
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
          src="/images/groups/banner_bracket.jpg"
          alt="image"
          layout="fill"
          objectFit="cover"
          priority
          style={{ borderRadius: '20px' }}
        />
      </Box>

      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center', color: 'primary.main' }}>
        Group Standings and Bracket Progression
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, textAlign: 'center' }}>
        Dive into the full tournament landscape, featuring group standings and the knockout bracket. Follow Argentina’s
        rivals, track their rise through the stages, and relive the matchups that shaped the tournament. See how the
        drama unfolded as teams fought for a place in history.
      </Typography>

      <Box sx={{ width: '100%', height: '2px', backgroundColor: 'primary.main', marginBottom: '30px' }} />

      {/* Tabs Section */}
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        centered
        textColor="primary"
        indicatorColor="primary"
        style={{
          marginBottom: '20px',
        }}
      >
        <Tab label="Bracket Progression" />
        <Tab label="Group Standings" />
      </Tabs>

      {/* Tab Content */}
      <Box sx={{ mt: 3 }}>
        {/* Bracket Progression */}
        {tabIndex === 0 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <BracketComponent rounds={rounds} onShowTimetable={function (matchId: number): void {
                throw new Error('Function not implemented.');
              } } />
            </Grid>
            <Grid item xs={12} md={4}>
              <MatchColumn rounds={rounds} onShowTimetable={function (matchId: number): void {
                throw new Error('Function not implemented.');
              } } />
            </Grid>
          </Grid>
        )}

        {/* Group Standings */}
        {tabIndex === 1 && (
          <Grid container spacing={3}>
            {Object.entries(groupPoints).map(([groupName, teams], groupId) => (
              <Grid item xs={12} sm={6} md={3} key={groupName}>
                <GroupCard groupName={groupName} teams={teams} index={groupId} onShowTimetable={function (groupId: number): void {
                  throw new Error('Function not implemented.');
                } } />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </PageContainer>
  );
};

export default Groups;
