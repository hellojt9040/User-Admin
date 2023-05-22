import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import './Header.scss';

const Header = ({ classes, headerText }) => {
  return (
    <AppBar className={`Header ${classes}`} position="static">
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

Header.propTypes = {
  classes: PropTypes.string,
  headerText: PropTypes.string,
};

export default Header;
