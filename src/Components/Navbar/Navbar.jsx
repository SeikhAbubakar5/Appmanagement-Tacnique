import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Grid2 } from '@mui/material'; 
const Navbar = ({ onAddNewUser }) => {
  return (
    <Box sx={{ paddingBottom:"25px", bgcolor: 'blue', height: '60px' }}>
      <Grid2 container justifyContent="space-between" alignItems="center"margin={2}>
        <Grid2 item xs={6}>
          <h1 style={{ color: 'white' }}>Tacnique Management App</h1>
        </Grid2>
        <Grid2 item xs={6} textAlign="right">
          <Button
            variant="contained"
            color="secondary"
            onClick={onAddNewUser}
            sx={{ width: 'auto' }}
          >
            Add New User
          </Button>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default Navbar;
