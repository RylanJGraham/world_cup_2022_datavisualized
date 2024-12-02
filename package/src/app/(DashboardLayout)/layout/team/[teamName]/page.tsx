'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // To fetch dynamic route params
import { Box, Typography } from '@mui/material';
import { FlagIcon } from 'react-flag-kit'; // Import the FlagIcon component

// Mapping team names to country codes (ISO 3166-1 alpha-2)
const countryCodeMapping = {
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

const TeamPage = () => {
  const { teamName } = useParams(); // Access the team name from the URL
  const [teamDetails, setTeamDetails] = useState(null); // State to hold team data

  useEffect(() => {
    // Normalize teamName and countryCodeMapping keys to lowercase for comparison
    const normalize = (str: string) => str.trim().toLowerCase();
    // Decode the URL-encoded team name and normalize it
    const decodedTeamName = decodeURIComponent(teamName); 
    const normalizedTeamName = normalize(decodedTeamName);

    // Simulate fetching team data based on normalized teamName
    const fetchTeamDetails = async () => {
      // Normalize country code mapping keys and compare
      const countryCode = Object.keys(countryCodeMapping).find(
        (key) => normalize(key) === normalizedTeamName
      );

      const teamData = {
        name: decodedTeamName,
        description: `Information about ${decodedTeamName}.`,
        countryCode: countryCode ? countryCodeMapping[countryCode] : '??',
      };

      // Set the team data to the state
      setTeamDetails(teamData);
    };

    if (teamName) {
      fetchTeamDetails();
    }
  }, [teamName]);

  if (!teamDetails) {
    return <div>Loading...</div>; // Show loading while team data is being fetched
  }

  return (
    <Box sx={{ padding: '20px' }}>
      {/* Flag Banner */}
      <Box
        sx={{
          width: '100%',
          height: '400px',
          backgroundColor: 'lightgray',
          backgroundImage: `url(https://flagcdn.com/w320/${teamDetails.countryCode.toLowerCase()}.png)`, // Flag image URL
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '8px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          justifyContent: 'flex-start', // Align left
          alignItems: 'flex-end', // Align bottom
          padding: '20px', // Adds some padding to the left/bottom
        }}
      >
        {/* Country Name at Bottom-Left of the Flag */}
        <Typography
          variant="h1"
          sx={{
            color: 'white',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)',
          }}
        >
          {teamDetails.name}
        </Typography>
      </Box>

      {/* Team Description */}
      <Typography variant="body1" sx={{ marginTop: '20px' }}>
        {teamDetails.description}
      </Typography>
    </Box>
  );
};

export default TeamPage;
