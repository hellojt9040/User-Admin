import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';

const UserAction = () => {
  return (
    <ButtonGroup variant="text" aria-label="text button group">
      <IconButton aria-label="delete">
        <ModeEditIcon />
      </IconButton>
      <IconButton aria-label="delete">
        <DeleteIcon />
      </IconButton>
    </ButtonGroup>
  );
};

export default UserAction;
