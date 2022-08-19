import React from 'react'
import { Doughnut } from 'react-chartjs-2';
import { Box } from '@material-ui/core';
 import { useGlobalContext } from '../contexts/context';
 const DoughnutContainer = ({title}) => {
    const { dataState } = useGlobalContext();
     const income = dataState.filter((item) => item.title === 'Income');
     const expense = dataState.filter((item) => item.title === 'Expense');
const data = {
  labels: title === 'income' ? income.map((item)=>item.type):expense.map((item)=>item.type),
  datasets: [
    {
      label: '# of Votes',
      data:   title === 'income' ? income.map((item)=>item.amount):expense.map((item)=>item.amount),
      backgroundColor: title === 'income' ? income.map((item)=>item.color): expense.map((item)=>item.color),
    //   borderColor: [
    //     'rgba(255, 99, 132, 1)',
    //     'rgba(54, 162, 235, 1)',
    //     'rgba(255, 206, 86, 1)',
    //     'rgba(75, 192, 192, 1)',
    //     'rgba(153, 102, 255, 1)',
    //     'rgba(255, 159, 64, 1)',
    //   ],
      borderWidth: 1,
    },
  ]
};
    
   return (
      <Box sx={{width:'100%',height:'20px',display:'grid',placeItems:'center'}}>
      <Doughnut data={data}/>
      </Box>
          
    )


}
 export default DoughnutContainer