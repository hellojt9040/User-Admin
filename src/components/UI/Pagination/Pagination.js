import React from 'react';
import PropTypes from 'prop-types';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { DEFAULT_PAGE } from '../../../constants/constants';

export default function CPagination({ currentPage, totalPages, onPageChange }) {
  return (
    <Stack spacing={2}>
      <Pagination
        page={currentPage}
        count={totalPages}
        defaultPage={DEFAULT_PAGE}
        onChange={onPageChange}
        showFirstButton
        showLastButton
      />
    </Stack>
  );
}

CPagination.defaultProps = {
  totalPages: 0,
  currentPage: 1,
};

CPagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
