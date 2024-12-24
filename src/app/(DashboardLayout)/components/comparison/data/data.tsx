export const matchups = {
  'argentina-france': {
    matchData: {
      team1: { name: 'Argentina', goals: 3, shotAttempts: 10, shotAccuracy: '14%' },
      team2: { name: 'France', goals: 1, shotAttempts: 8, shotAccuracy: '33%' },
    },
    possessionData: {
      argentina: 60, // Argentina's possession percentage
      france: 30, // France's possession percentage
      contested: 10, // Contested area percentage
    },
    players: {
      team1: [
        { firstName: 'Lionel', lastName: 'Messi', goals: 2, team: 'Argentina' },
        { firstName: 'Ángel', lastName: 'Di María', goals: 1, team: 'Argentina' },
      ],
      team2: [
        { firstName: 'Kylian', lastName: 'Mbappé', goals: 3, team: 'France' },
      ]
    },
    heatmapData: {
      team1Name: 'Argentina',
      team2Name: 'France',
      leftChannel: { team1: 20, team2: 15 },
      centralChannel: { team1: 40, team2: 35 },
      rightChannel: { team1: 15, team2: 10 },
    },
    PolarData: {
      Argentina: {
        metrics: [
          { name: 'Possession', value: 46 },
          { name: 'Goals v Attempts', value: 14.29 },
          { name: 'Passes v Attempts', value: 83.95 },
          { name: 'Pct of Attacks Right', value: 40 },
          { name: 'Pct of Attacks Center', value: 17.78 },
          { name: 'Pct of Attacks Left', value: 42.22 },
          { name: 'On Target Attempts', value: 42.86 },
          { name: 'Goals Inside Pen', value: 14.29 },
        ],
      },
      France: {
        metrics: [
          { name: 'Possession', value: 40 },
          { name: 'Goals v Attempts', value: 30 },
          { name: 'Passes v Attempts', value: 81.2 },
          { name: 'Pct of Attacks Right', value: 37.21 },
          { name: 'Pct of Attacks Center', value: 11.63 },
          { name: 'Pct of Attacks Left', value: 51.16 },
          { name: 'On Target Attempts', value: 50 },
          { name: 'Goals Inside Pen', value: 30 },
        ],
      },
    }
  },
  'argentina-netherlands': {
    matchData: {
      team1: { name: 'Argentina', goals: 2, shotAttempts: 12, shotAccuracy: '25%' },
      team2: { name: 'Netherlands', goals: 1, shotAttempts: 9, shotAccuracy: '30%' },
    },
    possessionData: {
      argentina: 65,
      netherlands: 35,
      contested: 10,
    },
    players: {
      team1: [
        { firstName: 'Lionel', lastName: 'Messi', goals: 1, team: 'Argentina' },
        { firstName: 'Ángel', lastName: 'Di María', goals: 1, team: 'Argentina' },
      ],
      team2: [
        { firstName: 'Virgil', lastName: 'van Dijk', goals: 1, team: 'Netherlands' },
      ]
    },
    heatmapData: {
      team1Name: 'Argentina',
      team2Name: 'Netherlands',
      leftChannel: { team1: 25, team2: 15 },
      centralChannel: { team1: 35, team2: 30 },
      rightChannel: { team1: 20, team2: 25 },
    },
    PolarData: {
      Argentina: {
        metrics: [
          { name: 'Possession', value: 45 },
          { name: 'Goals v Attempts', value: 17.14 },
          { name: 'Passes v Attempts', value: 80.0 },
          { name: 'Pct of Attacks Right', value: 50 },
          { name: 'Pct of Attacks Center', value: 25 },
          { name: 'Pct of Attacks Left', value: 25 },
          { name: 'On Target Attempts', value: 30 },
          { name: 'Goals Inside Pen', value: 10 },
        ],
      },
      Netherlands: {
        metrics: [
          { name: 'Possession', value: 35 },
          { name: 'Goals v Attempts', value: 10.0 },
          { name: 'Passes v Attempts', value: 78.0 },
          { name: 'Pct of Attacks Right', value: 40 },
          { name: 'Pct of Attacks Center', value: 35 },
          { name: 'Pct of Attacks Left', value: 25 },
          { name: 'On Target Attempts', value: 20 },
          { name: 'Goals Inside Pen', value: 15 },
        ],
      },
    }
  },
  // Add more matchups as needed...
};
