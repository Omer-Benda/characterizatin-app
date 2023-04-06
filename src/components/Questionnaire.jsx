import React, {useState} from 'react';
import { Button, Link } from '@mui/material';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';


export default function Questionnaire(props) {

  return (
    <>
    <div className='App-questionnaire'>
    <img className="App-logo" src="logo.png" style={{ maxWidth: '600px'}} />
    <br />
<h3 style={{color:'black', fontSize:'20px', 
textAlign:'center', marginLeft:'auto', marginRight:'auto' } }> 
אהלן {props.name}<br /> שמחים שבחרת להצטרף אלינו</h3>

<h5 style={{color:'black', fontSize:'15px', 
textAlign:'center', marginLeft:'auto', marginRight:'auto'}}> לפנייך שאלות שיעזרו לנו 
להכיר אותך טוב יותר, וכך להתאים עבורך את ההמלצות המדוייקות עבורך </h5>

      
    </div>
    <Button onClick={() => {props.continueClicked() }} variant="contained">לחץ להתחלה</Button>
 

    </>
  )
}
