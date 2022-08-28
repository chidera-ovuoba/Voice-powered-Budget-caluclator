import React, { useEffect, useState } from 'react'
import { TextField, Typography, Select, FormControl, MenuItem, Grid, InputLabel, Button, Box} from '@material-ui/core';
import useStyles from './styles';
import { useGlobalContext } from '../../../contexts/context';
import { incomeCategories, expenseCategories } from '../../../constant/categories';
import { useSpeechContext } from "@speechly/react-client";
import Slide from '@material-ui/core/Slide'; 
import { v4 as uuidv4 } from 'uuid';
import Snackbar1 from '../../Snackbar/Snackbar';
import Snackbar2 from '../../Snackbar/Snackbar2';
import Dialog from '../../Dialog/Dialog';
import SnackbarCategory from '../../Snackbar/SnackbarCategory';
import SnackbarSuccess from '../../Snackbar/SnackbarSuccess';

// const categories = ['Bills', 'Car', 'Clothes', 'Travel', 'Food', 'Shopping', 'House', 'Entertainment', 'Phone', 'Pets'];


const Form = () => {
  const classes = useStyles();
  const { addTransaction, dataState, checkCategories, setDataState, handleClose1, openMessage, failedEntity, allEntities, all, open, handleClose2, category, type,
  setOpenMessage,setFailedEntity,clearTransaction,
  changeCategories,categories, openSnackbarCategory,handleCloseCategoryMismatch,handleCloseSuccessSnackbar,openSnackbarSuccess,transaction, setTransaction,edit,setEdit,editDone,initialState1
  } = useGlobalContext();
  // const [words, setWords] = useState([]);
  // const [entities,setEntities] = useState({})
  const [segmentData, setSegmentData] = useState({});
  // const [segmentEntity, setSegmentEntity] = useState({});
  // const [failedEntity, setFailedEntity] = useState([]);
  // const [openMessage, setOpenMessage] = useState(false);
  // const [checked, setChecked] = useState(true);
   const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = (category) => {
    setOpenDialog(false);
    transaction.category= category
  };
  



  const { segment } = useSpeechContext();
let categoriesData ;

  useEffect(() => {
    let index = 0;
    
    if (segment) {
      // Handle speech segment and make tentative changes to app state
      // setWords(segment?.words?.map((item) => item.value + ' '));
      // console.log(segment);
      if (segment.isFinal) {
        // Handle speech segment and make permanent changes to app state
        console.log("✅", segment)
        setSegmentData(segment);
        // const id = uuidv4();
        const date = segment.entities.find((item) => item.type === 'date')?.value
        
        const category = segment.entities.find((item) => item.type === 'category')?.value?.split('').map((letter, i) => i === 0 ? letter : letter.toLowerCase())?.join('');
        
        const amount = segment.entities.find((item) => item.type === 'amount')?.value;
           const entitiesTypes = ['amount', 'category', 'date']
          //  let segmentEntity ={name:'ovuoba'}
        // console.log(date, amount, category);
        //    if (transaction.category && transaction.type) {
        //     checkCategories(transaction.category, categoriesData)
        // }
       
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
        console.log(category)
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
        
        if (segment.intent.intent === 'create_transaction' && segment.words.some((item)=>item.value === 'CREATE' || item.value === 'CREATES'))  {
          const { type, amount, category, date ,id} = transaction;
               [type, Number(amount), category, !new Date(date).toString().includes('Invalid')].map((item, i) => {
            if (!item) {
                setOpenMessage(true);
                setFailedEntity((prev) => [...prev, i])
            
            }
               });
          if (transaction.amount && transaction.category && transaction.date && transaction.type) {
            return all(type, amount, category, date, categories,id)
        
          }  }

        if (segment.intent.intent === 'cancel_transaction') {
                       clearTransaction()
         return setDataState([]);
        }
        if (segment.intent.intent === 'add_category') {
          // console.log(incomeCategories.some((item) => item.type === category))
          if (incomeCategories.some((item) => item.type === category)) {
              changeCategories(incomeCategories)
          } 
          // console.log(expenseCategories.some((item) => item.type === category))
          if (expenseCategories.some((item) => item.type === category)) {
              changeCategories(expenseCategories)
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

        if (!segment.intent.intent || !segment.entities) return
        
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
           
        if (title && Number(amount) && category && date && categoriesData) {
              all (title, amount, category, date,categoriesData,uuidv4())
           }

        // console.log(title, amount, category, !new Date(date).toString().includes('Invalid'));
      }
    }
  }, [segment])

//  console.log(categories)
    useEffect(() => {
      // console.log( transaction.category ,categories)
       if (transaction.category && transaction.type) {
        console.log('correct')    
         checkCategories(transaction.category, categories,transaction.type);
        }
  },[transaction.category,transaction.type])

  useEffect(() => {
    transaction.category = '';
    if (transaction.type === 'Income') {
        changeCategories(incomeCategories);
    }
    if (transaction.type === 'Expense') {
        changeCategories(expenseCategories);
    }
  }, [open])
  // useEffect(() => {
  //   const {category} = transaction
  //       if (incomeCategories.some((item) => item.type === category)) {
  //           setCategories(incomeCategories)
  //         }
  //         // console.log(expenseCategories.some((item) => item.type ===  category))
  //         if (expenseCategories.some((item) => item.type === category)) {
  //           setCategories(expenseCategories)
  //         }
        
  // },[transaction.type])
  function addCustomCategory() {
    if (categories === incomeCategories) {
      if (categories.every((item) => item.type !== transaction.category) && transaction.category !== '' && expenseCategories.every((item) => item.type !== transaction.category)) {
         return true
      }
      return false
    }
        if (categories === expenseCategories) {
      if (categories.every((item) => item.type !== transaction.category) && transaction.category !== '' && incomeCategories.every((item) => item.type !== transaction.category)) {
         return true
      }
      return false
    }
    return false
  }

  console.log(categories) 
   return (
    <>
       <Snackbar1 handleClose={handleClose1} openMessage={openMessage} failedEntity={failedEntity} allEntities={allEntities} />
       <Snackbar2 open={open} handleClose={handleClose2} category={category} type={type} />
       <Dialog open={openDialog} handleClose={handleCloseDialog} />
       <SnackbarCategory open={openSnackbarCategory} handleClose={handleCloseCategoryMismatch}/>
       <SnackbarSuccess open={openSnackbarSuccess} handleClose={handleCloseSuccessSnackbar} />
       
       
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
                           console.log(e.target.value === 'Income' ,transaction.category === '')
                           if (e.target.value === 'Income' && transaction.category === '') {
                              changeCategories(incomeCategories)
                           }
                          if (e.target.value === 'Expense' && transaction.category === '') {
                               changeCategories(expenseCategories)
                          }  
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
                         onChange = {(e)=>{
                           if(incomeCategories.some((item)=>item.type === e.target.value)){
                             changeCategories(incomeCategories)
                           }
                           if(expenseCategories.some((item)=>item.type === e.target.value)){
                             changeCategories(expenseCategories)
                           }
                            setTransaction({ ...transaction, category: e.target.value })
                         }}
                    >
            {  categories.some((item)=>item.type === transaction.category || transaction.category === '') &&
                 categories.map((item, i) => {
                   if (item.type.includes('Other')) {
                    return <MenuItem value={item.type} onClick={handleOpenDialog} key={i}>{item.type}</MenuItem>
                   }
                   return <MenuItem key={i} value={item.type}>{item.type}</MenuItem>
                 })
                         
                      }
               {addCustomCategory() &&<MenuItem value={transaction.category}>{transaction.category}</MenuItem>}
               {addCustomCategory() &&<MenuItem value='Business'>incomeCategories</MenuItem>}
               {addCustomCategory() &&<MenuItem value='Bills'>expenseCategories</MenuItem>}
                  </Select>
              </FormControl>
          </Grid>
          <Grid item xs={6}>
        <TextField type='number' label="Amount" value={Number(transaction.amount)} onChange={(e) => setTransaction({ ...transaction, amount: e.target.value })} variant="standard"
        fullWidth
        />
          </Grid>
          <Grid item xs={6}>
        <TextField id="standard-basic" label="Date" value={transaction.date} onChange={(e) => setTransaction({ ...transaction, date: e.target.value })} type='date' variant="standard"
        fullWidth
        />
          </Grid>
          <Grid item xs={12}>
           <Button variant='outlined' color='primary' fullWidth className={classes.button} onClick={() => {
              const { type, amount, category, date,id } = transaction;
            all(type, amount, category, date, categories,id)
             
             if (edit) {
               setEdit(false);
               editDone(transaction)
             }
               setTransaction({
  category:'',
  amount: '',
  type: '',
    date: '2018-07-22',
  id:uuidv4()
});
           }}>{`${edit ? 'EDIT' :'CREATE'}`}</Button>
           
           <Button variant='outlined' color="secondary" fullWidth className={classes.button} onClick={() => {
            clearTransaction()  
            setDataState([])     
           }}>CLEAR</Button>
          </Grid>

      </Grid>
  </>
      )
}


export default Form