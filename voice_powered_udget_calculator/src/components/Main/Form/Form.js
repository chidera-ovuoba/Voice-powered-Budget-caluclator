import React, { useState } from 'react'
import { TextField, Typography, Select, FormControl, MenuItem, Grid, InputLabel, Button } from '@material-ui/core';
import useStyles from './styles';
import { useGlobalContext } from '../../../contexts/context';
import { v4 as uuidv4 } from 'uuid';
import { incomeCategories, expenseCategories } from '../../../constant/categories';

// const categories = ['Bills', 'Car', 'Clothes', 'Travel', 'Food', 'Shopping', 'House', 'Entertainment', 'Phone', 'Pets'];
const initialState = {
  category:'Deposits',
  amount: '',
  type: 'Income',
  date:'2018-07-22'
}

const Form = () => {
    const classes = useStyles();
   const [transaction, setTransaction] = useState(initialState);
  const { addTransaction, dataState, setDataState } = useGlobalContext();
  const [categories, setCategories] = useState(incomeCategories);
  // const [index, setIndex] = useState(0);

  let index = 0;
  // console.log(dataState);
  // transaction.type === 'Income' ? setCategories(incomeCategories):setCategories(expenseCategories) 

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
                      id="income-expense-select"
                       value={transaction.type}
                         onChange = {(e)=>{
                           setTransaction({ ...transaction, type: e.target.value })
                           e.target.value === 'Income' ? setCategories(incomeCategories): setCategories(expenseCategories)
                         }}
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
                       
                      id="income-expense-select"
                      value ={transaction.category}
                         onChange = {(e)=>(
                         setTransaction({...transaction,category:e.target.value})
                       )}
                    >
            {
              categories.map((item, i) => (
                            <MenuItem key={i} value={item.type}>{item.type}</MenuItem>
                          ))
                         
                      }
                  </Select>
              </FormControl>
          </Grid>
          <Grid item xs={6}>
        <TextField type='number' label="Amount" value={transaction.amount} onChange={(e) => setTransaction({ ...transaction, amount: e.target.value })} variant="standard"
        fullWidth
        />
          </Grid>
          <Grid item xs={6}>
        <TextField id="standard-basic" label="Date" value={transaction.date} onChange={(e) => setTransaction({ ...transaction, date: e.target.value })} type='date' variant="standard" inputProps={{ pattern: "[0-9]{4}-[0-9]{2}-[0-9]{2}" }}
        fullWidth
        />
          </Grid>
          <Grid item xs={12}>
        <Button variant='outlined' color='primary' fullWidth className={classes.button} onClick={() => {
          addTransaction({ ...transaction, amount: parseFloat(transaction.amount), id: uuidv4() })
          dataState.some((item,i) => {
            if (item.type === transaction.category) {
              // console.log(i);
              index = i
              return true
            }
            return false
          }) ?  dataState[index].amount += parseFloat(transaction.amount) :
            setDataState([...dataState, { ...categories.filter((item) => item.type === transaction.category)[0], amount: parseFloat(transaction.amount), title: transaction.type }])
          setTransaction(initialState);
          setCategories(incomeCategories)
        }}>CREATE</Button>
          </Grid>

      </Grid>
  )
}

export default Form