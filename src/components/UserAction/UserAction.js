import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '../UI/Modal';
import Visible from '../utils/Visible';
import EditUser from '../EditUser';
import DeleteUser from '../DeleteUser';

const UserAction = ({ rowData, updateUser, deleteUser }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const openEditModalHandler = () => {
    setShowEditModal(true);
  };

  const closeEditModalHandler = () => {
    setShowEditModal(false);
  };

  const openDeleteModalHandler = () => {
    setShowDeleteModal(true);
  };

  const closeDeleteModalHandler = () => {
    setShowDeleteModal(false);
  };

  return (
    <ButtonGroup variant="text" aria-label="text button group">
      {/* Edit  */}
      <Visible when={showEditModal}>
        <Modal
          title="Edit User"
          open={showEditModal}
          handleClose={closeEditModalHandler}
        >
          <EditUser
            userData={rowData}
            updateUser={updateUser}
            closeEditModalHandler={closeEditModalHandler}
          />
        </Modal>
      </Visible>
      <IconButton aria-label="delete" onClick={openEditModalHandler}>
        <ModeEditIcon />
      </IconButton>

      {/* Delete */}
      <Visible when={showDeleteModal}>
        <Modal
          title="Delete User"
          open={showDeleteModal}
          handleClose={closeDeleteModalHandler}
        >
          <DeleteUser
            userData={rowData}
            deleteUser={deleteUser}
            closeDeleteModalHandler={closeDeleteModalHandler}
          />
        </Modal>
      </Visible>
      <IconButton aria-label="delete" onClick={openDeleteModalHandler}>
        <DeleteIcon />
      </IconButton>
    </ButtonGroup>
  );
};

UserAction.propTypes = {
  userData: PropTypes.shape({
    email: PropTypes.string,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    role: PropTypes.string,
  }),
  updateUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
};

export default UserAction;
