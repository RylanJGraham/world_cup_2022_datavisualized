"use client"; // Ensures this is a client-side component

import { Box, Typography,  Collapse } from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import Flag from 'react-world-flags';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Use next/navigation for routing in App Directory
import { Bracket, IRoundProps, Seed, SeedItem, SeedTeam, IRenderSeedProps } from 'react-brackets';

const MatchColumn = ({ rounds, onShowTimetable }: { rounds: IRoundProps[]; onShowTimetable: (matchId: number) => void }) => {
  const [openRound, setOpenRound] = useState<string | null>('Round of 16');
  const router = useRouter(); // Use useRouter from next/navigation

  const handleMatchClick = (team1: string, team2: string) => {
    // Generate the matchId in the format [team1][team2]_match
    const matchId = `${encodeURIComponent(team1.replace(/\s+/g, '').toLowerCase())}${encodeURIComponent(team2.replace(/\s+/g, '').toLowerCase())}_match`;

    // Navigate to the match page (no need for .tsx extension)
    router.push(`/utilities/matchup/${matchId}`); // Navigate to the dynamic route
  };

  return (
    <Box sx={{ width: '100%', paddingLeft: 3 }}>
      {rounds.map((round) => (
        <Box key={round.title} sx={{ mb: 3 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer',
              p: 1,
              backgroundColor: '#e3e3e3',
              borderRadius: 1,
              '&:hover': { backgroundColor: '#d6d6d6' },
            }}
            onClick={() => setOpenRound(openRound === round.title ? null : round.title)}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                color: openRound === round.title ? 'primary.main' : 'text.primary',
              }}
            >
              {round.title}
            </Typography>
            <ExpandMoreIcon sx={{ transform: openRound === round.title ? 'rotate(180deg)' : 'rotate(0deg)' }} />
          </Box>
          <Collapse in={openRound === round.title} timeout="auto" unmountOnExit>
            {round.seeds.map((seed) => (
              <Box
                key={seed.id}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  p: 1,
                  backgroundColor: '#f5f5f5',
                  borderRadius: 1,
                  mb: 1,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Flag code={seed.teams[0]?.countryCode || ''} style={{ width: 30, height: 20, marginRight: 8 }} />
                  <Typography variant="body1">{seed.teams[0]?.name || 'NO TEAM'}</Typography>
                  <Typography variant="body1" sx={{ mx: 1, fontWeight: 'bold' }}>
                    vs
                  </Typography>
                  <Flag code={seed.teams[1]?.countryCode || ''} style={{ width: 30, height: 20, marginRight: 8 }} />
                  <Typography variant="body1">{seed.teams[1]?.name || 'NO TEAM'}</Typography>
                </Box>
              </Box>
            ))}
          </Collapse>
        </Box>
      ))}
    </Box>
  );
};

export default MatchColumn;
