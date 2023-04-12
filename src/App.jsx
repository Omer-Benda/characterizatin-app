import logo from './logo.svg';
import './App.css';
import Questionnaire from './components/Questionnaire';
import {useEffect, useState} from 'react';
import Question from './components/Question';
import Persona from './components/Persona';
import PersonaTemplate from './components/PersonaTemplate';
import UserProfile from './components/UserProfile';

function App() {
  const [page, setPage] = useState('');// למחוק אחרי השילוב עם עטר
  // const [page, setPage] = useState('firstQues');//    זמני עד הבנת ניווט
  const [userInApp, setUserInApp] = useState('');// בתאכלס, משתמש ישלח כבר מעטר, עד החיבור מביא אותו בגט לפי מיקום

useEffect(()=>{
    const apiUrl='http://localhost:65095/api/users/1'
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

  return (
    <div className="App" >
      <div className="App-characterizatin">

{/* <Questionnaire name="עומר"/> */}
{page === 'Questionnaire' && <Questionnaire  name={userInApp.UserFirstName} continueClicked={() => { setPage('firstQues') } } />}
{page === 'firstQues' && <Question pageNum='first' continueClicked={() => { setPage('secondQues') }} />}
{page === 'secondQues' && <Question name={userInApp.UserFirstName} pageNum='second' continueClicked={(navigaitionTo) => { setPage(navigaitionTo) }}/>}

{page === 'PersonaM' && <Persona name={userInApp.UserLastName} pageNum='mucillar' continueClicked={(navigaitionTo) => { setPage(navigaitionTo)}}/>}
{page === 'PersonaB' && <Persona name={userInApp.UserFirstName} pageNum='balyanim' continueClicked={(navigaitionTo) => { setPage(navigaitionTo)}}/>}
{page === 'PersonaC' && <Persona name={userInApp.UserFirstName} pageNum='chill' continueClicked={(navigaitionTo) => { setPage(navigaitionTo)}}/>}

{page === 'userProfile' && <UserProfile name={userInApp.UserFirstName} email={userInApp.UserEmail} personaType={userInApp.UserType}/>}

      </div>
    </div>
  );
}

export default App;
