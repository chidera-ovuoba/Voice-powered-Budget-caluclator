import React, { useEffect, useState } from 'react'
import { TextField, Typography, Select, FormControl, MenuItem, Grid, InputLabel, Button, Snackbar} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import useStyles from './styles';
import { useGlobalContext } from '../../../contexts/context';
import { incomeCategories, expenseCategories } from '../../../constant/categories';
import { useSpeechContext } from "@speechly/react-client";
import Slide from '@material-ui/core/Slide';

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
    const [categories, setCategories] = useState(incomeCategories);
  const { addTransaction, dataState, setDataState,handleClose,openMessage,failedEntity,allEntities,all} = useGlobalContext();
  // const [words, setWords] = useState([]);
  // const [entities,setEntities] = useState({})
  const [segmentData, setSegmentData] = useState({});
  // const [failedEntity, setFailedEntity] = useState([]);
  // const [openMessage, setOpenMessage] = useState(false);
  // const [checked, setChecked] = useState(true);
  



  const { segment } = useSpeechContext()

  useEffect(() => {
    let index = 0;
    let categoriesData ;
    if (segment) {
      // Handle speech segment and make tentative changes to app state
      // setWords(segment?.words?.map((item) => item.value + ' '));
      console.log(segment);
      if (segment.isFinal) {
        // Handle speech segment and make permanent changes to app state
        console.log("✅", segment)
        setSegmentData(segment);
        
        let title;
        if (segment.intent.intent === 'add_income') {
          title = 'Income'
          categoriesData = incomeCategories 
        };
        if (segment.intent.intent === 'add_expense') {
          title = 'Expense'
           categoriesData = expenseCategories
        };
        segment.words.map((item) => {
          if (item.value === 'INCOME') {
            title = 'Income'
             categoriesData = incomeCategories 
          }
          if (item.value === 'EXPENSE') {
            title = 'Expense'
             categoriesData = expenseCategories
          }
           })
        const date = segment.entities.find((item) => item.type === 'date')?.value
        
        const category = segment.entities.find((item) => item.type === 'category')?.value?.split('').map((letter, i) => i === 0 ? letter : letter.toLowerCase())?.join('');
        
        const amount = segment.entities.find((item) => item.type === 'amount')?.value;
        all (title, amount, category, date,categoriesData)

        console.log(title, amount, category, !new Date(date).toString().includes('Invalid'));
      }
    }
  }, [segment])



   return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={openMessage}
        autoHideDuration={4000}
         onClose={handleClose}
        >
        <MuiAlert
          elevation={6}
          variant="filled"
           severity="error">
           
           <Typography variant='subtitle1'>{failedEntity.map((i) => allEntities[i]).join(', ')} {failedEntity.length > 1 ?'were':'is'} not specified</Typography>
       </MuiAlert>
       </Snackbar>
      <Grid container spacing={2}>
      
          <Grid item xs={12}>
              <Typography align='center' variant='subtitle2' sx={{wordBreak:'break-word'}} gutterBottom>
          {segment?.words?.map((item) => item.value + ' ')} 
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
             const { type, amount, category, date } = transaction;
             all(type, amount, category, date, categories)
             setTransaction(initialState);
        }}>CREATE</Button>
          </Grid>

      </Grid>
  </>
      )
}

export default Form