

// Bracket Data for Qatar World Cup 2022
export const rounds = [
    {
      title: 'Round of 16',
      seeds: [
        { id: 1, date: '2022-12-09', teams: [{ name: 'Japan', countryCode: 'JP' }, { name: 'Croatia', countryCode: 'HR' }] },
        { id: 2, date: '2022-12-09', teams: [{ name: 'Brazil', countryCode: 'BR' }, { name: 'Korea', countryCode: 'KR' }] },
        { id: 3, date: '2022-12-09', teams: [{ name: 'Netherlands', countryCode: 'NL' }, { name: 'USA', countryCode: 'US' }] },
        { id: 4, date: '2022-12-09', teams: [{ name: 'Argentina', countryCode: 'AR' }, { name: 'Australia', countryCode: 'AU' }] },
        { id: 5, date: '2022-12-09', teams: [{ name: 'Morocco', countryCode: 'MA' }, { name: 'Spain', countryCode: 'ES' }] },
        { id: 6, date: '2022-12-09', teams: [{ name: 'Portugal', countryCode: 'PT' }, { name: 'Switzerland', countryCode: 'CH' }] },
        { id: 7, date: '2022-12-09', teams: [{ name: 'France', countryCode: 'NL' }, { name: 'Poland', countryCode: 'PL' }] },
        { id: 8, date: '2022-12-09', teams: [{ name: 'England', countryCode: 'AR' }, { name: 'Senegal', countryCode: 'SN' }] },
      ],
    },
    {
      title: 'Quarters',
      seeds: [
        { id: 1, date: '2022-12-09', teams: [{ name: 'Croatia', countryCode: 'HR' }, { name: 'Brazil', countryCode: 'BR' }] },
        { id: 2, date: '2022-12-09', teams: [{ name: 'Netherlands', countryCode: 'NL' }, { name: 'Argentina', countryCode: 'AR' }] },
        { id: 3, date: '2022-12-10', teams: [{ name: 'Morocco', countryCode: 'MA' }, { name: 'Portugal', countryCode: 'PT' }] },
        { id: 4, date: '2022-12-10', teams: [{ name: 'England', countryCode: 'GB' }, { name: 'France', countryCode: 'FR' }] },
      ],
    },
    {
      title: 'Semis',
      seeds: [
        { id: 5, date: '2022-12-13', teams: [{ name: 'Argentina', countryCode: 'AR' }, { name: 'Croatia', countryCode: 'HR' }] },
        { id: 6, date: '2022-12-14', teams: [{ name: 'France', countryCode: 'FR' }, { name: 'Morocco', countryCode: 'MA' }] },
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