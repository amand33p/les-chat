import { useState } from 'react';
import { useStateContext } from '../../context/state';

import { Button, TextField } from '@material-ui/core';
import { useConversationPageStyles } from '../../styles/muiStyles';
import SendIcon from '@material-ui/icons/Send';

const SendMessage = () => {
  const classes = useConversationPageStyles();
  const { selectedChat } = useStateContext();
  const [messageBody, setMessageBody] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageBody.trim() === '') return;
  };

  return (
    <form className={classes.sendMsgForm} onSubmit={handleSendMessage}>
      <TextField
        value={messageBody}
        fullWidth
        type="text"
        placeholder="Type a message..."
        variant="outlined"
        onChange={(e) => setMessageBody(e.target.value)}
      />
      <Button size="small" color="primary" variant="contained" type="submit">
        <SendIcon />
      </Button>
    </form>
  );
};

export default SendMessage;
