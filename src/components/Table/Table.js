import * as React from 'react';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './Table.scss';

const BasicTable = ({ columnData, tableData, classes }) => {
  debugger;
  return (
    <div className={`Table ${classes}`}>
      <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
          <TableHead>
            <TableRow>
              {columnData?.map((column) => {
                return (
                  <TableCell
                    key={column.header}
                    align="left"
                    className="Table__headerName"
                  >
                    {column.headerRenderer
                      ? column.headerRenderer
                      : column.header}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData?.map((row) => {
              return (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {columnData.map((column) => (
                    <TableCell align="left" key={column.header}>
                      {column.renderer
                        ? column.renderer({
                            rowData: row,
                          })
                        : row[column.header?.toLowerCase()]}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

BasicTable.defaultProps = {
  classes: '',
};

BasicTable.propTypes = {
  classes: PropTypes.string,
  columnData: PropTypes.array,
  tableData: PropTypes.array,
};

export default BasicTable;
