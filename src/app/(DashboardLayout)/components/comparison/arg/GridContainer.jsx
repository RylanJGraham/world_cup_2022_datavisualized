import React from 'react';
import { Grid, Box } from '@mui/material';

export default function GridContainer({ children, spacing = 2 }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={spacing} wrap="wrap">
        {React.Children.map(children, (child, index) => (
          <Grid item xs="auto" key={index}>
            {child}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
