import React, { useEffect, useState } from 'react'
import { TextField, Typography, Select, FormControl, MenuItem, Grid, InputLabel, Button} from '@material-ui/core';
import useStyles from './styles';
import { useGlobalContext } from '../../../contexts/context';
import { incomeCategories, expenseCategories } from '../../../constant/categories';
import { useSpeechContext } from "@speechly/react-client";
import Slide from '@material-ui/core/Slide';
import Snackbar1 from '../../Snackbar/Snackbar';
import Snackbar2 from '../../Snackbar/Snackbar2';

// const categories = ['Bills', 'Car', 'Clothes', 'Travel', 'Food', 'Shopping', 'House', 'Entertainment', 'Phone', 'Pets'];
const initialState = {
  category:'',
  amount: '',
  type: '',
  date:'2018-07-22'
}
const Form = () => {
    const classes = useStyles();
  const [transaction, setTransaction] = useState(initialState);
    const [categories, setCategories] = useState(incomeCategories);
  const { addTransaction, dataState,   checkCategories, setDataState,handleClose1,openMessage,failedEntity,allEntities,all,open,handleClose2,category,type} = useGlobalContext();
  // const [words, setWords] = useState([]);
  // const [entities,setEntities] = useState({})
  const [segmentData, setSegmentData] = useState({});
  // const [segmentEntity, setSegmentEntity] = useState({});
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
        
        const date = segment.entities.find((item) => item.type === 'date')?.value
        
        const category = segment.entities.find((item) => item.type === 'category')?.value?.split('').map((letter, i) => i === 0 ? letter : letter.toLowerCase())?.join('');
        
        const amount = segment.entities.find((item) => item.type === 'amount')?.value;
           const entitiesTypes = ['amount', 'category', 'date']
          //  let segmentEntity ={name:'ovuoba'}
        // console.log(date, amount, category);
        if (category && transaction.type) {
            checkCategories(category, categoriesData)
        }
        const Entity = [amount, category, date]?.map((item, i) => {
          if (item) {
            return {[entitiesTypes[i]]:item};
         } 
        })
      const allEntries =  Entity.map((item) => {
          if (item) {
           return Object.entries(item);
          }
})
const segmentEntity = {}
    allEntries.map((item) => {
          if (item) {
            segmentEntity[item[0][0]] = item[0][1]
          }
    }); 
        // console.log(obj)
        let title;
          segment.words.map((item) => {
          if (item.value === 'INCOME' && segment.intent.intent === 'add_income') {
            title = 'Income'
             categoriesData = incomeCategories 
              return setTransaction({ ...transaction, type: 'Income',...segmentEntity})
          }
          if (item.value === 'EXPENSE' && segment.intent.intent === 'add_expense') {
            title = 'Expense'
            categoriesData = expenseCategories
               return setTransaction({ ...transaction, type: 'Expense',...segmentEntity})
          }
          })
        if (segment.intent.intent === 'add_expense') {
          title = 'Expense'
          categoriesData = expenseCategories
        return setTransaction({ ...transaction, type: 'Expense',...segmentEntity})
        };
        if (segment.intent.intent === 'create_transaction') {
           const { type, amount, category, date } = transaction;
            return all(type, amount, category, date, categories)
        }
        if (segment.intent.intent === 'cancel_transaction') {
         return setDataState([]);
        }
        if (segment.intent.intent === 'add_category') {
          // console.log(incomeCategories.some((item) => item.type === category))
          if (incomeCategories.some((item) => item.type === category)) {
            setCategories(incomeCategories)
          } 
          // console.log(expenseCategories.some((item) => item.type === category))
          if (expenseCategories.some((item) => item.type === category)) {
            setCategories(expenseCategories)
          }
          // console.log(categories);
            return setTransaction({ ...transaction,...segmentEntity})
          
        }
        if (segment.intent.intent === 'add_date') {
                     return setTransaction({ ...transaction,...segmentEntity})
        }
        if (segment.intent.intent === 'add_amount') {
          return setTransaction({ ...transaction,...segmentEntity})
         }

        if (!segment.intent.intent) return
        
        segment.words.map((item) => {
          if (item.value === 'INCOME' ) {
            title = 'Income'
             categoriesData = incomeCategories 
          }
          if (item.value === 'EXPENSE') {
            title = 'Expense'
            categoriesData = expenseCategories
          }
           })
        
        all (title, amount, category, date,categoriesData)

        // console.log(title, amount, category, !new Date(date).toString().includes('Invalid'));
      }
    }
  }, [segment])



   return (
    <>
       <Snackbar1 handleClose={handleClose1} openMessage={openMessage} failedEntity={failedEntity} allEntities={allEntities} />
       <Snackbar2 open={open} handleClose={handleClose2} category={category} type={type} />
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
            {  categories.some((item)=>item.type === transaction.category) &&
              categories.map((item, i) => (
                            <MenuItem key={i} value={item.type}>{item.type}</MenuItem>
                          ))
                         
                      }
                      {categories.every((item)=>item.type !== transaction.category) && <MenuItem value={transaction.category}>{transaction.category}</MenuItem>}
                  </Select>
              </FormControl>
          </Grid>
          <Grid item xs={6}>
        <TextField type='number' label="Amount" value={Number(transaction.amount)} onChange={(e) => setTransaction({ ...transaction, amount: e.target.value })} variant="standard"
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