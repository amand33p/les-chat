import { DialogTitle } from './MuiCustomDialogTitle';
import { Dialog, DialogContent } from '@material-ui/core';
import { useDialogStyles } from '../styles/muiStyles';

const DialogBox = ({
  modalOpen,
  setModalOpen,
  triggerButton,
  children,
  title,
}) => {
  const classes = useDialogStyles();

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <div>
      {triggerButton}
      <Dialog
        open={modalOpen}
        onClose={handleModalClose}
        maxWidth="sm"
        fullWidth
        classes={{ paper: classes.dialogWrapper }}
      >
        <DialogTitle onClose={handleModalClose}>{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </div>
  );
};

export default DialogBox;
