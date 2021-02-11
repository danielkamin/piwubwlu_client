import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
interface Props {
  triggerText: string;
  title: string;
  bodyText: string;
  okBtnText: string;
  onApproved: () => void;
}
const DeleteModal: React.FC<Props> = ({ onApproved, okBtnText, title, triggerText, bodyText }) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const acceptAction = async () => {
    onApproved();
    setOpen(false);
  };
  return (
    <div>
      <Button variant='outlined' color='primary' onClick={handleClickOpen} startIcon={<DeleteIcon />}>
        {triggerText}
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>{bodyText}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Anuluj
          </Button>
          <Button onClick={acceptAction} color='primary' autoFocus>
            {okBtnText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteModal;
