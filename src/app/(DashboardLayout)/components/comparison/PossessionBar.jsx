import React from 'react';
import { Box, Typography, Tooltip } from '@mui/material';
import { FlagIcon } from 'react-flag-kit';

const countryCodeMapping = {
  Argentina: 'AR',
  France: 'FR',
};

const PossessionBar = ({ possessionData = { argentina: 0, france: 0, contested: 0 } }) => {

  return (
    <Box sx={{ marginTop: '20px', width: '100%' }}>
      <Typography variant="h4" sx={{ textAlign: 'left', marginBottom: '8px' }}>
        Game Possession
      </Typography>
      <Box sx={{ width: '100%', height: '2px', backgroundColor: 'primary.main', marginBottom: '10px' }} />

      <Box sx={{
        position: 'relative',
        width: '100%',
        height: '40px',
        borderRadius: '16px',
        display: 'flex',
        overflow: 'hidden',
        backgroundColor: '#e0e0e0',
      }}>
        {/* Argentina Possession */}
        <Tooltip title={
          <Box sx={{ textAlign: 'center' }}>
            <FlagIcon code={countryCodeMapping['Argentina']} style={{ width: '20px', height: '15px' }} />
            <Typography variant="subtitle2">Argentina: {possessionData.argentina}%</Typography>
          </Box>
        }>
          <Box
            sx={{
              width: `${possessionData.argentina}%`,
              backgroundColor: '#1a76d2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              paddingLeft: '10px',
            }}
          >
            <FlagIcon code={countryCodeMapping['Argentina']} style={{ width: '20px', height: '15px', marginRight: '5px' }} />
            <Typography variant="h4" sx={{ color: 'white' }}>
              Argentina
            </Typography>
          </Box>
        </Tooltip>

        {/* Contested Possession */}
        <Tooltip title={
          <Typography variant="subtitle2">Contested: {possessionData.contested}%</Typography>
        }>
          <Box
            sx={{
              width: `${possessionData.contested}%`,
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

        {/* France Possession */}
        <Tooltip title={
          <Box sx={{ textAlign: 'center' }}>
            <FlagIcon code={countryCodeMapping['France']} style={{ width: '20px', height: '15px' }} />
            <Typography variant="subtitle2">France: {possessionData.france}%</Typography>
          </Box>
        }>
          <Box
            sx={{
              width: `${possessionData.france}%`,
              backgroundColor: '#2f59a4',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              paddingLeft: '10px',
            }}
          >
            <FlagIcon code={countryCodeMapping['France']} style={{ width: '20px', height: '15px', marginRight: '5px' }} />
            <Typography variant="h4" sx={{ color: 'white' }}>
              France
            </Typography>
          </Box>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default PossessionBar;
