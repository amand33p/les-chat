import { useState } from 'react';
import { useMutation } from '@apollo/client';
import {
  SEND_PRIVATE_MSG,
  SEND_GROUP_MSG,
  SEND_GLOBAL_MSG,
} from '../../graphql/mutations';
import { useStateContext } from '../../context/state';
import EmojiPicker from '../../components/EmojiPicker';
import { getErrorMsg } from '../../utils/helperFuncs';

import { IconButton, TextField, InputAdornment } from '@material-ui/core';
import { useConversationPageStyles } from '../../styles/muiStyles';
import SendIcon from '@material-ui/icons/Send';

const SendMessage = () => {
  const classes = useConversationPageStyles();
  const { selectedChat, notify } = useStateContext();
  const [messageBody, setMessageBody] = useState('');

  const [submitPrivateMsg, { loading: loadingPrivate }] = useMutation(
    SEND_PRIVATE_MSG,
    {
      onError: (err) => {
        notify(getErrorMsg(err), 'error');
      },
    }
  );
  const [submitGroupMsg, { loading: loadingGroup }] = useMutation(
    SEND_GROUP_MSG,
    {
      onError: (err) => {
        notify(getErrorMsg(err), 'error');
      },
    }
  );
  const [submitGlobalMsg, { loading: loadingGlobal }] = useMutation(
    SEND_GLOBAL_MSG,
    {
      onError: (err) => {
        notify(getErrorMsg(err), 'error');
      },
    }
  );

  const clearInput = () => {
    setMessageBody('');
  };

  const handleEmojiAdd = (emoji) => {
    setMessageBody((prevString) => prevString.concat(emoji));
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageBody.trim() === '' || !selectedChat) return;

    if (selectedChat.chatType === 'private') {
      submitPrivateMsg({
        variables: { receiverId: selectedChat.chatData.id, body: messageBody },
        update: () => {
          clearInput();
        },
      });
    } else if (selectedChat.chatType === 'group') {
      submitGroupMsg({
        variables: {
          conversationId: selectedChat.chatData.id,
          body: messageBody,
        },
        update: () => {
          clearInput();
        },
      });
    } else {
      submitGlobalMsg({
        variables: { body: messageBody },
        update: () => {
          clearInput();
        },
      });
    }
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
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <div>
                {messageBody.trim() !== '' && (
                  <IconButton
                    size="small"
                    color="primary"
                    type="submit"
                    disabled={loadingPrivate || loadingGroup || loadingGlobal}
                  >
                    <SendIcon fontSize="large" />
                  </IconButton>
                )}
              </div>
            </InputAdornment>
          ),
          startAdornment: (
            <InputAdornment position="start">
              <div>
                <EmojiPicker handleEmojiAdd={handleEmojiAdd} />
              </div>
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
};

export default SendMessage;
