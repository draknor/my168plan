import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Backup} from "@mui/icons-material";


export default function LoadDialog(props) {
  const [open, setOpen] = React.useState(false);
  const processLoad = props.onClick
  let tempPlanId = '';

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLoad = () => {
    setOpen(false);
    processLoad(tempPlanId);
  }

  const handleTextOnChange = (e) => {
    //console.log("handleTextOnChange", e.target.value);
    tempPlanId = e.target.value;
  }

  return (
    <div>
      <Button variant="outlined" color={"info"} startIcon={<Backup />} onClick={handleClickOpen}>
        Load
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Load Plan</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the plan ID
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="planId"
            label="Plan ID"
            type="text"
            variant="outlined"
            onChange={handleTextOnChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleLoad}>Load</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


