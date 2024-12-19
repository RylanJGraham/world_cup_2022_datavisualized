"use client";

import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import { Grid, Box, Tabs, Tab, Typography, } from '@mui/material';
import { useState } from 'react';
import BracketComponent from '@/app/(DashboardLayout)/components/Bracket/BracketComponent';
import MatchColumn from '@/app/(DashboardLayout)/components/Bracket/MatchColumn';
import GroupCard from '@/app/(DashboardLayout)/components/Bracket/GroupCard';
import { groupPoints, rounds } from '@/app/(DashboardLayout)/components/Bracket/data';
import Image from 'next/image';

const Groups = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const tabBackgrounds = [
    '/images/groups/bracket.png', // Background image for "Bracket" tab
    '/images/groups/groups.png',  // Background image for "Groups" tab
  ];

  return (
    <PageContainer title="Typography" description="2022 FIFA World Cup Bracket">
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4, textAlign: 'center', color: 'primary.main' }}>
        Qatar 2022 Tournament Overview
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 4, textAlign: 'center', }}>
        An Overview of the groups & bracket progression of the Qatar 2022 World Cup. 
      </Typography>
      <Box sx={{ position: 'relative', width: '80%', height: '500px', alignContent: 'center' }}>
        <Image
            src="/images/groups/bracket.jpg"
            alt='image'
            layout="fill"
            objectFit="cover"
            priority
            style={{borderRadius: '20px'}}
          />
      </Box>
      
      <Tabs
        value={tabIndex}
        onChange={(e, newIndex) => setTabIndex(newIndex)}
        centered
        textColor="inherit"
        indicatorColor="none"
        sx={{
          mb: 3,
          '.MuiTabs-flexContainer': {
            gap: 2, // Spacing between tabs
          },
        }}
      >
        {['Bracket', 'Groups'].map((label, index) => (
          <Tab
            key={label}
            label={label}
            sx={{
              fontSize: '1.8rem',
              fontWeight: 'bold',
              px: 6,
              py: 3,
              textTransform: 'none',
              color: 'primary.main',
              backgroundImage: `url(${tabBackgrounds[index]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              borderRadius: 2,
              border: tabIndex === index ? '4px solid' : 'none',
              borderColor: tabIndex === index ? 'primary.main' : 'transparent',
              boxShadow: tabIndex === index ? '0 0 8px rgba(0, 0, 0, 0.3)' : 'none',
            }}
          />
        ))}
      </Tabs>

      {tabIndex === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <BracketComponent rounds={rounds} />
          </Grid>
          <Grid item xs={12} md={4}>
            <MatchColumn rounds={rounds} />
          </Grid>
        </Grid>
      )}

      {tabIndex === 1 && (
        <Grid container spacing={3}>
          {Object.entries(groupPoints).map(([groupName, teams], groupId) => (
            <Grid item xs={12} sm={6} md={3} key={groupName}>
              <GroupCard groupName={groupName} teams={teams} index={groupId} />
            </Grid>
          ))}
        </Grid>
      )}
    </PageContainer>
  );
};

export default Groups;
