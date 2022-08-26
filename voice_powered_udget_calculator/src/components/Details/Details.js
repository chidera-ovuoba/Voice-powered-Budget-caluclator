import React from 'react'
import { Card, CardHeader, CardContent, Typography } from '@material-ui/core';
// import { Doughnut } from 'react-chartjs-2';
import DoughnutContainer from '../../data/data';
import { useGlobalContext } from '../../contexts/context';
import useStyles from './styles';


    const Details = ({ title }) => {
  const { dataState } = useGlobalContext();
      const classes = useStyles();
      
  return (
      <Card className={classes[title]}>
          <CardHeader title={title} className={classes.title}/>
          <CardContent>
              <Typography variant='h5'>${dataState.filter((item)=>item.title.toLowerCase() === title).reduce((total,initial) => {
                  total += initial.amount;
                return total
              },0)}</Typography>
              <DoughnutContainer title={title} />
          </CardContent>
      </Card>
  )
}

export default Details