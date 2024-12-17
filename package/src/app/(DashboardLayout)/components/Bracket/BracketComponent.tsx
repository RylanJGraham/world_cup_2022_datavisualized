import Flag from 'react-world-flags';
import { Bracket, IRoundProps, Seed, SeedItem, SeedTeam, IRenderSeedProps } from 'react-brackets';
import { Box } from '@mui/material';

// CustomSeed component
const CustomSeed = ({ seed, onClick }: IRenderSeedProps & { onClick?: () => void }) => (
  <Seed style={{ fontSize: 22 }}>
    <SeedItem
      sx={{
        cursor: 'pointer',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': { transform: 'scale(1.05)' },
      }}
      onClick={onClick}
    >
      <div>
        <SeedTeam>
          <Flag code={seed.teams[0]?.countryCode || ''} style={{ marginRight: 10, width: 30, height: 20 }} />
          {seed.teams[0]?.name || 'NO TEAM'}
        </SeedTeam>
        <SeedTeam>
          <Flag code={seed.teams[1]?.countryCode || ''} style={{ marginRight: 10, width: 30, height: 20 }} />
          {seed.teams[1]?.name || 'NO TEAM'}
        </SeedTeam>
      </div>
    </SeedItem>
  </Seed>
);

// Wrapper function to inject onShowTimetable and set a displayName
const renderSeedComponent = (onShowTimetable: (matchId: number) => void) => {
  const WrappedSeedComponent = (props: IRenderSeedProps) => {
    const matchId = props.seed.matchId; // Assuming seed.matchId is available
    return <CustomSeed {...props} onClick={() => onShowTimetable(matchId)} />;
  };

  // Set displayName for better debugging
  WrappedSeedComponent.displayName = 'WrappedSeedComponent';

  return WrappedSeedComponent;
};

// Main BracketComponent
const BracketComponent = ({ rounds, onShowTimetable }: { rounds: IRoundProps[]; onShowTimetable: (matchId: number) => void }) => (
  <Box sx={{ transform: 'scale(0.8)', transformOrigin: 'top left', mb: 5 }}>
    {/* Use the wrapper to inject onShowTimetable */}
    <Bracket rounds={rounds} renderSeedComponent={renderSeedComponent(onShowTimetable)} />
  </Box>
);

export default BracketComponent;
