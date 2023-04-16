
import React, { useEffect } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import TopOfAplication from './TopOfAplication';
import { Button, FormControl, InputLabel, MenuItem, Paper, Select } from '@mui/material';
import Navigation from './Navigation';

export default function NewExpense(props) {
  
  const [category, setCategory] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const numToDel=props.ExKey;/// החזקת המפתח שעתיד להמחק/ להערך
  // const handleChange = (event) => {
  //   setCategory(event.target.value);
  // };
  // const handleChange1 = (event) => {
  //   setTitle(event.target.value);
  // };
  // const handleChange2 = (event) => {
  //   setPrice(event.target.value);
  // };
  // const handleChange3 = (event) => {
  //   setAmount(event.target.value);
  // };

const postNewExpenseToDB =()=>{
const apiUrl='http://localhost:65095/api/expenses/post'
    // const apiUrl='http://localhost:58583/api/users/1'
const expense={
UserEmail: "Benda669@gmail.com",// ישתנה בהמשך יועבר דרך פרופס
PricePerOne: price,
NumberOfRepeatExpenses: amount,
ExpensesTitle: title,
KindOfExpenses: category,// בעקבות בעיה בדאטה בייס כרגע הערך ישאר קבוע, אחרי סידור של נוי ילקח מהסלקט בהתאמה
ExpensesKey:4,
TotalPriceToPay:price*amount
};
    fetch(apiUrl, 
      {
      method: 'POST',
      body:JSON.stringify(expense),
      headers: new Headers({
        'Content-Type':'application/json; charset=UTF-8',
        'Accept':'application/json; charset=UTF-8',
        })
        
      })
    .then(response => {
     console.log('response= ',response);
     console.log('response statuse=', response.status);
     console.log('response.ok=', response.ok)
     props.continueClicked('budget')
    },
    (error) => {
    console.log("err post=", error);
    });     
  }

  const deleteExpense=()=>{
      
      const apiUrl='http://localhost:65095/api/expenses/delete/'
      fetch(apiUrl+numToDel, 
         {
        method: 'Delete',
        headers: new Headers({
            'Content-Type':'application/json; charset=UTF-8',
            'Accept':'application/json; charset=UTF-8',
            }),
           })
            .then(response => {
             if (response.ok) {
              console.log('response.ok=', response.ok)
              console.log('num of key delete=', numToDel)
             }
             props.continueClicked('budget')
              },
            (error) => {
            console.log("err post=", error);
            });    
  }

  const putExpense=()=>{
    const apiUrl='http://localhost:65095/api/expenses/put/'
    // const apiUrl='http://localhost:58583/api/users/1'
const expense={
UserEmail: "Benda669@gmail.com",// ישתנה בהמשך יועבר דרך פרופס
PricePerOne: price,
NumberOfRepeatExpenses: amount,
ExpensesTitle: title,
KindOfExpenses: category,// בעקבות בעיה בדאטה בייס כרגע הערך ישאר קבוע, אחרי סידור של נוי ילקח מהסלקט בהתאמה
ExpensesKey: numToDel,// לא באמת משנה מה ישלח פה
TotalPriceToPay:price*amount
};
    fetch(apiUrl +numToDel, 
      {
      method: 'PUT',
      body:JSON.stringify(expense),
      headers: new Headers({
        'Content-Type':'application/json; charset=UTF-8',
        'Accept':'application/json; charset=UTF-8',
        })
        
      })
    .then(response => {
     console.log('response= ',response);
     console.log('response statuse=', response.status);
     console.log('response.ok=', response.ok)
     props.continueClicked('budget')
    },
    (error) => {
    console.log("err post=", error);
    });     
  }

  return (
    <>
    <TopOfAplication label='הוצאה חדשה'/>
    <Paper sx={{maxWidth:'300'}} style={{direction:'rtl', backgroundColor:'#eeeeee'}}>
    <img className="App-logo" src="expense-logo.png" style={{marginTop:'20px'}} />

    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 2.5, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      
    <FormControl sx={{ m: 1, width:'25ch' }} size="small">
      <InputLabel color='success' id="demo-select-small">{props.Ecategory}</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={category}
        label="קטגוריה"
        color="success"
        onChange={(event)=>{setCategory(event.target.value)}}
      >
        <MenuItem value={""}>
          <em>אחר</em>
        </MenuItem>
        <MenuItem value={'לינה'}>לינה</MenuItem>
        <MenuItem value={'אטרקציות'}>אטרקציות</MenuItem>
        <MenuItem value={'מזון'}>מזון</MenuItem>
        <MenuItem value={'בילויים'}>בילויים</MenuItem>
        <MenuItem value={'הימורים'}>הימורים</MenuItem>
        <MenuItem value={'סמים'}>סמים</MenuItem>
      </Select>
    </FormControl>

      {/* <TextField label={"תיאור קצר"} color="success"  size="small" onChange={(event)=>{setTitle(event.target.value)}} /> */}
      {/* <TextField type={'number'} label={'מחיר בש"ח ליחידה'} color="success" size="small" onChange={(event)=>{setPrice(event.target.value)}}/> */}
      {/* <TextField type={'number'} label={"מספר פעמים"} color="success" size="small" onChange={(event)=>{setAmount(event.target.value)}}/> */}

      <TextField label={props.title} color="success"  size="small" onChange={(event)=>{setTitle(event.target.value)}} />
      <TextField type={'number'} label={props.price} color="success" size="small" onChange={(event)=>{setPrice(event.target.value)}}/>
      <TextField type={'number'} label={props.amount} color="success" size="small" onChange={(event)=>{setAmount(event.target.value)}}/>
      {/* onClick={() => {props.continueClicked('budget')}} */}
    </Box>
    <Button style={{marginLeft:'auto', marginRight:'auto',margin:'5px',backgroundColor:'#598e89'}} size="small" onClick={postNewExpenseToDB} variant="contained"> הוסף הוצאה</Button>
    <Button style={{marginLeft:'auto', marginRight:'auto',margin:'5px',backgroundColor:'#598e89'}} size="small" onClick={deleteExpense} variant="contained"> לחץ למחיקה</Button>
    <Button style={{marginLeft:'auto', marginRight:'auto',margin:'5px',backgroundColor:'#598e89'}} size="small" onClick={putExpense} variant="contained">לחץ לעדכון</Button>

    </Paper>
    <Navigation navTo={(page)=>props.continueClicked(page)}/>

    </>
  )
}