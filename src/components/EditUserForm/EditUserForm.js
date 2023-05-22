import React, { useReducer, useCallback, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '../UI/form/TextField';
import Typography from '@mui/material/Typography';
import {
  INITIAL_STATE,
  formDataReducer,
  FORM_FIELD_CHANGE,
  FORM_SUBMIT,
} from './utils';
import {
  EMAIL_VALIDATION,
  ROLE_VALIDATION,
} from '../../utils/validators/validators';
import './EditUserForm.scss';

const EditUserForm = ({ userData, updateUser, closeEditModalHandler }) => {
  const [formData, dispatch] = useReducer(formDataReducer, INITIAL_STATE);
  const [isAnyFormFieldChanged, setIsFormFieldChanged] = useState(false);

  const onChangeHandler = useCallback(
    ({ payload }) => {
      dispatch({ type: FORM_FIELD_CHANGE, payload });
    },
    [dispatch]
  );

  const { inputs } = formData;
  const stringifiedInputs = JSON.stringify(inputs);

  const getUpdatedUserData = useCallback(() => {
    const updatedUserData = { ...userData };
    const updatedInputs = JSON.parse(stringifiedInputs);
    Object.keys(updatedInputs)?.forEach((input) => {
      if (input in updatedUserData) {
        updatedUserData[input] = updatedInputs?.[input]?.value || '';
      }
    });
    return updatedUserData;
  }, [userData, stringifiedInputs]);

  useEffect(() => {
    const updatedUserData = getUpdatedUserData();
    setIsFormFieldChanged(
      JSON.stringify(updatedUserData) !== JSON.stringify(userData)
    );
  }, [getUpdatedUserData]);

  const handleSubmit = () => {
    dispatch({ type: FORM_SUBMIT });
    const updatedUserData = getUpdatedUserData();
    closeEditModalHandler();
    updateUser(updatedUserData);
  };

  return (
    <form className="EditUserForm">
      <Typography
        variant="h6"
        component="div"
        align="center"
        sx={{ flexGrow: 1 }}
      >
        Please edit some data so save
      </Typography>
      <div className="EditUserForm__body">
        <TextField
          id="email"
          type="text"
          label="Email"
          placeholder="e.g: abc@xyz.com"
          initialValidation
          defaultValue={userData['email']}
          validity={formData.inputs?.email?.validity}
          validator={EMAIL_VALIDATION}
          changeHandler={onChangeHandler}
        />
        <TextField
          id="role"
          type="text"
          label="Role"
          placeholder="admin or member"
          initialValidation
          defaultValue={userData['role']}
          validity={formData.inputs?.role?.validity}
          validator={ROLE_VALIDATION}
          changeHandler={onChangeHandler}
        />
      </div>
      <div className="EditUserForm__action">
        <Button
          variant="outlined"
          disabled={!formData.isFormValid || !isAnyFormFieldChanged}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default EditUserForm;
