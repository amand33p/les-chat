import { DialogTitle } from './MuiCustomDialogTitle';
import GroupInfo from '../pages/Main/GroupInfo';

import { Dialog, DialogContent, IconButton } from '@material-ui/core';
import { useDialogStyles } from '../styles/muiStyles';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const GroupInfoDialog = ({ modalOpen, setModalOpen }) => {
  const classes = useDialogStyles();

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <IconButton color="primary" onClick={handleModalOpen} size="small">
        <MoreHorizIcon fontSize="large" />
      </IconButton>
      <Dialog
        open={modalOpen}
        onClose={handleModalClose}
        maxWidth="sm"
        fullWidth
        classes={{ paper: classes.dialogWrapper }}
      >
        <DialogTitle onClose={handleModalClose}></DialogTitle>
        <DialogContent>
          <GroupInfo />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GroupInfoDialog;
