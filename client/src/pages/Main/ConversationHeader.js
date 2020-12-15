import { useState } from 'react';
import GroupInfoDialog from '../../components/GroupInfoDialog';

import { Typography, Avatar, Button } from '@material-ui/core';
import { useConversationPageStyles } from '../../styles/muiStyles';
import LanguageIcon from '@material-ui/icons/Language';
import GroupIcon from '@material-ui/icons/Group';

const ConversationHeader = ({ selectedChat }) => {
  const classes = useConversationPageStyles();
  const [modalOpen, setModalOpen] = useState(false);

  const conversationDetails = () => {
    return (
      <>
        <Avatar>
          {selectedChat.chatType === 'public' ? (
            <LanguageIcon color="primary" />
          ) : selectedChat.chatType === 'group' ? (
            <GroupIcon color="primary" />
          ) : (
            <Avatar
              alt={selectedChat.chatData.username}
              src={`https://secure.gravatar.com/avatar/${selectedChat.chatData.id}?s=150&d=retro`}
            />
          )}
        </Avatar>
        <Typography
          color="secondary"
          variant="h6"
          className={classes.titleText}
        >
          {selectedChat.chatType === 'private'
            ? selectedChat.chatData.username
            : selectedChat.chatData.name}
        </Typography>
        {selectedChat.chatType === 'group' && (
          <Typography color="secondary" variant="body1">
            ({selectedChat.chatData.participants.length} members)
          </Typography>
        )}
      </>
    );
  };

  return (
    <div className={classes.conversationHeader}>
      {selectedChat.chatType === 'group' ? (
        <Button
          className={classes.headerTitle}
          onClick={() => setModalOpen(true)}
        >
          {conversationDetails()}
        </Button>
      ) : (
        <div className={classes.headerTitle}> {conversationDetails()}</div>
      )}
      {selectedChat.chatType === 'group' && (
        <GroupInfoDialog modalOpen={modalOpen} setModalOpen={setModalOpen} />
      )}
    </div>
  );
};

export default ConversationHeader;
