"use client"; // Ensures this is a client-side component

import { Box, Typography, Collapse } from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { useState } from 'react';
import CountryFlag from '@/app/(DashboardLayout)/components/flags/FlagIcon.jsx';

// Type Definitions
type Team = {
  name: string;
  score: number;
  penaltyWinner?: boolean; // Optional property to mark penalty winner
};

type Seed = {
  id: number;
  date: string;
  teams: [Team, Team];
};

type Round = {
  title: string;
  seeds: Seed[];
};

export const rounds: Round[] = [
  {
    title: 'Round of 16',
    seeds: [
      {
        id: 1,
        date: '2022-12-09',
        teams: [
          { name: 'Croatia', score: 1, penaltyWinner: true },
          { name: 'Japan', score: 1 },
        ],
      },
      {
        id: 2,
        date: '2022-12-09',
        teams: [
          { name: 'Brazil', score: 4 },
          { name: 'Korea', score: 1 },
        ],
      },
      {
        id: 3,
        date: '2022-12-09',
        teams: [
          { name: 'Netherlands', score: 3 },
          { name: 'USA', score: 1 },
        ],
      },
      {
        id: 4,
        date: '2022-12-09',
        teams: [
          { name: 'Argentina', score: 2 },
          { name: 'Australia', score: 1 },
        ],
      },
      {
        id: 5,
        date: '2022-12-09',
        teams: [
          { name: 'Morocco', score: 0, penaltyWinner: true },
          { name: 'Spain', score: 0 },
        ],
      },
      {
        id: 6,
        date: '2022-12-09',
        teams: [
          { name: 'Portugal', score: 6 },
          { name: 'Switzerland', score: 1 },
        ],
      },
      {
        id: 7,
        date: '2022-12-09',
        teams: [
          { name: 'France', score: 3 },
          { name: 'Poland', score: 1 },
        ],
      },
      {
        id: 8,
        date: '2022-12-09',
        teams: [
          { name: 'England', score: 3 },
          { name: 'Senegal', score: 0 },
        ],
      },
    ],
  },
  {
    title: 'Quarters',
    seeds: [
      {
        id: 1,
        date: '2022-12-09',
        teams: [
          { name: 'Croatia', score: 1, penaltyWinner: true },
          { name: 'Brazil', score: 1 },
        ],
      },
      {
        id: 2,
        date: '2022-12-09',
        teams: [
          { name: 'Netherlands', score: 2 },
          { name: 'Argentina', score: 2, penaltyWinner: true },
        ],
      },
      {
        id: 3,
        date: '2022-12-10',
        teams: [
          { name: 'Morocco', score: 1 },
          { name: 'Portugal', score: 0 },
        ],
      },
      {
        id: 4,
        date: '2022-12-10',
        teams: [
          { name: 'England', score: 1 },
          { name: 'France', score: 2 },
        ],
      },
    ],
  },
  {
    title: 'Semis',
    seeds: [
      {
        id: 5,
        date: '2022-12-13',
        teams: [
          { name: 'Argentina', score: 3 },
          { name: 'Croatia', score: 0 },
        ],
      },
      {
        id: 6,
        date: '2022-12-14',
        teams: [
          { name: 'France', score: 2 },
          { name: 'Morocco', score: 0 },
        ],
      },
    ],
  },
  {
    title: 'Final',
    seeds: [
      {
        id: 7,
        date: '2022-12-18',
        teams: [
          { name: 'Argentina', score: 3, penaltyWinner: true },
          { name: 'France', score: 3 },
        ],
      },
    ],
  },
];

const MatchColumn = () => {
  const [openRound, setOpenRound] = useState<string | null>('Round of 16');

  return (
    <Box sx={{ width: '30%', paddingLeft: 3 }}>
      <Typography
        variant="h6"
        sx={{
          marginBottom: 2,
          fontWeight: 'bold',
          textAlign: 'center',
          textTransform: 'uppercase',
          color: 'primary.main',
        }}
      >
        Round Overview
      </Typography>
      {/* Horizontal Line Under the Title */}
      <Box sx={{ width: '100%', height: '2px', backgroundColor: 'primary.main', marginBottom: '27px' }} />
      {rounds.map((round) => (
        <Box key={round.title} sx={{ mb: 3 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer',
              p: 1,
              backgroundColor: 'primary.main',
              borderRadius: 1,
              '&:hover': { backgroundColor: '#8a4c5f' },
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
              >
                {/* Team 1 */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    flex: 1,
                  }}
                >
                  <CountryFlag country={seed.teams[0].name} size={30} />
                  <Typography sx={{ mx: 1 }} variant="body1">
                    {seed.teams[0]?.name || 'NO TEAM'}
                    {seed.teams[0]?.penaltyWinner && (
                      <Typography component="span" sx={{ color: 'red', fontWeight: 'bold' }}>
                        {' (P)'}
                      </Typography>
                    )}
                  </Typography>
                </Box>

                {/* Match Score */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                  }}
                >
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {seed.teams[0]?.score ?? '0'}
                  </Typography>
                  <Typography variant="body1" sx={{ mx: 1, fontWeight: 'bold' }}>
                    vs
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {seed.teams[1]?.score ?? '0'}
                  </Typography>
                </Box>

                {/* Team 2 */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    flex: 1,
                  }}
                >
                  <Typography sx={{ mx: 1 }} variant="body1">
                    {seed.teams[1]?.name || 'NO TEAM'}
                    {seed.teams[1]?.penaltyWinner && (
                      <Typography component="span" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                        {' (P)'}
                      </Typography>
                    )}
                  </Typography>
                  <CountryFlag country={seed.teams[1].name} size={30} />
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
