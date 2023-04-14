import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button } from '@mui/material';

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
  createData('לינה', 'קאסה דיוויד', 13, 31),
  createData('לינה', 'לאונרדו', 14, 9),
  createData('אטרקציה', 'קייקים', 6, 3),
  createData('אטרקציה', 'גלישה', 23, 19),
  createData('מזון', 'מקדונלדס', 3, 91),
];



export default function DataTable(props) {
   const [count, setCount] = useState(0)                                 

  useEffect(()=>{
      console.log(props.allExpenes)
        {props.allExpenes.map((Expenes)=>{
          setExpensesInApp([...expensesInApp,createData(Expenes.KindOfExpenses,Expenes.ExpensesTitle,Expenes.PricePerOne,Expenes.NumberOfRepeatExpenses)])
         })
  
        }
  },[])

  const [expensesInApp, setExpensesInApp] = useState([createData('מזון', 'מקדונלדס', 3, 91)]);
                                
      const giveData=()=>{
        console.log(props.allExpenes)
        setCount(prev=>prev+1)

      }
      
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
            {expensesInApp
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
      <Button onClick={giveData}>בדיקת שפיות </Button>
    </Paper>
  );
}
