import { useQuery } from '@apollo/client';
import {
  GET_ALL_USERS,
  GET_GROUPS,
  GET_GLOBAL_GROUP,
} from '../graphql/queries';
import LatestMessage from './LatestMessage';
import { formatDateAgo } from '../utils/helperFuncs';

import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  Typography,
  Divider,
} from '@material-ui/core';
import { useUsersGroupsPageStyles } from '../styles/muiStyles';
import LanguageIcon from '@material-ui/icons/Language';
import GroupIcon from '@material-ui/icons/Group';

const UsersAndGroups = () => {
  const classes = useUsersGroupsPageStyles();
  const { data: userData, loading: loadingUsers } = useQuery(GET_ALL_USERS, {
    onError: (err) => {
      console.log(err);
    },
  });
  const { data: groupData, loading: loadingGroups } = useQuery(GET_GROUPS, {
    onError: (err) => {
      console.log(err);
    },
  });
  const { data: globalData, loading: loadingGlobal } = useQuery(
    GET_GLOBAL_GROUP,
    {
      onError: (err) => {
        console.log(err);
      },
    }
  );

  if (loadingUsers || loadingGroups || loadingGlobal || !userData) {
    return <div>loading...</div>;
  }

  return (
    <div className={classes.root}>
      <List className={classes.list}>
        {globalData && (
          <ListItem className={classes.listItem} button>
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
              <ListItem className={classes.listItem} button key={group.id}>
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
              <ListItem className={classes.listItem} button key={user.id}>
                <ListItemAvatar>
                  <Avatar
                    alt={user.username}
                    src={`https://secure.gravatar.com/avatar/${user.id}?s=150&d=retro`}
                  />
                </ListItemAvatar>
                <LatestMessage body={user} type="user" />
              </ListItem>
            ))}
      </List>
    </div>
  );
};

export default UsersAndGroups;
