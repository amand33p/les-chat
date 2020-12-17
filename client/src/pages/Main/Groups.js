import { useQuery } from '@apollo/client';
import { GET_GROUPS } from '../../graphql/queries';
import { useStateContext } from '../../context/state';

import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
} from '@material-ui/core';
import { useChatListStyles } from '../../styles/muiStyles';
import GroupIcon from '@material-ui/icons/Group';

const Groups = () => {
  const classes = useChatListStyles();
  const { selectedChat, selectChat } = useStateContext();
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
        {groupData &&
          groupData.getGroups.map((group) => (
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
