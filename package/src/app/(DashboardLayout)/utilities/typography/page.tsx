'use client';

import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import { Bracket, IRoundProps, Seed, SeedItem, SeedTeam, IRenderSeedProps } from 'react-brackets';
import Flag from 'react-world-flags';

// Custom Seed Component with Flags
const CustomSeed = ({ seed, breakpoint }: IRenderSeedProps) => {
  return (
    <Seed mobileBreakpoint={breakpoint} style={{ fontSize: 22 }}>
      <SeedItem>
        <div>
          {/* First Team */}
          <SeedTeam style={{ color: 'cyan' }}>
            <Flag code={seed.teams[0]?.countryCode || ''} style={{ marginRight: 40, width: 40 }} />
            {seed.teams[0]?.name || 'NO TEAM'}
          </SeedTeam>
          {/* Second Team */}
          <SeedTeam>
            <Flag code={seed.teams[1]?.countryCode || ''} style={{ marginRight: 40, width: 40 }} />
            {seed.teams[1]?.name || 'NO TEAM'}
          </SeedTeam>
        </div>
      </SeedItem>
    </Seed>
  );
};

// Bracket Data for Qatar World Cup 2022
const rounds: IRoundProps[] = [
  {
    title: 'Round of 16',
    seeds: [
      { id: 1, date: '2022-12-09', teams: [{ name: 'Croatia', countryCode: 'hr' }, { name: 'Brazil', countryCode: 'br' }] },
      { id: 2, date: '2022-12-09', teams: [{ name: 'Netherlands', countryCode: 'nl' }, { name: 'Argentina', countryCode: 'ar' }] },
      { id: 3, date: '2022-12-10', teams: [{ name: 'Morocco', countryCode: 'ma' }, { name: 'Portugal', countryCode: 'pt' }] },
      { id: 4, date: '2022-12-10', teams: [{ name: 'England', countryCode: 'gb' }, { name: 'France', countryCode: 'fr' }] },
    ],
  },
  {
    title: 'Semis',
    seeds: [
      { id: 5, date: '2022-12-13', teams: [{ name: 'Argentina', countryCode: 'ar' }, { name: 'Croatia', countryCode: 'hr' }] },
      { id: 6, date: '2022-12-14', teams: [{ name: 'France', countryCode: 'fr' }, { name: 'Morocco', countryCode: 'ma' }] },
    ],
  },
  {
    title: 'Final',
    seeds: [
      { id: 7, date: '2022-12-18', teams: [{ name: 'Argentina', countryCode: 'ar' }, { name: 'France', countryCode: 'fr' }] },
    ],
  },
];

// Typography Page Component
const TypographyPage = () => {
  return (
    <PageContainer title="Typography" description="2022 FIFA World Cup Bracket">
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Bracket rounds={rounds} renderSeedComponent={CustomSeed} mobileBreakpoint={768} />
      </div>
    </PageContainer>
  );
};

export default TypographyPage;
