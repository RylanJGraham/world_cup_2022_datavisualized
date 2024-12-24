

// Bracket Data for Qatar World Cup 2022
export const rounds = [
  {
    title: 'Round of 16',
    seeds: [
      { id: 1, date: '2022-12-09', teams: [{ name: 'Croatia', countryCode: 'HR', score: 1 }, { name: 'Japan', countryCode: 'JP', score: 1 }] },
      { id: 2, date: '2022-12-09', teams: [{ name: 'Brazil', countryCode: 'BR', score: 4 }, { name: 'Korea', countryCode: 'KR', score: 1 }] },
      { id: 3, date: '2022-12-09', teams: [{ name: 'Netherlands', countryCode: 'NL', score: 3 }, { name: 'USA', countryCode: 'US', score: 1 }] },
      { id: 4, date: '2022-12-09', teams: [{ name: 'Argentina', countryCode: 'AR', score: 2 }, { name: 'Australia', countryCode: 'AU', score: 1 }] },
      { id: 5, date: '2022-12-09', teams: [{ name: 'Morocco', countryCode: 'MA', score: 0 }, { name: 'Spain', countryCode: 'ES', score: 0 }] },
      { id: 6, date: '2022-12-09', teams: [{ name: 'Portugal', countryCode: 'PT', score: 6 }, { name: 'Switzerland', countryCode: 'CH', score: 1 }] },
      { id: 7, date: '2022-12-09', teams: [{ name: 'France', countryCode: 'FR', score: 3 }, { name: 'Poland', countryCode: 'PL', score: 1 }] },
      { id: 8, date: '2022-12-09', teams: [{ name: 'England', countryCode: 'GB', score: 3 }, { name: 'Senegal', countryCode: 'SN', score: 0 }] },
    ],
  },
  {
    title: 'Quarters',
    seeds: [
      { id: 1, date: '2022-12-09', teams: [{ name: 'Croatia', countryCode: 'HR', score: 1 }, { name: 'Brazil', countryCode: 'BR', score: 1 }] },
      { id: 2, date: '2022-12-09', teams: [{ name: 'Netherlands', countryCode: 'NL', score: 2 }, { name: 'Argentina', countryCode: 'AR', score: 2 }] },
      { id: 3, date: '2022-12-10', teams: [{ name: 'Morocco', countryCode: 'MA', score: 1 }, { name: 'Portugal', countryCode: 'PT', score: 0 }] },
      { id: 4, date: '2022-12-10', teams: [{ name: 'England', countryCode: 'GB', score: 1 }, { name: 'France', countryCode: 'FR', score: 2 }] },
    ],
  },
  {
    title: 'Semis',
    seeds: [
      { id: 5, date: '2022-12-13', teams: [{ name: 'Argentina', countryCode: 'AR', score: 3 }, { name: 'Croatia', countryCode: 'HR',score: 0 }] },
      { id: 6, date: '2022-12-14', teams: [{ name: 'France', countryCode: 'FR', score: 2 }, { name: 'Morocco', countryCode: 'MA', score: 0 }] },
    ],
  },
  {
    title: 'Final',
    seeds: [
      { id: 7, date: '2022-12-18', teams: [{ name: 'Argentina', countryCode: 'AR' }, { name: 'France', countryCode: 'FR' }] },
    ],
  },
];

export const groupPoints = {
  'Group A': [
    { name: 'Netherlands', points: 7, qualified: true },
    { name: 'Senegal', points: 6, qualified: true },
    { name: 'Ecuador', points: 4, qualified: false },
    { name: 'Qatar', points: 0, qualified: false },
  ],
  'Group B': [
    { name: 'England', points: 7, qualified: true },
    { name: 'USA', points: 5, qualified: true },
    { name: 'Iran', points: 3, qualified: false },
    { name: 'Wales', points: 1, qualified: false },
  ],
  'Group C': [
    { name: 'Argentina', points: 6, qualified: true },
    { name: 'Poland', points: 4, qualified: true },
    { name: 'Mexico', points: 4, qualified: false },
    { name: 'Saudi Arabia', points: 3, qualified: false },
  ],
  'Group D': [
    { name: 'France', points: 6, qualified: true },
    { name: 'Australia', points: 6, qualified: true },
    { name: 'Tunisia', points: 4, qualified: false },
    { name: 'Denmark', points: 1, qualified: false },
  ],
  'Group E': [
    { name: 'Japan', points: 6, qualified: true },
    { name: 'Spain', points: 4, qualified: true },
    { name: 'Germany', points: 4, qualified: false },
    { name: 'Costa Rica', points: 3, qualified: false },
  ],
  'Group F': [
    { name: 'Morocco', points: 7, qualified: true },
    { name: 'Croatia', points: 5, qualified: true },
    { name: 'Belgium', points: 4, qualified: false },
    { name: 'Canada', points: 0, qualified: false },
  ],
  'Group G': [
    { name: 'Brazil', points: 6, qualified: true },
    { name: 'Switzerland', points: 6, qualified: true },
    { name: 'Cameroon', points: 4, qualified: false },
    { name: 'Serbia', points: 1, qualified: false },
  ],
  'Group H': [
    { name: 'Portugal', points: 6, qualified: true },
    { name: 'Korea', points: 4, qualified: true },
    { name: 'Uruguay', points: 4, qualified: false },
    { name: 'Ghana', points: 3, qualified: false },
  ],
  // Add remaining groups similarly...
};