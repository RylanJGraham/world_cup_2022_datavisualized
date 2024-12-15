"use client"

import { Card, Box, Typography, Button } from '@mui/material';
import Flag from 'react-world-flags';

const GroupCard = ({ groupName, teams, onShowTimetable, index }: { groupName: string; teams: any[]; onShowTimetable: (groupId: number) => void; index: number }) => (
  <Card sx={{ p: 2, mb: 2, backgroundColor: '#f5f5f5' }}>
    <Typography variant="h6" sx={{ textAlign: 'center', mb: 1, fontWeight: 'bold' }}>
      {groupName}
    </Typography>
    {teams.map((team) => (
      <Box key={team.name} sx={{ display: 'flex', justifyContent: 'space-between', p: 1, backgroundColor: team.qualified ? '#d4edda' : '#f8d7da', mb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Flag code={countryCodeMapping[team.name] || '??'} style={{ width: 30, height: 20, marginRight: 8 }} />
          <Typography>{team.name}</Typography>
        </Box>
        <Typography sx={{ fontWeight: 'bold' }}>{team.points} pts</Typography>
      </Box>
    ))}
    <Button variant="contained" color="primary" fullWidth onClick={() => onShowTimetable(index)}>
      Show Match Timetable
    </Button>
  </Card>
);

const countryCodeMapping: { [key: string]: string } = {
    Qatar: 'QA',
    Ecuador: 'EC',
    England: 'GB',
    Iran: 'IR',
    Senegal: 'SN',
    Netherlands: 'NL',
    'United States': 'US',
    Wales: 'GB-WLS',
    Argentina: 'AR',
    'Saudi Arabia': 'SA',
    Denmark: 'DK',
    Tunisia: 'TN',
    Mexico: 'MX',
    Poland: 'PL',
    France: 'FR',
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

export default GroupCard;
