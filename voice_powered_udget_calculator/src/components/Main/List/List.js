import React from 'react'
import { List, ListItem, ListItemAvatar, ListItemText, Avatar, ListItemSecondaryAction, IconButton, Slide, Box } from '@material-ui/core';
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
      console.log(transactions);
//    localStorage.setItem('dataState', JSON.stringify(dataState));

    return (
      <List dense={false} className={classes.list}>
            {
                transactions?.map((item) => (
                    <Slide direction='down' in key={item.id}>
                        <ListItem>
                            <Box className='counter-class'/>
                            <ListItemAvatar >
                                <Avatar className={item.type === 'Income' ? classes.avatarIncome : classes.avatarExpense}>
                                    <MoneyOff/> 
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={item.category} secondary={`$${item.amount.charAt(0) === '0' ? item.amount.toString().substring(1) : item.amount} - ${item.date}`} secondaryTypographyProps={{ style: {marginTop: '10px'} }} />
                            <ListItemSecondaryAction>
                                <IconButton onClick={()=>setEditItem(item.id)} sx={{marginLeft:'100px'}}>
                                    <Edit style={{ color: green[700] }}/>
                                </IconButton>
                                <IconButton edge='end' aria-label='delete' onClick={() => {
                                    deleteTransactions(item.id)
                                     dataState.some((data,i) => {
                                    if ( data.amount - Number(item.amount) > 0 && data.type === item.category &&  data.title === item.type ) {
                                      index = i
                                      return true
                                    }
                                    return false
                                  }) ?  dataState[index].amount -= parseFloat(item.amount) :                        
                                         setDataState((prev) => [...prev.filter((data) => {
                      // the way it is filtered here is to check if when the Income and Expense type have the same category eg. Water Bills which is a custom category and its arrangment is for a particular purpose to check first if it is a custom category in which you have determine whether you can return true or not  
                             if (data.type !== item.category && data.title === item.type) {
                                 return true
                                }
                                if (data.type === item.category && data.title !== item.type) {
                                return true
                                }
                                if(data.type !== item.category){
                                    return true
                                }
                            return false
                              })])
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