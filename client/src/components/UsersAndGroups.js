import { useQuery } from '@apollo/client';
import {
  GET_ALL_USERS,
  GET_GROUPS,
  GET_GLOBAL_GROUP,
} from '../graphql/queries';
import LatestMessage from './LatestMessage';
import { useStateContext } from '../context/state';

import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  Divider,
} from '@material-ui/core';
import { useUsersGroupsPageStyles } from '../styles/muiStyles';
import LanguageIcon from '@material-ui/icons/Language';
import GroupIcon from '@material-ui/icons/Group';

const UsersAndGroups = () => {
  const classes = useUsersGroupsPageStyles();
  const { selectedChat, selectChat } = useStateContext();

  const { data: userData, loading: loadingUsers } = useQuery(GET_ALL_USERS, {
    onError: (err) => {
      console.log(err);
    },
    fetchPolicy: 'network-only',
  });
  const { data: groupData, loading: loadingGroups } = useQuery(GET_GROUPS, {
    onError: (err) => {
      console.log(err);
    },
    fetchPolicy: 'network-only',
  });
  const { data: globalData, loading: loadingGlobal } = useQuery(
    GET_GLOBAL_GROUP,
    {
      onError: (err) => {
        console.log(err);
      },
      fetchPolicy: 'network-only',
    }
  );

  if (loadingUsers || loadingGroups || loadingGlobal || !userData) {
    return <div>loading...</div>;
  }

  return (
    <div className={classes.root}>
      <List className={classes.list}>
        {globalData && (
          <ListItem
            className={classes.listItem}
            button
            onClick={() => selectChat(globalData.getGlobalGroup, 'public')}
            selected={
              selectedChat?.chatType === 'public' &&
              globalData.getGlobalGroup.id === selectedChat.chatData.id
            }
          >
            <ListItemAvatar>
              <Avatar>
                <LanguageIcon color="primary" />
              </Avatar>
            </ListItemAvatar>
            <LatestMessage body={globalData.getGlobalGroup} />
          </ListItem>
        )}
        <Divider />
        {groupData &&
          groupData.getGroups
            .filter((group) => group.latestMessage)
            .map((group) => (
              <ListItem
                className={classes.listItem}
                button
                key={group.id}
                onClick={() => selectChat(group, 'group')}
                selected={
                  selectedChat?.chatType === 'group' &&
                  group.id === selectedChat.chatData.id
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    <GroupIcon color="primary" />
                  </Avatar>
                </ListItemAvatar>
                <LatestMessage body={group} />
              </ListItem>
            ))}
        <Divider />
        {userData &&
          userData.getAllUsers
            .filter((user) => user.latestMessage)
            .map((user) => (
              <ListItem
                className={classes.listItem}
                button
                key={user.id}
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
                <LatestMessage body={user} type="user" />
              </ListItem>
            ))}
        <Divider />
      </List>
    </div>
  );
};

export default UsersAndGroups;
