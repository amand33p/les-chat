import { Typography, Avatar } from '@material-ui/core';
import { useConversationPageStyles } from '../styles/muiStyles';
import LanguageIcon from '@material-ui/icons/Language';
import GroupIcon from '@material-ui/icons/Group';

const ConversationHeader = ({ selectedChat }) => {
  const classes = useConversationPageStyles();

  return (
    <div className={classes.conversationHeader}>
      <Avatar>
        {selectedChat.chatType === 'public' ? (
          <LanguageIcon color="primary" />
        ) : selectedChat.chatType === 'group' ? (
          <GroupIcon color="primary" />
        ) : (
          <Avatar
            alt={selectedChat.username}
            src={`https://secure.gravatar.com/avatar/${selectedChat.username}?s=150&d=retro`}
          />
        )}
      </Avatar>
      <Typography color="primary" variant="h6" className={classes.titleText}>
        {selectedChat.chatType === 'private'
          ? selectedChat.chatData.username
          : selectedChat.chatData.name}
      </Typography>
    </div>
  );
};

export default ConversationHeader;
