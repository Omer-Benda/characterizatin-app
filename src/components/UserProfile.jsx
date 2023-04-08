
import styled from '@emotion/styled';
import { Avatar, Badge, Button, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import React from 'react'
import EditIcon from '@mui/icons-material/Edit';
import { Box, margin, padding, Stack } from '@mui/system';
import AutoStories from '@mui/icons-material/AutoStories';
import HikingIcon from '@mui/icons-material/Hiking';
import FavoriteIcon from '@mui/icons-material/Favorite';


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
  

  return (
    <>

<img className="App-logo" src="logo.png" />

<Box style={{marginBottom:'10px', backgroundColor:'#eeeeee', margin:'25px', padding:'25px',  borderRadius:'5%'}}>
  <Stack direction={"row"} spacing={5} justifyContent={'space-around'} >
  <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        variant="dot"
      >


  <Avatar sx={{ width:64, height:64 }} src="/broken-image.jpg" style={{  display: 'flex' } } onClick={()=>{alert('bdika')}} /> 
  </StyledBadge>

<p  style={{color:'black'}}>שלום {props.name} <br /> {props.email} </p>

 </Stack>

</Box>

<List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar style={{
  marginTop:'20px', marginBottom:'15px'
  }}>
          <Avatar>
            <AutoStories/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary=" "
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
               <b> {'יומן המסע שלי'}</b>
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
            <HikingIcon/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary=" "
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
               <b> {'יומן המסע שלי'}</b>
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
            <FavoriteIcon/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary=" "
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
               <b> {'יומן המסע שלי'}</b>
               <br />
              </Typography>
              {" לחץ על המחברת לצפייה בסיפור הדרך שלך"}
            </React.Fragment>
          }
        />
      </ListItem>
    </List>




{/* <Button startIcon={<EditIcon/>} variant="contained">  dsfds</Button> */}

    </>
  )

}
