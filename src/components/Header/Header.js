import React from 'react';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import './Header.scss';

const Header = ({ headerText }) => {
  return (
    <AppBar className="Header" position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          align="center"
          sx={{ flexGrow: 1 }}
        >
          {headerText}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
