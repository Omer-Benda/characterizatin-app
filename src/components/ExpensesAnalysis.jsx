
import { Button, Card, CardActions, CardContent, Chip, Popper, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navigation from './Navigation'
import ProgressBar from './ProgressBar'
import TopOfAplication from './TopOfAplication'
import FaceIcon from '@mui/icons-material/Face';
import { LocalFireDepartment, Percent, PointOfSale, QueryStats, Savings } from '@mui/icons-material'

export default function ExpensesAnalysis() {
  const nav=useNavigate();
  const [expensesInApp, setExpensesInApp] = useState('');/// הבאה בצורה אסינכורית את כל ההוצאות של המשתמש
  const [sumExpense, setSumExpense] = useState(1);/// הבאה בצורה אסינכורית את כל ההוצאות של המשתמש
  const [userInApp, setUserInApp] = useState('');// בתאכלס, משתמש ישלח כבר מעטר, עד החיבור מביא אותו בגט לפי מיקום
  const [userBudget, setUserBudget] = useState(1);// בתאכלס, משתמש ישלח כבר מעטר, עד החיבור מביא אותו בגט לפי מיקום


  useEffect(()=>{
    const apiUrl='http://localhost:65095/api/expenses/?email=Benda669@gmail.com'
    fetch(apiUrl, 
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
              console.log("fetch get user by id=", result);
              // console.log("result=", result.UserFirstName);
              setExpensesInApp(result); // השמה של המשתמש שהגיע מהדאטה בייס להמשך עבודה בצד שרת
              console.log('UserEmail', result[0].UserEmail)
              console.log('ExpensesTitle=', result[0].ExpensesTitle)
              console.log(result.length);
              const lengthOfArr=result.length;
          
            },
          (error) => {
          console.log("err post=", error);
          });     
      
       },[])// הבאת כל ההוצאות של המשתמש
      
    
  useEffect(()=>{
    const apiUrl='http://localhost:65095/api/expenses/getsumof/?email=Benda669@gmail.com'
    fetch(apiUrl, 
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
              console.log("fetch get user sumOfExpense by email=", result);
              // console.log("result=", result.UserFirstName);
              setSumExpense(result); // השמה של המשתמש שהגיע מהדאטה בייס להמשך עבודה בצד שרת
            },
          (error) => {
          console.log("err post=", error);
          });     
      
       },[]) // סה"כ הוצאות שלו עד כה
       
 useEffect(()=>{
        const apiUrl='http://localhost:65095/api/users/getemail/?email=Benda669@gmail.com'
        // const apiUrl='http://localhost:58583/api/users/1'
    
        fetch(apiUrl, 
          {
          method: 'GET',
          headers: new Headers({
            'Content-Type':'application/json; charset=UTF-8',
            'Accept':'application/json; charset=UTF-8',
            })
            
          })
        .then(response => {
         console.log('response= ',response);
         console.log('response statuse=', response.status);
         console.log('response.ok=', response.ok)
        
        return response.json()
        })
        .then(
          (result)=>{
            console.log("fetch get user by id=", result);
            console.log("result=", result.UserFirstName);
            setUserInApp(result); // השמה של המשתמש שהגיע מהדאטה בייס להמשך עבודה בצד שרת
            setUserBudget(result.UserBuget)
            console.log('first name=', result.UserFirstName)
            console.log('first name=', result.UserLastName)
            console.log('budget=', result.UserBuget)

          },
        (error) => {
        console.log("err post=", error);
        });     
    
          },[])// הבאת פרטי המשתמש- שימוש לתקציב שכן נקבע בדף ניהול תקציב
  
          return (
    <div>
      <TopOfAplication label='ניתוח הוצאות'/>
      
      <Card sx={{ minWidth: 275  }} style={{marginTop:'60px', backgroundColor:'#eeeeee'}} >
      <CardContent >
        <Typography variant="h6" component="div" gutterBottom  >
        <b> סטטוס הוצאות</b>
        </Typography>

        <Typography variant="body2" >
          <br />
          <Chip icon={<Savings/>} style={{color:'ActiveCaption'}}  label={` ₪ ${userBudget} תקציב הטיול`}   variant="outlined" />
          <ProgressBar sumOfexpenses={sumExpense} completed={parseInt((sumExpense/userBudget)*100)}/>
        </Typography>
        <Stack direction="row" spacing={2} style={{marginTop:'35px'}}>
          <Chip icon={<LocalFireDepartment style={{color:'red'}} />} label={` ₪ ${sumExpense} נשרפו`} color="error" variant="outlined" />
          <Chip icon={<PointOfSale/>} label={` ₪ ${userBudget-sumExpense} זמינים`} color="success" variant="outlined" />
          </Stack>
      </CardContent>
      <CardActions >
      <Button style={{marginLeft:'auto', marginRight:'auto',backgroundColor:'#598e89'}} size="small" onClick={() => {nav('/Analysis')}} variant="contained" > {<QueryStats/>}</Button>
      </CardActions>
    </Card>

      <Navigation pagNav={'budget'}/>
    </div>
  )
}
