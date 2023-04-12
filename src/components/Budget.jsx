
import { Box, Slider, Stack } from '@mui/material'
import React from 'react'
import Navigation from './Navigation'
import TopOfAplication from './TopOfAplication'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styled from '@emotion/styled';

export default function Budget(props) {

  const PrettoSlider = styled(Slider)({
    color: '#52af77',
    height: 8,
    '& .MuiSlider-track': {
      border: 'none',
    },
    '& .MuiSlider-thumb': {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
        boxShadow: 'inherit',
      },
      '&:before': {
        display: 'none',
      },
    },
    '& .MuiSlider-valueLabel': {
      lineHeight: 1.2,
      fontSize: 12,
      background: 'unset',
      padding: 0,
      width: 32,
      height: 32,
      borderRadius: '50% 50% 50% 0',
      backgroundColor: '#52af77',
      transformOrigin: 'bottom left',
      transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
      '&:before': { display: 'none' },
      '&.MuiSlider-valueLabelOpen': {
        transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
      },
      '& > *': {
        transform: 'rotate(45deg)',
      },
    },
  });
  
  return (
    <>
      <TopOfAplication label='מעקב הוצאות'  />
      
      <Card sx={{ minWidth: 275  }} >
      <CardContent >
        <Typography variant="h6" component="div" gutterBottom  >
          תקציב אישי 
        </Typography>
        <Box sx={{ width: 270 }}>
            <Box sx={{ m: 1 }} />
            <Typography gutterBottom>הגדר את תקציב הטיול שלך</Typography>
            <PrettoSlider
            valueLabelDisplay="auto"
            aria-label="pretto slider"
            defaultValue={20}
          />
          <Box sx={{ m: 3 }} />
        </Box>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions >
      <Button style={{marginLeft:'auto', marginRight:'auto'}} size="small" onClick={() => {props.continueClicked('')}} variant="contained">בוא נצלול פנימה</Button>

      </CardActions>
    </Card>

      <Navigation navTo={(page)=>props.continueClicked(page)}/>
    </>
  )
}
