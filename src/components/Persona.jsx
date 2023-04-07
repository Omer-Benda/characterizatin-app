
import React from 'react'
import {Button} from '@mui/material';
import ArrowBackIosNew from '@mui/icons-material/ArrowBackIosNew';
import PersonaTemplate from './PersonaTemplate';

export default function Persona(props) {
  
  return (
    <>
    <div>
  <Button onClick={()=>{props.continueClicked('secondQues')}}> <ArrowBackIosNew style={{color:'black',
    position: 'absolute', right:'150px', top:'-120px' }}/> </Button>
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
  
  <Button onClick={() => {props.continueClicked('PersonaTemplate') }} variant="contained">{'אני רוצה להתחיל'}</Button>
    </>
  )
}



// import React from 'react'
// import {Button} from '@mui/material';
// import ArrowBackIosNew from '@mui/icons-material/ArrowBackIosNew';

// export default function Persona(props) {
//   return (
//     <>
//   {props.pageNum=='mucillar' ? <div>
//   <div>
//     <Button onClick={()=>{props.continueClicked('secondQues')}}> <ArrowBackIosNew style={{color:'black',
//     position: 'absolute', right:'150px', top:'-120px' }}/> </Button>
//     </div>
//   <img className="persona-logo" src="mucillar.jpg" />
//   <h3 style={{color:'black', fontSize:'20px', 
// textAlign:'center', marginLeft:'auto', marginRight:'auto', marginTop:'80px' } }>  {props.name} , שמחים  לעדכן כי תהליך האפיון הסתיים<br /> </h3>


// <h5 style={
//   {color:'black', fontSize:'15px', 
//    textAlign:'center', marginLeft:'auto', 
//    marginRight:'auto'}}> 
// אין שאלה, אתה <u style={{color:'green'}}>מוצ'ילר</u> אמיתי <br /> עכשיו אחרי שהכרנו, תוכל להתחיל לתכנן את הטיול שלך בתחת, אנחנו כבר נדאג לעדכן ולשתף איתך את ההמלצות הטובות ביותר שמתאימות בדיוק לך<br /> 
// </h5>

//   </div> : ""}

//   <Button onClick={() => {props.continueClicked('PersonaTemplate') }} variant="contained">{'אני רוצה להתחיל'}</Button>
//     </>
//   )
// }




