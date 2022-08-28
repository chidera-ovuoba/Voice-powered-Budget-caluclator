import { Snackbar, Typography } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';
import React from 'react'

const SnackbarCategory = ({open,handleClose}) => {
  return (
    <div>
    <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={4000}
         onClose={handleClose}
        >
        <MuiAlert
          elevation={6}
          variant="filled"
           severity="info">
           
           <Typography variant='subtitle1'>You are not meant to have the same category for different types</Typography>
       </MuiAlert>
       </Snackbar>
      </div>
  )
}

export default SnackbarCategory