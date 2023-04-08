
import React from 'react'
import {Button} from '@mui/material';
import ArrowBackIosNew from '@mui/icons-material/ArrowBackIosNew';
import PersonaTemplate from './PersonaTemplate';

export default function Persona(props) {
  
  return (
    <>
    <div>
  <Button onClick={()=>{props.continueClicked('secondQues')}}> <ArrowBackIosNew style={{color:'black',
    position: 'absolute', right:'150px', top:'-40px' }}/> </Button>
  </div>
  {props.pageNum=='mucillar' ? <div>
 <PersonaTemplate name={props.name} pageNum='mucillar'/>
  </div> : ""}
  {props.pageNum=='balyanim' ? <div>
 <PersonaTemplate name={props.name} pageNum='balyanim'/>
  </div> : ""}
  {props.pageNum=='chill' ? <div>
 <PersonaTemplate name={props.name} pageNum='chill'/>
  </div> : ""}
  
  <Button onClick={() => {props.continueClicked('userProfile')}} variant="contained">אני רוצה להתחיל</Button>
    </>
  )
}






