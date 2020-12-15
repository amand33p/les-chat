import { useQuery } from '@apollo/client';
import { GET_ALL_USERS } from '../../graphql/queries';
import { useStateContext } from '../../context/state';
import { useAuthContext } from '../../context/auth';
import { formatDate } from '../../utils/helperFuncs';

import {
  Typography,
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@material-ui/core';
import { useGroupInfoStyles } from '../../styles/muiStyles';
import GroupIcon from '@material-ui/icons/Group';

const GroupInfo = () => {
  const classes = useGroupInfoStyles();
  const { selectedChat } = useStateContext();
  const { user } = useAuthContext();
  const { data: userData, loading: loadingUsers } = useQuery(GET_ALL_USERS, {
    onError: (err) => {
      console.log(err);
    },
  });

  return (
    <div>
      <div className={classes.topPart}>
        <Avatar className={classes.groupIcon}>
          <GroupIcon color="primary" fontSize="large" />
        </Avatar>
        <Typography variant="h5" color="secondary">
          {selectedChat.chatData.name}
        </Typography>
        <Typography variant="subtitle1" color="secondary">
          Admin: <strong>{selectedChat.chatData.adminUser.username}</strong> |
          Created:{' '}
          <strong>{formatDate(selectedChat.chatData.createdAt)}</strong>
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
            {selectedChat.chatData.participants.length} Members
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
                .filter((u) =>
                  selectedChat.chatData.participants.includes(u.id)
                )
                .map((u) => (
                  <ListItem key={u.id}>
                    <ListItemAvatar>
                      <Avatar
                        alt={u.username}
                        src={`https://secure.gravatar.com/avatar/${u.id}?s=150&d=retro`}
                      />
                    </ListItemAvatar>
                    <ListItemText primary={u.username} />
                  </ListItem>
                ))}
          </List>
        </div>
      )}
    </div>
  );
};

export default GroupInfo;
