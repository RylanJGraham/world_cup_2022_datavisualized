"use client"

import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import { Grid, Box, Tabs, Tab, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import BracketComponent from '@/app/(DashboardLayout)/components/Bracket/BracketComponent';
import MatchColumn from '@/app/(DashboardLayout)/components/Bracket/MatchColumn';
import GroupCard from '@/app/(DashboardLayout)/components/Bracket/GroupCard';
import { groupPoints, rounds } from '@/app/(DashboardLayout)/components/Bracket/data';

const Groups = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [selectedMatchId, setSelectedMatchId] = useState<number | null>(null);

  return (
    <PageContainer title="Typography" description="2022 FIFA World Cup Bracket">
      <Tabs
        value={tabIndex}
        onChange={(e, newIndex) => setTabIndex(newIndex)}
        centered
        textColor="primary"
        indicatorColor="primary"
        sx={{ mb: 3 }}
      >
        <Tab label="Bracket" />
        <Tab label="Groups" />
      </Tabs>

      <Grid container spacing={3}>
        {tabIndex === 0 && (
          <>
            <Grid item xs={12} md={8}>
              <BracketComponent rounds={rounds} onShowTimetable={setSelectedMatchId} />
            </Grid>
            <Grid item xs={12} md={4}>
              <MatchColumn rounds={rounds} onShowTimetable={setSelectedMatchId} />
            </Grid>
          </>
        )}

        {tabIndex === 1 && Object.entries(groupPoints).map(([groupName, teams], groupId) => (
          <Grid item xs={12} sm={6} md={3} key={groupName}>
            <GroupCard groupName={groupName} teams={teams} onShowTimetable={setSelectedMatchId} index={groupId} />
          </Grid>
        ))}
      </Grid>

      {selectedMatchId !== null && (
        <Box sx={{ mt: 4, p: 3, backgroundColor: '#e0e0e0', borderRadius: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Timetable for Match ID: {selectedMatchId}
          </Typography>
        </Box>
      )}
    </PageContainer>
  );
};

export default Groups;
