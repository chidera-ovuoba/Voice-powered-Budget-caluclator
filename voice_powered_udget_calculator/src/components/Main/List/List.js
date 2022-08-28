import React from 'react'
import { List, ListItem, ListItemAvatar, ListItemText, Avatar, ListItemSecondaryAction, IconButton, Slide } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { Delete, MoneyOff,Edit } from '@material-ui/icons';
// import EditIcon from '@mui/icons-material/Edit';
import useStyles from './styles';
import { useGlobalContext } from '../../../contexts/context';
const Lists = () => {
    const { deleteTransactions,transactions,setDataState,dataState,setEditItem} = useGlobalContext();
    const classes = useStyles();
    let index;
    // console.log(transactions)
    // const transactions = [
    //     { id: 1, type: 'Income', category: 'Salary', amount: 50, date: new Date() },
    //     { id: 2, type: 'Expense', category: 'Salary', amount: 50, date: new Date() },
    //       {id:3,type:'Income',category:'Salary',amount:50,date:new Date()}
    // ];
      console.log(dataState);

    return (
      <List dense={false} className={classes.list}>
            {
                transactions?.map((item) => (
                    <Slide direction='down' in key={item.id}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar className={item.type === 'Income' ? classes.avatarIncome : classes.avatarExpense}>
                                    <MoneyOff/> 
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={item.category} secondary={`$${item.amount.charAt(0) === '0' ? item.amount.toString().substring(1):item.amount } - ${item.date}`} />
                            <ListItemSecondaryAction>
                                <IconButton onClick={()=>setEditItem(item.id)}>
                                    <Edit style={{ color: green[700] }}/>
                                </IconButton>
                                <IconButton edge='end' aria-label='delete' onClick={() => {
                                    deleteTransactions(item.id)
                                    console.log(item.category)
                                     dataState.some((data,i) => {
                                    if ( data.amount - item.amount > 0 && data.type === item.category) {
                                      console.log(i);
                                      index = i
                                      return true
                                    }
                                    return false
                                  }) ?  dataState[index].amount -= parseFloat(item.amount) :                        
                                    setDataState((prev) => [...prev.filter((data) => data.type !== item.category)])
                                }}>
                                <Delete color='error'/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </Slide>
                ))
      }
      </List>
  )
}

export default Lists