import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { GET_GROUPS } from '../../graphql/queries';
import { REMOVE_GROUP_USER } from '../../graphql/mutations';
import { useStateContext } from '../../context/state';
import { useAuthContext } from '../../context/auth';
import DeleteDialog from '../../components/DeleteDialog';
import EditGroupName from './EditGroupName';
import { formatDateInWords, getErrorMsg } from '../../utils/helperFuncs';

import {
  Typography,
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core';
import { useGroupInfoStyles } from '../../styles/muiStyles';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

const GroupInfo = ({ userData, loadingUsers }) => {
  const classes = useGroupInfoStyles();
  const { selectedChat, updateMembers, notify } = useStateContext();
  const { user } = useAuthContext();
  const [editOpen, setEditOpen] = useState(false);
  const [removeUser] = useMutation(REMOVE_GROUP_USER, {
    onError: (err) => {
      notify(getErrorMsg(err), 'error');
    },
  });

  const handleRemoveUser = (userToRemoveId) => {
    removeUser({
      variables: {
        conversationId: selectedChat.chatData.id,
        userId: userToRemoveId,
      },
      update: (proxy, { data }) => {
        const returnedData = data.removeGroupUser;
        const dataInCache = proxy.readQuery({
          query: GET_GROUPS,
        });

        const updatedGroups = dataInCache.getGroups.map((g) =>
          g.id === returnedData.groupId
            ? { ...g, participants: returnedData.participants }
            : g
        );

        proxy.writeQuery({
          query: GET_GROUPS,
          data: { getGroups: updatedGroups },
        });

        if (selectedChat.chatData.id === returnedData.groupId) {
          updateMembers(returnedData);
        }
        notify('Group member removed!');
      },
    });
  };

  const { name, participants, adminUser, createdAt } = selectedChat.chatData;
  const isGroupAdmin = user.id === selectedChat.chatData.admin;

  return (
    <div>
      <div className={classes.topPart}>
        {!editOpen ? (
          <div className={classes.groupName}>
            <Typography variant="h5" color="secondary">
              {name}
            </Typography>
            {isGroupAdmin && (
              <Button
                color="primary"
                size="small"
                startIcon={<EditOutlinedIcon />}
                variant="outlined"
                className={classes.editBtn}
                onClick={() => setEditOpen(true)}
              >
                Edit
              </Button>
            )}
          </div>
        ) : (
          <EditGroupName setEditOpen={setEditOpen} />
        )}
        <Typography variant="subtitle1" color="secondary">
          Admin: <strong>{adminUser.username}</strong> | Created:{' '}
          <strong>{formatDateInWords(createdAt)}</strong>
        </Typography>
      </div>
      {loadingUsers ? (
        <div>loading...</div>
      ) : (
        <div className={classes.membersListWrapper}>
          <Typography
            variant="subtitle1"
            color="secondary"
            className={classes.membersHeader}
          >
            {participants.length}{' '}
            {participants.length > 1 ? 'Members' : 'Member'}
          </Typography>
          <List className={classes.membersList}>
            <ListItem>
              <ListItemAvatar>
                <Avatar
                  alt={user.username}
                  src={`https://secure.gravatar.com/avatar/${user.id}?s=150&d=retro`}
                />
              </ListItemAvatar>
              <ListItemText primary="You" />
            </ListItem>
            {userData &&
              userData.getAllUsers
                .filter((u) => participants.includes(u.id))
                .map((u) => (
                  <ListItem key={u.id}>
                    <ListItemAvatar>
                      <Avatar
                        alt={u.username}
                        src={`https://secure.gravatar.com/avatar/${u.id}?s=150&d=retro`}
                      />
                    </ListItemAvatar>
                    <ListItemText primary={u.username} />
                    {isGroupAdmin && (
                      <ListItemSecondaryAction>
                        <DeleteDialog
                          handleRemove={() => handleRemoveUser(u.id)}
                          username={u.username}
                        />
                      </ListItemSecondaryAction>
                    )}
                  </ListItem>
                ))}
          </List>
        </div>
      )}
    </div>
  );
};

export default GroupInfo;
