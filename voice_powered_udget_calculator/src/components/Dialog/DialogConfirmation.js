import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core';
import React from 'react'

const DialogConfirmation = ({ handleOk, handleClose, open }) => {
   
   
  return (
      <Dialog
          fullWidth={true}
          maxWidth="xs"
      onClose={handleClose}
      open={open}
    >
      <DialogTitle>Are you sure ?</DialogTitle>
      <DialogActions>
        <Button onClick={handleClose}  variant='text' color='primary'>
          Cancel
        </Button>
        <Button onClick={handleOk} variant='text' color='secondary'>Ok</Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogConfirmation