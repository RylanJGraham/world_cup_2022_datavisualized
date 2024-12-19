import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import Image from 'next/image';

const TournamentOverview: React.FC = () => {
  const theme = useTheme();

{/* Section Template */}
const Section = ({
  title,
  text,
  imageSrc,
  reverse = false,
}: {
  title: string;
  text: string;
  imageSrc: string;
  reverse?: boolean;
}) => (
  <Box sx={{ mb: 4 }}>
    <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
      {title}
    </Typography>
    <Box
      sx={{
        display: 'flex',
        flexDirection: reverse ? ['column', 'row-reverse'] : ['column', 'row'],
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
      }}
    >
      <Box sx={{ flex: '1 1 50%', pr: reverse ? [0, 2] : 0, alignContent: 'top' }}>
        <Typography variant="h5" sx={{ lineHeight: 1.8, textAlign: 'start' }}>
          {text}
        </Typography>
      </Box>
      <Box
        sx={{
          flex: '1 1 50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image
          src={imageSrc}
          alt={title}
          width={600}
          height={350}
          style={{ borderRadius: theme.shape.borderRadius }}
        />
      </Box>
    </Box>
  </Box>
);

  return (
    <Box sx={{ py: 4, px: 2, maxWidth: '100%', margin: '0 auto' }}>
      {/* Introduction */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 'bold',
            mb: 2,
            textAlign: 'center',
            color: 'primary.main',
          }}
        >
          Argentina’s Qatar Triumph: A Story for the Ages
        </Typography>
        <Typography variant="h5" sx={{ lineHeight: 1.8 }}>
          In 2022, Argentina captivated the world by securing their third World
          Cup title in Qatar. This journey, led by the iconic Lionel Messi, was
          not just a footballing triumph but a narrative of resilience,
          redemption, and sheer brilliance.
        </Typography>
      </Box>

      {/* Sections */}
      <Section
        title="The Group Stage: A Stumble and a Recovery"
        text="Argentina’s campaign began with a shocking 2-1 loss to Saudi Arabia, a match that 
            rattled their confidence and raised questions about their readiness. However, the 
            team rallied in the following games, defeating Mexico and Poland with commanding 
            performances to top their group."
        imageSrc="/images/tournament/mexico.jpg"
      />
      <Section
        title="The Knockout Stage: Drama and Dominance"
        text="The round of 16 and quarterfinals showcased Argentina’s resilience. Against Australia, 
            Messi’s brilliance was evident, while the penalty shootout win over the Netherlands 
            was a nerve-wracking affair that highlighted the team’s grit. The semifinal against 
            Croatia was a masterclass, with a dominant 3-0 victory securing their spot in the final."
        imageSrc="/images/tournament/croatia.jpg"
        reverse
      />
      <Section
        title="The Final: A Match for the Ages"
        text="The final against France is considered one of the greatest World Cup matches of all time. 
            Messi and Mbappé traded moments of brilliance, and the game ended 3-3 after extra time. 
            Emiliano Martínez’s heroics in the penalty shootout sealed Argentina’s historic victory."
        imageSrc="/images/tournament/france.jpg"
      />

      {/* Legacy */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
          Legacy: A Nation United
        </Typography>
        <Typography variant="h5" sx={{ lineHeight: 1.8 }}>
          Argentina’s World Cup win in 2022 transcended football. It united a
          nation, inspired millions, and cemented Lionel Messi’s legacy as one
          of the greatest players of all time. The tournament was not just a
          victory on the field but a celebration of Argentina’s rich footballing
          heritage.
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
