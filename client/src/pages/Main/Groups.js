import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_GROUPS } from '../../graphql/queries';
import { useStateContext } from '../../context/state';
import FilterBar from '../../components/FilterBar';

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
  const { selectedChat, selectChat } = useStateContext();
  const [filterValue, setFilterValue] = useState('');
  const { data: groupData, loading: loadingGroups } = useQuery(GET_GROUPS, {
    onError: (err) => {
      console.log(err);
    },
  });

  if (loadingGroups || !groupData) {
    return <div>loading...</div>;
  }

  return (
    <div className={classes.root}>
      <div className={classes.list}>
        <FilterBar
          filterValue={filterValue}
          setFilterValue={setFilterValue}
          placeholder="Search groups"
        />
        {groupData && groupData.getGroups.length === 0 && (
          <Typography
            variant="subtitle1"
            color="secondary"
            style={{ padding: '0.5em', textAlign: 'center' }}
          >
            You've not been added to any groups.
          </Typography>
        )}
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
                  <ListItemText primary={group.name} />
                </ListItem>
                <Divider />
              </div>
            ))}
      </div>
    </div>
  );
};

export default Groups;
