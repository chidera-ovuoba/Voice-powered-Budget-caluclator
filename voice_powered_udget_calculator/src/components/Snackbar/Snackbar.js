import { Snackbar, Typography } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';
import React from 'react'

const Snackbar1 = ({openMessage,handleClose,failedEntity,allEntities}) => {
  return (
    <div>
    <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={openMessage}
        autoHideDuration={4000}
         onClose={handleClose}
        >
        <MuiAlert
          elevation={6}
          variant="filled"
           severity="error">
           
           <Typography variant='subtitle1'>{failedEntity.map((i) => allEntities[i]).join(', ')} {failedEntity.length > 1 ?'were':'is'} not specified</Typography>
       </MuiAlert>
       </Snackbar>
      </div>
  )
}

export default Snackbar1