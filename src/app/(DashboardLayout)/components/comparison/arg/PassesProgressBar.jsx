import React from 'react';
import { Box, Typography, Tooltip } from '@mui/material';

export default function PassesProgressBar() {
  const completedPasses = 3841;
  const attemptedPasses = 4375;
  const completionPercentage = (completedPasses / attemptedPasses) * 100;

  return (
    <Tooltip
      title={
        <Box>
            <Typography variant="body1">
                Argentinas Passing Stats
            </Typography>
            <Box
        sx={{
          width: '100%',
          height: '1px',
          backgroundColor: 'white',
          marginBottom: '0px',
        }}
      />
          <Typography variant="body1">
            Completed Passes: {completedPasses}
          </Typography>
          <Typography variant="body1">
            Attempted Passes: {attemptedPasses}
          </Typography>
          <Typography variant="body1">
            Completion Percentage: {completionPercentage.toFixed(1)}%
          </Typography>
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
          border: '2px solid',
          borderColor: 'primary.main',
          borderRadius: '12px',
          padding: 1,
          width: '100%',
          height: '40px',
          backgroundColor: 'white',
          margin: '0 auto',  
          marginTop: '2px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.6)',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            height: 20,
            borderRadius: 5,
            backgroundColor: 'grey.300',
            overflow: 'hidden',
          }}
        >
          {/* Progress Bar */}
          <Box
            sx={{
              position: 'absolute',
              height: '100%',
              width: `${completionPercentage}%`,
              backgroundColor: 'primary.main',
              borderRadius: 10,
            }}
          />
          {/* Percentage Text */}
          <Typography
            variant="body1"
            sx={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            {completionPercentage.toFixed(1)}%
          </Typography>
        </Box>
      </Box>
    </Tooltip>
  );
}
