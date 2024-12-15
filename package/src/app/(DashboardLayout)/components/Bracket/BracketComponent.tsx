"use client"

import Flag from 'react-world-flags';
import { Bracket, IRoundProps, Seed, SeedItem, SeedTeam, IRenderSeedProps } from 'react-brackets';
import { Grid, Box, Card, Typography, Tabs, Tab, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Collapse, useMediaQuery, } from '@mui/material';

const CustomSeed = ({ seed, onShowTimetable }: IRenderSeedProps & { onShowTimetable: () => void }) => (
  <Seed style={{ fontSize: 22 }}>
    <SeedItem
      sx={{
        cursor: 'pointer',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': { transform: 'scale(1.05)' },
      }}
      onClick={onShowTimetable}
    >
      <div>
        <SeedTeam>
          <Flag code={seed.teams[0]?.countryCode || ''} style={{ marginRight: 10, width: 30, height: 20 }} />
          {seed.teams[0]?.name || 'NO TEAM'}
        </SeedTeam>
        <SeedTeam>
          <Flag code={seed.teams[1]?.countryCode || ''} style={{ marginRight: 10, width: 30, height: 20 }} />
          {seed.teams[1]?.name || 'NO TEAM'}
        </SeedTeam>
      </div>
    </SeedItem>
  </Seed>
);

const BracketComponent = ({ rounds, onShowTimetable }: { rounds: IRoundProps[]; onShowTimetable: (matchId: number) => void }) => (
  <Box sx={{ transform: 'scale(0.8)', transformOrigin: 'top left', mb: 5 }}>
    <Bracket rounds={rounds} renderSeedComponent={CustomSeed} />
  </Box>
);

export default BracketComponent;
