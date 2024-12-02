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
      {/* Flag as a Banner with Text on Top */}
      <Box
        sx={{
          width: '100%',
          height: '300px',
          backgroundColor: 'lightgray',
          position: 'relative', // Make sure the text is positioned on top of the flag
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* FlagIcon from react-flag-kit */}
        <FlagIcon
          code={teamDetails.countryCode}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover', // Make flag cover the entire area
            position: 'absolute',
          }}
        />
        {/* Country Name at Bottom-Left of the Flag */}
        <Typography
          variant="h1"
          sx={{
            color: 'white',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)',
            position: 'absolute',
            bottom: '20px', // Align text to the bottom
            left: '20px', // Align text to the left
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
