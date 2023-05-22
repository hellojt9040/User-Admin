import React from 'react';
import Header from '../Header';
import EditUserForm from '../EditUserForm';
import './EditUser.scss';

const EditUser = ({ userData, updateUser, closeEditModalHandler }) => {
  return (
    <div className="UserAppEditUser">
      <EditUserForm
        userData={userData}
        updateUser={updateUser}
        closeEditModalHandler={closeEditModalHandler}
      />
    </div>
  );
};

export default EditUser;
