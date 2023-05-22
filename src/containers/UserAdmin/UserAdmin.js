import React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Backdrop from '@mui/material/Backdrop';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import useAdminData from './useAdminData';
import Table from '../../components/Table';
import UserAction from '../../components/UserAction';
import Checkbox from '../../components/UI/form/Checkbox';
import Pagination from '../../components/UI/Pagination';
import Visible from '../../components/utils/Visible';
import { COLUMN_HEADERS } from '../../constants/constants';
import './UserAdmin.scss';

const UserAdmin = () => {
  const {
    users,
    isFetching,
    isFetched,
    error,
    updateUser,
    deleteUser,
    currentPage,
    pageChangeHandler,
    totalPages,
    userSelectionHandler,
    deleteMultipleUsers,
    selectedUsers,
    allSelected,
  } = useAdminData();

  // const updateExistingData = useCallback((data) => {
  //   updateUser(data);
  // }, [updateUser]);

  // const deleteExistingData = useCallback((data) => {
  //   updateUser(data);
  // }, [updateUser]);

  const columnHeaders = COLUMN_HEADERS.map((column) => {
    const columnData = {
      header: column,
    };

    const renderer = (El, props) => <El {...props} />;
    if (column === '__select') {
      columnData.renderer = (props) =>
        renderer(Checkbox, {
          ...props,
          changeHandler: userSelectionHandler,
          selectedUsers: selectedUsers,
        });
      columnData.headerRenderer = (
        <Checkbox
          changeHandler={userSelectionHandler}
          isAllSelection
          isChecked={allSelected}
        />
      );
    } else if (column === '__actions') {
      // columnData.renderer = <UserAction />;
      columnData.renderer = (props) =>
        renderer(UserAction, {
          ...props,
          updateUser,
          deleteUser,
        });
      columnData.headerRenderer = ' ';
    }
    return columnData;
  });

  return (
    <>
      <Visible when={isFetching}>
        <LinearProgress />
      </Visible>
      <div className="UserAdmin">
        <Backdrop
          className="UserAdmin UserAdmin__backdrop"
          sx={{
            backgroundColor: '#00000024',
            position: 'absolute',
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={isFetching}
        ></Backdrop>
        <Card>
          <Visible when={isFetched}>
            <Visible when={!error}>
              <Visible when={!users?.length}>No Data Found</Visible>
              <Visible when={!!users?.length}>
                <Table columnData={columnHeaders} tableData={users} />
              </Visible>
            </Visible>
            <Visible when={!!error}>
              <Typography
                variant="h5"
                align="center"
                component="h5"
                className="UserAdmin__error"
              >
                {error}
              </Typography>
            </Visible>
          </Visible>
          <Stack
            className="UserAdmin__pagination"
            spacing={2}
            direction="row"
            justifyContent="space-between"
          >
            <div>
              <Visible when={!!selectedUsers.length}>
                <Button
                  variant="contained"
                  endIcon={<DeleteIcon />}
                  onClick={deleteMultipleUsers}
                >
                  Delete Selected
                </Button>
              </Visible>
            </div>
            <Visible when={!!totalPages}>
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={pageChangeHandler}
              />
            </Visible>
          </Stack>
        </Card>
      </div>
    </>
  );
};

export default UserAdmin;
