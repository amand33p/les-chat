import { useStateContext } from '../../context/state';

import { Typography, Avatar, Button } from '@material-ui/core';
import { useGroupInfoStyles } from '../../styles/muiStyles';
import GroupIcon from '@material-ui/icons/Group';

const GroupInfo = () => {
  const classes = useGroupInfoStyles();
  const { selectedChat } = useStateContext();

  return (
    <div>
      <div className={classes.topPart}>
        <Avatar className={classes.avatar}>
          <GroupIcon color="primary" fontSize="large" />
        </Avatar>
        <Typography variant="h5" color="secondary">
          {selectedChat.chatData.name}
        </Typography>
        <Typography variant="subtitle1" color="secondary">
          <strong>{selectedChat.chatData.adminUser.username}</strong> : Admin
        </Typography>
        <Typography variant="subtitle1" color="secondary">
          <strong>{selectedChat.chatData.participants.length}</strong> : Members
        </Typography>
      </div>
    </div>
  );
};

export default GroupInfo;
