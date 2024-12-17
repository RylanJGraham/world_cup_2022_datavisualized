import React, { useState } from 'react';
import { Box, Typography, Tab, Tabs } from '@mui/material';
import { RadialBarChart, RadialBar, Tooltip, ResponsiveContainer, Legend } from 'recharts'; // Import RadialBarChart and Tooltip from Recharts
import CountryFlag from '@/app/(DashboardLayout)/components/flags/FlagIcon'; // Import CountryFlag
import { useTheme } from '@mui/material/styles'; // Import useTheme hook

const GoalScorers = ({ players }) => {
  const theme = useTheme(); // Access the theme using useTheme hook
  const [currentIndex, setCurrentIndex] = useState(0); // Start at the first player in the array
  const [selectedTab, setSelectedTab] = useState('all'); // Default to 'all' players

  // Flatten players into an array
  const team1Players = players.team1 || [];
  const team2Players = players.team2 || [];

  // Combine the players into one list
  const allPlayers = [...team1Players, ...team2Players];

  // Calculate total goals for Team 1, Team 2, and both teams combined
  const totalGoalsTeam1 = team1Players.reduce((acc, player) => acc + player.goals, 0);
  const totalGoalsTeam2 = team2Players.reduce((acc, player) => acc + player.goals, 0);
  const totalGoals = totalGoalsTeam1 + totalGoalsTeam2;

  // Safeguard for zero goals
  const safeTotalGoalsTeam1 = totalGoalsTeam1 > 0 ? totalGoalsTeam1 : 1;
  const safeTotalGoalsTeam2 = totalGoalsTeam2 > 0 ? totalGoalsTeam2 : 1;
  const safeTotalGoals = totalGoals > 0 ? totalGoals : 1;

  const colorPalette = [
    '#6BC4FF', // Green
    '##5194FF', // Purple
    '#3859FF', // Tomato (Red)
    '#322CFF', // Gold
    '#8884d8',
    '#82ca9d',
  ];

  const getPlayerColor = (playerName, colorPalette) => {
    const index = playerName.split(' ').join('').charCodeAt(0) % colorPalette.length;
    return colorPalette[index];
  };

  // Calculate the radial data for each team, based on their respective goals
const radialData = {
  team1: team1Players.map((player) => ({
    name: `${player.firstName} ${player.lastName}`,
    uv: Math.round((player.goals / safeTotalGoalsTeam1) * 100), // Percentage of team1 total goals
    fill: getPlayerColor(`${player.firstName} ${player.lastName}`, colorPalette), // Get consistent color
  })),
  team2: team2Players.map((player) => ({
    name: `${player.firstName} ${player.lastName}`,
    uv: Math.round((player.goals / safeTotalGoalsTeam2) * 100), // Percentage of team2 total goals
    fill: getPlayerColor(`${player.firstName} ${player.lastName}`, colorPalette), // Get consistent color
  })),
  all: [
    ...team1Players.map((player) => ({
      name: `${player.firstName} ${player.lastName}`,
      uv: Math.round((player.goals / safeTotalGoals) * 100), // Percentage of total goals
      fill: getPlayerColor(`${player.firstName} ${player.lastName}`, colorPalette), // Get consistent color
    })),
    ...team2Players.map((player) => ({
      name: `${player.firstName} ${player.lastName}`,
      uv: Math.round((player.goals / safeTotalGoals) * 100), // Percentage of total goals
      fill: getPlayerColor(`${player.firstName} ${player.lastName}`, colorPalette), // Get consistent color
    })),
  ],
};
  

    


  // Handle player click (for enlarging player on click)
  const handlePlayerClick = (index) => {
    setCurrentIndex(index);
  };

  // Handle tab change for team filtering
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  // Format the last name to match the image filename (replace spaces with underscores and ensure correct case)
  const formatFileName = (name) => {
    return name
      .toLowerCase()
      .replace(/\s+/g, '_')  // Replace spaces with underscores
      .normalize("NFD").replace(/[\u0300-\u036f]/g, '');  // Remove accents (optional)
  };

  // Function to get the caption for the chart based on selected tab
  const getChartCaption = () => {
    if (selectedTab === 'team1' && totalGoalsTeam1 > 0) {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '0px' }}>
          <CountryFlag country={team1Players[0]?.team} size={20} />
          <Typography variant="h4" sx={{ marginLeft: '5px', textAlign: 'center' }}>
            Player Goal Contribution Percentage for {team1Players[0]?.team}
          </Typography>
        </Box>
      );
    } else if (selectedTab === 'team2' && totalGoalsTeam2 > 0) {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '0px' }}>
          <CountryFlag country={team2Players[0]?.team} size={20} />
          <Typography variant="h4" sx={{ marginLeft: '5px', textAlign: 'center' }}>
            Player Goal Contribution Percentage for {team2Players[0]?.team}
          </Typography>
        </Box>
      );
    } else {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '0px' }}>
          {totalGoalsTeam1 > 0 && <CountryFlag country={team1Players[0]?.team} size={20} />}
          {totalGoalsTeam2 > 0 && <CountryFlag country={team2Players[0]?.team} size={20} sx={{ marginLeft: '10px' }} />}
          <Typography variant="h4" sx={{ marginLeft: '10px', textAlign: 'center' }}>
            Player Goal Contribution Percentage for Match
          </Typography>
        </Box>
      );
    }
  };

  return (
    <Box sx={{ marginTop: '20px', width: '100%' }}>
        <Typography variant="h4" sx={{ textAlign: 'left', marginBottom: '8px' }}>
        Attacking Locations - Bar Chart
      </Typography>
      <Box sx={{ width: '100%', height: '2px', backgroundColor: 'primary.main', marginBottom: '16px' }} />
    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
      {/* Left Section for Player Cards */}
      <Box sx={{
        width: '50%', // Occupy 45% of the container's width
        display: 'flex',
        flexDirection: 'column', // Stack the player cards vertically
        justifyContent: 'top',
        alignItems: 'top',
        overflow: 'visible', // Allow scrolling if needed
        marginRight: '20px' // Add some space between the sections
      }}>
        {/* Tabs for Team 1, Team 2, and All Players */}
        <Tabs value={selectedTab} onChange={handleTabChange} centered>
        {totalGoalsTeam1 > 0 && (
          <Tab label={
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CountryFlag country={team1Players[0]?.team} size={20} />
              <Typography variant="body1" sx={{ marginLeft: '5px' }}>
                {team1Players[0]?.team}
              </Typography>
            </Box>
          } value="team1" />
        )}
        {totalGoalsTeam2 > 0 && (
          <Tab label={
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CountryFlag country={team2Players[0]?.team} size={20} />
              <Typography variant="body1" sx={{ marginLeft: '5px' }}>
                {team2Players[0]?.team}
              </Typography>
            </Box>
          } value="team2" />
        )}
        <Tab label={
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body1">All</Typography>
          </Box>
        } value="all" />
      </Tabs>

        {/* Player Cards Gallery */}
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '20px',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'visible',
          marginLeft: '70px', // Adjust for player card centering
          marginTop: '80px', // Adjust top margin for spacing
        }}>
          {(selectedTab === 'all' ? allPlayers : selectedTab === 'team1' ? team1Players : team2Players).map((player, index) => (
            <Box key={index} sx={{
              textAlign: 'center',
              width: '180px',
              height: '160px',
              transition: 'transform 0.3s ease, width 0.3s ease, height 0.3s ease',
              transform: currentIndex === index ? 'scale(1.5)' : 'scale(1)',
              cursor: 'pointer',
              borderRadius: '50%',
              position: 'relative',
              zIndex: currentIndex === index ? 20 : 1,
              border: currentIndex === index ? `4px solid ${theme.palette.primary.main}` : 'none',
            }} onClick={() => handlePlayerClick(index)}>
              {/* Flag Background */}
              <Box sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 0,
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
              }}>
                <CountryFlag country={player.team} size={240} />
              </Box>

              {/* Player Image */}
              <img
                src={`/images/Players/${player.team.toLowerCase()}/${formatFileName(player.lastName)}.webp`}
                alt={player.lastName}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '50%',
                  position: 'relative',
                  zIndex: 1,
                }}
              />
              {/* Player Name and Goals */}
              <Box sx={{
                position: 'absolute',
                bottom: '10px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 2,
                color: 'white',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
              }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {player.firstName} {player.lastName}
                </Typography>
                <Typography variant="body2">
                  Goals: {player.goals}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Right Section for Chart */}
      <Box sx={{
        width: '100%', // Occupy the remaining 50% of the container
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Center the content horizontally
        justifyContent: 'flex-start',
      }}>
        {/* Chart Title */}
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '0px', marginTop: '20px' }}>
          {getChartCaption()} {/* Chart caption based on selected tab */}
        </Box>

        {/* Radial Bar Chart */}
        <Box sx={{
          width: '100%', // Allow the chart to take up the full width
          height: '400px',
          margin: '0px',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'left',
          alignItems: 'left',
        }}>
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart 
              width={1400} 
              height={250} 
              innerRadius="20%" 
              outerRadius="80%" 
              data={radialData[selectedTab]} // Update chart data based on selectedTab
              startAngle={0} 
              endAngle={360}
            >
              <RadialBar 
                minAngle={0} 
                label={{ fill: 'white', position: 'insideStart' }} 
                background 
                clockWise={true} 
                dataKey="uv" 
              />
              <Tooltip />
              <Legend 
                verticalAlign="top" 
                align="center" 
                iconSize={10} 
                wrapperStyle={{ paddingTop: '20px' }} 
                />
            </RadialBarChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Box>
    </Box>
  );
};

export default GoalScorers;
