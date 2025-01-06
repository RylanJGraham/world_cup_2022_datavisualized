import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, List, ListItem, Tooltip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CountryFlag from '@/app/(DashboardLayout)/components/flags/FlagIcon';

const Heatmap = ({ data }) => {
  const theme = useTheme();
  const [selectedView, setSelectedView] = useState(0); // 0 for team1, 1 for team2, 2 for compare
  const [mounted, setMounted] = useState(false); // To prevent SSR mismatch

  useEffect(() => {
    setMounted(true); // Set to true after the component mounts
  }, []);

  if (!mounted) {
    return null; // Prevent rendering of the component until after mounting to avoid SSR mismatch
  }

  const zones = [
    { name: 'Left Channel', team1: data.leftChannel.team1, team2: data.leftChannel.team2 },
    { name: 'Central Channel', team1: data.centralChannel.team1, team2: data.centralChannel.team2 },
    { name: 'Right Channel', team1: data.rightChannel.team1, team2: data.rightChannel.team2 },
  ];

  const teamNames = {
    team1: data.team1Name || 'Team 1',
    team2: data.team2Name || 'Team 2',
  };

  const barColors = {
    team1: '#4B0082',
    team2: '#FA896B',
  };

  const generateXAxisValues = (maxValue) => {
  const values = [0]; // Start with 0
  for (let i = 5; i <= maxValue; i += 5) {
    values.push(i);
  }
  return values;
};

  const getTooltipContent = (teamName, attempts, channelName) => {
    return (
      <Box sx={{
        borderRadius: '8px', 
        textAlign: 'center'
      }}>
        {/* Flag */}
        <CountryFlag country={teamName} size={40} />
        
        {/* Team Name */}
        <Typography variant="h6" sx={{ fontWeight: 'bold', marginTop: '2px' }}>
          {teamName}
        </Typography>

        {/* Attempts Info */}
        <Typography variant="body1" sx={{ marginTop: '2px' }}>
          Attempts in <strong>{channelName}</strong>: <strong>{attempts}</strong>
        </Typography>
      </Box>
    );
  };

  return (
    <Box sx={{ marginTop: '20px', width: '100%' }}>
  <Typography variant="h4" sx={{ textAlign: 'left', marginBottom: '8px' }}>
    Attacking Locations - Bar Chart
  </Typography>
  <Box sx={{ width: '100%', height: '2px', backgroundColor: 'primary.main', marginBottom: '16px' }} />

  {/* Sidebar */}
  <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
    <Box sx={{
      width: '200px',
      marginRight: '20px',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <List>
        <ListItem disablePadding>
          <Button
            sx={{ margin: '0px 0', padding: '10px 15px' }}
            fullWidth
            variant={selectedView === 0 ? 'contained' : 'outlined'}
            onClick={() => setSelectedView(0)}
            startIcon={<CountryFlag country={teamNames.team1} size={40} />}
          >
            <Typography variant="h5">
              {teamNames.team1}
            </Typography>
          </Button>
        </ListItem>
        <ListItem disablePadding>
          <Button
            sx={{ margin: '10px 0', padding: '10px 15px' }}
            fullWidth
            variant={selectedView === 1 ? 'contained' : 'outlined'}
            onClick={() => setSelectedView(1)}
            startIcon={<CountryFlag country={teamNames.team2} size={40} />}
          >
            <Typography variant="h5">
              {teamNames.team2}
            </Typography>
          </Button>
        </ListItem>
        <ListItem disablePadding>
          <Button
            sx={{ margin: '0px 0', padding: '10px 15px' }}
            fullWidth
            variant={selectedView === 2 ? 'contained' : 'outlined'}
            onClick={() => setSelectedView(2)}
          >
            <Typography variant="h5">
              Compare
            </Typography>
          </Button>
        </ListItem>
      </List>
    </Box>

    {/* Heatmap Display */}
    <Box sx={{ marginTop: '8px', width: '100%' }}>
      <Box sx={{
        flex: 1,
        display: 'grid',
        gridTemplateRows: `repeat(${zones.length}, auto)`,
        gap: '20px',
        backgroundImage: 'url(/images/pitch/footballpitch.png)', // Replace with your image path
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // Added semi-transparency for the background
        borderRadius: '10px',
        padding: '10px',
      }}>
        {zones.map((zone, index) => (
          <Box key={index} sx={{ position: 'relative', marginBottom: '10px', marginTop: '20px' }}>
            {/* Caption Above the Zone */}
            <Typography
              variant="h4"
              sx={{
                position: 'absolute',
                top: '-20px',
                left: '0px',
                fontWeight: 'bold',
                color: 'white',
                textShadow: '2px 2px 2px rgba(0, 0, 0, 1.0)',
                maxWidth: '95%',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
              }}
            >
              {zone.name}
            </Typography>
            <Box sx={{ width: '100%', height: '2px', backgroundColor: 'white', marginBottom: '4px' }} />
            {/* Team Bar Sections */}
            {selectedView === 0 || selectedView === 1 ? (
              <Box
                sx={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  height: '100%',
                  backgroundColor: 'rgba(0, 0, 0, 0.0)',
                  borderRadius: '8px',
                }}
              >
                {/* Tooltip wrapped around individual bar */}
                <Tooltip
                  title={getTooltipContent(
                    selectedView === 0 ? teamNames.team1 : teamNames.team2,
                    selectedView === 0 ? zone.team1 : zone.team2,
                    zone.name
                  )}
                  arrow
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: `${Math.min(selectedView === 0 ? (zone.team1*3.0) : (zone.team2*3.0), 100)}%`, // Scale the bars to max 60%
                      height: '100%',
                      backgroundColor: selectedView === 0 ? barColors.team1 : barColors.team2,
                      borderRadius: '8px',
                      zIndex: 1,
                    }}
                  />
                </Tooltip>
                <Typography
                  variant="h6"
                  sx={{
                    position: 'relative',
                    zIndex: 2,
                    justifyContent: 'end',
                    color: 'white',
                    fontWeight: 'bold',
                    marginLeft: '10px',
                  }}
                >
                  {selectedView === 0 ? zone.team1 : zone.team2}
                </Typography>
              </Box>
            ) : (
              /* Compare View: Team1 and Team2 Rows */
              <Box sx={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: '5px' }}>
                {/* Team1 Row */}
                <Tooltip
                  title={getTooltipContent(teamNames.team1, zone.team1, zone.name)}
                  arrow
                >
                  <Box
                    sx={{
                      position: 'relative',
                      height: '20px',
                      width: `${Math.min(zone.team1 * 3.0, 100)}%`, // Scale to max 60% and adjust by 0.6 factor
                      backgroundColor: barColors.team1,
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      paddingLeft: '10px',
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        color: 'white',
                        fontWeight: 'bold',
                      }}
                    >
                      {zone.team1}
                    </Typography>
                  </Box>
                </Tooltip>

                {/* Team2 Row */}
                <Tooltip
                  title={getTooltipContent(teamNames.team2, zone.team2, zone.name)}
                  arrow
                >
                  <Box
                    sx={{
                      position: 'relative',
                      height: '20px',
                      width: `${Math.min(zone.team2 * 3.0, 100)}%`, // Scale to max 60% and adjust by 0.6 factor
                      backgroundColor: barColors.team2,
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      paddingLeft: '10px',
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        color: 'white',
                        fontWeight: 'bold',
                      }}
                    >
                      {zone.team2}
                    </Typography>
                  </Box>
                </Tooltip>
              </Box>
            )}
          </Box>
        ))}
      </Box>
      {/* X-Axis Container */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '8px' }}>
        
        {/* X-Axis Values (Notches) */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          {generateXAxisValues(35).map((value, index) => (
            <Box key={index} sx={{ width: '10px', textAlign: 'center', paddingLeft: '6px' }}>
              <Typography variant="body1">{value}</Typography>
            </Box>
          ))}
        </Box>

        {/* X-Axis Title */}
        <Typography
          variant="h5"
          sx={{
            marginTop: '6px',
            fontWeight: 'bold',
          }}
        >
          Attacks within Given Channel
        </Typography>
      </Box>
    </Box>
  </Box>
</Box>

  );
};

export default Heatmap;
