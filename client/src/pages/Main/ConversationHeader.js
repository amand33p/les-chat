import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_USERS } from '../../graphql/queries';
import DialogBox from '../../components/DialogBox';
import GroupInfo from './GroupInfo';
import AddGroupMembers from './AddGroupMembers';
import { useAuthContext } from '../../context/auth';
import { useStateContext } from '../../context/state';
import { truncateString, getErrorMsg } from '../../utils/helperFuncs';

import {
  Typography,
  Avatar,
  Button,
  IconButton,
  useMediaQuery,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { useConversationPageStyles } from '../../styles/muiStyles';
import LanguageIcon from '@material-ui/icons/Language';
import GroupIcon from '@material-ui/icons/Group';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const ConversationHeader = () => {
  const classes = useConversationPageStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { user } = useAuthContext();
  const { unselectChat, selectedChat, notify } = useStateContext();
  const [infoModal, setInfoModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const { data: userData, loading: loadingUsers } = useQuery(GET_ALL_USERS, {
    onError: (err) => {
      notify(getErrorMsg(err), 'error');
    },
  });

  const { id, username, name, participants, admin } = selectedChat.chatData;

  const conversationDetails = () => {
    return (
      <>
        <Avatar className={classes.avatar}>
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
          variant={isMobile ? 'subtitle2' : 'h6'}
          className={classes.titleText}
        >
          {selectedChat.chatType === 'private'
            ? isMobile
              ? truncateString(username, 12)
              : username
            : isMobile
            ? truncateString(name, 12)
            : name}
        </Typography>
        {selectedChat.chatType === 'group' && (
          <Typography
            color="secondary"
            variant={isMobile ? 'caption' : 'body1'}
          >
            ({participants.length}{' '}
            {participants.length > 1 ? 'members' : 'member'})
          </Typography>
        )}
      </>
    );
  };

  return (
    <div className={classes.conversationHeader}>
      <div className={classes.leftBtns}>
        {isMobile && selectedChat && (
          <Button
            size="small"
            color="primary"
            startIcon={<ArrowBackIcon />}
            onClick={() => unselectChat()}
          >
            Back
          </Button>
        )}
        {selectedChat.chatType === 'group' ? (
          <Button
            className={classes.headerTitle}
            onClick={() => setInfoModal(true)}
            size="small"
          >
            {conversationDetails()}
          </Button>
        ) : (
          <div className={classes.headerTitle}>{conversationDetails()}</div>
        )}
      </div>

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
                <GroupAddIcon fontSize={isMobile ? 'default' : 'large'} />
              </IconButton>
            }
          >
            <AddGroupMembers
              userData={userData}
              closeModal={() => setAddModal(false)}
            />
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
                <MenuOpenIcon fontSize={isMobile ? 'default' : 'large'} />
              </IconButton>
            }
          >
            <GroupInfo
              userData={userData}
              loadingUsers={loadingUsers}
              closeModal={() => setInfoModal(false)}
            />
          </DialogBox>
        )}
      </div>
    </div>
  );
};

export default ConversationHeader;
