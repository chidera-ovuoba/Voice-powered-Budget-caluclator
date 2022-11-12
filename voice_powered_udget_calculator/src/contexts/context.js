import React, { useReducer, createContext,useContext, useState, useEffect} from "react";
import { v4 as uuidv4 } from 'uuid';
import { expenseCategories, incomeCategories } from "../constant/categories";
import reducer from './reducer';
// import { SnackbarProvider, useSnackbar } from 'notistack';
const initialState = {
    transactions:JSON.parse(localStorage.getItem('transactions'))?.transactions  || []
};
export const ExpenseTrackerContext = createContext(initialState);


const allEntities = ['Title', "Amount", 'Category', 'Date']
const initialState1 = {
  category:'',
  amount: '',
  type: '',
    date: '2018-07-22'
}

export const Provider = ({ children }) => {
    const [transaction, setTransaction] = useState(initialState1);
    const [transactions, dispatch] = useReducer(reducer, initialState);
    const [dataState, setDataState] = useState(JSON.parse(localStorage.getItem('dataState')) || []);
    const [failedEntity, setFailedEntity] = useState([]);
    const [categories, setCategories] = useState(incomeCategories);
    const [openMessage, setOpenMessage] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState({ open: false, category: '', type: '' });
    const [openSnackbarCategory, setOpenSnackbarCategory] = useState(false);
     const [openSnackbarSuccess, setOpenSnackbarSuccess] = useState(false);
    const [edit, setEdit] = useState(false);
    const [editId, setEditId] = useState('');
    const [editAmount, setEditAmount] = useState(0);
    const [editTypeAndTitle, setEditTypeAndTitle] = useState({});
    const [editOpen, setEditOpen] = useState(false);
    
    const deleteTransactions = (id) => {
        dispatch({type:'DELETE_TRANSACTION',payload:id})
    }

    const addTransaction = (transaction) => {
        dispatch({ type: 'ADD_TRANSACTION', payload: transaction });
        // console.log(transaction);
    }
    const clearTransaction = () => {
        dispatch({ type: 'CLEAR_TRANSACTION' });
        setTransaction(initialState1)
        // console.log(transaction);
    }
    const changeCategories = (categories) =>{
        setCategories(categories);
    }
    useEffect(() => {
           if (edit) {
               dataState.map((item) => {
                   if (item.type === editTypeAndTitle.type && item.title === editTypeAndTitle.title) {
                    item.amount -= editAmount
                   }
                })
            }
    }, [edit])
     const editDone = (transaction) => {
        dispatch({ type: 'EDIT_DONE', payload: { transaction:{...transaction,id:editId}, editId } })
        setEditOpen(true);
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
    let index = 0;
    const all = (title, amount, category, date, categoriesData) => {
         index = 0;
        //       setTransaction({ type: title, amount, category, date });
        // const { type, amount, category, date } = transaction;
        let type = title;

        [type, Number(amount), category, !new Date(date).toString().includes('Invalid')].map((item, i) => {
            if (!item && !editOpen && !openSnackbar.open && !openSnackbarCategory && !openSnackbarSuccess) {
                setOpenMessage(true);
                setFailedEntity((prev) => {
                    if (openMessage) return prev
                        return [...prev, i]
                })
            
            }
        });
               
        if (type && Number(amount) && category && !new Date(date).toString().includes('Invalid')) {
            // categoriesData.every((item) => item.type !== category
            checkCategories(category, categoriesData,type)
            
              if (edit) {
               setEdit(false);
               editDone(transaction)
            }
            if (!edit) {
                addTransaction({ id: uuidv4(), type, amount, category, date })
            }
            
            dataState.some((item, i) => {
                if (item.type === category) {
                     if (item.title !== type) {
                        setOpenSnackbarCategory(true)
                        return
                    }
                    // if (edit) {
                    //     item.amount -= parseFloat(editAmount);
                    // }
                   console.log(i);
                    index = i
                    return true
                } 
                return false
            }) ?   dataState[index].amount += parseFloat(amount) :
                setDataState([...dataState, { ...[(categoriesData.find((item) => item.type === category) && category) ? categoriesData.find((item) => item.type === category) : { color: `rgb(${Math.floor(Math.random() * 10)},${Math.floor(Math.random() * 10)},${Math.floor(Math.random() * 255)})`, type: category }][0], amount: parseFloat(amount), title }])
            if (!edit) {
                setOpenSnackbarSuccess(true);
            }
                setTransaction(initialState1);
            
        }
    }
     localStorage.setItem('dataState', JSON.stringify(dataState));

     const handleClose1 = () => {
    setOpenMessage(false)
    setFailedEntity([]);
    }
    const handleCloseCategoryMismatch = () => {
        setOpenSnackbarCategory(false);
    } 
    const handleCloseSuccessSnackbar = () => {
        setOpenSnackbarSuccess(false);
    } 
    const handleCloseEditSuccessSnackbar = () => {
       setEditOpen(false);
    } 
      const handleClose2 = () => {
    setOpenSnackbar({open:false,category:'',type:''})
    }
    const setEditItem = (id) => {
        setEditId(id);
        const transactionToEdit = transactions.transactions.find((item) => item.id === id);
        setTransaction(transactionToEdit);
        setEditAmount(transactionToEdit.amount)
        setEditTypeAndTitle({type:transactionToEdit.category,title:transactionToEdit.type})
        setEdit(true)
    }
   


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
            categories,
            openSnackbarCategory,
            handleCloseCategoryMismatch,
            handleCloseSuccessSnackbar,
             handleCloseEditSuccessSnackbar,
            openSnackbarSuccess,
            transaction,
            setTransaction,
            setEdit,
            setEditItem,
            edit,
            editDone,
            editOpen,
            initialState1
          
        }}>
                {children}
               </ExpenseTrackerContext.Provider>
    )
}
export const useGlobalContext = () => useContext(ExpenseTrackerContext);