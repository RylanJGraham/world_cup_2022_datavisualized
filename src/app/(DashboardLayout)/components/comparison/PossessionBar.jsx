import React from 'react';
import { Box, Typography, Tooltip } from '@mui/material';
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

// Helper function to get the country code
const getCountryCode = (teamName) => {
  return countryCodeMapping[teamName] || 'UN'; // 'UN' as fallback for undefined codes
};

const PossessionBar = ({ possessionData }) => {
  const { team1, team2, contested } = possessionData;

  return (
    <Box sx={{ marginTop: '20px', width: '100%' }}>
      <Typography variant="h4" sx={{ textAlign: 'left', marginBottom: '8px' }}>
        Game Possession
      </Typography>
      <Box sx={{ width: '100%', height: '2px', backgroundColor: 'primary.main', marginBottom: '10px' }} />

      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '40px',
          borderRadius: '16px',
          display: 'flex',
          overflow: 'hidden',
          backgroundColor: '#e0e0e0',
        }}
      >
        {/* Team 1 Possession */}
        <Tooltip
          title={
            <Box sx={{ textAlign: 'center' }}>
              <FlagIcon code={getCountryCode(team1.name)} style={{ width: '20px', height: '15px' }} />
              <Typography variant="subtitle2">{team1.name}: {team1.possession}%</Typography>
            </Box>
          }
        >
          <Box
            sx={{
              width: `${team1.possession}%`,
              backgroundColor: '#1a76d2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              paddingLeft: '10px',
            }}
          >
            <FlagIcon code={getCountryCode(team1.name)} style={{ width: '20px', height: '15px', marginRight: '5px' }} />
            <Typography variant="h4" sx={{ color: 'white' }}>
              {team1.name}
            </Typography>
          </Box>
        </Tooltip>

        {/* Contested Possession */}
        {contested > 0 && (
          <Tooltip title={<Typography variant="subtitle2">Contested: {contested}%</Typography>}>
            <Box
              sx={{
                width: `${contested}%`,
                backgroundColor: '#a0a0a0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="body1" sx={{ color: 'white' }}>
                Contested
              </Typography>
            </Box>
          </Tooltip>
        )}

        {/* Team 2 Possession */}
        <Tooltip
          title={
            <Box sx={{ textAlign: 'center' }}>
              <FlagIcon code={getCountryCode(team2.name)} style={{ width: '20px', height: '15px' }} />
              <Typography variant="subtitle2">{team2.name}: {team2.possession}%</Typography>
            </Box>
          }
        >
          <Box
            sx={{
              width: `${team2.possession}%`,
              backgroundColor: 'primary.main',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              paddingLeft: '10px',
            }}
          >
            <FlagIcon code={getCountryCode(team2.name)} style={{ width: '20px', height: '15px', marginRight: '5px' }} />
            <Typography variant="h4" sx={{ color: 'white' }}>
              {team2.name}
            </Typography>
          </Box>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default PossessionBar;
