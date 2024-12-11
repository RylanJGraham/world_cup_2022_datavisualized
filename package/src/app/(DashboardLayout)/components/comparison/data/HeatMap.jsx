'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, List, ListItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CountryFlag from '@/app/(DashboardLayout)/components/flags/FlagIcon';

const Heatmap = ({ data }) => {
  const theme = useTheme();
  const [selectedTeam, setSelectedTeam] = useState(0); // 0 for team1, 1 for team2
  const [mounted, setMounted] = useState(false); // To prevent SSR mismatch

  useEffect(() => {
    setMounted(true); // Set to true after the component mounts
  }, []);

  if (!mounted) {
    return null; // Prevent rendering of the component until after mounting to avoid SSR mismatch
  }

  const zones = [
    { name: 'Left Channel', team1: data.leftChannel.team1, team2: data.leftChannel.team2 },
    { name: 'Left Inside Channel', team1: data.leftInsideChannel.team1, team2: data.leftInsideChannel.team2 },
    { name: 'Central Channel', team1: data.centralChannel.team1, team2: data.centralChannel.team2 },
    { name: 'Right Inside Channel', team1: data.rightInsideChannel.team1, team2: data.rightInsideChannel.team2 },
    { name: 'Right Channel', team1: data.rightChannel.team1, team2: data.rightChannel.team2 },
  ];

  // Extract team names dynamically from data
  const teamNames = {
    team1: data.team1Name || 'Team 1', // Default fallback if the name is missing
    team2: data.team2Name || 'Team 2', // Default fallback if the name is missing
  };

  // Adjusting the color logic to a much lighter blue gradient
  const getHeatmapColor = (value) => {
    const blue = Math.max(0, 240 - value * 5.5); // Lighter shades of blue
    return `rgb(100, 0, ${blue})`; // Lighter blue shades with greenish tint
  };

  return (
    <Box sx={{ marginTop: '20px', width: '100%' }}>
      <Typography variant="h4" sx={{ textAlign: 'left', marginBottom: '8px' }}>
        Possession Locations
      </Typography>
      <Box sx={{ width: '100%', height: '2px', backgroundColor: 'lightgrey', marginBottom: '0px' }} />

      <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: '16px', width: '100%' }}>
        {/* Sidebar: Team Toggle Buttons */}
        <Box sx={{
            width: '200px', // Adjust width for the button list
            marginRight: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
        }}>
          <Typography variant="h4" sx={{ marginBottom: '10px', textAlign: 'left' }}>
            Compare Teams
          </Typography>
          <List 
          sx={{
            '& .MuiListItemButton:not(:last-child)': {
              borderBottom: '1px solid #ddd',
            },
            padding: '10px',
            borderRadius: '10px',
            backgroundColor: 'white',
            borderBottom: '2px solid rgba(0, 0, 0, 0.1)',
          }}>
            <ListItem disablePadding>
              <Button
                sx={{
                    margin: '10px 0',
                    padding: '15px 20px',
                }}
                fullWidth
                variant={selectedTeam === 0 ? 'contained' : 'outlined'}
                onClick={() => setSelectedTeam(0)}
                startIcon={<CountryFlag country={teamNames.team1} size={40} />}
              >
                <Typography variant="h4" sx={{ textAlign: 'left' }}>
                  {teamNames.team1}
                </Typography>
              </Button>
            </ListItem>
            <ListItem disablePadding>
              <Button
                sx={{
                    margin: '10px 0',
                    padding: '15px 20px',
                }}
                fullWidth
                variant={selectedTeam === 1 ? 'contained' : 'outlined'}
                onClick={() => setSelectedTeam(1)}
                startIcon={<CountryFlag country={teamNames.team2} size={40} />}
              >
                <Typography variant="h4" sx={{ textAlign: 'left' }}>
                  {teamNames.team2}
                </Typography>
              </Button>
            </ListItem>
          </List>
        </Box>

        {/* Heatmap Display with Football Pitch Background */}
        <Box sx={{
          flex: 1,
          display: 'grid',
          gridTemplateRows: `repeat(${zones.length}, 1fr)`,
          gap: '20px',
          height: '300px',  // Ensures the heatmap height is properly set
          overflowY: 'auto', // Ensures scrolling is possible if needed
          backgroundImage: 'url(/images/pitch/football-pitch.png)', // Replace with your image path
          backgroundSize: 'cover', // Makes sure the image covers the entire area
          backgroundPosition: 'center', // Centers the image
          borderRadius: '10px', // Optional, to round the corners
        }}>
          {zones.map((zone, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: getHeatmapColor(selectedTeam === 0 ? zone.team1 : zone.team2),
                padding: '10px',
                borderRadius: '8px',
                color: 'white',
                opacity: 0.8, // Optional: Adds transparency to the background to ensure the pitch is visible
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 'bold', color:'primary.main' }}>
                {zone.name}
              </Typography>
              <Typography variant="h5" sx={{color:'primary.main'}}>
                {selectedTeam === 0 ? zone.team1 : zone.team2}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Heatmap;
