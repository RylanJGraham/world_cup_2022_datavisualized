import React from 'react';
import { Box, Typography, Tooltip } from '@mui/material';

export default function MultiPartProgressBar() {
  const stats = [
    { label: 'Crosses', value: 115, color: 'primary.main' },
    { label: 'Corners', value: 39, color: 'secondary.main' },
    { label: 'Penalties', value: 4, color: 'success.main' },
    { label: 'Free Kicks', value: 123, color: 'error.main' },
  ];

  const total = stats.reduce((acc, stat) => acc + stat.value, 0);

  return (
    <Box
      sx={{
        border: '2px solid',
        borderColor: 'primary.main',
        borderRadius: '12px',
        padding: 1,
        width: '100%',
        height: '180px',
        backgroundColor: 'white',
        margin: '0 auto',
        marginTop: '2px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.6)',
      }}
    >
      <Tooltip
        title={
          <Box>
            <Typography variant="body1">
                Argentinas Set Piece Stats
            </Typography>
            <Box
        sx={{
          width: '100%',
          height: '1px',
          backgroundColor: 'white',
          marginBottom: '0px',
        }}
      />
            {stats.map((stat) => (
              <Typography key={stat.label} variant="body1">
                {stat.label}: {stat.value}
              </Typography>
            ))}
            <Typography variant="body1">Total: {total}</Typography>
          </Box>
        }
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
            position: 'relative',
            height: 120,
            borderRadius: 4,
            backgroundColor: 'grey.300',
            display: 'flex',
            overflow: 'hidden',
          }}
        >
          {stats.map((stat) => (
            <Box
              key={stat.label}
              sx={{
                height: '100%',
                width: `${(stat.value / total) * 100}%`,
                backgroundColor: stat.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'black',
                fontWeight: 'bold',
                fontSize: 16,
              }}
            >
              {stat.value}
            </Box>
          ))}
        </Box>
      </Tooltip>

      {/* Legend Below the Bar */}
      <Box sx={{ display: 'flex', justifyContent: 'space-around', marginTop: 2 }}>
        {stats.map((stat) => (
          <Box key={stat.label} sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: stat.color,
                marginRight: 1,
              }}
            />
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              {stat.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
