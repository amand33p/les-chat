import { useQuery } from '@apollo/client';
import { GET_ALL_USERS } from '../../graphql/queries';
import { useStateContext } from '../../context/state';

import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
} from '@material-ui/core';
import { useChatListStyles } from '../../styles/muiStyles';

const Users = () => {
  const classes = useChatListStyles();
  const { selectedChat, selectChat } = useStateContext();
  const { data: userData, loading: loadingUsers } = useQuery(GET_ALL_USERS, {
    onError: (err) => {
      console.log(err);
    },
  });

  if (loadingUsers || !userData) {
    return <div>loading...</div>;
  }

  return (
    <div className={classes.root}>
      <div className={classes.list}>
        {userData &&
          userData.getAllUsers.map((user) => (
            <div key={user.id}>
              <ListItem
                className={classes.listItem}
                button
                onClick={() => selectChat(user, 'private')}
                selected={
                  selectedChat?.chatType === 'private' &&
                  user.id === selectedChat.chatData.id
                }
              >
                <ListItemAvatar>
                  <Avatar
                    alt={user.username}
                    src={`https://secure.gravatar.com/avatar/${user.id}?s=150&d=retro`}
                  />
                </ListItemAvatar>
                <ListItemText primary={user.username} />
              </ListItem>
              <Divider />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Users;
