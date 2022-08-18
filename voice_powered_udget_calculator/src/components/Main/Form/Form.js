import React, { useState } from 'react'
import { TextField, Typography, Select, FormControl, MenuItem, Grid, InputLabel, Button } from '@material-ui/core';
import useStyles from './styles';

const categories = ['Bills', 'Car', 'Clothes', 'Travel', 'Food', 'Shopping', 'House', 'Entertainment', 'Phone', 'Pets'];

const Form = () => {
    const classes = useStyles();
    const [categoryValue, setCategoryValue] = useState('');
    const [typeValue, setTypeValue] = useState('');
    const [date, setDate] = useState("2018-07-22");

  return (
      <Grid container spacing={2}>
          <Grid item xs={12}>
              <Typography align='center' variant='subtitle2' gutterBottom>
              ...
              </Typography>
          </Grid>
          <Grid item xs={6}>
              <FormControl fullWidth>
               <InputLabel variant="standard" htmlFor="income-expense-select">
                 Type
                  </InputLabel>
                  <Select
                       displayEmpty
                      id="income-expense-select"
                       value={typeValue}
                       renderValue={(selected) => {
                       if (selected.length === 0) {
                         return setTypeValue('Income')
                          } 
                    return selected
                      }}
                         onChange = {(e)=>(
                         setTypeValue(e.target.value)
                       )}
                    >
                    <MenuItem value={'Income'}>Income</MenuItem>
                    <MenuItem value={'Expense'}>Expense</MenuItem>
                  </Select>
              </FormControl>
          </Grid>
          <Grid item xs={6}>
              <FormControl fullWidth>
               <InputLabel variant="standard" htmlFor="income-expense-select">
                 Category
                  </InputLabel>
                  <Select
                      displayEmpty
                      id="income-expense-select"
                      value ={categoryValue}
                      renderValue={(selected) => {
                       if (selected.length === 0) {
                         return setCategoryValue('Category')
                          } 
                    return selected
                      }}
                         onChange = {(e)=>(
                         setCategoryValue(e.target.value)
                       )}
                    >
                      {
                        categories.map((item,i)=>(
                            <MenuItem key={i} value={item}>{item}</MenuItem>
                          ))
                         
                      }
                  </Select>
              </FormControl>
          </Grid>
          <Grid item xs={6}>
          <TextField type='number' label="Amount" variant="standard" />
          </Grid>
          <Grid item xs={6}>
              <TextField id="standard-basic" label="Date" value={date} onChange={(e)=>setDate(e.target.value)} type='date' variant="standard" inputProps={{ pattern:"[0-9]{4}-[0-9]{2}-[0-9]{2}" }} />
          </Grid>
          <Grid item xs={12}>
          <Button variant='outlined' color='primary' fullWidth className={classes.button}>CREATE</Button>
          </Grid>

      </Grid>
  )
}

export default Form