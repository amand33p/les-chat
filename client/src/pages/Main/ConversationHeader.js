import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_USERS } from '../../graphql/queries';
import DialogBox from '../../components/DialogBox';
import GroupInfo from './GroupInfo';
import AddGroupMembers from './AddGroupMembers';
import { useAuthContext } from '../../context/auth';

import { Typography, Avatar, Button, IconButton } from '@material-ui/core';
import { useConversationPageStyles } from '../../styles/muiStyles';
import LanguageIcon from '@material-ui/icons/Language';
import GroupIcon from '@material-ui/icons/Group';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import GroupAddIcon from '@material-ui/icons/GroupAdd';

const ConversationHeader = ({ selectedChat }) => {
  const classes = useConversationPageStyles();
  const [infoModal, setInfoModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const { user } = useAuthContext();
  const { data: userData, loading: loadingUsers } = useQuery(GET_ALL_USERS, {
    onError: (err) => {
      console.log(err);
    },
  });

  const { id, username, name, participants, admin } = selectedChat.chatData;

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
              alt={username}
              src={`https://secure.gravatar.com/avatar/${id}?s=150&d=retro`}
            />
          )}
        </Avatar>
        <Typography
          color="secondary"
          variant="h6"
          className={classes.titleText}
        >
          {selectedChat.chatType === 'private' ? username : name}
        </Typography>
        {selectedChat.chatType === 'group' && (
          <Typography color="secondary" variant="body1">
            ({participants.length}{' '}
            {participants.length > 1 ? 'members' : 'member'})
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
          onClick={() => setInfoModal(true)}
        >
          {conversationDetails()}
        </Button>
      ) : (
        <div className={classes.headerTitle}> {conversationDetails()}</div>
      )}
      <div className={classes.rightHeaderBtns}>
        {admin === user.id && (
          <DialogBox
            modalOpen={addModal}
            setModalOpen={setAddModal}
            title="Add Members"
            triggerButton={
              <IconButton
                color="primary"
                onClick={() => setAddModal(true)}
                size="small"
                style={{ marginRight: 10 }}
              >
                <GroupAddIcon fontSize="large" />
              </IconButton>
            }
          >
            <AddGroupMembers userData={userData} loadingUsers={loadingUsers} />
          </DialogBox>
        )}
        {selectedChat.chatType === 'group' && (
          <DialogBox
            modalOpen={infoModal}
            setModalOpen={setInfoModal}
            title="Group Info"
            triggerButton={
              <IconButton
                color="primary"
                onClick={() => setInfoModal(true)}
                size="small"
              >
                <MenuOpenIcon fontSize="large" />
              </IconButton>
            }
          >
            <GroupInfo userData={userData} loadingUsers={loadingUsers} />
          </DialogBox>
        )}
      </div>
    </div>
  );
};

export default ConversationHeader;
