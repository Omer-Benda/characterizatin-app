import React, {useState} from 'react';
import { Box, Button, Link, Paper } from '@mui/material';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import TopOfAplication from './TopOfAplication';
import styled from '@emotion/styled';



export default function Questionnaire(props) {

  return (
    <>
    <div className='App-questionnaire'>
      <TopOfAplication label='השלמת פרופיל אישי'/>
    <img className="App-logo" src="logo.png" style={{maxWidth:'250px', marginLeft:'auto', marginRight:'auto'}} />
    <br />
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} >
<h3 style={{color:'black', fontSize:'20px', 
textAlign:'center', marginLeft:'auto', marginRight:'auto' } }> 
אהלן {props.name}<br /> שמחים שבחרת להצטרף אלינו</h3>

<h5 style={{color:'black', fontSize:'15px', 
textAlign:'center', marginLeft:'auto', marginRight:'auto'}}> לפנייך שאלות שיעזרו לנו 
להכיר אותך טוב יותר, וכך להתאים עבורך את ההמלצות המדוייקות עבורך </h5>

<Button onClick={() => {props.continueClicked() }} variant="contained">לחץ להתחלה</Button>

</Box>
      
 </div>
    </>
  )
}
