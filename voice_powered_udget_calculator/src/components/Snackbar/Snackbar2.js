import { Snackbar, Typography } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';
import React from 'react'

const Snackbar2 = ({open,handleClose,category,type}) => {
  return (
    <>
    <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={open}
        autoHideDuration={4000}
         onClose={handleClose}
        >
        <MuiAlert
          elevation={6}
          variant="filled"
           severity="error">
           
          <Typography variant='subtitle1'>{category} is not a category of {type}</Typography>
       </MuiAlert>
       </Snackbar>
      </>
  )
}

export default Snackbar2