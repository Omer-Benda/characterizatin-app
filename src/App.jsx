import logo from './logo.svg';
import './App.css';
import Questionnaire from './components/Questionnaire';
import {useState} from 'react';
import Question from './components/Question';
import Persona from './components/Persona';
import PersonaTemplate from './components/PersonaTemplate';

function App() {
  const [page, setPage] = useState('Questionnaire');// למחוק אחרי השילוב עם עטר
  // const [page, setPage] = useState('firstQues');//    זמני עד הבנת ניווט


  return (
    <div className="App" >
      <div className="App-characterizatin">

{/* <Questionnaire name="עומר"/> */}
{page === 'Questionnaire' && <Questionnaire name='עומר' continueClicked={() => { setPage('firstQues') }} />}
{page === 'firstQues' && <Question pageNum='first' continueClicked={() => { setPage('secondQues') }} />}
{page === 'secondQues' && <Question name='עומר' pageNum='second' continueClicked={(navigaitionTo) => { setPage(navigaitionTo) }}/>}

{page === 'PersonaM' && <Persona name='עומר' pageNum='mucillar' continueClicked={(navigaitionTo) => { setPage(navigaitionTo)}}/>}
{page === 'PersonaB' && <Persona name='עומר' pageNum='balyanim' continueClicked={(navigaitionTo) => { setPage(navigaitionTo)}}/>}
{page === 'PersonaC' && <Persona name='עומר' pageNum='chill' continueClicked={(navigaitionTo) => { setPage(navigaitionTo)}}/>}

{/* {page === 'PersonaTemplate' && <PersonaTemplate name='עומר' pageNum='mucillar'/>} */}




{/* {page === 'Persona' && <Persona pageNum='chill' continueClicked={() => { setPage() }} />}
{page === 'Persona' && <Persona pageNum='balyan' continueClicked={() => { setPage() }} />} */}




      </div>
    </div>
  );
}

export default App;
