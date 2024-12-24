'use client'

import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';

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
    <Box sx={{ mb: 2 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: reverse ? ['column', 'row-reverse'] : ['column', 'row'],
          alignItems: 'top',
          gap: 4,
        }}
      >
        {/* Text Container */}
        <Box
          sx={{
            flex: '1 1 50%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start', // Align text to the top
            pr: reverse ? [0, 4] : 0,
            pl: reverse ? 0 : [0, 4],
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}>
            {title}
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, textAlign: 'start' }}>
            {text}
          </Typography>
        </Box>
  
        {/* Image Section */}
        <Box
          sx={{
            flex: '1 1 50%',
            height: '250px', // Ensures a consistent image height
            position: 'relative', // Required for layout="fill"
          }}
        >
          <Image
            src={imageSrc}
            alt={title}
            layout="fill"
            objectFit="cover"
            priority
            style={{ borderRadius: '20px' }}
          />
        </Box>
      </Box>
  
      {/* Divider */}
      <Box
        sx={{
          width: '100%',
          height: '2px',
          backgroundColor: 'primary.main',
          marginBottom: '30px',
          marginTop: '30px',
        }}
      />
    </Box>
  );

  return (
    <PageContainer title="Overview" description="2022 FIFA World Cup Argentina Overview">
      {/* Banner */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '300px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 4,
        }}
      >
        <Image
          src="/images/groups/banner_overview.webp"
          alt="image"
          layout="fill"
          objectFit="cover"
          priority
          style={{ borderRadius: '20px' }}
        />
      </Box>

      {/* Title and Overview Text */}
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center', color: 'primary.main' }}>
        An Overview of Argentina’s Tournament Journey
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, textAlign: 'center' }}>
        Relive Argentina’s unforgettable journey to greatness in the Qatar 2022 World Cup. From Messi’s leadership
        to unforgettable goals, this section captures every pivotal moment that brought La Albiceleste to the pinnacle
        of world football. Explore the triumphs, challenges, and defining moments that cemented Argentina’s place in
        football history.
      </Typography>
      <Box sx={{ width: '100%', height: '2px', backgroundColor: 'primary.main', marginBottom: '30px' }} />

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
            Emiliano Martínezs heroics in the penalty shootout sealed Argentinas historic victory."
        imageSrc="/images/tournament/france.jpg"
      />
      <Section
        title="Messis Leadership - The Heart of Argentina"
        text="At the core of Argentina's success was Lionel Messi. At 35, the veteran captain delivered one of the greatest individual World Cup performances ever seen. From his opening goal against Mexico to his brace in the final against France, Messi's vision, dribbling, and finishing galvanized the team. Beyond the goals and assists, it was his calm leadership and unyielding determination that inspired the squad through moments of adversity. Messi’s ability to rally the team after setbacks cemented his legacy as a true leader and icon of the sport."
        imageSrc="/images/overview/overview_messi.jpg"
        reverse
      />
      <Section
        title="Rising Stars - Julián Álvarez’s Breakout"
        text="While Messi stole the spotlight, the tournament also served as a stage for Julián Álvarez's meteoric rise. The young striker scored four goals, including a stunning solo effort against Croatia in the semifinals. His relentless pressing, clinical finishing, and chemistry with Messi added a new dimension to Argentina’s attack. Álvarez’s performances announced him as the next star of Argentine football, giving fans hope for a bright future beyond this tournament."
        imageSrc="/images/overview/overview_julian.jpeg"
      />
      <Section
        title="Emiliano ‘Dibu’ Martínez - The Wall of Argentina"
        text="Emiliano ‘Dibu’ Martínez played a pivotal role in Argentina’s triumph. His stunning saves in the knockout stages, including a last-second block against Australia and crucial penalty shootout saves against the Netherlands and France, were defining moments of the tournament. Martínez’s calm demeanor, mind games during penalties, and larger-than-life personality made him a national hero. His Golden Glove award as the tournament’s best goalkeeper was well deserved and underscored his importance to Argentina's success."
        imageSrc="/images/overview/overview_emilio.jpg"
        reverse
      />
      <Section
        title="Tactical Evolution Under Scaloni"
        text="Head coach Lionel Scaloni showcased remarkable tactical flexibility throughout the tournament. After the early shock against Saudi Arabia, Scaloni adjusted his approach, ensuring a more compact defense and a fluid attack. His decision to bring on Enzo Fernández, give Julián Álvarez a starting role, and deploy a 3-5-2 formation against Croatia were masterstrokes. Scaloni’s calm and pragmatic management created a cohesive team that could adapt to any challenge, proving that he is one of the brightest tactical minds in football today."
        imageSrc="/images/overview/overview_scaloni.webp"
      />
      <Section
        title="Enzo Fernández - A Midfield Revelation"
        text="Few players burst onto the global stage at Qatar 2022 quite like Enzo Fernández. The young midfielder from Benfica became a key figure in Argentina’s setup, providing stability, vision, and moments of magic. His stunning goal against Mexico was a turning point for both his personal tournament and Argentina’s campaign. By the end of the competition, Fernández was named the Best Young Player of the tournament, heralding him as a generational talent who will anchor Argentina’s midfield for years to come."
        imageSrc="/images/overview/overview_enzo.webp"
        reverse
      />
      <Section
        title="Argentina’s Fans - The 12th Man"
        text="From the streets of Buenos Aires to the stadiums in Qatar, Argentina's fans played an integral role in the team’s journey. Their passion, songs, and unwavering support created a home-like atmosphere for the team in every match. The iconic chant, 'Muchachos,' became the anthem of the tournament, echoing across stadiums and uniting fans worldwide. Argentina’s victory wasn’t just for the players—it was a triumph for the millions of fans who stood by their team through decades of highs and lows."
        imageSrc="/images/overview/overview_fans.jpg"
      />
      <Section
        title="Historic Rivalries and Matches"
        text="The 2022 World Cup provided some unforgettable clashes that will go down in history. The quarterfinal against the Netherlands, featuring a dramatic comeback and a tense penalty shootout, reignited an old rivalry. Meanwhile, the final against France was a showcase of footballing brilliance, with Messi and Mbappé trading blows in a game that transcended sports. These matches highlighted Argentina’s grit, composure, and ability to shine under pressure."
        imageSrc="/images/overview/overview_rival.webp"
        reverse
      />
      <Section
        title="Cultural Impact of the Win"
        text="Argentina’s World Cup triumph was more than just a sporting achievement; it was a cultural phenomenon. The victory united a nation struggling with economic hardships, giving people a reason to celebrate and come together. From murals of Messi painted on buildings to millions filling the streets of Buenos Aires for the victory parade, the win symbolized hope and joy for an entire generation. Football once again proved to be Argentina’s lifeblood, a source of pride and unity for the nation."
        imageSrc="/images/overview/overview_impact.jpeg"
      />

      {/* Legacy */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}>
          Legacy: A Nation United
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.8, textAlign: 'start' }}>
          Argentina’s World Cup win in 2022 transcended football. It united a
          nation, inspired millions, and cemented Lionel Messi’s legacy as one
          of the greatest players of all time. The tournament was not just a
          victory on the field but a celebration of Argentina’s rich footballing
          heritage.
        </Typography>
      </Box>

      {/* Full-width Banner */}
      <Box sx={{ position: 'relative', width: '100%', height: '400px' }}>
        <Image
          src="/images/tournament/win.jpg"
          alt="Argentina Celebration Banner"
          layout="fill"
          objectFit="cover"
          style={{ borderRadius: theme.shape.borderRadius }}
        />
      </Box>
    </PageContainer>
  );
};

export default TournamentOverview;
