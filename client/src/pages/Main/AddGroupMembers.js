import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_GROUP_USER } from '../../graphql/mutations';
import { GET_GROUPS } from '../../graphql/queries';
import { useStateContext } from '../../context/state';
import ErrorMessage from '../../components/ErrorMessage';
import { getErrorMsg } from '../../utils/helperFuncs';

import {
  TextField,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Chip,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useAddGroupMembersStyles } from '../../styles/muiStyles';

const AddGroupMembers = ({ userData, closeModal }) => {
  const classes = useAddGroupMembersStyles();
  const [usersToAdd, setUsersToAdd] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const { selectedChat, updateMembers, notify } = useStateContext();
  const [addUser, { loading: addingUser }] = useMutation(ADD_GROUP_USER, {
    onError: (err) => {
      setErrorMsg(getErrorMsg(err));
    },
  });

  const usersOnChange = (e, selectedOption) => {
    setUsersToAdd(selectedOption.map((o) => o.id));
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    addUser({
      variables: {
        conversationId: selectedChat.chatData.id,
        participants: usersToAdd,
      },
      update: (proxy, { data }) => {
        const returnedData = data.addGroupUser;
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
        closeModal();
        notify('New members(s) added to the group!');
      },
    });
  };

  return (
    <form onSubmit={handleAddUser}>
      <ErrorMessage
        errorMsg={errorMsg}
        clearErrorMsg={() => setErrorMsg(null)}
      />
      <Autocomplete
        multiple
        filterSelectedOptions
        onChange={usersOnChange}
        options={
          userData
            ? userData.getAllUsers.filter(
                (u) => !selectedChat.chatData.participants.includes(u.id)
              )
            : []
        }
        getOptionLabel={(option) => option.username}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Select Users"
            size="small"
          />
        )}
        renderOption={(option) => (
          <ListItem dense>
            <ListItemAvatar>
              <Avatar
                alt={option.username}
                src={`https://secure.gravatar.com/avatar/${option.id}?s=150&d=retro`}
              />
            </ListItemAvatar>
            <ListItemText primary={option.username} />
          </ListItem>
        )}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              avatar={
                <Avatar
                  alt={option.username}
                  src={`https://secure.gravatar.com/avatar/${option.id}?s=150&d=retro`}
                />
              }
              color="secondary"
              variant="outlined"
              label={option.username}
              {...getTagProps({ index })}
            />
          ))
        }
      />
      <Button
        size="large"
        color="primary"
        variant="contained"
        disabled={addingUser}
        className={classes.addMemberBtn}
        fullWidth
        type="submit"
      >
        Add Members
      </Button>
    </form>
  );
};

export default AddGroupMembers;
