import { Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';
import React from 'react'
import { useGlobalContext } from '../../contexts/context';


const SnackbarEditSuccess = ({ handleClose }) => {
  const { editOpen } = useGlobalContext();
  return ( 
    <div>
    <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={editOpen}
        autoHideDuration={4000}
         onClose={handleClose}
        >
        <MuiAlert
          elevation={6}
          variant="filled"
           severity="success">
           
         Edit Successful
       </MuiAlert>
       </Snackbar>
      </div>
  )
}

export default SnackbarEditSuccess