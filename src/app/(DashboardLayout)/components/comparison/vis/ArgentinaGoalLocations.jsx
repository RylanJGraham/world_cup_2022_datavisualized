'use client';

import React, { useState } from 'react';
import { Box, Typography, IconButton, Tooltip, Popover, } from '@mui/material';
import CountryFlag from '@/app/(DashboardLayout)/components/flags/FlagIcon'; // Assuming this component exists
import InfoIcon from '@mui/icons-material/Info'; // Import the Info icon
import Image from 'next/image'; // Next.js Image component

// Sample Team Data (attempts and goals inside/outside the box)
const teamData = {
  Mexico: { insideBoxAttempts: 8, insideBoxGoals: 3, outsideBoxAttempts: 5, outsideBoxGoals: 1 },
  Netherlands: { insideBoxAttempts: 12, insideBoxGoals: 5, outsideBoxAttempts: 7, outsideBoxGoals: 2 },
  Poland: { insideBoxAttempts: 9, insideBoxGoals: 2, outsideBoxAttempts: 4, outsideBoxGoals: 0 },
  France: { insideBoxAttempts: 7, insideBoxGoals: 3, outsideBoxAttempts: 3, outsideBoxGoals: 0 },
  Australia: { insideBoxAttempts: 7, insideBoxGoals: 3, outsideBoxAttempts: 3, outsideBoxGoals: 0 },
  Croatia: { insideBoxAttempts: 7, insideBoxGoals: 3, outsideBoxAttempts: 5, outsideBoxGoals: 1 },
  SaudiArabia: { insideBoxAttempts: 7, insideBoxGoals: 3, outsideBoxAttempts: 5, outsideBoxGoals: 1 },
};

// Team colors for styling
const teamColors = {
  SaudiArabia: '#FA896B',
  Mexico: '#49BEFF',
  Poland: '#008080',
  Australia: '#7F1431',
  Netherlands: '#FFD700',
  Croatia: '#228B22',
  France: '#4B0082',
};

// Background image
const backgroundImage = '/images/pitch/halfpitch.png'; // Replace with the actual image path

const ArgentinaGoalLocations = () => {
  const [selectedTeams, setSelectedTeams] = useState([]); // Track selected teams
  const [insideBoxDots, setInsideBoxDots] = useState([]); // Dots for inside box
  const [outsideBoxDots, setOutsideBoxDots] = useState([]); // Dots for outside box
  const [anchorEl, setAnchorEl] = useState(null); // State for the popover

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const isPopoverOpen = Boolean(anchorEl);

  // Toggle team selection (add or remove dots)
  const toggleTeamSelection = (team) => {
    if (selectedTeams.includes(team)) {
      // Remove the team dots from both rows
      setSelectedTeams((prev) => prev.filter((t) => t !== team));
      removeTeamDots(team);
    } else {
      // Add the team dots to both rows
      setSelectedTeams((prev) => [...prev, team]);
      addTeamDots(team);
    }
  };

  // Function to add dots for a specific team
  const addTeamDots = (team) => {
    const { insideBoxAttempts, insideBoxGoals, outsideBoxAttempts, outsideBoxGoals } = teamData[team];

    let insideDots = [];
    insideDots.push(
      <Tooltip
        key={`inside-attempt-${team}`}
        title={
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
              Inside Box {/* Or change to Outside Box depending on context */}
            </Typography>
            <Typography variant="body2">Against: {team}</Typography>
            <Typography variant="body2">Attempts: {insideBoxAttempts}</Typography>
            <Typography variant="body2">Goals: {insideBoxGoals}</Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginTop: '8px' }}>
              {((insideBoxGoals / insideBoxAttempts) * 100).toFixed(1)}% Conversion
            </Typography>
          </Box>
        }
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
            width: `${Math.min(insideBoxAttempts * 8, 80)}px`,
            height: `${Math.min(insideBoxAttempts * 8, 80)}px`,
            border: `2px solid ${teamColors[team]}`,
            borderRadius: '50%',
            backgroundColor: 'transparent',
            margin: '5px',
            position: 'relative',
          }}
        >
          {/* Inside box goal circle nested inside attempt circle */}
          <Box
            key={`inside-goal-${team}`}
            sx={{
              width: `${Math.min(insideBoxGoals * 8, 80)}px`,
              height: `${Math.min(insideBoxGoals * 8, 80)}px`,
              border: `2px solid ${teamColors[team]}`,
              borderRadius: '50%',
              backgroundColor: teamColors[team],
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        </Box>
    </Tooltip>
    );

    // Outside box dots (attempts and goals)
    let outsideDots = [];
    outsideDots.push(
      <Tooltip
  key={`outside-attempt-${team}`}
  title={
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
      Outside Box {/* Or change to Outside Box depending on context */}
      </Typography>
      <Typography variant="body2">Against: {team}</Typography>
      <Typography variant="body2">Attempts: {outsideBoxAttempts}</Typography>
      <Typography variant="body2">Goals: {outsideBoxGoals}</Typography>
      <Typography variant="h6" sx={{ fontWeight: 'bold', marginTop: '8px' }}>
        {((outsideBoxGoals / outsideBoxAttempts) * 100).toFixed(1)}% Conversion
      </Typography>
    </Box>
  }
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
      width: `${Math.min(outsideBoxAttempts * 8, 80)}px`,
      height: `${Math.min(outsideBoxAttempts * 8, 80)}px`,
      border: `2px solid ${teamColors[team]}`,
      borderRadius: '50%',
      backgroundColor: 'transparent',
      margin: '5px',
      position: 'relative',
    }}
  >
    {/* Inside box goal circle nested inside attempt circle */}
    <Box
      key={`outside-goal-${team}`}
      sx={{
        width: `${Math.min(outsideBoxGoals * 8, 80)}px`,
        height: `${Math.min(outsideBoxGoals * 8, 80)}px`,
        border: `2px solid ${teamColors[team]}`,
        borderRadius: '50%',
        backgroundColor: teamColors[team],
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    />
  </Box>
</Tooltip>
    );

    // Update the rows with the new dots
    setInsideBoxDots((prev) => [...prev, ...insideDots]);
    setOutsideBoxDots((prev) => [...prev, ...outsideDots]);
  };

  // Function to remove dots for a specific team
  const removeTeamDots = (team) => {
    const { insideBoxAttempts, insideBoxGoals, outsideBoxAttempts, outsideBoxGoals } = teamData[team];

    // Remove inside box dots (attempts and goals)
    let insideDots = insideBoxDots.filter((dot) => !dot.key.includes(team));

    // Remove outside box dots (attempts and goals)
    let outsideDots = outsideBoxDots.filter((dot) => !dot.key.includes(team));

    // Update the rows by removing the dots for the unselected team
    setInsideBoxDots(insideDots);
    setOutsideBoxDots(outsideDots);
  };

  // Get max attempts/goals across all teams to scale the legend
const maxAttempts = Math.max(
  ...Object.values(teamData).map((team) => Math.max(team.insideBoxAttempts, team.outsideBoxAttempts))
);
const maxGoals = Math.max(
  ...Object.values(teamData).map((team) => Math.max(team.insideBoxGoals, team.outsideBoxGoals))
);
const max = Math.max(maxAttempts, maxGoals); // Max of attempts or goals to use for scaling

// Function to create legend circles with proper scaling
const createLegendCircles = () => {
  const scale = Math.max(Math.floor(max / 5), 1); // Adjust scale to better fit the range
  const circles = [];
  for (let i = 1; i <= max; i += scale) {
    circles.push(
      <Box
        key={i}
        sx={{
          display: 'flex',
          flexDirection: 'column', // Stack circle and label vertically
          alignItems: 'center', 
          justifyContent: 'center',   // Center-align the circle and the size text
          margin: '0 8px',         // Add margin for spacing
        }}
      >
        <Box
          sx={{
            width: `${Math.min(i * 8, 80)}px`,    // Adjusted scaling factor to 5 for more consistent sizes
            height: `${Math.min(i * 8, 80)}px`,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'primary.main', // Color for filled circle (legend)    // Space between circle and label
          }}
          >
          <Typography variant="h6" sx={{ fontSize: '18px', color: 'white' }}>
                    {i} {/* Display the size value */}
                  </Typography>
          </Box>
        
      </Box>
    );
  }
  return circles;
};

  return (
    <Box sx={{ width: '100%', marginTop: '0px' }}>
      {/* Header Section */}
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '0px' }}>
        <Typography variant="h4" sx={{ textAlign: 'left' }}>
          Goal Scoring Locations
        </Typography>
        <IconButton
          onClick={handlePopoverOpen}
          sx={{ marginLeft: '8px', color: 'primary.main' }}
        >
          <InfoIcon />
        </IconButton>
        <Popover
          open={isPopoverOpen}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Box sx={{ padding: '16px', maxWidth: '300px', backgroundColor: 'primary.main' }}>
            <Typography variant="body1" sx={{color: 'white'}}>
              This chart shows Argentina&apos;s shot locations & goal conversions when against selected teams in various matches. Select teams below to compare their data.
            </Typography>
          </Box>
        </Popover>
      </Box>

      <Box
        sx={{
          width: '100%',
          height: '2px',
          backgroundColor: 'primary.main',
          marginBottom: '10px',
        }}
      />

      {/* Image Section with Background */}
      <Box
        sx={{
          width: '100%',
          minHeight: '500px',
          position: 'relative',
          border: '2px solid',
          borderColor: 'primary.main',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.6)',
          backgroundColor: 'white',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* Background Image */}
        <Box sx={{ position: 'relative', width: '100%', height: '500px' }}>
          <Image
            src={backgroundImage}
            alt="Goal scoring locations"
            layout="fill"
            objectFit="cover" // Center the image within the container
            style={{ opacity: 0.8 }}
          />

          {/* Row 1 Dots (Inside Box) */}
          <Box
            sx={{
              position: 'absolute',
              top: '6%',
              left: '26%',
              width: '47%',
              height: '30%',
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '6px', // Space between dots
            }}
          >
            {insideBoxDots}
          </Box>

          {/* Row 2 Dots (Outside Box) */}
          <Box
            sx={{
              position: 'absolute',
              top: '42%',
              left: '9%',
              width: '80%',
              height: '30%',
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            {outsideBoxDots}
          </Box>
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            marginTop: '0px',
            position: 'absolute',
            top: '76%',
            left: '0%',
            width: '100%',
            paddingLeft: '16px',
            paddingRight: '16px',
            paddingTop: '20px',
            paddingBottom: '20px',
            backgroundColor: '#FFFFFF80'
          }}>
            <Box
                sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                paddingLeft: '16px',
                paddingRight: '16px',
                backgroundColor: 'transaparent'
                }}
            >
            <Typography variant="h5" sx={{ textAlign: 'center', color: 'primary.main', marginRight: '20px' }}>
             Size Key
            </Typography>
            <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                overflowX: 'auto', // Allow horizontal scrolling if there are too many circles
                gap: '8px',
            }}
            >
            {createLegendCircles()}
            </Box>
            </Box>
            <Box
                sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '0px',
                gap: 1, 
                paddingLeft: '16px',
                paddingRight: '16px',
                backgroundColor: 'transaparent'
                }}
            >
            <Typography variant="h5" sx={{ color: 'primary.main' }}>Attempts</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                <Box
                    sx={{
                        width: '40px',
                        height: '40px',
                        border: '2px solid',
                        borderColor: 'primary.main',
                        borderRadius: '50%',
                        margin: '5px',
                    }}
                />
            </Box>
                <Typography variant="h5" sx={{ color: 'primary.main', marginLeft: '10px' }}>Goals</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                <Box
                    sx={{
                      width: '40px',
                      height: '40px',
                      border: '2px solid',
                      borderColor: 'primary.main',
                      backgroundColor: 'primary.main',
                      borderRadius: '50%',
                      margin: '5px',
                    }}
                />
            </Box>
            </Box>
            </Box>
            </Box>
      </Box>

      {/* Team Buttons */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: '16px',
          marginTop: '16px',
          flexWrap: 'wrap',
        }}
      >
        {Object.keys(teamData).map((team) => (
          <Box
            key={team}
            onClick={() => toggleTeamSelection(team)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '10px 32px',
              borderRadius: '8px',
              cursor: 'pointer',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.6)',
              backgroundColor: selectedTeams.includes(team) ? teamColors[team] : '#FFFFFF',
              color: selectedTeams.includes(team) ? '#FFFFFF' : teamColors[team],
              border: `2px solid ${teamColors[team]}`,
              transition: 'background-color 0.3s, color 0.3s',
              '&:hover': {
                backgroundColor: selectedTeams.includes(team)
                  ? teamColors[team]
                  : `${teamColors[team]}33`, // Slight transparent hover effect
              },
            }}
          >
            <CountryFlag country={team} size={32} />
            <Typography variant="body1" sx={{ marginLeft: '8px', fontWeight: 'bold' }}>
              {team}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ArgentinaGoalLocations;
