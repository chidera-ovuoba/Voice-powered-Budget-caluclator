import React from 'react'
import { List, ListItem, ListItemAvatar, ListItemText, Avatar, ListItemSecondaryAction, IconButton, Slide } from '@material-ui/core';
import { Delete, MoneyOff } from '@material-ui/icons';
import useStyles from './styles';
const List = () => {
    const classes = useStyles();
    const transactions = [
        {id:1,type:'Income',category:'Salary',amount:50,date:new Date()}
    ];
    return (
      <List dense={false} className={classes.list}>
            {
                transactions.map((item) => (
                    <Slide direction='down' in key={item.id}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar className={item.type === 'Income' ? classes.avatarIncome : classes.avatarExpense}>
                                    <MoneyOff/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={item.category} secondary={`$${item.amount} - ${item.date}`} />
                            <ListItemSecondaryAction>
                                <IconButton edge='end' aria-label='delete' onClick=''>
                                <Delete/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </Slide>
                ))
      }
      </List>
  )
}

export default List