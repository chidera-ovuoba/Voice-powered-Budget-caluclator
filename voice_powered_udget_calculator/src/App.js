import React, { useEffect, useRef } from 'react';
import { Grid } from '@material-ui/core';
import Details from './components/Details/Details';
import useStyles from './styles';
import { PushToTalkButtonContainer,PushToTalkButton,ErrorPanel } from '@speechly/react-ui';
import Main from './components/Main/Main';
import { SpeechState,useSpeechContext } from '@speechly/react-client';


const App = () => {
  const classes = useStyles();
  const { speechState } = useSpeechContext();
  const main = useRef(null);

  const executeScroll = () => main.current.scrollIntoView();
    

    useEffect(() => {
      if (speechState === SpeechState?.Recording) {
         executeScroll()
       }
      
    },[speechState])
  return (
    <div>
      <Grid container className={classes.grid} spacing={0} alignItems='center' justifyContent='center' style={{ height: '100vh' }}>
        <Grid item xs={12}  md={3} className={classes.mobile}  >
          <Details title='income'/>
        </Grid>
        <Grid item ref={main} xs={12}  md={4} className={classes.main}>
          <Main/>
        </Grid>
         <Grid item xs={12}  md={4} className={classes.desktop}  >
          <Details title='income'/>
        </Grid>
        <Grid item xs={12}  md={3} className={classes.last}>
          <Details title='expense'/>
        </Grid>
      </Grid>
      <PushToTalkButtonContainer>
      <PushToTalkButton/>
      </PushToTalkButtonContainer>
    </div>
  )
}

export default App
