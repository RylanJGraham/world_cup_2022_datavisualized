'use client'
import { Box, Tabs, Tab, } from '@mui/material';
import React, { useState } from 'react';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import Banner from '@/app/(DashboardLayout)/components/BannerHome/Banner';
// Import Tab Content Components
import Groups from '@/app/(DashboardLayout)/utilities/groups/page';
import Teams from '@/app/(DashboardLayout)/utilities/shadow/page';
import Argentina from '@/app/(DashboardLayout)/components/Argentina/page';
import TournamentOverview from '@/app/(DashboardLayout)/components/Overview/page';
import MatchCard from '@/app/(DashboardLayout)/components/Calendar/page';

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <PageContainer title="Dashboard" description="This is the Dashboard">
      <Box>
        <Banner
          imageSrc="/images/home/messi.webp"
          title="The Little Boy From Rosario, World Cup Champion"
          caption="A Data-Driven Journey Through the Tournament That Defined a Nation and Cemented Messi's Legacy"
        />
        <Box
        sx={{
          width: '100%',
          height: '2px',
          backgroundColor: 'primary.main',
          marginBottom: '10px',
          marginTop: '10px',
        }}
      />

        {/* Tabs Section */}
        <Box sx={{ width: '100%', mt: 4 }}>
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            centered
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab label="Argentina’s Road to Glory" />
            <Tab label="The Bigger Picture" />
            <Tab label="Meet the Competition" />
            <Tab label="The Beautiful Games" />
            <Tab label="La Albiceleste Unveiled" />
          </Tabs>
          {/* Tab Content */}
          <Box sx={{ mt: 3 }}>
            {selectedTab === 0 && <TournamentOverview></TournamentOverview>}
            {selectedTab === 1 && <Groups />}
            {selectedTab === 2 && <Teams></Teams>}
            {selectedTab === 3 && <MatchCard></MatchCard>}
            {selectedTab === 4 && <Argentina></Argentina>}
          </Box>
        </Box>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
