import React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import useAdminData from './useAdminData';
import Table from '../../components/Table';
import Checkbox from '../../components/form/Checkbox';
import Visible from '../../components/utils/Visible';
import { COLUMN_HEADERS } from '../../constants/constants';
import './UserAdmin.scss';

const UserAdmin = () => {
  const { users, isFetching, isFetched, error } = useAdminData();

  const columnHeaders = COLUMN_HEADERS.map((column) => {
    const columnData = {
      header: column,
    };
    if (column === '__select') {
      columnData.rendrer = <Checkbox />;
    }
    return columnData;
  });

  debugger;
  return (
    <div className="UserAdmin">
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
        {/* <Visible when={isFetched && !error && !users.length}>
          No Data Found
        </Visible>
        <Visible when={isFetched && !error && !!users.length}>
          <Table rowData={ROWDATA} tableData={users} />
        </Visible>
        <Visible when={isFetched && !!error}>
          <Typography
            variant="h5"
            align="center"
            component="h5"
            className="UserAdmin__error"
          >
            {error}
          </Typography>
        </Visible> */}
      </Card>
    </div>
  );
};

export default UserAdmin;
