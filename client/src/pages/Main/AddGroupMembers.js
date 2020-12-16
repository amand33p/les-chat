import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_REMOVE_GROUP_USER } from '../../graphql/mutations';
import { GET_GROUPS } from '../../graphql/queries';
import { useStateContext } from '../../context/state';

import {
  Select,
  MenuItem,
  ListItemAvatar,
  Avatar,
  Typography,
  InputLabel,
  FormControl,
  Button,
} from '@material-ui/core';
import { useAddGroupMembersStyles } from '../../styles/muiStyles';

const AddGroupMembers = ({ userData, loadingUsers }) => {
  const classes = useAddGroupMembersStyles();
  const [userToAdd, setUserToAdd] = useState('');
  const { selectedChat, updateMembers } = useStateContext();
  const [addRemoveUser, { loading: addingUser }] = useMutation(
    ADD_REMOVE_GROUP_USER,
    {
      onError: (err) => {
        console.log(err);
      },
    }
  );

  const handleSelectChange = (event) => {
    setUserToAdd(event.target.value);
  };

  const handleAddUser = () => {
    addRemoveUser({
      variables: {
        conversationId: selectedChat.chatData.id,
        userId: userToAdd,
        addOrDel: 'ADD',
      },
      update: (proxy, { data }) => {
        const returnedData = data.addRemoveGroupUser;
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

        setUserToAdd('');
      },
    });
  };

  return (
    <div>
      <FormControl variant="outlined" fullWidth>
        <InputLabel id="user-menu">Select a user</InputLabel>
        <Select
          value={userToAdd}
          id="user-menu"
          labelId="user-menu"
          onChange={handleSelectChange}
          label="Select a user"
        >
          {loadingUsers ||
          userData?.getAllUsers.filter(
            (u) => !selectedChat.chatData.participants.includes(u.id)
          ).length === 0 ? (
            <MenuItem value="">No Users Available</MenuItem>
          ) : (
            userData &&
            userData.getAllUsers
              .filter((u) => !selectedChat.chatData.participants.includes(u.id))
              .map((u) => (
                <MenuItem key={u.id} value={u.id}>
                  <ListItemAvatar>
                    <Avatar
                      alt={u.username}
                      src={`https://secure.gravatar.com/avatar/${u.id}?s=150&d=retro`}
                    />
                  </ListItemAvatar>
                  <Typography variant="inherit">{u.username}</Typography>
                </MenuItem>
              ))
          )}
        </Select>
        <Button
          size="large"
          color="primary"
          variant="contained"
          disabled={addingUser}
          className={classes.addMemberBtn}
          onClick={handleAddUser}
        >
          Add Member
        </Button>
      </FormControl>
    </div>
  );
};

export default AddGroupMembers;
