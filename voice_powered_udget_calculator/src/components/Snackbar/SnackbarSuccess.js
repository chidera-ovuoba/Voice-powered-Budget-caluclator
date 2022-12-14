import { Snackbar} from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';
import React from 'react'


const SnackbarSuccess = ({ open, handleClose }) => {
  return ( 
    <div>
    <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={open}
        autoHideDuration={4000}
         onClose={handleClose}
        >
        <MuiAlert
          elevation={6}
          variant="filled"
           severity="success">
           
          Transaction Successful
       </MuiAlert>
       </Snackbar>
      </div>
  )
}

export default SnackbarSuccess