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
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

const DeleteDialog = ({ handleDelete, username, type }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleDeleteClick = () => {
    handleDelete();
    handleModalClose();
  };

  return (
    <div>
      {type === 'group' ? (
        <Button
          color="primary"
          size="small"
          startIcon={<DeleteOutlinedIcon />}
          variant="outlined"
          onClick={handleModalOpen}
        >
          Delete
        </Button>
      ) : (
        <IconButton color="primary" size="small" onClick={handleModalOpen}>
          <CancelOutlinedIcon />
        </IconButton>
      )}
      <Dialog open={modalOpen} onClose={handleModalClose}>
        <DialogTitle>
          {type === 'group' ? 'Confirm Delete Group' : 'Confirm Remove User'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {type === 'group'
              ? `Are you sure you want to delete your group?`
              : `Are you sure you want to remove ${username} from your group?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleModalClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteClick} color="primary">
            {type === 'group' ? 'Delete' : 'Remove'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteDialog;
