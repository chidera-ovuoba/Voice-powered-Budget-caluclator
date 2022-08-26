import React, { useReducer, createContext,useContext, useState} from "react";
import { v4 as uuidv4 } from 'uuid';
import { expenseCategories, incomeCategories } from "../constant/categories";
import reducer from './reducer';
const initialState = {
    transactions:JSON.parse(localStorage.getItem('transactions'))?.transactions  || []
};
export const ExpenseTrackerContext = createContext(initialState);


const allEntities = ['Title', "Amount", 'Category', 'Date']

export const Provider = ({ children }) => {
    const [transactions, dispatch] = useReducer(reducer, initialState);
    const [dataState, setDataState] = useState(JSON.parse(localStorage.getItem('dataState')) || []);
    const [failedEntity, setFailedEntity] = useState([]);
    const [categories, setCategories] = useState(incomeCategories);
    const [openMessage, setOpenMessage] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState({open:false,category:'',type:''});
    // const [transaction, setTransaction] = useState(initialState1);
    // const localStorageDatastate = localStorage.getItem('dataState');
    // const localStorageTransactions = localStorage.getItem('transactions');
    const deleteTransactions = (id) => {
        dispatch({type:'DELETE_TRANSACTION',payload:id})
    }

    const addTransaction = (transaction) => {
        dispatch({ type: 'ADD_TRANSACTION', payload: transaction });
        // console.log(transaction);
    }
    const clearTransaction = () => {
        dispatch({ type: 'CLEAR_TRANSACTION' });
        // console.log(transaction);
    }
    const changeCategories = (categories) =>{
        setCategories(categories);
    }
      function checkCategories(category, categoriesData,type) {
        //   console.log('run');
            if (categoriesData === incomeCategories) {
                // console.log('income run')
                if (categoriesData.some((item) => item.type === category) && expenseCategories.some((item) => item.type !== category) && type === 'Expense') {
                    // console.log('Income')
                    setOpenSnackbar({ open: true, category, type: 'Expense' });
                    return
                }
                 if (categoriesData.some((item) => item.type !== category) && expenseCategories.some((item) => item.type === category) && type === 'Income') {
                    // console.log('Income')
                    setOpenSnackbar({ open: true, category, type: 'Income' });
                    return
                }
                  if (categoriesData.some((item) => item.type !== category) && expenseCategories.some((item) => item.type === category) && type === 'Expense') {
                   return  changeCategories(expenseCategories)
                }
            }
          if (categoriesData === expenseCategories) {
                // console.log(categoriesData.some((item) => item.type === category), incomeCategories.some((item) => item.type !== category))
                if (categoriesData.some((item) => item.type === category) && incomeCategories.some((item) => item.type !== category) && type === 'Income') {
                    // console.log('expense')
                    setOpenSnackbar({ open: true, category, type: 'Income' });
                    return
              }
                 if (categoriesData.some((item) => item.type !== category) && incomeCategories.some((item) => item.type === category) && type === 'Expense') {
                    // console.log('expense')
                    setOpenSnackbar({ open: true, category, type: 'Expense' });
                    return
              }

                if (categoriesData.some((item) => item.type !== category) && incomeCategories.some((item) => item.type === category) && type === 'Income') {
                   return  changeCategories(incomeCategories)
                }
            }
        }  

    const all = (title, amount, category, date, categoriesData) => {
        let index = 0;
        //       setTransaction({ type: title, amount, category, date });
        // const { type, amount, category, date } = transaction;
        let type = title;
        [type, Number(amount), category, !new Date(date).toString().includes('Invalid')].map((item, i) => {
            if (!item) {
                setOpenMessage(true);
                setFailedEntity((prev) => [...prev, i])
            
            }
        });
               
        if (type && Number(amount) && category && !new Date(date).toString().includes('Invalid')) {
            // categoriesData.every((item) => item.type !== category
            checkCategories(category, categoriesData,type)
          
          
            addTransaction({ id: uuidv4(), type, amount, category, date })
            dataState.some((item, i) => {
                if (item.type === category) {
                    console.log(i);
                    index = i
                    return true
                }
                return false
            }) ? dataState[index].amount += parseFloat(amount) :
                setDataState([...dataState, { ...[(categoriesData.find((item) => item.type === category) && category) ? categoriesData.find((item) => item.type === category) : { color: `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`, type: category }][0], amount: parseFloat(amount), title: title }])
            
        }
    }
     localStorage.setItem('dataState', JSON.stringify(dataState));

     const handleClose1 = () => {
    setOpenMessage(false)
    setFailedEntity([]);
    }
      const handleClose2 = () => {
    setOpenSnackbar({open:false,category:'',type:''})
    }
    // console.log(transactions);
    return (
        <ExpenseTrackerContext.Provider value={{
            addTransaction,
            deleteTransactions,
            ...transactions,
            dataState,
            setDataState,
            all,
            handleClose1,
            handleClose2,
            openMessage,
            failedEntity,
            allEntities,
            checkCategories,
            ...openSnackbar,
            setOpenMessage,
            setFailedEntity,
            clearTransaction,
            changeCategories,
            categories
          
        }}>
        {children}
        </ExpenseTrackerContext.Provider>
    )
}
export const useGlobalContext = () => useContext(ExpenseTrackerContext);