import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '../UI/form/TextField';

const Searchbar = ({ searchChangeHandler }) => {
  const [searchValue, setSearchValue] = useState('');

  const inputChangeHandler = ({ payload = {} }) => {
    const { value } = payload;
    debugger;
    const initTrimmedValue = value?.trimStart();
    searchChangeHandler(initTrimmedValue);
  };

  return (
    <div className="Searchbar">
      <TextField
        id="searchbar"
        variant="outlined"
        placeholder="Search by name, email or role"
        changeHandler={inputChangeHandler}
        validity
      />
    </div>
  );
};

Searchbar.propTypes = {
  searchChangeHandler: PropTypes.func.isRequired,
};

export default Searchbar;
