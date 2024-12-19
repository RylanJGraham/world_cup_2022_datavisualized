"use client"; // Ensures this is a client-side component

import { Box, Typography, Collapse } from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import Flag from 'react-world-flags';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Use next/navigation for routing in App Directory
import { IRoundProps } from 'react-brackets';

const MatchColumn = ({ rounds, onShowTimetable }: { rounds: IRoundProps[]; onShowTimetable: (matchId: number) => void }) => {
  const [openRound, setOpenRound] = useState<string | null>('Round of 16');
  const router = useRouter(); // Use useRouter from next/navigation

  const handleMatchClick = (team1: string, team2: string) => {
    const matchId = `${encodeURIComponent(team1.replace(/\s+/g, '').toLowerCase())}${encodeURIComponent(team2.replace(/\s+/g, '').toLowerCase())}_match`;
    router.push(`/utilities/matchup/${matchId}`);
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
              backgroundColor: '#5D87FF',
              borderRadius: 1,
              '&:hover': { backgroundColor: '#4cc9f0' },
            }}
            onClick={() => setOpenRound(openRound === round.title ? null : round.title)}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                color: openRound === round.title ? 'white' : 'white',
              }}
            >
              {round.title}
            </Typography>
            <ExpandMoreIcon sx={{ color: 'white', transform: openRound === round.title ? 'rotate(180deg)' : 'rotate(0deg)' }} />
          </Box>
          <Collapse in={openRound === round.title} timeout="auto" unmountOnExit>
            {round.seeds.map((seed) => (
              <Box
                key={seed.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  p: 1,
                  backgroundColor: 'white',
                  borderRadius: 1,
                  mb: 1,
                  mt: 1,
                  boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.3)',
                  cursor: 'pointer',
                }}
                onClick={() => handleMatchClick(seed.teams[0]?.name || 'NO TEAM', seed.teams[1]?.name || 'NO TEAM')}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    flex: 1,
                  }}
                >
                  <Flag code={seed.teams[0]?.countryCode || ''} style={{ width: 30, height: 20, marginRight: 8, boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.3)', }} />
                  <Typography variant="body1">{seed.teams[0]?.name || 'NO TEAM'}</Typography>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                  }}
                >
                  <Typography variant="body1" sx={{ mx: 1, fontWeight: 'bold' }}>
                    {seed.teams[0]?.score ?? '0'}
                  </Typography>
                  <Typography variant="body1" sx={{ mx: 1, fontWeight: 'bold' }}>
                    vs
                  </Typography>
                  <Typography variant="body1" sx={{ mx: 1, fontWeight: 'bold' }}>
                    {seed.teams[1]?.score ?? '0'}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    flex: 1,
                  }}
                >
                  <Typography variant="body1">{seed.teams[1]?.name || 'NO TEAM'}</Typography>
                  <Flag code={seed.teams[1]?.countryCode || ''} style={{ width: 30, height: 20, marginLeft: 8, boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.3)', }} />
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
