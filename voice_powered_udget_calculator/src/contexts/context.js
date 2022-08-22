import React, { useReducer, createContext,useContext, useState} from "react";
import { v4 as uuidv4 } from 'uuid';
import { incomeCategories } from "../constant/categories";
import reducer from './reducer';
const initialState = {
    transactions:[]
};
export const ExpenseTrackerContext = createContext(initialState);


const allEntities = ['Title', "Amount", 'Category', 'Date']

export const Provider = ({ children }) => {
    const [transactions, dispatch] = useReducer(reducer, initialState);
    const [dataState, setDataState] = useState([]);
      const [failedEntity, setFailedEntity] = useState([]);
    const [openMessage, setOpenMessage] = useState(false);
    // const [transaction, setTransaction] = useState(initialState1);

    const deleteTransactions = (id) => {
        dispatch({type:'DELETE_TRANSACTION',payload:id})
    }

    const addTransaction = (transaction) => {
        dispatch({ type: 'ADD_TRANSACTION', payload: transaction });
        // console.log(transaction);
    }

    const all = (title, amount, category, date,categoriesData) => {
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
            // categoriesData.every((item) => item.type !== category)
          if (categoriesData === incomeCategories) {
             console.log('in here')
            return 
          }
          
          
          addTransaction({ id: uuidv4(), type, amount, category, date })
          dataState.some((item, i) => {
            if (item.type === category) {
              console.log(i);
              index = i
              return true
            }
            return false
          }) ? dataState[index].amount += parseFloat(amount) :
            setDataState([...dataState, { ...[(categoriesData.find((item) => item.type === category) && category )? categoriesData.find((item) => item.type === category) : { color: 'purple', type: category }][0], amount: parseFloat(amount), title: title }])
        //   setTransaction(initialState);
        //   setCategories(incomeCategories)
        }
    }

     const handleClose = () => {
    setOpenMessage(false)
    setFailedEntity([]);
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
            handleClose,
            openMessage,
            failedEntity,
            allEntities
        }}>
        {children}
        </ExpenseTrackerContext.Provider>
    )
}
export const useGlobalContext = () => useContext(ExpenseTrackerContext);