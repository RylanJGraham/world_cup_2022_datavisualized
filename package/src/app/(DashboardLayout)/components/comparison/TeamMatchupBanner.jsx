'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import { FlagIcon } from 'react-flag-kit';

// Country code mapping for flags
const countryCodeMapping = {
  Argentina: 'AR',
  France: 'FR',
};

const TeamMatchupBanner = () => {
  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      height: '300px',
      backgroundColor: 'white',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Argentina Flag and Name */}
      <Box sx={{
        width: '50%',
        height: '100%',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        position: 'relative',
        borderTopLeftRadius: '20px',
        borderBottomLeftRadius: '20px',
        overflow: 'hidden',
      }}>
        <FlagIcon code={countryCodeMapping['Argentina']} style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }} />
        <Typography variant="h2" color="white" sx={{
          fontWeight: 'bold',
          position: 'absolute',
          bottom: '20px',
          left: '20px',
        }}>
          Argentina
        </Typography>
      </Box>

      {/* VS Icon */}
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 20,
      }}>
        <Typography variant="h1" sx={{
          fontSize: '96px',
          fontWeight: 'bold',
          color: 'white',
          textShadow: '4px 2px 4px rgba(0, 0, 0, 0.9)',
        }}>
          VS
        </Typography>
      </Box>

      {/* France Flag and Name */}
      <Box sx={{
        width: '50%',
        height: '100%',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        position: 'relative',
        borderTopRightRadius: '20px',
        borderBottomRightRadius: '20px',
        overflow: 'hidden',
      }}>
        <FlagIcon code={countryCodeMapping['France']} style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }} />
        <Typography variant="h2" color="white" sx={{
          fontWeight: 'bold',
          position: 'absolute',
          bottom: '20px',
          right: '20px',
        }}>
          France
        </Typography>
      </Box>
    </Box>
  );
};

export default TeamMatchupBanner;
