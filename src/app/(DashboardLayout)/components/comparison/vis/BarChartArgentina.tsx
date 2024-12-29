import React, { useState } from 'react';
import {
  Box,
  Typography,
  Popover,
  IconButton,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info'; // Import the Info icon
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Label,
  ResponsiveContainer,
  LabelList,
} from 'recharts';
import CountryFlag from '@/app/(DashboardLayout)/components/flags/FlagIcon';

// Sample team data for possession percentages (for each game)
const teamData = [
  {
    game: 'vs Mexico',
    argentina: 50,
    Mexico: 36,
  },
  {
    game: 'vs Netherlands',
    argentina: 44,
    Netherlands: 45,
  },
  {
    game: 'vs Poland',
    argentina: 67,
    Poland: 24,
  },
  {
    game: 'vs France',
    argentina: 46,
    France: 40,
  },
  {
    game: 'vs Australia',
    argentina: 53,
    Australia: 35,
  },
  {
    game: 'vs Croatia',
    argentina: 34,
    Croatia: 54,
  },
  {
    game: 'vs Saudi Arabia',
    argentina: 64,
    SaudiArabia: 24,
  },
];

// Define colors for each team
const teamColors = {
  Mexico: '#56042C',
  Netherlands: '#FFBA2F',
  Poland: '#5899D4',
  France: '#217A70',
  Australia: '#F5B49D',
  Croatia: '#2C7759',
  SaudiArabia: '#75AE18',
  Argentina: '#0066B3', // Argentina is included with a fixed color
};

const StackedBarChartArgentina = () => {
  const [selectedTeams, setSelectedTeams] = useState([]); // Track selected teams
  const [anchorEl, setAnchorEl] = useState(null); // State for the popover

  // Toggle team selection
  const toggleTeamSelection = (team) => {
    setSelectedTeams((prev) =>
      prev.includes(team) ? prev.filter((t) => t !== team) : [...prev, team]
    );
  };

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const isPopoverOpen = Boolean(anchorEl);

  // Custom label renderer for the bars
  const renderCustomLabel = (props) => {
    const { x, y, width, height, value, team } = props;
    if (!value) return null; // Don't render for empty values

    return (
      <foreignObject
        x={x + width / 2 - 10}
        y={y + height / 2 - 10}
        width={20}
        height={20}
        style={{ pointerEvents: 'none' }}
      >
        <CountryFlag country={team} size={20} />
      </foreignObject>
    );
  };

  // Custom Tooltip for the Bar Chart
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <Box
          sx={{
            backgroundColor: 'white',
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '10px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
          }}
        >
          <Typography variant="h6">{data.game}</Typography>
          {/* Only show teams with possession percentages */}
          {selectedTeams.map((team) => {
            if (data[team] > 0) {
              return (
                <Box key={team} display="flex" alignItems="center">
                  <CountryFlag country={team} size={16} />
                  <Typography variant="body2" ml={1}>
                    {team}: {data[team]}%
                  </Typography>
                </Box>
              );
            }
            return null;
          })}
          {/* Always show Argentina's possession */}
          <Box display="flex" alignItems="center" mb={1}>
            <CountryFlag country="Argentina" size={16} />
            <Typography variant="body2" ml={1}>
              Argentina: {data.argentina}%
            </Typography>
          </Box>
        </Box>
      );
    }
    return null;
  };

  // Filter data to show only Argentina's possession for the selected game(s)
  const filteredData = teamData
    .map((game) => {
      const filteredGame = { game: game.game, argentina: game.argentina };
      selectedTeams.forEach((team) => {
        if (game[team] !== undefined) {
          filteredGame[team] = game[team];
        }
      });
      return filteredGame;
    })
    .filter((game) => selectedTeams.some((team) => game[team] !== undefined));

  const renderBarChart = () => {
    if (selectedTeams.length === 0) {
      return (
        <Box
          sx={{
            border: '2px solid',
            borderColor: 'primary.main',
            borderRadius: '12px',
            width: '100%',
            height: '100%',
            display: 'flex-col',
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 2,
            marginTop: '20px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.6)',
          }}
        >
          <ResponsiveContainer width="100%" height={460}>
            <BarChart data={teamData}>
              <CartesianGrid />
              <XAxis type="category" dataKey="game">
                <Label
                  value="Games"
                  offset={-5}
                  position="insideBottom"
                  style={{ fontSize: '1.0rem', fontWeight: 'bold' }}
                />
              </XAxis>
              <YAxis
                type="number"
                tickFormatter={(value) => `${value}%`}
                domain={[0, 100]}
              >
                <Label
                  value="Possession (%)"
                  angle={-90}
                  position="insideLeft"
                  style={{ fontSize: '1.0rem', fontWeight: 'bold' }}
                />
              </YAxis>
              <Tooltip content={<CustomTooltip />} />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      );
    }

    return (
      <Box
        sx={{
          border: '2px solid',
          borderColor: 'primary.main',
          borderRadius: '12px',
          width: '100%',
          height: '100%',
          display: 'flex-col',
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 2,
          marginTop: '20px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.6)',
        }}
      >
        <ResponsiveContainer width="100%" height={460}>
          <BarChart data={filteredData}>
            <CartesianGrid />
            <XAxis type="category" dataKey="game">
              <Label
                value="Games"
                offset={-4}
                position="insideBottom"
                style={{ fontSize: '1.0rem', fontWeight: 'bold' }}
              />
            </XAxis>
            <YAxis
              type="number"
              tickFormatter={(value) => `${value}%`}
              domain={[0, 100]}
            >
              <Label
                value="Possession (%)"
                angle={-90}
                position="insideLeft"
                style={{ fontSize: '1.0rem', fontWeight: 'bold' }}
              />
            </YAxis>
            <Tooltip content={<CustomTooltip />} />

            <Bar dataKey="argentina" stackId="a" fill={teamColors['Argentina']}>
              <LabelList
                dataKey="argentina"
                content={(props) => renderCustomLabel({ ...props, team: 'Argentina' })}
              />
            </Bar>

            {selectedTeams.map((team) => (
              <Bar key={team} dataKey={team} stackId="a" fill={teamColors[team]}>
                <LabelList
                  dataKey={team}
                  content={(props) => renderCustomLabel({ ...props, team })}
                />
              </Bar>
            ))}
          </BarChart>
        </ResponsiveContainer>
      </Box>
    );
  };

  return (
    <Box sx={{ width: '100%', marginTop: '0px' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '0px' }}>
        <Typography variant="h4" sx={{ textAlign: 'left' }}>
          Argentina&apos;s Possession vs Selected Teams
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
              This chart shows Argentina&apos;s possession compared to selected teams in various matches. Select teams below to compare their data.
            </Typography>
          </Box>
        </Popover>
      </Box>
      <Box
        sx={{
          width: '100%',
          height: '2px',
          backgroundColor: 'primary.main',
          marginBottom: '0px',
        }}
      />

      <Box
        sx={{
          width: '100%',
          height: '500px',
          display: 'flex',
          marginBottom: '20px',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {renderBarChart()}
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '16px',
          marginTop: '2px',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {Object.keys(teamColors)
          .filter((team) => team !== 'Argentina')
          .map((team) => (
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
                backgroundColor: selectedTeams.includes(team)
                  ? teamColors[team]
                  : '#FFFFFF',
                color: selectedTeams.includes(team) ? '#FFFFFF' : teamColors[team],
                border: `2px solid ${teamColors[team]}`,
                transition: 'background-color 0.3s, color 0.3s',
                '&:hover': {
                  backgroundColor: selectedTeams.includes(team)
                    ? teamColors[team]
                    : `${teamColors[team]}33`,
                },
              }}
            >
              <CountryFlag country={team} size={32} />
              <Typography
                variant="body1"
                sx={{ marginLeft: '8px', fontWeight: 'bold' }}
              >
                {team}
              </Typography>
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default StackedBarChartArgentina;
