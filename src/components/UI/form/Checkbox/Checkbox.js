import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@mui/material/Checkbox';

export default function CCheckbox({
  rowData,
  isChecked,
  selectedUsers,
  changeHandler,
  isAllSelection,
}) {
  const [checked, setChecked] = useState(!!isChecked || false);
  const { id } = rowData;

  const handleChange = (event) => {
    const value = event.target.checked;
    changeHandler({ id, isAllSelection, checked: value });
    setChecked(value);
  };

  useEffect(() => {
    debugger;
    setChecked(!!selectedUsers?.includes(id));
  }, [selectedUsers, id]);

  useEffect(() => {
    setChecked(isChecked);
  }, [isChecked]);

  return (
    <Checkbox
      checked={checked}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
    />
  );
}

CCheckbox.defaultProps = {
  isChecked: false,
  isAllSelection: false,
  rowData: {},
};

CCheckbox.propTypes = {
  rowData: PropTypes.shape({
    id: PropTypes.string,
  }),
  isChecked: PropTypes.bool,
  isAllSelection: PropTypes.bool,
  changeHandler: PropTypes.func.isRequired,
  selectedUsers: PropTypes.array,
};
