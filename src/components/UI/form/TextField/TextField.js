import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';

export default function TextFields({
  id,
  label,
  placeholder,
  type,
  validity,
  validator,
  isDisabled,
  defaultValue,
  triggerValidation,
  changeHandler,
  initialValidation,
}) {
  const [value, setValue] = useState(defaultValue);
  const [touched, setTouched] = useState(false);

  const onChangeHandler = (value) => {
    let validity = true;
    if (!!validator) {
      validity = validator(value.toString());
    }
    setTouched(true);
    changeHandler({
      payload: {
        name: id,
        value,
        validity,
      },
    });
    setValue(value);
  };

  const handlerBlur = () => {
    setTouched(true);
  };

  useEffect(() => {
    if (initialValidation) {
      onChangeHandler(value);
    }
  }, [initialValidation]);

  return (
    <TextField
      id="standard-basic"
      label={label || ''}
      variant="standard"
      fullWidth
      placeholder={placeholder || ''}
      type={type}
      error={touched && !validity}
      value={value}
      disabled={isDisabled}
      onChange={(event) => onChangeHandler(event.target.value)}
      onBlur={handlerBlur}
    />
  );
}

TextFields.defaultProps = {
  type: 'text',
  validity: false,
  isDisabled: false,
  defaultValue: '',
  initialValidation: false,
};

TextFields.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  validity: PropTypes.bool,
  validator: PropTypes.func,
  isDisabled: PropTypes.bool,
  defaultValue: PropTypes.string,
  triggerValidation: PropTypes.func,
  changeHandler: PropTypes.func,
  initialValidation: PropTypes.bool,
};
