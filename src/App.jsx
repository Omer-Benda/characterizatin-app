import logo from './logo.svg';
import './App.css';
import Questionnaire from './components/Questionnaire';
import {useEffect, useState} from 'react';
import Question from './components/Question';
import Persona from './components/Persona';
import PersonaTemplate from './components/PersonaTemplate';
import UserProfile from './components/UserProfile';
import Budget from './components/Budget';
import NewExpense from './components/NewExpense';
import { Route, Routes } from 'react-router-dom';
import ExpensesAnalysis from './components/ExpensesAnalysis';

function App() {
  const [page, setPage] = useState('');// למחוק אחרי השילוב עם עטר
  // const [page, setPage] = useState('firstQues');//    זמני עד הבנת ניווט
  const [userInApp, setUserInApp] = useState('');// בתאכלס, משתמש ישלח כבר מעטר, עד החיבור מביא אותו בגט לפי מיקום
  const [expensesInApp, setExpensesInApp] = useState('');/// הבאה בצורה אסינכורית את כל ההוצאות של המשתמש

  // const [numOfExpense, setNumOfExpense] = useState({KindOfExpenses:'סוג ההוצאה',ExpensesTitle:'תיאור קצר', PricePerOne:'מחיר בש"ח ליחידה', NumberOfRepeatExpenses:'מספר פעמים', ExKey:0});

useEffect(()=>{
    const apiUrl='http://localhost:65095/api/users/getid/6'
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
        console.log('first name=', userInApp.UserFirstName)
        console.log('first name=', userInApp.UserLastName)
        if (userInApp!=undefined) {
          setPage('Questionnaire')// בגלל שריאקט הולך יחד עם כל השינויים בסטייט ואין לנו דרך לנהל איזה שינוי ירוץ קודם, השינוי לעמוד הראשי תלוי בכך שהערך כבר קיים משמע הגיע מהדאטה בייס
        }
      },
    (error) => {
    console.log("err post=", error);
    });     

      },[])

useEffect(()=>{
  const apiUrl='http://localhost:65095/api/expenses/?email=Benda669@gmail.com'
  // const apiUrl='http://localhost:58583/api/users/1'
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
    
     },[])
    

  return (
    <div className="App" >
      <div className="App-characterizatin">


<Routes>
  <Route path="/" element={<Questionnaire  name={userInApp.UserFirstName}/>}/> 
  <Route path="firstQues" element={<Question pageNum='first'/>}/> 
  <Route path="secondQues" element={<Question name={userInApp.UserFirstName} pageNum='second'/>}/> 
  <Route path="PersonaM" element={<Persona name={userInApp.UserLastName} pageNum='mucillar'/>}/> 
  <Route path="PersonaB" element={<Persona name={userInApp.UserFirstName} pageNum='balyanim'/>}/> 
  <Route path="PersonaC" element={<Persona name={userInApp.UserFirstName} pageNum='chill'/>}/> 
  <Route path="userProfile" element={<UserProfile name={userInApp.UserFirstName} email={userInApp.UserEmail}/>}/> 
  <Route path="budget" element={<Budget allExpenes={expensesInApp}/>}/> 
  {/* <Route path="budget" element={<Budget allExpenes={expensesInApp} continueClicked={(navigaitionTo) => { setPage(navigaitionTo)}} navToChange={(exNum) => {setNumOfExpense(exNum)}}/>}/>  */}
  <Route path="profile" element={<UserProfile name={userInApp.UserFirstName} email={userInApp.UserEmail} personaType={userInApp.UserType}/>}/> 
  {/* <Route path="profile" element={<UserProfile name={userInApp.UserFirstName} email={userInApp.UserEmail} personaType={userInApp.UserType} continueClicked={(navigaitionTo) => { setPage(navigaitionTo)}}/>}/>  */}
  {/* <Route path="NewExpense" element={<NewExpense title={numOfExpense.ExpensesTitle} price={numOfExpense.PricePerOne} amount={numOfExpense.NumberOfRepeatExpenses} ExKey={numOfExpense.ExpensesKey} Ecategory={numOfExpense.KindOfExpenses} />}/>  */}
  <Route path="NewExpense" element={<NewExpense />}/> 
  <Route path="Analysis" element={<ExpensesAnalysis/>}/> 
</Routes>




{/* <Questionnaire name="עומר"/> */}

{/* {page === 'Questionnaire' && <Questionnaire  name={userInApp.UserFirstName} continueClicked={() => { setPage('firstQues') } } />}
{page === 'firstQues' && <Question pageNum='first' continueClicked={() => { setPage('secondQues') }} />}
{page === 'secondQues' && <Question name={userInApp.UserFirstName} pageNum='second' continueClicked={(navigaitionTo) => { setPage(navigaitionTo) }}/>}

{page === 'PersonaM' && <Persona name={userInApp.UserLastName} pageNum='mucillar' continueClicked={(navigaitionTo) => { setPage(navigaitionTo)}}/>}
{page === 'PersonaB' && <Persona name={userInApp.UserFirstName} pageNum='balyanim' continueClicked={(navigaitionTo) => { setPage(navigaitionTo)}}/>}
{page === 'PersonaC' && <Persona name={userInApp.UserFirstName} pageNum='chill' continueClicked={(navigaitionTo) => { setPage(navigaitionTo)}}/>}

{page === 'userProfile' && <UserProfile name={userInApp.UserFirstName} email={userInApp.UserEmail} personaType={userInApp.UserType} continueClicked={(navigaitionTo) => { setPage(navigaitionTo)}}/>}

{page === 'budget' && <Budget allExpenes={expensesInApp} continueClicked={(navigaitionTo) => { setPage(navigaitionTo)}} navToChange={(exNum) => {setNumOfExpense(exNum)}}/>}
{page === 'profile' && <UserProfile name={userInApp.UserFirstName} email={userInApp.UserEmail} personaType={userInApp.UserType} continueClicked={(navigaitionTo) => { setPage(navigaitionTo)}}/>}

{page === 'NewExpense' && <NewExpense continueClicked={(navigaitionTo) => { setPage(navigaitionTo)}} title={numOfExpense.ExpensesTitle} 
price={numOfExpense.PricePerOne} amount={numOfExpense.NumberOfRepeatExpenses} ExKey={numOfExpense.ExpensesKey} Ecategory={numOfExpense.KindOfExpenses} />} */}

{/* <Questionnaire name="עומר"/> */}

      </div>
    </div>
  );
}

export default App;
