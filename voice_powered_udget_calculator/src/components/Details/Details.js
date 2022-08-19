import React from 'react'
import { Card, CardHeader, CardContent, Typography } from '@material-ui/core';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// import { Doughnut } from 'react-chartjs-2';
import useStyles from './styles';
import DoughnutContainer from '../../data/data';
import { useGlobalContext } from '../../contexts/context';

ChartJS.register(ArcElement, Tooltip, Legend);

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