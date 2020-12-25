import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_GROUPS } from '../../graphql/queries';
import { useStateContext } from '../../context/state';
import FilterBar from '../../components/FilterBar';
import LoadingSpinner from '../../components/LoadingSpinner';
import { getErrorMsg, truncateString } from '../../utils/helperFuncs';

import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
  Typography,
} from '@material-ui/core';
import { useChatListStyles } from '../../styles/muiStyles';
import GroupIcon from '@material-ui/icons/Group';

const Groups = () => {
  const classes = useChatListStyles();
  const { selectedChat, selectChat, notify } = useStateContext();
  const [filterValue, setFilterValue] = useState('');
  const { data: groupData, loading: loadingGroups } = useQuery(GET_GROUPS, {
    onError: (err) => {
      notify(getErrorMsg(err), 'error');
    },
  });

  if (loadingGroups || !groupData) {
    return <LoadingSpinner />;
  }

  return (
    <div className={classes.root}>
      <div className={classes.list}>
        <div className={classes.searchWrapper}>
          <FilterBar
            filterValue={filterValue}
            setFilterValue={setFilterValue}
            placeholder="Search groups"
          />
        </div>
        {groupData && groupData.getGroups.length === 0 && (
          <Typography
            variant="subtitle1"
            color="secondary"
            className={classes.infoText}
          >
            You've not been added to any groups.
          </Typography>
        )}
        <Divider />
        {groupData &&
          groupData.getGroups
            .filter((group) =>
              group.name.toLowerCase().includes(filterValue.toLowerCase())
            )
            .map((group) => (
              <div key={group.id}>
                <ListItem
                  className={classes.listItem}
                  button
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
                  <ListItemText primary={truncateString(group.name, 25)} />
                </ListItem>
                <Divider />
              </div>
            ))}
      </div>
    </div>
  );
};

export default Groups;
