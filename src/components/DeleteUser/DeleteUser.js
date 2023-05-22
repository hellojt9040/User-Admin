import React from 'react';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

const DeleteUser = ({ userData, deleteUser, closeDeleteModalHandler }) => {
  return (
    <div className="UserAppDeleteUser">
      <p>
        Are you sure to delete this user ? User Name : <b>{userData.name}</b>
      </p>
      <Stack spacing={2} direction="row" justifyContent="center">
        <Button variant="outlined" onClick={closeDeleteModalHandler}>
          Cancel
        </Button>
        <Button
          variant="contained"
          endIcon={<DeleteIcon />}
          onClick={() => deleteUser(userData)}
        >
          Delete
        </Button>
      </Stack>
    </div>
  );
};

DeleteUser.propTypes = {
  userData: PropTypes.shape({
    email: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    role: PropTypes.string,
  }),
  deleteUser: PropTypes.func.isRequired,
  closeDeleteModalHandler: PropTypes.func.isRequired,
};

export default DeleteUser;
