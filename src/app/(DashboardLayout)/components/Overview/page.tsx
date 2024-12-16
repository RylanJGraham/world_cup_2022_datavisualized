import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import Image from 'next/image';

const TournamentOverview: React.FC = () => {
  const theme = useTheme();

  return (
    <Box sx={{ py: 4, px: 2, maxWidth: '100%', margin: '0 auto' }}>
      {/* Introduction */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center', color: 'primary.main' }}>
          Argentina’s Qatar Triumph: A Story for the Ages
        </Typography>
        <Typography variant="h5" sx={{ lineHeight: 1.8 }}>
          In 2022, Argentina captivated the world by securing their third World Cup title in Qatar. 
          This journey, led by the iconic Lionel Messi, was not just a footballing triumph but 
          a narrative of resilience, redemption, and sheer brilliance.
        </Typography>
      </Box>

      {/* Group Stage */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
          The Group Stage: A Stumble and a Recovery
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: ['column', 'row'], alignItems: 'top' }}>
          <Box sx={{ flex: 1, mb: [2, 0], pr: [0, 2] }}>
            <Typography variant="h5" sx={{ lineHeight: 1.8 }}>
              Argentina’s campaign began with a shocking 2-1 loss to Saudi Arabia, a match that 
              rattled their confidence and raised questions about their readiness. However, the 
              team rallied in the following games, defeating Mexico and Poland with commanding 
              performances to top their group.
            </Typography>
          </Box>
          <Box sx={{ flexShrink: 0 }}>
            <Image
              src="/images/tournament/mexico.jpg"
              alt="Group Stage Performance"
              width={500}
              height={350}
              style={{ borderRadius: theme.shape.borderRadius }}
            />
          </Box>
        </Box>
      </Box>

      {/* Knockout Stage */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
          The Knockout Stage: Drama and Dominance
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: ['column', 'row-reverse'], alignItems: 'top' }}>
          <Box sx={{ flex: 1, mb: [2, 0], pl: [0, 2] }}>
            <Typography variant="h5" sx={{ lineHeight: 1.8 }}>
              The round of 16 and quarterfinals showcased Argentina’s resilience. Against Australia, 
              Messi’s brilliance was evident, while the penalty shootout win over the Netherlands 
              was a nerve-wracking affair that highlighted the team’s grit. The semifinal against 
              Croatia was a masterclass, with a dominant 3-0 victory securing their spot in the final.
            </Typography>
          </Box>
          <Box sx={{ flexShrink: 0 }}>
            <Image
              src="/images/tournament/croatia.jpg"
              alt="Knockout Stage Triumph"
              width={500}
              height={350}
              style={{ borderRadius: theme.shape.borderRadius }}
            />
          </Box>
        </Box>
      </Box>

      {/* The Final */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
          The Final: A Match for the Ages
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: ['column', 'row'], alignItems: 'top' }}>
          <Box sx={{ flex: 1, mb: [2, 0], pr: [0, 2] }}>
            <Typography variant="h5" sx={{ lineHeight: 1.8 }}>
              The final against France is considered one of the greatest World Cup matches of all time. 
              Messi and Mbappé traded moments of brilliance, and the game ended 3-3 after extra time. 
              Emiliano Martínez’s heroics in the penalty shootout sealed Argentina’s historic victory.
            </Typography>
          </Box>
          <Box sx={{ flexShrink: 0 }}>
            <Image
              src="/images/tournament/france.jpg"
              alt="World Cup Final"
              width={500}
              height={350}
              style={{ borderRadius: theme.shape.borderRadius }}
            />
          </Box>
        </Box>
      </Box>

      {/* Legacy */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
          Legacy: A Nation United
        </Typography>
        <Typography variant="h5" sx={{ lineHeight: 1.8 }}>
          Argentina’s World Cup win in 2022 transcended football. It united a nation, inspired millions, 
          and cemented Lionel Messi’s legacy as one of the greatest players of all time. The tournament 
          was not just a victory on the field but a celebration of Argentina’s rich footballing heritage.
        </Typography>
      </Box>

      {/* Full-width Banner */}
      <Box sx={{ mt: 6, position: 'relative', width: '100%', height: '400px' }}>
        <Image
          src="/images/tournament/win.jpg"
          alt="Argentina Celebration Banner"
          layout="fill"
          objectFit="cover"
          style={{ borderRadius: theme.shape.borderRadius }}
        />
      </Box>
    </Box>
  );
};

export default TournamentOverview;
