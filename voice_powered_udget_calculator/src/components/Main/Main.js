import React from 'react'
import useStyles from './styles';
import { Card, CardHeader, CardContent, Typography, Grid, Divider } from '@material-ui/core';
import Form from './Form/Form';
import Lists from './List/List';
import { useGlobalContext } from '../../contexts/context';
const Main = () => {
    const classes = useStyles();
    const { dataState } = useGlobalContext()
   
    const incomeTotal = dataState.filter((item) => item.title === 'Income').reduce((total, initial) => {
        total += initial.amount;
        return total
    }, 0);
    const expenseTotal = dataState.filter((item) => item.title === 'Expense').reduce((total, initial) => {
        total += initial.amount;
                return total
              },0)

  return (
      <Card className={classes.root}>
          <CardHeader title='Expense Tracker' subheader='Powered By Speechly' />
          <CardContent>
              <Typography align='center' variant='h5'>Total Balance {incomeTotal < expenseTotal ?
            '-':''}${Math.abs(incomeTotal - expenseTotal)}</Typography>
              <Typography variant='subtitle1' style={{ lineHeight: '1.5em', marginTop: '20px',textAlign:'center' }}>
               Try saying: Add income for $100 in Category Salary for Monday... 
              </Typography>
              <Divider className={classes.divider} />
              <Form/>
          </CardContent>
          <CardContent className={classes.cartContent}>
              <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Lists/>
                  </Grid>

              </Grid>
          </CardContent>
      </Card>
  )
}

export default Main