import React, { useState } from 'react';
import {
  Box,
  Typography,
  Popover,
  IconButton,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
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
import Argentina from '../../Argentina/page';

type TeamData = {
  game: string;
  argentina: number;
  [key: string]: number | string;
};

const teamData: TeamData[] = [
  { game: 'vs Mexico', argentina: 50, Mexico: 36 },
  { game: 'vs Netherlands', argentina: 44, Netherlands: 45 },
  { game: 'vs Poland', argentina: 67, Poland: 24 },
  { game: 'vs France', argentina: 46, France: 40 },
  { game: 'vs Australia', argentina: 53, Australia: 35 },
  { game: 'vs Croatia', argentina: 34, Croatia: 54 },
  { game: 'vs Saudi Arabia', argentina: 64, SaudiArabia: 24 },
];

type Team = 'Argentina' | 'Mexico' | 'Netherlands' | 'Poland' | 'France' | 'Australia' | 'Croatia' | 'SaudiArabia';

const teamColors: Record<Team, string> = {
  SaudiArabia: '#FA896B',
  Mexico: '#49BEFF',
  Poland: '#008080',
  Australia: '#7F1431',
  Netherlands: '#FFD700',
  Croatia: '#228B22',
  France: '#4B0082',
  Argentina: '#0066B3',
};

const StackedBarChartArgentina = () => {
  const [selectedTeams, setSelectedTeams] = useState<Team[]>([]); 
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null); 

  const toggleTeamSelection = (team: Team) => {
    setSelectedTeams((prev) =>
      prev.includes(team) ? prev.filter((t) => t !== team) : [...prev, team]
    );
  };

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const isPopoverOpen = Boolean(anchorEl);

  const CustomTooltip = ({ active, payload }: { active: boolean; payload: { payload: TeamData }[] }) => {
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
          {selectedTeams.map((team) => {
            if (Number(data[team]) > 0) { 
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

  const filteredData = teamData.map((game) => {
    const filteredGame: { game: string; argentina: number; [key: string]: number | string } = {
      game: game.game,
      argentina: game.argentina,
    };
  
    // Add only the selected teams to the data
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
              <Tooltip content={<CustomTooltip active={false} payload={[]} />} />
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
            <Tooltip content={<CustomTooltip active={false} payload={[]} />} />
  
            {/* Render Argentina bar */}
            <Bar dataKey="argentina" stackId="a" fill={teamColors['Argentina']}>
              <LabelList
                dataKey="argentina"
                position="center"
                content={(props) => {
                  const { x, y, width, height } = props;
  
                  const posX = typeof x === 'number' ? x : 0;
                  const posY = typeof y === 'number' ? y : 0;
                  const barWidth = typeof width === 'number' ? width : 0;
                  const barHeight = typeof height === 'number' ? height : 0;
  
                  return (
                    <foreignObject
                      x={posX + barWidth / 2}
                      y={posY + barHeight / 2}
                      width={20}
                      height={20}
                      style={{ pointerEvents: 'none' }}
                    >
                      <CountryFlag country="Argentina" size={20} />
                    </foreignObject>
                  );
                }}
              />
            </Bar>
  
            {/* Render bars for selected teams */}
            {selectedTeams.map((team) => (
              <Bar key={team} dataKey={team} stackId="a" fill={teamColors[team]}>
              <LabelList
                dataKey={team}
                position="center" // Position the label inside the bar, centered
                content={(props) => {
                  const { x, y, width, height } = props;
            
                  // Ensure x, y, width, height are numbers and handle potential undefined values
                  const posX = typeof x === 'number' ? x : 0;
                  const posY = typeof y === 'number' ? y : 0;
                  const barWidth = typeof width === 'number' ? width : 0;
                  const barHeight = typeof height === 'number' ? height : 0;
            
                  return (
                    <foreignObject
                      x={posX + barWidth / 2}
                      y={posY + barHeight / 2}
                      width={20}
                      height={20}
                      style={{ pointerEvents: 'none' }}
                    >
                      <CountryFlag country={team} size={20} />
                    </foreignObject>
                  );
                }}
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
      {/* Header and Info button */}
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
            <Typography variant="body1" sx={{ color: 'white' }}>
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

      {/* Team selection */}
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
              onClick={() => toggleTeamSelection(team as Team)} // Explicit cast to Team type
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '10px 32px',
                borderRadius: '8px',
                cursor: 'pointer',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.6)', // Box shadow effect
                backgroundColor: selectedTeams.includes(team as Team)
                  ? teamColors[team as Team]
                  : '#FFFFFF', // Background color changes based on selection
                color: selectedTeams.includes(team as Team)
                  ? '#FFFFFF'
                  : teamColors[team as Team], // Text color changes based on selection
                border: `2px solid ${teamColors[team as Team]}`, // Border color based on team color
                transition: 'background-color 0.3s, color 0.3s', // Smooth transition for hover
                '&:hover': {
                  backgroundColor: selectedTeams.includes(team as Team)
                    ? teamColors[team as Team]
                    : `${teamColors[team as Team]}33`, // Lighter background on hover when not selected
                  transform: 'scale(1.05)', // Slight scaling effect on hover
                },
              }}
            >
              <CountryFlag country={team as Team} size={32} />
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
