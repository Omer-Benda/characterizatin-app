
import styled from '@emotion/styled';
import { Avatar, Badge, BottomNavigation, BottomNavigationAction, Button, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import { Box, margin, padding, Stack } from '@mui/system';
import AutoStories from '@mui/icons-material/AutoStories';
import HikingIcon from '@mui/icons-material/Hiking';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Navigation from './Navigation';
import Paper from '@mui/material/Paper';
import TopOfAplication from './TopOfAplication';
import { Celebration, SelfImprovement } from '@mui/icons-material';

export default function UserProfile(props) {


  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      // boxShadow:'0 0 0 20px',
       boxShadow: '0 0 0 2px ${theme.palette.background.paper}',
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));
  
  const [checkType, setCheckType]= useState('')

  useEffect(()=>{

      if (props.personaType=='מוצילר') {
        setCheckType( <HikingIcon/>)
      }
      if (props.personaType=='בליין') {
       
        setCheckType(<Celebration/>)
      }
      if (props.personaType=='ציל') {
    
        setCheckType(<SelfImprovement/>) 
      }
      
  },[])

  return (
    <>
<TopOfAplication label='הפרופיל שלי'  />

<img className="App-logo" src="logo.png" style={{marginTop:'45px'}} />

<Box style={{marginBottom:'10px', backgroundColor:'#eeeeee', margin:'25px', padding:'25px',  borderRadius:'5%'}}>
  <Stack direction={"row"} spacing={5} justifyContent={'space-around'} >
  <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        variant="dot"
      >
  <Avatar sx={{ width:64, height:64 }} src="/broken-image.jpg" style={{  display: 'flex' } } onClick={()=>{alert('bdika')}} /> 
  </StyledBadge>
<p style={{color:'black'}}>שלום {props.name} <br /> {props.email} </p>
 </Stack>
</Box>

<List  sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar style={{
  marginTop:'20px', marginBottom:'15px'
  }}>
          <Avatar>
            <AutoStories/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText
        style={{ textAlign:'right' }}
          primary=" "
          secondary={
            <React.Fragment >
              <Typography
                sx={{ display: 'inline'}}
                component="span"
                variant="body2"
                color="text.primary"
              >
               <b style={{textAlign:'center'}} > {'יומן המסע שלי'}</b>
               <br />
              </Typography>
               {" לחץ על המחברת לצפייה בסיפור הדרך שלך"}
             
            </React.Fragment>
          }
        />
      </ListItem>

      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar style={{
  marginTop:'20px', marginBottom:'15px'
  }}>
          <Avatar>
          {checkType}
         {/* <HikingIcon/> */}
          {/* שליחת האייקון המתאים לפי הפרסונה שהתקבלה */}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
        style={{ textAlign:'right' }}
          primary=" "
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                
               <b> {"אופיינת כ-" + props.personaType}</b>
               <br />
              </Typography>
              {"לחץ על האייקון על מנת ללמוד עוד אודות איפיון המערכת והמשמעות עבורך"}
            </React.Fragment>
          }
        />
      </ListItem>

      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar style={{
  marginTop:'20px', marginBottom:'15px'
  }}>
          <Avatar>
            <FavoriteIcon/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText
        style={{ textAlign:'right' }}
          primary=" "
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
               <b> {'המועדפים שלי'}</b>
               <br />
              </Typography>
              {"לחץ על ה-לב לצפייה ברשימת המועדפים שלך"}
            </React.Fragment>
          }
        />
      </ListItem>
    </List>

<Navigation navTo={(page)=>props.continueClicked(page)}/>
    </>
  )

}
