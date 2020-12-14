import { useAuthContext } from '../../context/auth';
import { formatTime } from '../../utils/helperFuncs';

import { Typography } from '@material-ui/core';
import { useConversationPageStyles } from '../../styles/muiStyles';

const MessageBubble = ({ message }) => {
  const classes = useConversationPageStyles();
  const { user } = useAuthContext();

  const isSentMsg = message.senderId === user.id;

  return (
    <div className={classes.messageWrapper}>
      <div className={isSentMsg ? classes.sentMsg : classes.receivedMsg}>
        <Typography className={classes.msgText}>{message.body}</Typography>
        <Typography variant="caption" className={classes.msgTime}>
          {formatTime(message.createdAt)}
        </Typography>
      </div>
    </div>
  );
};

export default MessageBubble;
