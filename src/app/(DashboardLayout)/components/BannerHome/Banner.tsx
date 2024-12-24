import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import Image from 'next/image';

const Banner: React.FC<{ 
  imageSrc: string;
  title: string;
  caption: string;
}> = ({ imageSrc, title, caption }) => {
  const theme = useTheme();

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      {/* Full-Width Image */}
      <Box sx={{ position: 'relative', width: '100%', height: '500px' }}>
        <Image
          src={imageSrc}
          alt={title}
          layout="fill"
          objectFit="cover"
          priority
          style={{borderRadius: '20px'}}
        />
      </Box>

      {/* Text Content */}
      <Box
        sx={{
          textAlign: 'center',
          py: 4,
          px: 2,
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontWeight: 'bold',
            color: 'primary.main',
            mb: 2,
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="h4"
          sx={{
            color: theme.palette.text.secondary,
          }}
        >
          {caption}
        </Typography>
      </Box>
    </Box>
  );
};

export default Banner;

