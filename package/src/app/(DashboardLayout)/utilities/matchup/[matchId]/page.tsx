"use client";

import { useParams } from 'next/navigation'; // Import the useParams from next/navigation
import { matchups } from '@/app/(DashboardLayout)/components/comparison/data/data'; // Import matchups data from data.tsx

// Function to normalize the matchId to always be in the form "team1-team2"
const normalizeMatchId = (matchId: string) => {
  // Remove the '_match' suffix from the matchId
  const matchIdWithoutSuffix = matchId.replace('_match', '');
  
  // Split matchId into teams
  const teams = matchIdWithoutSuffix.match(/[a-zA-Z]+/g); // Match only alphabetic characters (team names)
  
  if (teams && teams.length === 2) {
    // Sort teams alphabetically to ensure order consistency
    teams.sort();
    return teams.join('-'); // Return the matchId in 'team1-team2' format
  }

  return ''; // Return an empty string if the matchId is invalid
};

const MatchupPage = () => {
  const { matchId } = useParams(); // Get the matchId from the URL parameters

  // Normalize the matchId (to ensure correct order of teams)
  const normalizedMatchId = normalizeMatchId(matchId);

  // Check if the normalized matchup exists in the matchups object
  const matchup = matchups[normalizedMatchId];

  // If matchup exists, render the details
  if (matchup) {
    return (
      <div>
        <h1>Match: {matchup.matchData.team1.name} vs {matchup.matchData.team2.name}</h1>
        
        {/* Display Team 1 Stats */}
        <div>
          <h2>{matchup.matchData.team1.name}</h2>
          <p>Goals: {matchup.matchData.team1.goals}</p>
          <p>Shot Attempts: {matchup.matchData.team1.shotAttempts}</p>
          <p>Shot Accuracy: {matchup.matchData.team1.shotAccuracy}</p>
        </div>

        {/* Display Team 2 Stats */}
        <div>
          <h2>{matchup.matchData.team2.name}</h2>
          <p>Goals: {matchup.matchData.team2.goals}</p>
          <p>Shot Attempts: {matchup.matchData.team2.shotAttempts}</p>
          <p>Shot Accuracy: {matchup.matchData.team2.shotAccuracy}</p>
        </div>

        {/* Display Possession Data */}
        <div>
          <h3>Possession Data</h3>
          <p>{matchup.possessionData.argentina}% Possession for Argentina</p>
          <p>{matchup.possessionData.france}% Possession for France</p>
        </div>

        {/* Display Player Data */}
        <div>
          <h3>Players</h3>
          <h4>{matchup.matchData.team1.name} Players</h4>
          {matchup.players.team1.map((player, index) => (
            <div key={index}>
              <p>{player.firstName} {player.lastName} - Goals: {player.goals}</p>
            </div>
          ))}
          <h4>{matchup.matchData.team2.name} Players</h4>
          {matchup.players.team2.map((player, index) => (
            <div key={index}>
              <p>{player.firstName} {player.lastName} - Goals: {player.goals}</p>
            </div>
          ))}
        </div>

        {/* You can also render the heatmap and polar data here if needed */}
      </div>
    );
  }

  // If the matchup does not exist, show an error message
  return (
    <div>
      <h1>Match not found</h1>
      <p>Sorry, we couldn't find details for the selected matchup.</p>
    </div>
  );
};

export default MatchupPage;
