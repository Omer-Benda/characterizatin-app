
import { Box, Slider, Stack, Table } from '@mui/material'
import React, { useState } from 'react'
import Navigation from './Navigation'
import TopOfAplication from './TopOfAplication'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styled from '@emotion/styled';
import DataTable from './DataTable';

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
      width: 38,
      height: 38,
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
  
  const [value, setValue] = useState(25000);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  }
  return (
    <>
      <TopOfAplication label='מעקב הוצאות'  />
      
      <Card sx={{ minWidth: 275  }} style={{marginTop:'60px'}} >
      <CardContent >
        <Typography variant="h6" component="div" gutterBottom  >
        <b>  תקציב אישי </b>
        </Typography>
        <Box sx={{ width: 270 }}>
            <Box sx={{ m: 1 }} />
            <Typography gutterBottom>הגדר את תקציב הטיול שלך</Typography>
            <PrettoSlider 
              step={500}
              marks
              min={5000}
              max={70000}
            valueLabelDisplay="auto"
            aria-label="pretto slider"
            defaultValue={value}
            value={value}
            onChange={handleChange}
          />
          <Box sx={{ m: 3 }} />
        </Box>
        <Typography variant="body2">
          <h3>יש לי <b>{value}</b> שקל לבזבז בטיול</h3>
          <br />
          {"אנחנו כאן כדי לעזור לך לנהל את התקציב שלך בצורה הטובה ביותר"}
        </Typography>
      </CardContent>
      <CardActions >
      <Button style={{marginLeft:'auto', marginRight:'auto'}} size="small" onClick={() => {props.continueClicked('')}} variant="contained">בוא נצלול פנימה</Button>
      </CardActions>
    </Card>
    <DataTable/>

      <Navigation navTo={(page)=>props.continueClicked(page)}/>
    </>
  )
}