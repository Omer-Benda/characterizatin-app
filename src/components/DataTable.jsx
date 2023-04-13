import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
  { id: 'category', label: 'קטגוריה', minWidth: 30 },
  { id: 'title', label: 'כותרת', minWidth: 40 },
  {
    id: 'price',
    label: 'מחיר',
    minWidth: 40,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'amount',
    label: 'כמות',
    minWidth: 40,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'sum',
    label: 'סה"כ',
    minWidth: 40,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
    // format: (value) => value.toFixed(2),
  },
];

function createData(category, title, price, amount) {
  const sum = price * amount;
  return { category, title, price, amount, sum };
}

const rows = [
  createData('לינה', 'IN', 13, 3),
  createData('לינה', 'CN', 14, 9),
  createData('אטרקציה', 'IT', 6, 3),
  createData('אטרקציה', 'US', 3, 9),
  createData('מזון', 'CA', 3, 9),
];

export default function DataTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  // };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }} style={{direction:'rtl',height:'100%', width: '100%' , margin:'15px', marginBottom:'30px'}}>
      <h4 style={{ color:'white',backgroundColor:'#598e89', padding:'5px', margin:'15px', borderStyle:'double'}}>
  {"רשימת ההוצאות שלי"}
</h4>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                 <u><b>{column.label}</b></u>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* {תפריט ניווט למטה של מעבר בין עמודים} */}
      {/* <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </Paper>
  );
}