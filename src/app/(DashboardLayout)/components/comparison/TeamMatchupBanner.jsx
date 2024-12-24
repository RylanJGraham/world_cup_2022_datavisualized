'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import { FlagIcon } from 'react-flag-kit';

const countryCodeMapping = {
  Argentina: 'AR',
  France: 'FR',
  Qatar: 'QA',
  Ecuador: 'EC',
  England: 'GB',
  Iran: 'IR',
  Senegal: 'SN',
  Netherlands: 'NL',
  'United States': 'US',
  Wales: 'GB-WLS',
  'Saudi Arabia': 'SA',
  Denmark: 'DK',
  Tunisia: 'TN',
  Mexico: 'MX',
  Poland: 'PL',
  Australia: 'AU',
  Morocco: 'MA',
  Croatia: 'HR',
  Germany: 'DE',
  Japan: 'JP',
  Spain: 'ES',
  'Costa Rica': 'CR',
  Belgium: 'BE',
  Canada: 'CA',
  Switzerland: 'CH',
  Cameroon: 'CM',
  Uruguay: 'UY',
  'Korea Republic': 'KR',
  Portugal: 'PT',
  Ghana: 'GH',
  Brazil: 'BR',
  Serbia: 'RS',
};

const TeamMatchupBanner = ({ team1, team2 }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: '300px',
        backgroundColor: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Team 1 Flag and Name */}
      <Box
        sx={{
          width: '50%',
          height: '100%',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'flex-start',
          position: 'relative',
          borderTopLeftRadius: '20px',
          borderBottomLeftRadius: '20px',
          overflow: 'hidden',
        }}
      >
        <FlagIcon
          code={team1.code}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <Typography
          variant="h2"
          color="white"
          sx={{
            fontWeight: 'bold',
            position: 'absolute',
            bottom: '20px',
            left: '20px',
          }}
        >
          {team1.name}
        </Typography>
      </Box>

      {/* VS Icon */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 20,
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: '96px',
            fontWeight: 'bold',
            color: 'white',
            textShadow: '4px 2px 4px rgba(0, 0, 0, 0.9)',
          }}
        >
          VS
        </Typography>
      </Box>

      {/* Team 2 Flag and Name */}
      <Box
        sx={{
          width: '50%',
          height: '100%',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          position: 'relative',
          borderTopRightRadius: '20px',
          borderBottomRightRadius: '20px',
          overflow: 'hidden',
        }}
      >
        <FlagIcon
          code={team2.code}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <Typography
          variant="h2"
          color="white"
          sx={{
            fontWeight: 'bold',
            position: 'absolute',
            bottom: '20px',
            right: '20px',
          }}
        >
          {team2.name}
        </Typography>
      </Box>
    </Box>
  );
};

export default TeamMatchupBanner;
