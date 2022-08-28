import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core';
import React, { useState } from 'react'


const DialogContainer = ({open,handleClose}) => {
    const [categoryField, setCategoryField] = useState('');
    return (
      <div>
       <Dialog open={open} onClose={()=> {
              handleClose(categoryField)
              setCategoryField('')
            }}>
        <DialogTitle>Add your Category</DialogTitle>
        <DialogContent>
          <DialogContentText>
            make your pick 🤐
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Category"
            fullWidth
            variant="standard"
            value ={categoryField}
            onChange={(e)=>setCategoryField(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
            <Button onClick={() => {
              handleClose(categoryField)
              setCategoryField('')
            }
            }>Add</Button>
        </DialogActions>
      </Dialog>
      </div>
  )
}

export default DialogContainer