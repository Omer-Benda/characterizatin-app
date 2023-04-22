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
import { Alert, Button } from '@mui/material';
import { PostAdd } from '@mui/icons-material';
import NewExpense from './NewExpense';
import { useNavigate } from 'react-router-dom';

const columns = [
  { id: 'category', label: 'קטגוריה', minWidth: 5 },
  { id: 'title', label: 'כותרת', minWidth: 5 },
  {
    id: 'price',
    label: 'מחיר',
    minWidth: 5,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'amount',
    label: 'כמות',
    minWidth: 5,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'sum',
    label: 'סה"כ',
    minWidth: 5,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
    // format: (value) => value.toFixed(2),
  },
];

function createData(category, title, price, amount, code) {
  const sum = price * amount;
  return { category, title, price, amount, sum, code };
}

const rows = [
  createData('לינה', 'קאסה דיוויד', 13, 31),
  createData('לינה', 'לאונרדו', 14, 9),
  createData('אטרקציה', 'קייקים', 6, 3),
  createData('אטרקציה', 'גלישה', 23, 19),
  createData('מזון', 'מקדונלדס', 3, 91),
];

export default function DataTable(props) {

  const [expenses, setExpenses] = useState('');/// הבאה בצורה אסינכורית את כל ההוצאות של המשתמש

  const nav=useNavigate();

   const expensesFromDB =[];
   const [expensesInApp, setExpensesInApp] = useState([createData('₪', '₪', 0, 0)]);

   const [expensesToChange, setExpensesToChange] = React.useState();/// הבאה בצורה אסינכורית את כל ההוצאות של המשתמש

  useEffect(()=>{/// בכניסה ראשונה לקומפוננטה של תקציב, ריצה על כל מערך ההוצאות של המשתמש כפי שהתקבל בכניסה לאפליקציה והועבר בפרופסים בין הקומפוננטות ומיפוי שלהם לפי פורמט של שורה
    
    for (let index = 0; index < props.allExpenes.length; index++) {
      expensesFromDB[index]=createData(props.allExpenes[index].KindOfExpenses,props.allExpenes[index].ExpensesTitle,props.allExpenes[index].PricePerOne,props.allExpenes[index].NumberOfRepeatExpenses,props.allExpenes[index].ExpensesKey)
    }
    if (expensesFromDB.length== props.allExpenes.length) {
      setExpensesInApp(expensesFromDB)// הדרך שלי לשלוט ברענון הדאטה רק לאחר שהמיפוי הסתיים - מערכים באותו הגודל
    }
   
  },[])

                                
      const deleteOrUpdateExpens=(ketToGET)=>{
      alert(ketToGET);
     
  const apiUrl='http://localhost:65095/api/expenses/'
  fetch(apiUrl+ketToGET, 
     {
    method: 'GET',
    headers: new Headers({
        'Content-Type':'application/json; charset=UTF-8',
        'Accept':'application/json; charset=UTF-8',
        }),
    
       })
        .then(response => {
         console.log('response= ',response);
         console.log('response statuse=', response.status);
         console.log('response.ok=', response.ok)
        return response.json()
        })
        .then(
          (result)=>{
            console.log("fetch expense user by key=", result);
            // setExpensesToChange(result); // השמה של המשתמש שהגיע מהדאטה בייס להמשך עבודה בצד שרת
            //  {props.navToChange(result)}
            console.log('UserEmail', result.UserEmail)
            console.log('ExpensesTitle=', result.ExpensesTitle)
            console.log('ExpensesKey=', result.ExpensesKey)
            nav('/NewExpense',{state:result})
          },
        (error) => {
        console.log("err post=", error);
        });     
        // {props.navTo("NewExpense")}
    
      }//// להוציא את ההוצאה הספציפית על פי המפתח הוצאה והצגתה בדף של הוצאה חדשה
      

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
    <Paper sx={{ width: '100%', overflow: 'hidden' }} style={{direction:'rtl',height:'100%', width: '100%' , margin:'15px', marginBottom:'30px',backgroundColor:'#eeeeee'}}>
      <h4 style={{ color:'black',backgroundColor:'#e0e0e0', padding:'5px', margin:'15px',borderRadius: '5%'}}>
  {"רשימת ההוצאות שלי"}
</h4>
      <TableContainer sx={{ maxHeight: 440 }} >
        <Table stickyHeader aria-label="sticky table" >
          <TableHead >
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth , backgroundColor:'#e0e0e0'}}
                >
                 <b>{column.label}</b>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {expensesInApp
             .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code} onClick={()=>deleteOrUpdateExpens(row.code)}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value }
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

      {/* <Button style={{color:'black'}}onClick={() => {props.navTo("NewExpense")}}> הוצאה חדשה<PostAdd style={{marginRight:'10px'}}/></Button> */}
      <Button style={{color:'black'}}onClick={() => {nav('/NewExpense')}}> הוצאה חדשה<PostAdd style={{marginRight:'10px'}}/></Button>
    </Paper>
  );
}
