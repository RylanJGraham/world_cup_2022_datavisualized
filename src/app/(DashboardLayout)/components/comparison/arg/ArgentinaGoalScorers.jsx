import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { Box, Typography, Tooltip } from '@mui/material';
import Image from 'next/image';

export default function ArgentinaGoalScorers() {
  // Goal scorers data for Argentina with preferred positions
  const players = [
    { firstName: 'Lionel', lastName: 'Messi', goals: 7, position: { top: '15%', left: '60%' } },
    { firstName: 'Julián', lastName: 'Álvarez', goals: 4, position: { top: '15%', left: '40%' } },
    { firstName: 'Enzo', lastName: 'Fernández', goals: 1, position: { top: '40%', left: '30%' } },
    { firstName: 'Alexis Mac', lastName: 'Allister', goals: 1, position: { top: '40%', left: '50%' } },
    { firstName: 'Nahuel', lastName: 'Molina', goals: 1, position: { top: '70%', left: '50%' } },
    { firstName: 'Ángel', lastName: 'Di María', goals: 1, position: { top: '40%', left: '70%' } },
  ];

  // Color palette from previous discussion
  const colorPalette = [
    '#FA896B', // Soft Coral
    '#49BEFF', // Sky Blue
    '#008080', // Teal
    '#7F1431', // Deep Maroon
    '#FFD700', // Bright Yellow
    '#228B22', // Forest Green
    '#FF6F61', // Burnt Orange
    '#4B0082', // Indigo
  ];

  // Function to format the player image path
  const formatPlayerImagePath = (lastName) => {
    return `/images/Players/argentina/${lastName
      .toLowerCase()
      .replace(' ', '_')
      .replace('á', 'a')
      .replace('Á', 'a')
      .replace('é', 'e')
      .replace('í', 'i')
      .replace('ó', 'o')
      .replace('ú', 'u')}.webp`;
  };

  return (
    <Box
      sx={{
        border: '2px solid',
        borderColor: 'primary.main',
        borderRadius: '12px',
        backgroundColor: 'white',
        padding: 2,
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.6)',
        width: '100%',
        marginLeft: 1,
        marginRight: 1,
      }}
    >
      <Typography variant="h6" gutterBottom textAlign="center" sx={{ color: 'primary.main' }}>
        Argentina Goal Scorers Across the Tournament
      </Typography>
      <Box
        sx={{
          width: '100%',
          height: '2px',
          backgroundColor: 'primary.main',
          marginBottom: '0px',
        }}
      />
      <Box
        sx={{
          display: 'flex',
          gap: 4,
          marginTop: '20px',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
      >
        {/* Left Column for Image */}
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '300px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 4,
          }}
        >
          <Image
            src="/images/arg/field.png"
            alt="Football Field"
            layout="fill"
            objectFit="cover"
            priority
            style={{ borderRadius: '20px' }}
          />
          {players.map((player, index) => (
            <Tooltip
              key={index}
              title={
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                  <Image
                    src={formatPlayerImagePath(player.lastName)}
                    alt={`${player.firstName} ${player.lastName}`}
                    width={180}
                    height={180}
                    style={{ margin: '2px 0' }}
                  />
                  <Box sx={{ textAlign: 'left' }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', marginTop: '20px' }}>
                      {`${player.firstName} ${player.lastName}`}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', marginTop: '20px' }}>
                      {`Goals: ${player.goals}`}
                    </Typography>
                  </Box>
                </Box>
              }
              placement="right"
              arrow
              PopperProps={{
                sx: {
                  '.MuiTooltip-tooltip': {
                    backgroundColor: 'primary.main', // Change the background color
                    color: 'white', // Change the text color inside the tooltip
                  },
                },
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: player.position.top,
                  left: player.position.left,
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  transform: 'translate(-50%, -50%)',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translate(-50%, -50%) scale(1.3)', // Grow on hover
                  },
                }}
              >
                <Image
                  src={formatPlayerImagePath(player.lastName)}
                  alt={`${player.firstName} ${player.lastName}`}
                  layout="fill"
                  objectFit="cover"
                />
              </Box>
            </Tooltip>
          ))}
        </Box>

        {/* Right Column for Pie Chart */}
        <Box
          sx={{
            width: '50%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <PieChart
            series={[
              {
                data: players.map((player, index) => ({
                  id: `${player.firstName} ${player.lastName}`,
                  label: `${player.firstName} ${player.lastName}`,
                  value: player.goals,
                  color: colorPalette[index], // Assign color from the palette
                })),
                highlightScope: { fade: 'global', highlight: 'item' },
                faded: {
                  innerRadius: 30,
                  additionalRadius: -30,
                  color: 'gray',
                },
              },
            ]}
            height={300}
            width={600}
          />
        </Box>
      </Box>
    </Box>
  );
}
