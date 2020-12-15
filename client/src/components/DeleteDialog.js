import { useState } from 'react';

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
} from '@material-ui/core';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

const DeleteDialog = ({ handleRemove, username }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleDeleteClick = () => {
    handleRemove();
    handleModalClose();
  };

  return (
    <div>
      <IconButton color="primary" size="small" onClick={handleModalOpen}>
        <CancelOutlinedIcon />
      </IconButton>
      <Dialog open={modalOpen} onClose={handleModalClose}>
        <DialogTitle>Confirm Remove User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`Are you sure you want to remove ${username} from your group?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleModalClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteClick} color="primary">
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteDialog;
