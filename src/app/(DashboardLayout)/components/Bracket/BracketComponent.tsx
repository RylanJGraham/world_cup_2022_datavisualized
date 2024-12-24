'use client';
import React from 'react';
import { Box, Typography } from '@mui/material';
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

const BracketComponent = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, width: '70%' }}>
      {rounds.map((round, roundIndex) => (
        <Box
          key={roundIndex}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: `${100 - roundIndex * 15}%`,
            marginBottom: 6,
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 'bold', textAlign: 'center', textTransform: 'uppercase', color: 'primary.main' }}>
            {round.title}
          </Typography>
          {/* Horizontal Line Under the Title */}
          <Box sx={{ width: '100%', height: '2px', backgroundColor: 'primary.main', marginBottom: '20px'}} />
  
          <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 16 }}>
            {round.title === 'Round of 16' ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, margin: 1, }}>
                  {round.seeds.slice(0, 4).map((seed) => (
                    <Box
                      key={seed.id}
                      sx={{
                        border: '2px solid',
                        borderColor: 'primary.main',
                        borderRadius: 2,
                        padding: 1,
                        boxShadow: 8,
                        backgroundColor: 'primary.main',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 1,
                        minWidth: '180px',
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CountryFlag country={seed.teams[0].name} size={30} />
                        <Typography
                          sx={{
                            color: seed.teams[0].score > seed.teams[1].score || seed.teams[0].penaltyWinner ? 'white' : 'white',
                            fontWeight: seed.teams[0].score > seed.teams[1].score || seed.teams[0].penaltyWinner ? 'bold' : 'normal',
                          }}
                        >
                          {seed.teams[0].name} ({seed.teams[0].score}) {seed.teams[0].penaltyWinner ? '(P)' : ''}
                        </Typography>
                      </Box>
                      <Typography sx={{color: 'white'}}>vs</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CountryFlag country={seed.teams[1].name} size={30} />
                        <Typography
                          sx={{
                            color: seed.teams[1].score > seed.teams[0].score || seed.teams[1].penaltyWinner ? 'white' : 'white',
                            fontWeight: seed.teams[1].score > seed.teams[0].score || seed.teams[1].penaltyWinner ? 'bold' : 'normal',
                          }}
                        >
                          {seed.teams[1].name} ({seed.teams[1].score}) {seed.teams[1].penaltyWinner ? '(P)' : ''}
                        </Typography>
                      </Box>
                      <Typography sx={{ fontSize: '0.75rem', color: 'white' }}>{seed.date}</Typography>
                    </Box>
                  ))}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, margin: 1, }}>
                  {round.seeds.slice(4, 8).map((seed) => (
                    <Box
                      key={seed.id}
                      sx={{
                        border: '2px solid',
                        borderColor: 'primary.main',
                        borderRadius: 2,
                        padding: 2,
                        boxShadow: 8,
                        backgroundColor: 'primary.main',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 1,
                        minWidth: '180px',
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CountryFlag country={seed.teams[0].name} size={24} />
                        <Typography
                          sx={{
                            color: seed.teams[0].score > seed.teams[1].score || seed.teams[0].penaltyWinner ? 'white' : 'white',
                            fontWeight: seed.teams[0].score > seed.teams[1].score || seed.teams[0].penaltyWinner ? 'bold' : 'normal',
                          }}
                        >
                          {seed.teams[0].name} ({seed.teams[0].score}) {seed.teams[0].penaltyWinner ? '(P)' : ''}
                        </Typography>
                      </Box>
                      <Typography sx={{color: 'white'}}>vs</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CountryFlag country={seed.teams[1].name} size={30} />
                        <Typography
                          sx={{
                            color: seed.teams[1].score > seed.teams[0].score || seed.teams[1].penaltyWinner ? 'white' : 'white',
                            fontWeight: seed.teams[1].score > seed.teams[0].score || seed.teams[1].penaltyWinner ? 'bold' : 'normal',
                          }}
                        >
                          {seed.teams[1].name} ({seed.teams[1].score}) {seed.teams[1].penaltyWinner ? '(P)' : ''}
                        </Typography>
                      </Box>
                      <Typography sx={{ fontSize: '0.75rem', color: 'white' }}>{seed.date}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            ) : round.title === 'Quarters' ? (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                {round.seeds.map((seed) => (
                  <Box
                    key={seed.id}
                    sx={{
                      border: '2px solid',
                        borderColor: 'primary.main',
                        borderRadius: 2,
                        padding: 2,
                        boxShadow: 8,
                        backgroundColor: 'primary.main',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 1,
                        minWidth: '180px',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CountryFlag country={seed.teams[0].name} size={30} />
                      <Typography
                        sx={{
                          color: seed.teams[0].score > seed.teams[1].score || seed.teams[0].penaltyWinner ? 'white' : 'white',
                          fontWeight: seed.teams[0].score > seed.teams[1].score || seed.teams[0].penaltyWinner ? 'bold' : 'normal',
                        }}
                      >
                        {seed.teams[0].name} ({seed.teams[0].score}) {seed.teams[0].penaltyWinner ? '(P)' : ''}
                      </Typography>
                    </Box>
                    <Typography sx={{color: 'white'}}>vs</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CountryFlag country={seed.teams[1].name} size={30} />
                      <Typography
                        sx={{
                          color: seed.teams[1].score > seed.teams[0].score || seed.teams[1].penaltyWinner ? 'white' : 'white',
                          fontWeight: seed.teams[1].score > seed.teams[0].score || seed.teams[1].penaltyWinner ? 'bold' : 'normal',
                        }}
                      >
                        {seed.teams[1].name} ({seed.teams[1].score}) {seed.teams[1].penaltyWinner ? '(P)' : ''}
                      </Typography>
                    </Box>
                    <Typography sx={{ fontSize: '0.75rem', color: 'white' }}>{seed.date}</Typography>
                  </Box>
                ))}
              </Box>
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                {round.seeds.map((seed) => (
                  <Box
                    key={seed.id}
                    sx={{
                      border: '2px solid',
                      borderColor: 'primary.main',
                      borderRadius: 2,
                      padding: 2,
                      boxShadow: 8,
                      backgroundColor: 'primary.main',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 1,
                      minWidth: '260px',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CountryFlag country={seed.teams[0].name} size={30} />
                      <Typography
                        sx={{
                          color: seed.teams[0].score > seed.teams[1].score || seed.teams[0].penaltyWinner ? 'white' : 'white',
                          fontWeight: seed.teams[0].score > seed.teams[1].score || seed.teams[0].penaltyWinner ? 'bold' : 'normal',
                        }}
                      >
                        {seed.teams[0].name} ({seed.teams[0].score}) {seed.teams[0].penaltyWinner ? '(P)' : ''}
                      </Typography>
                    </Box>
                    <Typography sx={{ color: 'white'}}>vs</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CountryFlag country={seed.teams[1].name} size={30} />
                      <Typography
                        sx={{
                          color: seed.teams[1].score > seed.teams[0].score || seed.teams[1].penaltyWinner ? 'white' : 'white',
                          fontWeight: seed.teams[1].score > seed.teams[0].score || seed.teams[1].penaltyWinner ? 'bold' : 'normal',
                        }}
                      >
                        {seed.teams[1].name} ({seed.teams[1].score}) {seed.teams[1].penaltyWinner ? '(P)' : ''}
                      </Typography>
                    </Box>
                    <Typography sx={{ fontSize: '0.75rem', color: 'white' }}>{seed.date}</Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default BracketComponent;