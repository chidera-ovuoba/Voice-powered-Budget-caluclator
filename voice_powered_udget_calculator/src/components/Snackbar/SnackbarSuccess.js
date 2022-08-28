import { Snackbar, Typography } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';
import React from 'react'
import { useGlobalContext } from '../../contexts/context';


const SnackbarSuccess = ({ open, handleClose }) => {
  const { editOpen } = useGlobalContext();
  return (
    <div>
    <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={open || editOpen}
        autoHideDuration={4000}
         onClose={handleClose}
        >
        <MuiAlert
          elevation={6}
          variant="filled"
           severity="success">
           
          <Typography variant='subtitle1'>{editOpen ? 'Edit' : 'Transaction'} Successful</Typography>
       </MuiAlert>
       </Snackbar>
      </div>
  )
}

export default SnackbarSuccess