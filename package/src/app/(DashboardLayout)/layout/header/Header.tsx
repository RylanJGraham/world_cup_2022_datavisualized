import React from 'react';
import { Box, AppBar, Toolbar, styled, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const Header = () => {
  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
    backgroundImage: `
      url('/images/logos/QatarVector.png'),  /* First (non-flipped) image */
      url('/images/logos/QatarVectorF.jpg'), /* Second (flipped) image */
      url('/images/logos/QatarVectorF.jpg')   /* Third (non-flipped) image */
    `,
    backgroundRepeat: 'repeat, repeat, repeat',  // Ensure all images repeat
    backgroundPosition: '0 0, 100% 0, 200% 0',  // Position images to alternate
    backgroundSize: 'auto 100px',  // Make sure images are sized properly
    [theme.breakpoints.up('lg')]: {
      minHeight: '70px',
    },
  }));

  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    color: theme.palette.text.secondary,
    display: 'flex',
    justifyContent: 'center', // Center the content horizontally
    alignItems: 'center', // Align items vertically in the center
    minHeight: '70px',
    position: 'relative', // To position elements on top of the background
    zIndex: 1, // Ensures the content is above the background image
  }));

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        {/* Image and Typography for Qatar 2022 Argentina */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img src="/images/logos/qatar.png" alt="Logo" style={{ width: '30px', marginRight: '20px' }} />
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'white', textShadow: '0px 2px 4px rgba(0,0,0,0.6)' }}>
            Qatar World Cup 2022 - Argentina&apos;s Road to Glory
          </Typography>
        </Box>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  toggleMobileSidebar: PropTypes.func.isRequired,
};

export default Header;
