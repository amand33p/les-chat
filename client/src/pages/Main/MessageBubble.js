import { useAuthContext } from '../../context/auth';

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
      </div>
    </div>
  );
};

export default MessageBubble;
