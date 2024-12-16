'use client'
import { Box, Tabs, Tab, Typography, } from '@mui/material';
import React, { useState } from 'react';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import Banner from '@/app/(DashboardLayout)/components/BannerHome/Banner';
// Import Tab Content Components
import Groups from './utilities/groups/page';
import Teams from './utilities/shadow/page';
import Argentina from './components/Argentina/page';
import TournamentOverview from './components/Overview/page';
import MatchCard from './components/Calendar/page';

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
          title="Argentina's Cinderella Story"
          caption="A Data Visualization of the Tournament, & Messi's career capstone"
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
            <Tab label="Tournament Overview" />
            <Tab label="The Road to Victory" />
            <Tab label="Teams" />
            <Tab label="Matches" />
            <Tab label="Argentina vs Them All" />
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
