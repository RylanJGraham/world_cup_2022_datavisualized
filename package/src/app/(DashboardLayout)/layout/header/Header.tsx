import React from 'react';
import { Box, AppBar, Toolbar, styled, Typography } from '@mui/material';
import PropTypes from 'prop-types';

interface ItemType {
  toggleMobileSidebar: (event: React.MouseEvent<HTMLElement>) => void;
}

const Header = () => {
  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    background: theme.palette.background.paper,
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
    [theme.breakpoints.up('lg')]: {
      minHeight: '70px',
    },
  }));

  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    color: theme.palette.text.secondary,
    display: 'flex',
    justifyContent: 'center',  // Center the content horizontally
    alignItems: 'center',      // Align items vertically in the center
  }));

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        {/* Image and Typography for Qatar 2022 Argentina */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img src="/images/logos/dark-logo.svg" alt="Logo" style={{ width: '200px', marginRight: '20px' }} />
          <Typography variant="h1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            Argentinas Path - A Data Visualization
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
